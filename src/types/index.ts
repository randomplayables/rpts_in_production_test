export interface GameSessionResponse {
  sessionId: string;
}

export interface RoundData {
  guess: number;
  feedback: string;
}

export interface SaveGameDataPayload {
  sessionId: string;
  roundNumber: number;
  roundData: RoundData;
}

export interface SaveGameDataResponse {
  [key: string]: any;
}

export interface UseGameReturn {
  guesses: number[];
  feedback: string;
  isCorrect: boolean;
  submitGuess(guess: number): void;
  resetGame(): void;
}