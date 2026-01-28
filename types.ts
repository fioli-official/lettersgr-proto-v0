
export interface GreekLetter {
  id: string;
  name: string;
  upper: string;
  lower: string;
  soundDescription: string;
  exampleWord: string;
  audioUrl: string;
}

export interface LevelGroup {
  id: string;
  title: string;
  description: string;
  letters: string[]; // IDs of letters
}

export enum Screen {
  Welcome = 'WELCOME',
  Levels = 'LEVELS',
  Intro = 'INTRO',
  Learning = 'LEARNING',
  Test = 'TEST',
  Exercises = 'EXERCISES',
  About = 'ABOUT'
}

export interface AppState {
  currentScreen: Screen;
  selectedLevelId?: string;
  currentLetterIndex?: number;
}
