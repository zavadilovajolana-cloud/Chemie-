import { ModuleInfo, Topic, RedoxReactionExample } from '../types/chemistry';

export const MODULES: ModuleInfo[] = [
  {
    id: 'general-inorganic',
    title: 'Obecná a anorganická chemie',
    subtitle: 'Vazby, názvosloví krok za krokem a prvky',
    description: 'Pochop proč atomy drží pohromadě, zkroť české názvosloví a objev zákonitosti periodické soustavy bez biflování.',
    icon: 'Atom',
    badge: 'Základní kámen chemie',
    color: {
      bg: 'bg-emerald-500',
      text: 'text-emerald-700',
      border: 'border-emerald-300',
      light: 'bg-emerald-50',
      accent: 'emerald',
    },
  },
  {
    id: 'calculations-redox',
    title: 'Chemické výpočty a redoxní reakce',
    subtitle: 'Látkové množství, křížové pravidlo a elektrony',
    description: 'Konec strachu z chemické matematiky. Křížové pravidlo, ředění roztoků a vyčíslování redoxek krok za krokem.',
    icon: 'Calculator',
    badge: '100% jistota u písemek',
    color: {
      bg: 'bg-sky-500',
      text: 'text-sky-700',
      border: 'border-sky-300',
      light: 'bg-sky-50',
      accent: 'sky',
    },
  },
  {
    id: 'organic',
    title: 'Organická chemie',
    subtitle: 'Uhlovodíky, deriváty a reakční mechanismy',
    description: 'Od čtyřvazného uhlíku po syntézy léčiv. Markovnikovo a Zajcevovo pravidlo lidskými analogiemi, kterým porozumíš.',
    icon: 'Sparkles',
    badge: 'Svět uhlíkových řetězců',
    color: {
      bg: 'bg-amber-500',
      text: 'text-amber-700',
      border: 'border-amber-300',
      light: 'bg-amber-50',
      accent: 'amber',
    },
  },
  {
    id: 'biochemistry',
    title: 'Biochemie a metabolismus',
    subtitle: 'Sacharidy, lipidy, bílkoviny a továrna na energii',
    description: 'Chemie živého těla pro budoucí mediky a přírodovědce. Jak buňka spaluje glukózu na ATP a proč vajíčko tuhne.',
    icon: 'Dna',
    badge: 'Must-have na medicínu',
    color: {
      bg: 'bg-rose-500',
      text: 'text-rose-700',
      border: 'border-rose-300',
      light: 'bg-rose-50',
      accent: 'rose',
    },
  },
];

