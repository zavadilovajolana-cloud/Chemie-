export type ModuleId = 'general-inorganic' | 'calculations-redox' | 'organic' | 'biochemistry';

export type TargetAudience = 'ss-basic' | 'maturita' | 'premed-vscht';

export interface ModuleInfo {
  id: ModuleId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  color: {
    bg: string;
    text: string;
    border: string;
    light: string;
    accent: string;
  };
}

export interface LifeExample {
  title: string;
  analogy: string;
  inPractice: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'SŠ základy' | 'Maturita' | 'Přijímačky LF/VŠCHT';
}

export interface Topic {
  id: string;
  moduleId: ModuleId;
  title: string;
  tagline: string;
  summary: string;
  humanExplanation: string;
  lifeExample: LifeExample;
  keyPoints: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
    caption?: string;
  };
  stepByStep?: {
    title: string;
    steps: {
      number: number;
      label: string;
      detail: string;
      tip?: string;
    }[];
  };
  examTrap: {
    heading: string;
    warning: string;
    howToRemember: string;
  };
  practiceQuestions: QuizQuestion[];
}

export interface CrossRuleProblem {
  c1: number; // e.g. 60%
  c2: number; // e.g. 0% (voda)
  cTarget: number; // e.g. 15%
  wantedAmountGrams?: number;
  description: string;
}

export interface RedoxReactionExample {
  id: string;
  title: string;
  unbalanced: string;
  balanced: string;
  elementsChanged: {
    element: string;
    from: number;
    to: number;
    electrons: number;
    type: 'Oxidace' | 'Redukce';
  }[];
  steps: string[];
  note: string;
}
