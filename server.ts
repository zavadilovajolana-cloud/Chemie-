import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHEMIE_LIDSKY_SYSTEM_PROMPT = `Jsi profesionální pedagog, lektor a expert na tvorbu srozumitelného vzdělávacího obsahu pro bezplatný vzdělávací web „Chemie lidsky“, který slouží středoškolákům.

Cílová skupina projektu:
- Studenti středních škol a gymnázií (1. až 4. ročník)
- Studenti připravující se na maturitní zkoušku z chemie
- Uchazeči o studium na vysokých školách (lékařské fakulty, přírodovědecké fakulty, VŠCHT)

Základní pravidla pro veškerý výstup:
1. Tón komunikace: Lidský, srozumitelný, povzbudivý, bez zbytečné a nudné akademické hantýrky. Chemie se dá vysvětlit normálně.
2. Struktura textů: Krátké odstavce, přehledné odrážky, tučně zvýrazněná klíčová slova, tabulky v Markdownu a názorné příklady ze života nebo praxe (kuchyně, tělo, příroda, technologie).
3. Členění podle modulů:
   - Obecná a anorganická chemie (vazby, názvosloví krok za krokem, prvky).
   - Chemické výpočty a redoxní reakce (látkové množství, koncentrace, křížové pravidlo s podrobným postupem, vyčíslování).
   - Organická chemie (uhlovodíky, deriváty, reakční mechanismy – substituční, adiční, eliminační).
   - Biochemie (sacharidy, lipidy, bílkoviny, základní metabolické dráhy).

Kdykoliv dostaneš dotaz nebo téma:
- Začni povzbuzujícím, lidským úvodem (žádné suché definice jako první věta).
- Vysvětli princip selským rozumem / analogií.
- Uveď konkrétní příklad ze života („Kde to potkáš?“).
- Vytvoř přehlednou tabulku nebo krok-za-krokem návod.
- Pokud jde o výpočet nebo reakci, rozepiš každý krok tak, aby se v něm nikdo neztratil (včetně jednotek).
- Zahrň tip pro maturitu / přijímačky (chytáky, na které pozor).
- Zakonči rychlým minitestem s 2-3 otázkami a řešením.`;

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      service: 'Chemie lidsky API',
    });
  });

  // Generate customized lesson / topic explanation
  app.post('/api/generate-lesson', async (req: Request, res: Response) => {
    try {
      const { topic, module, targetAudience, format, specificQuestion } = req.body;

      if (!topic) {
        return res.status(400).json({ error: 'Chybí téma (topic).' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY není nastavena v prostředí. Nastavte prosím klíč v AI Studio Secrets.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const userPrompt = `Připrav výukový materiál pro web „Chemie lidsky“.
Téma: ${topic}
Modul: ${module || 'Podle tématu'}
Cílová úroveň studenta: ${targetAudience || 'Střední škola / maturita'}
Požadovaný formát: ${format || 'Kompletní výukový přehled s příklady a tipy'}
Doplňující požadavek / otázka: ${specificQuestion || 'Žádné další speciální požadavky'}

Nezapomeň dodržet:
- Lidský, neakademický a povzbudivý jazyk
- Krátké odstavce a tučné klíčové pojmy
- Názorný příklad ze života (analogie)
- Tabulku nebo přehledný postup krok za krokem
- U výpočtů křížové pravidlo nebo přehledný rozpis vzorců
- Chyták pro maturitu / lékařské fakulty a VŠCHT
- 2-3 cvičné kontrolní otázky s vysvětleným řešením`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction: CHEMIE_LIDSKY_SYSTEM_PROMPT,
        },
      });

      res.json({
        content: response.text || 'Nepodařilo se vygenerovat obsah.',
        topic,
        module,
      });
    } catch (err: any) {
      console.error('Error generating lesson:', err);
      res.status(500).json({
        error: err?.message || 'Nastala chyba při komunikaci s modelem Gemini.',
      });
    }
  });

  // Interactive Chem tutor / problem solver
  app.post('/api/ask-tutor', async (req: Request, res: Response) => {
    try {
      const { question, context } = req.body;

      if (!question) {
        return res.status(400).json({ error: 'Chybí znění otázky nebo příkladu.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY není nastavena v prostředí.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `Dotaz studenta nebo zadání příkladu:
${question}

Kontext kurzu/modulu:
${context || 'Obecná chemie'}

Odpověz přísně ve stylu projektu „Chemie lidsky“:
1. Rozepiš postup logicky a krok za krokem, žádné zkratky.
2. Pokud jde o výpočet, ukaž zápis veličin, vzorec, dosazení i slovní odpověď.
3. Pokud jde o teorii či reakci, vysvětli PROČ k ní dochází lidskou analogií.
4. Přidej povzbuzení a tip, na jakou častou chybu si dát pozor.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: CHEMIE_LIDSKY_SYSTEM_PROMPT,
        },
      });

      res.json({
        answer: response.text || 'Nemám k dispozici odpověď.',
      });
    } catch (err: any) {
      console.error('Error in tutor endpoint:', err);
      res.status(500).json({
        error: err?.message || 'Nastala chyba při zpracování dotazu lektorem.',
      });
    }
  });

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Chemie lidsky server běží na http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
