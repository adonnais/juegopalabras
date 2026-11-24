export type TeamStatus = "active" | "inactive";
export type SessionStatus = "pending" | "running" | "finished";

export interface Team {
  id: string;
  name: string;
  status: TeamStatus;
  createdAt: number;
}

export interface GameImage {
  id: string;
  word: string;
  dropboxUrl: string;
  imageUrl: string;
  active: boolean;
  createdAt: number;
}

export interface GameSession {
  id: string;
  competitionId: string;
  teamId: string;
  status: SessionStatus;
  durationSeconds: 120;
  startedAt: number | null;
  endsAt: number | null;
  finishedAt: number | null;
  correct: number;
  incorrect: number;
  currentImageId: string | null;
  usedImageIds: string[];
}