export const TOPICS: Topic[] = [
  // MODUL 1: Obecná a anorganická chemie
  {
    id: 'chemicke-vazby',
    moduleId: 'general-inorganic',
    title: 'Chemické vazby a mezimolekulární síly',
    tagline: 'Proč spolu atomy kamarádí a jak se dělí o elektrony',
    summary: 'Atomy nerady zůstávají samy – touží po stabilním elektronovém oktetu (osmičce ve valenční vrstvě jako vzácné plyny). Podle toho, jak moc jsou atomy nenasytné (elektronegativní), vazba skončí buď přátelským sdílením, přetahovanou nebo krádeží elektronu.',
    humanExplanation: 'Představ si dva lidi a společnou deku. Pokud jsou stejně silní (rozdíl elektronegativit ΔX < 0,4), o deku se dělí naprosto férově – vzniká kovalentní nepolární vazba. Pokud je jeden silnější (ΔX mezi 0,4 a 1,7), přetáhne většinu deky k sobě – kovalentní polární vazba s částečným nábojem. A pokud je jeden svalovec a druhý slaboch (ΔX > 1,7), svalovec deku ukradne úplně a máme iontovou vazbu: vznikne kladný kation a záporný anion, které u sebe drží silná elektrostatická přitažlivost.',
    lifeExample: {
      title: 'Proč je voda tekutá a sůl tvrdý krystal?',
      analogy: 'Vodíkové můstky fungují jako tisíce malých suchých zipů mezi molekulami vody.',
      inPractice: 'V molekule vody H₂O kyslík brutálně přitahuje elektrony od vodíků. Vodíky tak získají částečný kladný náboj (δ+) a kyslík záporný (δ-). Sousední molekuly vody se proto přitahují vodíkovými můstky. Kdyby jich nebylo, voda by vřela už při -80 °C a oceány by se vypařily do vesmíru! Kuchyňská sůl (NaCl) je zase nekonečná 3D mřížka pevných iontových vazeb – proto taje až při 801 °C.',
    },
    keyPoints: [
      '**Kovalentní nepolární vazba** (ΔX < 0,4): elektrony sdíleny rovnoměrně (např. H₂, O₂, Cl₂, CH₄).',
      '**Kovalentní polární vazba** (0,4 ≤ ΔX ≤ 1,7): elektronová hustota posunuta k elektronegativnějšímu atomu (např. H₂O, HCl).',
      '**Iontová vazba** (ΔX > 1,7): úplné předání elektronu a vznik iontů v krystalové mřížce (např. NaCl, KBr).',
      '**Koordinačně kovalentní (donor-akceptorová) vazba**: jeden atom dodá celý volný elektronový pár (donor) a druhý prázdný orbital (akceptor) – typické pro amonný kation NH₄⁺ nebo komplexní sloučeniny.',
      '**Vodíkový můstek**: nejsilnější mezimolekulární interakce mezi atomem vodíku navázaným na silně elektronegativní atom (F, O, N) a volným elektronovým párem jiného F, O, N.',
    ],
    tableData: {
      headers: ['Typ vazby', 'Rozdíl elektronegativity (ΔX)', 'Sdílení elektronů', 'Typický příklad', 'Vlastnosti látek'],
      rows: [
        ['Kovalentní nepolární', '< 0,4', 'Dokonale rovnoměrné', 'H–H, O=O, CH₄', 'Plyny/kapaliny, nerozpustné ve vodě, nevedou proud'],
        ['Kovalentní polární', '0,4 až 1,7', 'Nerovnoměrné (dipól)', 'H–Cl, H–O–H', 'Rozpouštějí se v polárních rozpouštědlech, polární molekuly'],
        ['Iontová vazba', '> 1,7', 'Úplný přechod elektronu', 'Na⁺Cl⁻, Ca²⁺O²⁻', 'Vysoké teploty tání, v roztoku/tavenině vedou proud'],
        ['Vodíkový můstek', 'Mezimolekulární', 'Elektrostatická přitažlivost', 'Mezi molekulami H₂O, v DNA', 'Zvyšuje bod varu, drží dvoušroubovici DNA'],
      ],
      caption: 'Srovnání typů chemických vazeb a jejich vliv na chování látek',
    },
    examTrap: {
      heading: 'Chyták u maturity: Vazba vs. molekula!',
      warning: 'Pozor na rozdíl mezi polární vazbou a polární molekulou! Molekula oxidu uhličitého O=C=O obsahuje dvě velmi polární vazby C=O, ale celá molekula je NEPOLÁRNÍ, protože je lineární a dipólové momenty směřují přesně proti sobě a navzájem se vyruší.',
      howToRemember: 'Představ si přetahování lanem dvou stejně silných atletů. Lano je napnuté na maximum (polární vazby), ale střed se ani nepohne (nepolární molekula).',
    },
    practiceQuestions: [
      {
        id: 'q-vazby-1',
        question: 'Která z následujících sloučenin má uvnitř molekuly polární kovalentní vazby, ale celá její molekula je přesto nepolární?',
        options: ['Voda (H₂O)', 'Amoniak (NH₃)', 'Oxid uhličitý (CO₂)', 'Chlorovodík (HCl)'],
        correctIndex: 2,
        explanation: 'CO₂ má symetrickou lineární geometrii (O=C=O). Dvě polární vazby C=O táhnou opačným směrem, takže výsledný dipólový moment molekuly je roven nule.',
        difficulty: 'Maturita',
      },
      {
        id: 'q-vazby-2',
        question: 'Co je podstatou vzniku amonného kationtu NH₄⁺ z amoniaku NH₃ a kationtu H⁺?',
        options: ['Iontová vazba', 'Koordinačně kovalentní (donor-akceptorová) vazba', 'Kovová vazba', 'Van der Waalsovy disperzní síly'],
        correctIndex: 1,
        explanation: 'Dusík v amoniaku NH₃ má volný nevazebný elektronový pár, který poskytne prázdnému (vakantnímu) orbitalu vodíkového kationtu H⁺.',
        difficulty: 'Přijímačky LF/VŠCHT',
      },
    ],
  },
  {
    id: 'nazvoslovi-krok-za-krokem',
    moduleId: 'general-inorganic',
    title: 'České anorganické názvosloví krok za krokem',
    tagline: 'Geniální systém koncovek -ný až -ičelý, který ti ušetří hodiny stresu',
    summary: 'České chemické názvosloví je světový unikát – je neuvěřitelně logické a matematicky přesné. Stačí znát 8 koncovek oxidačních čísel a pravidlo nulového součtu v neutrální molekule.',
    humanExplanation: 'Když v chemii slyšíš koncovku, slyšíš přímo oxidační číslo kationtu. Oxidační číslo není žádná magie – je to myšlený náboj, který by atom měl, kdyby všechny vazby byly stoprocentně iontové. Základní železné pravidlo: součet všech oxidačních čísel v neutrální sloučenině se VŽDY rovná 0! U oxidů má kyslík vždy -II, u hydroxidů má skupina (OH) vždy -I, vodík má v kyselinách vždy +I.',
    lifeExample: {
      title: 'Proč v lékárně dostaneš peroxid a ne oxid?',
      analogy: 'Oxidační číslo je jako jmenovka na dresu – podle čísla poznáš, jakou roli atom v molekule hraje.',
      inPractice: 'V oxidu vápenatém (pálené vápno CaO) má vápník Ca⁺ᴵᴵ a kyslík O⁻ᴵᴵ. V peroxidu vodíku H₂O₂ jsou však dva kyslíky spojené peroxidovým můstkem (-O-O-) a každý má výjimečně oxidační číslo -I. Proto peroxid tak divoce pění a dezinfikuje – touží se zbavit přebytečného kyslíku a stát se stabilní vodou.',
    },
    keyPoints: [
      '**8 základních koncovek**: -ný (+I), -natý (+II), -itý (+III), -ičitý (+IV), -ičný/-ečný (+V), -ový (+VI), -istý (+VII), -ičelý (+VIII).',
      '**Křížové pravidlo vzorců**: Oxidační číslo prvního prvku padá jako dolní index k druhému prvku (bez znaménka) a naopak. Pokud lze indexy krátit, zkrátíme je na nejmenší celá čísla!',
      '**Hydroxidy**: Obecný vzorec M(OH)ₙ, kde n odpovídá oxidačnímu číslu kationtu kovu (např. hydroxid hlinitý Al(OH)₃).',
      '**Kyslíkaté kyseliny**: Vzorec HₐXᵦO_c. Počet vodíků a kyslíků spočítáme tak, aby součet kladných nábojů (H⁺ᴵ + centrální atom) přesně vyrušil záporné náboje kyslíků (O⁻ᴵᴵ).',
      '**Soli**: Odvodíme odtržením H⁺ z kyseliny. Zbytek kyseliny má záporný náboj roven počtu odtržených vodíků (např. ze sírové H₂SO₄ vzniká síran SO₄²⁻).',
    ],
    tableData: {
      headers: ['Oxidační číslo', 'Přídavné jméno (kation)', 'Anion kyseliny / soli', 'Příklad oxidu', 'Příklad soli'],
      rows: [
        ['+I', '-ný', '-nan', 'Na₂O (sodný)', 'NaClO (chlornan sodný – Savo)'],
        ['+II', '-natý', '-natan', 'CaO (vápenatý)', 'CuSO₄ (síran měďnatý – skalice modrá)'],
        ['+III', '-itý', '-itan', 'Al₂O₃ (hlinitý)', 'FeCl₃ (chlorid železitý)'],
        ['+IV', '-ičitý', '-ičitan', 'CO₂ (uhličitý)', 'CaSO₃ (siřičitan vápenatý)'],
        ['+V', '-ičný / -ečný', '-ičnan / -ečnan', 'N₂O₅ (dusičný)', 'KNO₃ (dusičnan draselný – ledek)'],
        ['+VI', '-ový', '-an', 'SO₃ (sírový)', 'CaSO₄ (síran vápenatý – sádrovec)'],
        ['+VII', '-istý', '-istan', 'Mn₂O₇ (manganistý)', 'KMnO₄ (manganistan draselný – hypermangan)'],
        ['+VIII', '-ičelý', '-ičelan', 'OsO₄ (osmičelý)', 'XeO₄ (xenoničelý)'],
      ],
      caption: 'Přehled českého názvosloví: 8 oxidačních stupňů a jejich koncovky',
    },
    stepByStep: {
      title: 'Jak odvodit vzorec kyseliny dusičné krok za krokem:',
      steps: [
        {
          number: 1,
          label: 'Napiš kostru vzorce',
          detail: 'Všechny kyslíkaté kyseliny začínají vodíkem H, uprostřed je centrální atom N a končí kyslíkem O: H N O.',
        },
        {
          number: 2,
          label: 'Doplň známá oxidační čísla',
          detail: 'Vodík má H⁺ᴵ, kyslík O⁻ᴵᴵ. Z koncovky dusičná poznáme dusík N⁺ⱽ: H⁺ᴵ N⁺ⱽ O⁻ᴵᴵ.',
        },
        {
          number: 3,
          label: 'Sečti kladné náboje a dorovnej kyslíky',
          detail: 'Kladné náboje: 1 (z H) + 5 (z N) = +6. Každý kyslík má náboj -2. Kolik kyslíků potřebujeme, aby vyrovnaly +6? Přesně 6 / 2 = 3 kyslíky.',
          tip: 'Výsledný vzorec je tedy HNO₃.',
        },
      ],
    },
    examTrap: {
      heading: 'Pozor na koncovku solí u kyselin s koncovkou -ový!',
      warning: 'U oxidů a kyselin je koncovka pro +VI -ový (kyselina sírová, chromová). Ale u solí těchto kyselin je koncovka pouhé **-AN**, nikoliv „-ovan“! Tedy sírAN, chromAN, uhličitAN.',
      howToRemember: 'Pamatuj si klasiku: kyselina sírová dělá sírAN měďnatý (modrou skalici), ne sírovan.',
    },
    practiceQuestions: [
      {
        id: 'q-nazvoslovi-1',
        question: 'Jaký je správný vzorec dichromanu draselného?',
        options: ['KCrO₄', 'K₂CrO₄', 'K₂Cr₂O₇', 'KCr₂O₇'],
        correctIndex: 2,
        explanation: 'Kyselina dichromová je H₂Cr₂O₇ (2×1 + 2×6 = 14 kladných nábojů, 7×(-2) = -14). Odtržením dvou H⁺ vzniká anion Cr₂O₇²⁻, se dvěma draslíky K⁺ tvoří K₂Cr₂O₇.',
        difficulty: 'Maturita',
      },
      {
        id: 'q-nazvoslovi-2',
        question: 'Jaké oxidační číslo má fosfor v dihydrogenfosforečnanu vápenatém Ca(H₂PO₄)₂?',
        options: ['+III', '+IV', '+V', '+VI'],
        correctIndex: 2,
        explanation: 'Vycházíme z kyseliny trihydrogenfosforečné H₃PO₄, kde fosfor má koncovku -ečný, tedy +V. Odtržením jednoho H⁺ vzniká anion H₂PO₄⁻, kde fosforu stále zůstává oxidační číslo +V.',
        difficulty: 'Přijímačky LF/VŠCHT',
      },
    ],
  },

  // MODUL 2: Chemické výpočty a redoxní reakce
  {
    id: 'latkove-mnozstvi-a-koncentrace',
    moduleId: 'calculations-redox',
    title: 'Látkové množství a koncentrace bez memorování',
    tagline: 'Mol je jenom chemický tucet – jak spočítat cokoliv v roztoku',
    summary: 'Atomy jsou příliš titěrné, abychom je počítali po jednom. Proto si chemici vymysleli jednotku mol – balíček 6,022 × 10²³ částic. Všechny výpočty stojí na 3 základních vzorcích.',
    humanExplanation: 'Když jdeš do pekárny a řekneš si o tucet rohlíků, dostaneš 12 rohlíků. Když řekneš chemikovi o 1 mol atomů uhlíku, dostaneš 602 triliard atomů, které váží přesně 12 gramů! Molární hmotnost M z periodické tabulky ti říká, kolik gramů váží jeden takový balíček (mol). A koncentrace c = n / V ti jenom říká, kolik takových balíčků je rozpuštěno v 1 litru vody.',
    lifeExample: {
      title: 'Fyziologický roztok v nemocnici',
      analogy: 'Množství sirupu v limonádě – když dáš málo, necítíš nic, když moc, lepí pusa.',
      inPractice: 'Nemocniční infuze „fyziologický roztok“ je 0,9% vodný roztok NaCl. Proč zrovna 0,9 %? Protože má přesně stejný osmotický tlak jako krevní plazma (kolem 300 mOsm/l). Kdybys pacientovi napíchl čistou vodu, červené krvinky by nasály vodu a praskly (lýza)!',
    },
    keyPoints: [
      '**Látkové množství**: $n = \\frac{m}{M}$ [mol], kde $m$ je hmotnost látky v gramech a $M$ je molární hmotnost v g/mol.',
      '**Látková (molární) koncentrace**: $c = \\frac{n}{V} = \\frac{m}{M \\cdot V}$ [mol/dm³ = mol/l], kde $V$ je objem roztoku v litrech.',
      '**Hmotnostní zlomek**: $w = \\frac{m_A}{m_{celk}}$, vyjádřený v procentech $w\\% = w \\cdot 100\\%$.',
      '**Hmotnost celého roztoku**: $m_{celk} = m_{rozpustena\\_latka} + m_{rozpoutedlo} = V \\cdot \\rho$ (hustota).',
      '**Zlaté pravidlo**: Při ředění vodou se množství samotné rozpuštěné látky nemění: $n_1 = n_2$, tedy $c_1 \\cdot V_1 = c_2 \\cdot V_2$ a $m_1 \\cdot w_1 = m_2 \\cdot w_2$.',
    ],
    tableData: {
      headers: ['Veličina', 'Značka', 'Základní vzorec', 'Jednotka v praxi', 'Co to znamená selským rozumem'],
      rows: [
        ['Látkové množství', 'n', 'n = m / M', 'mol', 'Počet balíčků částic (1 mol = 6,022·10²³ částic)'],
        ['Molární hmotnost', 'M', 'vyčteme z tabulky', 'g/mol', 'Kolik gramů váží 1 mol dané látky'],
        ['Látková koncentrace', 'c', 'c = n / V', 'mol/l (M)', 'Kolik molů látky plave v 1 litru roztoku'],
        ['Hmotnostní zlomek', 'w', 'w = m_A / m_celk', 'bezrozměrné / %', 'Kolik procent z celkové váhy tvoří látka A'],
      ],
      caption: 'Základní přehled veličin pro chemické výpočty',
    },
    stepByStep: {
      title: 'Příklad: Kolik gramů NaOH potřebuješ na přípravu 500 ml roztoku o koncentraci c = 0,2 mol/l?',
      steps: [
        {
          number: 1,
          label: 'Zapiš si zadané hodnoty a převeď na základní jednotky',
          detail: 'V = 500 ml = 0,5 litru, c = 0,2 mol/l. Molární hmotnost NaOH z tabulky: M(Na) = 23, M(O) = 16, M(H) = 1 → M(NaOH) = 40 g/mol.',
        },
        {
          number: 2,
          label: 'Spočítej potřebné látkové množství n',
          detail: 'Ze vzorce c = n / V vyjádříme: n = c · V = 0,2 mol/l · 0,5 l = 0,1 mol NaOH.',
        },
        {
          number: 3,
          label: 'Převeď moly na gramy',
          detail: 'm = n · M = 0,1 mol · 40 g/mol = 4,0 gramu.',
          tip: 'Odpověď: K přípravě roztoku potřebujeme navážit přesně 4,0 g hydroxidu sodného a doplnit vodou do objemu 500 ml.',
        },
      ],
    },
    examTrap: {
      heading: 'Chyták: Objem v mililitrech vs. litrech a hustota roztoku!',
      warning: 'Nejčastější chyba u přijímaček na medicínu: dosadit do vzorce c = n / V objem v mililitrech místo v litrech! Druhý častý zásek: zapomenout, že 100 ml roztoku o hustotě ρ = 1,2 g/ml neváží 100 g, ale 120 g (m = V · ρ).',
      howToRemember: 'Vždycky si napiš jednotky vedle čísel. Když vidíš mol/l, objem MUSÍ být v litrech!',
    },
    practiceQuestions: [
      {
        id: 'q-calc-1',
        question: 'Máme 200 g 10% roztoku soli. Kolik gramů soli a kolik gramů vody tento roztok obsahuje?',
        options: ['10 g soli a 190 g vody', '20 g soli a 180 g vody', '20 g soli a 200 g vody', '10 g soli a 100 g vody'],
        correctIndex: 1,
        explanation: '10 % z 200 g je: m_soli = 0,10 · 200 g = 20 g soli. Zbytek do 200 g tvoří rozpouštědlo (voda): 200 g - 20 g = 180 g vody.',
        difficulty: 'SŠ základy',
      },
    ],
  },
  {
    id: 'krizove-pravidlo',
    moduleId: 'calculations-redox',
    title: 'Křížové pravidlo při míchání a ředění roztoků',
    tagline: 'Nejrychlejší metoda na směšovací úlohy bez složitých rovnic',
    summary: 'Křížové pravidlo je geniální grafická zkratka bilanční rovnice. Umožní ti během 30 sekund spočítat, v jakém hmotnostním poměru musíš smíchat dva roztoky, abys získal roztok o požadované koncentraci.',
    humanExplanation: 'Představ si velké písmeno X. Vlevo nahoře napíšeš koncentraci prvního roztoku, vlevo dole koncentraci druhého roztoku. Do středu kříže napíšeš koncentraci, kterou chceš vyrobit. Pak odečítáš po úhlopříčkách (vždy větší číslo mínus menší, záporná čísla neexistují!). Čísla, která vyjdou vpravo, představují hmotnostní díly jednotlivých roztoků.',
    lifeExample: {
      title: 'Ředění octa v kuchyni nebo kyseliny v laboratoři',
      analogy: 'Když mícháš horkou a studenou vodu ve vaně na ideální teplotu.',
      inPractice: 'Máš doma zavařovací 80% kyselinu octovou a potřebuješ 8% stolní ocet na okurky. Čistá voda má koncentraci 0 %. Křížové pravidlo: 80 vlevo nahoře, 0 vlevo dole, 8 uprostřed. Po úhlopříčce: 8 - 0 = 8 dílů 80% octa, 80 - 8 = 72 dílů vody. Poměr 8 : 72 zkrátíš na 1 : 9. Na 1 díl octa přidáš 9 dílů vody!',
    },
    keyPoints: [
      '**Koncentrace čisté vody (rozpouštědla)** je v křížovém pravidle vždy **0 %**.',
      '**Koncentrace čisté pevné látky** (např. přisypáváme čistý cukr či sůl) je vždy **100 %**.',
      '**Odečítání po úhlopříčce**: Vždy děláme $|w_1 - w_{cil}|$ a $|w_2 - w_{cil}|$. Výsledky vpravo jsou vždy kladné díly.',
      '**Výsledné číslo nahoře vpravo** patří roztoku zapsanému nahoře vlevo. Číslo dole vpravo patří roztoku dole vlevo.',
      '**Celkový počet dílů** se rovná součtu obou pravých čísel a odpovídá celkové hmotnosti výsledného roztoku.',
    ],
    tableData: {
      headers: ['Pozice v kříži', 'Zadání', 'Výpočet po diagonále', 'Význam výsledku'],
      rows: [
        ['Vlevo nahoře (A)', 'w₁ (výchozí roztok 1)', '|w₂ - w_cíl| (vpravo nahoře)', 'Hmotnostní díly roztoku 1'],
        ['Střed kříže (CÍL)', 'w_cíl (žádaná koncentrace)', 'Společný průsečík', 'Cílová koncentrace'],
        ['Vlevo dole (B)', 'w₂ (výchozí roztok 2 nebo voda)', '|w₁ - w_cíl| (vpravo dole)', 'Hmotnostní díly roztoku 2'],
      ],
      caption: 'Grafické schéma křížového pravidla',
    },
    stepByStep: {
      title: 'Modelový příklad: Připrav 500 g 20% roztoku ze 60% roztoku a čisté vody.',
      steps: [
        {
          number: 1,
          label: 'Sestav kříž',
          detail: 'Vlevo nahoře: 60 %. Vlevo dole: 0 % (voda). Uprostřed: 20 % (cíl).',
        },
        {
          number: 2,
          label: 'Odečti po úhlopříčkách',
          detail: 'Vpravo nahoře: |0 - 20| = 20 dílů 60% roztoku. Vpravo dole: |60 - 20| = 40 dílů vody.',
        },
        {
          number: 3,
          label: 'Zkrať poměr a spočítej celkový počet dílů',
          detail: 'Poměr je 20 : 40 = 1 : 2. Celkem je to 1 + 2 = 3 díly (nebo přímo 20 + 40 = 60 dílů).',
        },
        {
          number: 4,
          label: 'Přepočítej na zadanou hmotnost 500 g',
          detail: 'Hmotnost 60% roztoku: (20 / 60) · 500 g = 166,7 g. Hmotnost vody: (40 / 60) · 500 g = 333,3 g.',
          tip: 'Kontrola: 166,7 g + 333,3 g = 500 g. Perfektní!',
        },
      ],
    },
    examTrap: {
      heading: 'Chyták: Nezaměň díly nahoře a dole!',
      warning: 'Častá chyba: student odečte po úhlopříčce a číslo, které vznikne vpravo dole, omylem přiřadí hornímu roztoku. Pamatuj: co je v horním řádku, to patří hornímu roztoku!',
      howToRemember: 'Sleduj vodorovné řádky: Horní řádek = Roztok 1 a jeho díly. Spodní řádek = Roztok 2 a jeho díly.',
    },
    practiceQuestions: [
      {
        id: 'q-kriz-1',
        question: 'V jakém hmotnostním poměru musíme smíchat 40% roztok KOH a 10% roztok KOH, abychom získali 20% roztok?',
        options: ['1 : 2', '2 : 1', '1 : 1', '3 : 2'],
        correctIndex: 0,
        explanation: 'Křížové pravidlo: |10 - 20| = 10 dílů 40% roztoku. |40 - 20| = 20 dílů 10% roztoku. Poměr je 10 : 20 = 1 : 2 (na 1 díl 40% roztoku připadnou 2 díly 10% roztoku).',
        difficulty: 'SŠ základy',
      },
    ],
  },
  {
    id: 'redoxni-reakce-vycislovani',
    moduleId: 'calculations-redox',
    title: 'Vyčíslování redoxních reakcí krok za krokem',
    tagline: 'Elektrony se nemohou ztratit – metoda oxidačních čísel pro každou rovnici',
    summary: 'Redoxní reakce děsí spoustu studentů, ale je to jen jednoduchá účetní bilance: počet elektronů, které jeden atom odevzdá (oxidace), musí přesně odpovídat počtu elektronů, které druhý atom přijme (redukce).',
    humanExplanation: 'Představ si obchod: prodávající odevzdá zboží a kupující ho převezme. Nemůže se stát, že prodávající odešle 3 balíky a kupující převezme jen 2. Oxidace = odevzdání elektronů (oxidační číslo ROSTE). Redukce = příjem záporných elektronů (oxidační číslo KLESÁ). Když najdeš prvky, které mění oxidační číslo, prohodíš počty vyměněných elektronů křížem jako stechiometrické koeficienty!',
    lifeExample: {
      title: 'Proč rezaví auto a proč funguje baterka v mobilu?',
      analogy: 'Baterie je jen kontrolovaná redoxní reakce, kde nutíme elektrony běžet drátem přes displej telefonu.',
      inPractice: 'Rezivění železa je oxidace Fe⁰ na Fe⁺ᴵᴵᴵ vzdušným kyslíkem, který se redukuje z O₂⁰ na O⁻ᴵᴵ. V lithium-iontovém akumulátoru se při vybíjení oxiduje lithium na anodě a elektrony putují vnějším obvodem do procesoru tvého telefonu.',
    },
    keyPoints: [
      '**Oxidace**: atom odevzdává elektrony ($e^-$), oxidační číslo se zvyšuje (např. $Fe^{II} \\rightarrow Fe^{III} + 1e^-$).',
      '**Redukce**: atom přijímá elektrony ($e^-$), oxidační číslo klesá (např. $Mn^{VII} + 5e^- \\rightarrow Mn^{II}$).',
      '**Oxidovadlo**: látka, která sama sebe redukuje (bere si elektrony od ostatních, např. KMnO₄, HNO₃, O₂).',
      '**Redukovadlo**: látka, která sama sebe oxiduje (dává své elektrony ostatním, např. C, H₂, kovy jako Zn, Fe).',
      '**Křížové pravidlo pro koeficienty**: Počet elektronů z oxidace a redukce prohodíme před reagující látky, abychom vyrovnali elektronovou bilanci.',
    ],
    tableData: {
      headers: ['Pojem', 'Pohyb elektronů', 'Změna oxidačního čísla', 'Příklad poloreakce', 'Běžný zástupce'],
      rows: [
        ['Oxidace', 'Odevzdání e⁻', 'Roste (např. z 0 na +II)', 'Zn⁰ → Zn²⁺ + 2e⁻', 'Kovy, vodík, jodidy'],
        ['Redukce', 'Příjem e⁻', 'Klesá (např. z +VII na +II)', 'Mn⁺ⱽᴵᴵ + 5e⁻ → Mn²⁺', 'KMnO₄, H₂O₂, halogeny'],
        ['Oxidační činidlo', 'Bere e⁻ druhým', 'Samo se redukuje', 'HNO₃ (N⁺ⱽ → N⁺ᴵᴵ)', 'Kyselina dusičná, chlór'],
        ['Redukční činidlo', 'Dává e⁻ druhým', 'Samo se oxiduje', 'C⁰ → C⁺ᴵⱽ + 4e⁻', 'Koks ve vysoké peci'],
      ],
      caption: 'Základní redoxní pojmy a jejich význam',
    },
    stepByStep: {
      title: 'Vyčíslení reakce: Cu + HNO₃ → Cu(NO₃)₂ + NO + H₂O',
      steps: [
        {
          number: 1,
          label: 'Urči oxidační čísla prvků, které se mění',
          detail: 'Cu⁰ → Cu⁺ᴵᴵ (oxidace o 2 e⁻). V kyselině dusičné N⁺ⱽ → v oxidu dusnatém N⁺ᴵᴵ (redukce o 3 e⁻). Všimni si, že část dusíku v Cu(NO₃)₂ zůstává N⁺ⱽ jako dusičnanový anion!',
        },
        {
          number: 2,
          label: 'Zapiš elektronovou bilanci',
          detail: 'Cu⁰ - 2e⁻ → Cu⁺ᴵᴵ (výměna: 2). N⁺ⱽ + 3e⁻ → N⁺ᴵᴵ (výměna: 3).',
        },
        {
          number: 3,
          label: 'Prohoď čísla do kříže',
          detail: 'Před měď dáme koeficient 3, před dusík měnící oxidační číslo (NO) dáme koeficient 2: 3 Cu + ... HNO₃ → 3 Cu(NO₃)₂ + 2 NO + ... H₂O.',
        },
        {
          number: 4,
          label: 'Dopočítej ostatní atomy (dusík, vodík, kyslík)',
          detail: 'Dusík napravo: 3 × 2 (v dusičnanu) + 2 (v NO) = 8 dusíků. Proto nalevo musí být 8 HNO₃! Vodíky nalevo jsou 8, takže napravo vzniknou 4 H₂O.',
          tip: 'Výsledná rovnice: 3 Cu + 8 HNO₃ → 3 Cu(NO₃)₂ + 2 NO + 4 H₂O. Kontrola kyslíků: vlevo 8 × 3 = 24; vpravo 3 × 6 + 2 + 4 = 24. Sedí!',
        },
      ],
    },
    examTrap: {
      heading: 'Chyták na LF UK / VŠCHT: Prvek se rozdělí do dvou forem!',
      warning: 'V rovnici s kyselinou dusičnou student často napíše 2 HNO₃, protože redukce byla o 3 elektrony křížem k NO. Jenže kyselina dusičná má DVĚ role: oxidační činidlo (vznik NO) i kyselé prostředí pro tvorbu solí (vznik dusičnanu Cu(NO₃)₂)!',
      howToRemember: 'Vždy nejdřív vyčísli redukovaný produkt (2 NO) a sůl (3 Cu(NO₃)₂), a teprve podle pravé strany sečti celkový počet molekul kyseliny nalevo.',
    },
    practiceQuestions: [
      {
        id: 'q-redox-1',
        question: 'Kolik elektronů si vymění mangan a železo v reakci: KMnO₄ + FeSO₄ + H₂SO₄ → MnSO₄ + Fe₂(SO₄)₃ + K₂SO₄ + H₂O ?',
        options: ['Mn přijme 5 e⁻, Fe odevzdá 1 e⁻', 'Mn přijme 2 e⁻, Fe odevzdá 2 e⁻', 'Mn přijme 7 e⁻, Fe odevzdá 3 e⁻', 'Mn odevzdá 5 e⁻, Fe přijme 1 e⁻'],
        correctIndex: 0,
        explanation: 'V manganistanu má Mn⁺ⱽᴵᴵ a v MnSO₄ má Mn⁺ᴵᴵ, přijímá tedy 5 elektronů (redukce). V FeSO₄ má železo Fe⁺ᴵᴵ a oxiduje se na Fe⁺ᴵᴵᴵ (odevzdává 1 elektron).',
        difficulty: 'Přijímačky LF/VŠCHT',
      },
    ],
  },

  // MODUL 3: Organická chemie
  {
    id: 'uhlovodiky-a-hybridizace',
    moduleId: 'organic',
    title: 'Uhlovodíky a hybridizace uhlíku lidsky',
    tagline: 'Proč je uhlík králem chemie a jak se jeho orbitaly míchají do tvarů',
    summary: 'Uhlík tvoří miliony sloučenin díky své schopnosti vázat se sám se sebou do nekonečných řetězců a kruhů. V organických sloučeninách je uhlík VŽDY čtyřvazný. Podle toho, kolik násobných vazeb tvoří, zaujímá hybridizaci sp³, sp² nebo sp.',
    humanExplanation: 'Představ si, že uhlík má 4 nafukovací balónky (orbitaly). Když se spojí se 4 různými atomy (jen jednoduché vazby, alkany), balónky se roztáhnou co nejdál od sebe – vznikne čtyřstěn (tetraedr) s úhlem 109,5° (hybridizace sp³). Když vytvoří jednu dvojnou vazbu (alkeny), tři balónky leží v jedné rovině jako vrtule (120°, hybridizace sp²) a čtvrtý trčí nahoru a dolů a vytvoří boční vazbu pí (π). U trojné vazby (alkyny) leží vše v přímce (180°, hybridizace sp).',
    lifeExample: {
      title: 'Diamant, grafit a zrání banánů',
      analogy: 'Diamant je 3D prostorová síť sp³ (neporazitelná pevnost), tuha v tužce jsou kluzké 2D vrstvy sp².',
      inPractice: 'Ethen (ethylen) CH₂=CH₂ je rostlinný hormon. Když dáš do papírového sáčku zralé jablko s nezralým banánem, jablko uvolňuje plynný ethen a banán bleskově dozraje a zežloutne!',
    },
    keyPoints: [
      '**Uhlík v organice je vždy čtyřvazný** ($4$ kovalentní vazby).',
      '**Hybridizace sp³**: 4 jednoduché vazby sigma (σ), tetraedrický tvar, vazebný úhel $109,5^\circ$, typická pro alkany (methan, ethan).',
      '**Hybridizace sp²**: 1 dvojná vazba ($1\\sigma + 1\\pi$) a 2 jednoduché vazby, rovinný trojúhelník, úhel $120^\circ$, typická pro alkeny a aromatické jádro benzenu.',
      '**Hybridizace sp**: 1 trojná vazba ($1\\sigma + 2\\pi$) nebo dvě kumulované dvojné vazby, lineární tvar, úhel $180^\circ$, typická pro alkyny (ethyn/acetylen).',
      '**Aromatické uhlovodíky (areny)**: benzen C₆H₆ má delokalizovaný kruh 6 pí-elektronů nad a pod rovinou kruhu, což mu dává mimořádnou chemickou stabilitu (Hückelovo pravidlo $4n + 2$).',
    ],
    tableData: {
      headers: ['Třída uhlovodíků', 'Vazby', 'Hybridizace C', 'Prostorový tvar', 'Vazebný úhel', 'Příklad'],
      rows: [
        ['Alkany', 'Pouze jednoduché (σ)', 'sp³', 'Tetraedr (prostorový)', '109,5°', 'Methan CH₄, propan'],
        ['Alkeny', 'Jedna dvojná (1σ + 1π)', 'sp²', 'Rovinný trojúhelník', '120°', 'Ethen CH₂=CH₂'],
        ['Alkyny', 'Jedna trojná (1σ + 2π)', 'sp', 'Lineární (přímka)', '180°', 'Ethyn HC≡CH'],
        ['Areny', 'Delokalizovaný kruh π', 'sp²', 'Planární šestiúhelník', '120°', 'Benzen C₆H₆, toluen'],
      ],
      caption: 'Srovnání hybridních stavů uhlíku a geometrií uhlovodíků',
    },
    examTrap: {
      heading: 'Chyták: Dvojná vazba není 2× silnější než jednoduchá!',
      warning: 'Častý omyl studentů: myslet si, že rozbít dvojnou vazbu C=C je dvakrát těžší než jednoduchou C-C. Ve skutečnosti se skládá z pevné vazby sigma a slabé boční vazby pí. Vazba pí je velmi zranitelná a snadno praská při adičních reakcích!',
      howToRemember: 'Vazba sigma je pevný stisk rukou z očí do očí. Vazba pí je jen letmé mávnutí rukou nad hlavou – snadno se přeruší.',
    },
    practiceQuestions: [
      {
        id: 'q-org-1',
        question: 'V jakém hybridním stavu se nacházejí uhlíky číslo 2 a 3 v molekule buta-1,3-dienu?',
        options: ['Oba sp³', 'Oba sp²', 'C2 je sp² a C3 je sp³', 'Oba sp'],
        correctIndex: 1,
        explanation: 'V molekule CH₂=CH-CH=CH₂ se všechny čtyři atomy uhlíku účastní dvojných vazeb a jsou v konjugovaném systému. Všechny mají hybridizaci sp².',
        difficulty: 'Maturita',
      },
    ],
  },
  {
    id: 'reakcni-mechanismy-organika',
    moduleId: 'organic',
    title: 'Reakční mechanismy lidsky: Markovnikovo a Zajcevovo pravidlo',
    tagline: 'Bohatý bohatne a chudému se ještě ubere – pravidla, podle kterých reagují molekuly',
    summary: 'Organické reakce nejsou náhodné srážky. Dělí se na 3 královské typy: substituce (výměna), adice (přidání na násobnou vazbu) a eliminace (odštěpení za vzniku násobné vazby). Dvě slavná pravidla ti řeknou, kam přesně se atomy navážou.',
    humanExplanation: 'Představ si reakce jako společenské situace:\n- **Substituce**: Výměna tanečního partnera (jeden atom odejde, druhý nastoupí).\n- **Adice**: Dvojná vazba praskne jako rozpažené ruce a chytne dva nové hosty.\n- **Markovnikovo pravidlo (Adice)**: „Bohatý bohatne.“ Když na nesymetrický alken (např. propen) adujeme halogenvodík (HCl), vodík se VŽDY naváže na ten uhlík dvojné vazby, který už má u sebe VÍCE vodíků! Chlór se naváže na ten chudší.\n- **Zajcevovo pravidlo (Eliminace)**: „Chudému se ještě ubere.“ Při odštěpování vody nebo halogenvodíku se vodík odštěpí z toho sousedního uhlíku, který má MÉNĚ vodíků.',
    lifeExample: {
      title: 'Výroba margarínů a rozpouštědel',
      analogy: 'Katalytická hydrogenace rostlinného oleje na ztužený tuk.',
      inPractice: 'Rostlinné oleje obsahují tekuté alkenové řetězce s dvojnými vazbami. Když k nim v továrně za přítomnosti niklu přidají vodík H₂ (elektrofilní adice), dvojné vazby zaniknou, řetězce se narovnají a z tekutého oleje vznikne tuhý tuk (margarín na pečení).',
    },
    keyPoints: [
      '**Substituce ($S$)**: Jeden atom nebo skupina je nahrazena jinou. Radikálová ($S_R$ – chlorace methanu na světle), elektrofilní ($S_E$ – nitrace benzenu), nukleofilní ($S_N$ – hydrolýza halogenderivátů).',
      '**Adice ($A$)**: Dochází k zániku násobné vazby (π vazba se otevře a vzniknou dvě nové pevné σ vazby). Typická pro alkeny a alkyny.',
      '**Markovnikovo pravidlo**: Při elektrofilní adici nesouměrného činidla (H-X, H-OH) na nesouměrný alken se vodík ($H^+$) váže na uhlík s větším počtem vodíkových atomů (vzniká stabilnější karbokation!).',
      '**Eliminace ($E$)**: Z molekuly se odštěpí malá stabilní molekula (H₂O, HCl, HBr) a vzniká násobná vazba.',
      '**Zajcevovo pravidlo**: Při eliminaci odchází vodík přednostně z uhlíku s menším počtem vodíků (vzniká termodynamicky stálejší, více substituovaný alken).',
    ],
    tableData: {
      headers: ['Typ reakce', 'Zkratka', 'Co se děje s vazbami', 'Typické činidlo', 'Slavné pravidlo'],
      rows: [
        ['Radikálová substituce', 'S_R', 'Jednoduchá vazba zůstává, výměna atomu', 'UV záření, radikály Cl•', 'Probíhá řetězově (iniciace, propagace, terminace)'],
        ['Elektrofilní adice', 'A_E', 'Dvojná vazba zaniká (π → 2σ)', 'HBr, HCl, H₂O/H⁺', 'Markovnikovo pravidlo („bohatý bohatne“)'],
        ['Eliminace', 'E', 'Vzniká nová dvojná vazba', 'Koncentrovaná H₂SO₄ (odvodnění), silná zásada', 'Zajcevovo pravidlo („chudému se ubere“)'],
        ['Elektrofilní aromatická substituce', 'S_E', 'Aromatické jádro zůstává zachováno', 'HNO₃/H₂SO₄ (nitrace), Br₂/FeBr₃', 'Substituenty I. a II. třídy řídí polohu o/p vs. m'],
      ],
      caption: 'Přehled hlavních reakčních mechanismů v organické chemii',
    },
    stepByStep: {
      title: 'Příklad Markovnikova pravidla: Propen + Bromovodík (CH₃-CH=CH₂ + HBr)',
      steps: [
        {
          number: 1,
          label: 'Najdi dvojnou vazbu a spočítej vodíky na uhlících',
          detail: 'Uhlík C1 má vzorec =CH₂ (má 2 vodíky). Uhlík C2 má vzorec -CH= (má jen 1 vodík).',
        },
        {
          number: 2,
          label: 'Aplikuj pravidlo „bohatý bohatne“',
          detail: 'Kladný proton H⁺ z HBr zamíří k uhlíku C1, protože ten už má 2 vodíky (je bohatší). Vznikne stabilní sekundární karbokation CH₃-CH⁺-CH₃.',
        },
        {
          number: 3,
          label: 'Navázání bromidového aniontu Br⁻',
          detail: 'Záporný Br⁻ se naváže na kladný středový uhlík C2. Výsledkem je 2-brompropan (nikoliv 1-brompropan!).',
          tip: 'Hlavní produkt: CH₃-CH(Br)-CH₃ (2-brompropan).',
        },
      ],
    },
    examTrap: {
      heading: 'Pozor na peroxidy: Anti-Markovnikovská adice!',
      warning: 'Na lékařských fakultách a VŠCHT je oblíbený chyták: adice HBr za přítomnosti organických peroxidů (Kharaschův efekt). V přítomnosti peroxidů se mechanismus změní z iontového na radikálový a produkt je opačný – vznikne 1-brompropan!',
      howToRemember: 'Když vidíš v zadání jen čistý HBr → platí Markovnikov. Když vidíš u HBr slovo PEROXID (R-O-O-R) → otoč pravidlo naruby.',
    },
    practiceQuestions: [
      {
        id: 'q-mech-1',
        question: 'Jaký bude hlavní produkt adice vody na 2-methylbut-2-en v kyselém prostředí?',
        options: ['2-methylbutan-2-ol', '2-methylbutan-3-ol', '3-methylbutan-1-ol', 'Penta-1,3-dien'],
        correctIndex: 0,
        explanation: 'Dvojná vazba je mezi C2 a C3: C2 nemá žádný vodík (má dvě methylové skupiny), C3 má 1 vodík. Proton H⁺ jde na C3 (bohatší na vodík) a -OH skupina na C2 (vzniká terciární alkohol 2-methylbutan-2-ol, který má nejstabilnější karbokation).',
        difficulty: 'Přijímačky LF/VŠCHT',
      },
    ],
  },

  // MODUL 4: Biochemie
  {
    id: 'sacharidy-a-lipidy',
    moduleId: 'biochemistry',
    title: 'Sacharidy a lipidy: Rychlé palivo a ochranný štít těla',
    tagline: 'Od lžičky cukru po buněčné membrány a zmýdelnění tuků',
    summary: 'Sacharidy jsou primární zdroj energie pro mozek a svaly, zatímco lipidy slouží jako dlouhodobá energetická spíž a tvoří nepropustné stěny všech buněk. Zjisti, jak se liší redukující cukry a proč mýdlo myje.',
    humanExplanation: 'Když sníš jablko, tělo dostane jednoduché cukry – glukózu (aldohexóza) a fruktózu (ketohexóza). Glukóza je univerzální oběživo těla (krevní cukr). V těle se cyklizuje na poloacetálové kruhy (Fischerovy vzorce se promění na Haworthovy). Lipidy jsou estery glycerolu a vyšších mastných kyselin. Když tuk povaříš s louhem NaOH, rozbiješ esterovou vazbu – vznikne glycerol a sodné soli mastných kyselin, což není nic jiného než obyčejné tuhé mýdlo!',
    lifeExample: {
      title: 'Jak funguje mýdlo proti mastnotě a virům?',
      analogy: 'Mýdlová molekula je jako zápalka: hlavička miluje vodu, dřívko miluje mastnotu.',
      inPractice: 'Molekula mýdla je amfifilní. Má hydrofilní polární hlavičku (-COO⁻Na⁺) a dlouhý nepolární uhlíkatý ocas. Ocas se zaryje do mastného fleku nebo tukového obalu koronaviru, hlavička kouká do vody. Vytvoří se kulovité micely, které mastnotu obalí a voda z kohoutku ji bez námahy spláchne do odpadu.',
    },
    keyPoints: [
      '**D- a L-řada**: Určuje se podle polohy -OH skupiny na nejdále vzdáleném chirálním uhlíku ve Fischerově projekci (vpravo = D, vlevo = L). V přírodě převažují D-cukry.',
      '**Redukující cukry**: Mají volný poloacetálový hydroxyl a redukují Fehlingovo činidlo (červený oxid měďný Cu₂O) nebo Tollensovo činidlo (stříbrné zrcátko). Patří sem všechny monosacharidy, maltóza a laktóza. Sacharóza je NEREDUKUJÍCÍ!',
      '**Disacharidy**: Sacharóza = glukóza + fruktóza (vazba α,β-1,2); Maltóza = glukóza + glukóza (α-1,4); Laktóza = galaktóza + glukóza (β-1,4).',
      '**Polysacharidy**: Škrob (rostlinná rezerva, směs amylózy a amylopektinu), Glykogen (živočišný škrob v játrech a svalech), Celulóza (stavební materiál stěn rostlin, vazby β-1,4, člověk ji neumí trávit).',
      '**Fosfolipidy**: Základ buněčných biomembrán – tvoří samovolně uspořádanou dvojvrstvu s hydrofobním jádrem uprostřed.',
    ],
    tableData: {
      headers: ['Cukr / Lipid', 'Kategorie', 'Složení / Podjednotky', 'Redukční vlastnosti', 'Význam v těle a životě'],
      rows: [
        ['D-Glukóza (hroznový cukr)', 'Monosacharid (aldohexóza)', 'C₆H₁₂O₆', 'Redukující (Fehling +)', 'Základní palivo pro mozek a červené krvinky'],
        ['D-Fruktóza (ovocný cukr)', 'Monosacharid (ketohexóza)', 'C₆H₁₂O₆', 'Redukující (izomerace)', 'Nejsladší cukr, v ovoci a medu'],
        ['Sacharóza (řepný cukr)', 'Disacharid', 'Glukóza + Fruktóza', 'NEREDUKUJÍCÍ (Fehling -)', 'Běžný kuchyňský cukr, nemá volný poloacetál'],
        ['Škrob', 'Polysacharid', 'Tisíce molekul α-D-glukózy', 'Neredukující', 'Hlavní sacharid v bramborách, mouce, rýži'],
        ['Fosfolipid (lecitin)', 'Složený lipid', 'Glycerol + 2 MK + fosfát + cholin', 'Amfifilní molekula', 'Tvoří buněčnou membránu, emulgátor v čokoládě'],
      ],
      caption: 'Přehled klíčových sacharidů a lipidů',
    },
    examTrap: {
      heading: 'Oblíbený maturitní chyták: Proč sacharóza neredukuje?',
      warning: 'U sacharózy se glykosidická vazba vytvořila spojením poloacetálových hydroxylů OBOU monosacharidů (glukózy i fruktózy). Ani jeden kruh se proto nemůže v roztoku otevřít na volnou aldehydickou skupinu. Proto sacharóza s Fehlingovým roztokem NEREAGUJE!',
      howToRemember: 'Sacharóza si „zamkla obě ruce“. Až když ji povaříš s kapkou kyseliny (hydrolýza), rozpadne se na invertní cukr (glukózu a fruktózu) a zkouška bude pozitivní.',
    },
    practiceQuestions: [
      {
        id: 'q-bio-1',
        question: 'Který z následujících sacharidů NEDÁVÁ pozitivní výsledek s Fehlingovým činidlem (červený zákal Cu₂O)?',
        options: ['Glukóza', 'Maltóza', 'Laktóza', 'Sacharóza'],
        correctIndex: 3,
        explanation: 'Sacharóza je neredukující disacharid, protože glykosidická vazba spojuje poloacetálové hydroxyly obou podjednotek (α-D-glukopyranosyl-(1→2)-β-D-fruktofuranosid).',
        difficulty: 'Maturita',
      },
    ],
  },
  {
    id: 'bilkoviny-a-metabolismus',
    moduleId: 'biochemistry',
    title: 'Bílkoviny a buněčný metabolismus: Továrna na ATP',
    tagline: 'Od aminokyselin po Krebsův cyklus a dýchací řetězec lidsky',
    summary: 'Bílkoviny dělají v těle veškerou práci – staví svaly, fungují jako enzymy, protilátky i hormony. A metabolismus je geniální spalovací motor, který z potravy vyrobí univerzální energetické platidlo: molekulu ATP.',
    humanExplanation: 'Bílkovina je jako dlouhý náhrdelník z 20 různých korálků (proteinogenní aminokyseliny spojené peptidovou vazbou -CO-NH-). Podle toho, jak se náhrdelník složí do klubíčka, získá svůj tvar a funkci. Když rozklepneš vajíčko na horkou pánev, bílek zprůhlední a ztuhne – došlo k denaturaci: vysoká teplota zpřetrhala vodíkové můstky a rozbila 3D tvar, ale peptidové vazby zůstaly netknuté!\nA jak tělo vyrábí energii? 1) V cytoplazmě proběhne glykolýza (glukóza se rozsekne na dva pyruváty, zisk 2 ATP). 2) V mitochondrii se pyruvát přemění na acetyl-CoA. 3) Acetyl-CoA vstoupí do Krebsova cyklu, kde se atomy uhlíku vydýchají jako CO₂ a vodíky s elektrony nasednou na přenašeče NADH a FADH₂. 4) Tyto přenašeče předají elektrony dýchacímu řetězci ve vnitřní membráně mitochondrie – funguje jako vodní elektrárna poháněná protonovým gradientem a vytočí enzym ATP-syntázu k výrobě dalších více než 30 molekul ATP!',
    lifeExample: {
      title: 'Proč při sprintu pálí svaly?',
      analogy: 'Když v kotli dojde vzduch a uhlí začne jenom doutnat.',
      inPractice: 'Při maximálním sprintu nestačí krev přivádět kyslík do svalů. Mitochondrie nemohou bez kyslíku běžet, a tak buňka přepne na nouzový režim – anaerobní glykolýzu. Pyruvát se zredukuje na kyselinu mléčnou (laktát). Svaly překyselí a začnou pálit, ale umožní ti ještě pár vteřin běžet na plný plyn!',
    },
    keyPoints: [
      '**Peptidová vazba**: Vzniká kondenzací aminoskupiny (-NH₂) jedné aminokyseliny a karboxylu (-COOH) druhé za odštěpení molekuly vody: $-CO-NH-$. Má částečný charakter dvojné vazby (je rigidní a planární).',
      '**4 úrovně struktury**: Primární (pořadí AK), sekundární (α-šroubovice, β-skládaný list tvořené vodíkovými můstky), terciární (3D prostorové uspořádání držené disulfidovými můstky, iontovými a hydrofobními vazbami), kvarterní (spojení více podjednotek, např. hemoglobin má 4).',
      '**Denaturace**: Ztráta nativní prostorové struktury vlivem tepla, pH nebo těžkých kovů. Bílkovina ztrácí biologickou aktivitu, primární struktura zůstává neporušená.',
      '**Glykolýza**: Probíhá v cytosolu bez přístupu kyslíku (anaerobně). Z 1 glukózy vzniknou 2 molekuly pyruvátu + čistý zisk 2 ATP + 2 NADH.',
      '**Krebsův cyklus a Dýchací řetězec**: Probíhají v mitochondriích (aerobně). Kyslík O₂ je konečným akceptorem elektronů a slučuje se na vodu H₂O. Celkový zisk aerobní respirace je ~30–32 ATP na 1 glukózu.',
    ],
    tableData: {
      headers: ['Fáze metabolismu', 'Kde probíhá', 'Potřeba kyslíku', 'Výchozí látka', 'Konečné produkty a zisk ATP'],
      rows: [
        ['Glykolýza', 'Cytoplazma (cytosol)', 'NE (anaerobní)', '1 molekula Glukózy', '2 Pyruváty, 2 NADH, čistý zisk 2 ATP'],
        ['Oxidační dekarboxylace', 'Matrix mitochondrie', 'ANO', '2 Pyruváty', '2 Acetyl-CoA, 2 CO₂, 2 NADH'],
        ['Krebsův citrátový cyklus', 'Matrix mitochondrie', 'ANO', '2 Acetyl-CoA', '4 CO₂, 6 NADH, 2 FADH₂, 2 GTP (= 2 ATP)'],
        ['Dýchací řetězec + ATP syntéza', 'Vnitřní membrána mitochondrie', 'ANO (O₂ je konečný příjemce)', 'NADH, FADH₂, O₂', 'H₂O a syntéza ~26-28 ATP pomocí ATP-syntázy'],
      ],
      caption: 'Kompletní přehled aerobního katabolismu glukózy na energii',
    },
    examTrap: {
      heading: 'Chyták na medicínu: Kdo je konečným příjemcem elektronů v dýchacím řetězci?',
      warning: 'Konečným akceptorem elektronů v dýchacím řetězci je elementární KYSLÍK O₂! Kyslík přijme 4 elektrony a 4 protony H⁺ a vzniknou dvě molekuly neškodné vody H₂O. Kyanid (cyankáli) a oxid uhelnatý zabíjejí právě tím, že zablokují cytochrom c oxidázu a zastaví tok elektronů.',
      howToRemember: 'Dýcháme proto, aby měl dýchací řetězec kam odhazovat použité elektrony do vody!',
    },
    practiceQuestions: [
      {
        id: 'q-metab-1',
        question: 'Která úroveň struktury bílkoviny zůstává zachována i po tepelné denaturaci?',
        options: ['Sekundární struktura', 'Terciární struktura', 'Primární struktura', 'Kvarterní struktura'],
        correctIndex: 2,
        explanation: 'Denaturace narušuje slabší nekovalentní interakce a disulfidické můstky (sekundární, terciární a kvarterní strukturu), ale pevné kovalentní peptidové vazby v primární sekvenci aminokyselin zůstávají neporušeny.',
        difficulty: 'Maturita',
      },
      {
        id: 'q-metab-2',
        question: 'Kolik molekul ATP celkem získá buňka čistým ziskem z jedné molekuly glukózy pouze v procesu anaerobní glykolýzy bez přístupu kyslíku?',
        options: ['32 ATP', '30 ATP', '2 ATP', '4 ATP'],
        correctIndex: 2,
        explanation: 'Při anaerobní glykolýze se nejprve 2 molekuly ATP spotřebují na fosforylaci a následně 4 ATP vzniknou substrátovou fosforylací. Čistý energetický zisk anaerobní fáze jsou tedy přesně 2 ATP.',
        difficulty: 'Přijímačky LF/VŠCHT',
      },
    ],
  },
];

