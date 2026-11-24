import { ref, get, set, update, remove, push, runTransaction } from "firebase/database";
import { database, assertFirebaseConfigured } from "./client";
import type { GameImage, Team } from "@/types/game";
import { INITIAL_TEAMS } from "@/lib/game/constants";

function db() {
  assertFirebaseConfigured();
  return database!;
}

export async function ensureInitialTeams(): Promise<void> {
  const root = ref(db(), "game/teams");
  const snapshot = await get(root);
  if (snapshot.exists()) return;
  const now = Date.now();
  const initial: Record<string, Team> = {};
  INITIAL_TEAMS.forEach((name) => {
    const id = push(root).key!;
    initial[id] = { id, name, status: "active", createdAt: now };
  });
  await set(root, initial);
}

export async function listTeams(): Promise<Team[]> {
  const snapshot = await get(ref(db(), "game/teams"));
  if (!snapshot.exists()) return [];
  return Object.values(snapshot.val() as Record<string, Team>)
    .sort((a, b) => a.createdAt - b.createdAt);
}

export async function saveTeam(team: Team): Promise<void> {
  await set(ref(db(), `game/teams/${team.id}`), team);
}

export async function deleteTeam(id: string): Promise<void> {
  await remove(ref(db(), `game/teams/${id}`));
}

export async function listImages(): Promise<GameImage[]> {
  const snapshot = await get(ref(db(), "game/images"));
  if (!snapshot.exists()) return [];
  return Object.values(snapshot.val() as Record<string, GameImage>)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function saveImage(image: GameImage): Promise<void> {
  await set(ref(db(), `game/images/${image.id}`), image);
}

export async function deleteImage(id: string): Promise<void> {
  await remove(ref(db(), `game/images/${id}`));
}

export async function newId(path: "teams" | "images"): Promise<string> {
  const key = push(ref(db(), `game/${path}`)).key;
  if (!key) throw new Error("No fue posible generar un identificador.");
  return key;
}

export async function initializeSettings(): Promise<void> {
  await runTransaction(ref(db(), "game/settings"), (current) => {
    if (current) return current;
    return { durationSeconds: 120, createdAt: Date.now() };
  });
}

export async function updateTeamStatus(id: string, active: boolean): Promise<void> {
  await update(ref(db(), `game/teams/${id}`), { status: active ? "active" : "inactive" });
}
