 "use client";

import { useEffect, useState } from "react";
import { Plus, Save, Trash2, RefreshCw } from "lucide-react";
import type { Team } from "@/types/game";
import { deleteTeam, ensureInitialTeams, listTeams, newId, saveTeam, updateTeamStatus } from "@/lib/firebase/database";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function refresh() { setTeams(await listTeams()); }
  useEffect(() => { ensureInitialTeams().then(refresh).catch(e => setError(e.message)); }, []);

  async function addTeam(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const id = await newId("teams");
      await saveTeam({ id, name: name.trim(), status: "active", createdAt: Date.now() });
      setName(""); await refresh(); setNotice("Equipo creado correctamente.");
    } catch (e) { setError(e instanceof Error ? e.message : "No se pudo crear el equipo."); }
    finally { setBusy(false); }
  }

  async function editTeam(team: Team) {
    const next = window.prompt("Nuevo nombre del equipo:", team.name);
    if (!next?.trim()) return;
    try { await saveTeam({ ...team, name: next.trim() }); await refresh(); setNotice("Nombre actualizado."); }
    catch (e) { setError(e instanceof Error ? e.message : "No se pudo actualizar."); }
  }

  async function toggle(team: Team) {
    try { await updateTeamStatus(team.id, team.status !== "active"); await refresh(); }
    catch (e) { setError(e instanceof Error ? e.message : "No se pudo cambiar el estado."); }
  }

  async function remove(team: Team) {
    if (!window.confirm(`¿Eliminar el equipo "${team.name}"?`)) return;
    try { await deleteTeam(team.id); await refresh(); setNotice("Equipo eliminado."); }
    catch (e) { setError(e instanceof Error ? e.message : "No se pudo eliminar."); }
  }

  return <main className="mx-auto max-w-5xl px-5 py-10">
    <h1 className="text-3xl font-black">Administración de equipos</h1>
    <p className="mt-2 text-violet-100/60">Crea, renombra, activa, desactiva o elimina equipos. No se almacenan datos de participantes.</p>
    <form onSubmit={addTeam} className="mt-7 flex flex-col gap-3 rounded-2xl border border-violet-400/20 bg-violet-950/30 p-5 sm:flex-row">
      <input value={name} onChange={e => setName(e.target.value)} maxLength={60} placeholder="Nombre del nuevo equipo" className="min-w-0 flex-1 rounded-xl border border-violet-300/20 bg-black/30 px-4 py-3 outline-none focus:border-violet-400" />
      <button disabled={busy || !name.trim()} className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold disabled:opacity-50"><Plus size={18}/>Agregar equipo</button>
    </form>
    {error && <p role="alert" className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
    {notice && <p className="mt-4 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-300">{notice}</p>}
    <div className="mt-6 flex items-center justify-between"><h2 className="text-xl font-bold">Equipos ({teams.length})</h2><button onClick={() => refresh().catch(e => setError(e.message))} className="flex items-center gap-2 text-sm text-violet-300"><RefreshCw size={15}/>Actualizar</button></div>
    <div className="mt-3 space-y-3">
      {teams.map(team => <article key={team.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-violet-400/15 bg-white/[0.03] p-4">
        <div><p className="font-semibold">{team.name}</p><p className={`mt-1 text-xs ${team.status === "active" ? "text-emerald-300" : "text-zinc-400"}`}>{team.status === "active" ? "Activo" : "Inactivo"}</p></div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => editTeam(team)} className="rounded-lg border border-violet-300/20 px-3 py-2 text-sm hover:bg-violet-900/40"><Save size={15} className="mr-1 inline"/>Renombrar</button>
          <button onClick={() => toggle(team)} className="rounded-lg border border-violet-300/20 px-3 py-2 text-sm hover:bg-violet-900/40">{team.status === "active" ? "Desactivar" : "Activar"}</button>
          <button onClick={() => remove(team)} className="rounded-lg border border-red-400/20 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"><Trash2 size={15} className="mr-1 inline"/>Eliminar</button>
        </div>
      </article>)}
      {teams.length === 0 && <p className="rounded-xl border border-dashed border-violet-300/20 p-8 text-center text-violet-100/50">No hay equipos registrados.</p>}
    </div>
  </main>;
}