export const REDOX_EXAMPLES: RedoxReactionExample[] = [
  {
    id: 'redox-1',
    title: 'Oxidace sulfidu měďného kyselinou dusičnou',
    unbalanced: 'CuS + HNO₃ → Cu(NO₃)₂ + S + NO + H₂O',
    balanced: '3 CuS + 8 HNO₃ → 3 Cu(NO₃)₂ + 3 S + 2 NO + 4 H₂O',
    elementsChanged: [
      { element: 'S', from: -2, to: 0, electrons: 2, type: 'Oxidace' },
      { element: 'N', from: 5, to: 2, electrons: 3, type: 'Redukce' },
    ],
    steps: [
      'Síra v CuS má oxidační číslo -II a oxiduje se na elementární síru S⁰ (odevzdá 2 e⁻).',
      'Dusík v HNO₃ má +V a redukuje se v oxidu dusnatém NO na +II (přijme 3 e⁻).',
      'Křížové pravidlo: před síru dáme 3, před dusík měnící oxidační číslo (NO) dáme 2.',
      'Dopočítáme zbytek: CuS má 3 mědi → 3 Cu(NO₃)₂. Dusíky napravo: 3 × 2 (v dusičnanu) + 2 (v NO) = 8 dusíků → 8 HNO₃.',
      'Vodíky: vlevo 8 H → vpravo 4 H₂O. Kyslíky: 8 × 3 = 24 vlevo, 3 × 6 + 2 + 4 = 24 vpravo. Rovnice je vyčíslená!',
    ],
    note: 'Klasický chyták z přijímaček na 1. lékařskou fakultu UK. Pozor na to, že část molekul HNO₃ se neredukuje, ale slouží ke vzniku dusičnanových solí.',
  },
  {
    id: 'redox-2',
    title: 'Reakce manganistanu draselného s peroxidem vodíku v kyselém prostředí',
    unbalanced: 'KMnO₄ + H₂O₂ + H₂SO₄ → MnSO₄ + O₂ + K₂SO₄ + H₂O',
    balanced: '2 KMnO₄ + 5 H₂O₂ + 3 H₂SO₄ → 2 MnSO₄ + 5 O₂ + K₂SO₄ + 8 H₂O',
    elementsChanged: [
      { element: 'Mn', from: 7, to: 2, electrons: 5, type: 'Redukce' },
      { element: 'O (v H₂O₂)', from: -1, to: 0, electrons: 2, type: 'Oxidace' },
    ],
    steps: [
      'Mangan se redukuje: Mn⁺ⱽᴵᴵ + 5e⁻ → Mn⁺ᴵᴵ (výměna: 5).',
      'Kyslík v peroxidu se oxiduje: 2 O⁻ᴵ - 2e⁻ → O₂⁰ (výměna: 2).',
      'Křížově prohodíme: koeficient 2 před sloučeniny s Mn, koeficient 5 před peroxid a kyslík O₂.',
      'Dorovnáme draslíky (2 K → 1 K₂SO₄) a sírany (2 MnSO₄ + 1 K₂SO₄ = 3 sírany → 3 H₂SO₄).',
      'Dopočítáme vodíky na vodu: 5 × 2 (z H₂O₂) + 3 × 2 (z H₂SO₄) = 16 H → 8 H₂O.',
    ],
    note: 'Peroxid vodíku se zde chová jako redukční činidlo, protože manganistan je brutálně silné oxidační činidlo a donutí peroxid odevzdat elektrony a uvolnit plynný kyslík.',
  },
  {
    id: 'redox-3',
    title: 'Rozpouštění zinku v kyselině chlorovodíkové',
    unbalanced: 'Zn + HCl → ZnCl₂ + H₂',
    balanced: 'Zn + 2 HCl → ZnCl₂ + H₂',
    elementsChanged: [
      { element: 'Zn', from: 0, to: 2, electrons: 2, type: 'Oxidace' },
      { element: 'H', from: 1, to: 0, electrons: 2, type: 'Redukce' },
    ],
    steps: [
      'Zinek se oxiduje: Zn⁰ - 2e⁻ → Zn⁺ᴵᴵ.',
      'Dva vodíkové kationty přijmou elektrony: 2 H⁺ + 2e⁻ → H₂⁰.',
      'Poměr elektronů je 2 : 2 = 1 : 1.',
      'Stačí doplnit koeficient 2 před HCl a reakce je hotová.',
    ],
    note: 'Základní laboratorní reakce pro přípravu vodíku v Kippově přístroji.',
  },
];
