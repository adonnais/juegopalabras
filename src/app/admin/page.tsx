 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ensureInitialTeams, initializeSettings, listImages, listTeams } from "@/lib/firebase/database";

export default function AdminHome() {
  const [counts, setCounts] = useState({ teams: 0, images: 0 });
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([ensureInitialTeams(), initializeSettings(), listTeams(), listImages()])
      .then(([, , teams, images]) => setCounts({ teams: teams.length, images: images.length }))
      .catch(e => setError(e instanceof Error ? e.message : "Error consultando Firebase."));
  }, []);
  return <main className="mx-auto max-w-6xl px-5 py-10">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Centro de control</p>
    <h1 className="mt-2 text-4xl font-black">Panel administrador</h1>
    <p className="mt-3 text-violet-100/60">Gestiona los equipos y el banco de imágenes de la competencia.</p>
    {error && <p role="alert" className="mt-6 rounded-xl bg-red-500/10 p-4 text-red-300">{error}</p>}
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      <section className="rounded-2xl border border-violet-400/20 bg-violet-950/30 p-6"><p className="text-sm text-violet-200/60">Equipos registrados</p><p className="mt-2 text-4xl font-black">{counts.teams}</p><Link className="mt-5 inline-block text-sm font-semibold text-violet-300 hover:text-white" href="/admin/equipos">Administrar equipos →</Link></section>
      <section className="rounded-2xl border border-violet-400/20 bg-violet-950/30 p-6"><p className="text-sm text-violet-200/60">Imágenes registradas</p><p className="mt-2 text-4xl font-black">{counts.images}</p><Link className="mt-5 inline-block text-sm font-semibold text-violet-300 hover:text-white" href="/admin/imagenes">Administrar imágenes →</Link></section>
    </div>
    <p className="mt-8 text-sm text-violet-100/50">La base de datos debe estar creada y las reglas deben permitir acceso al usuario con custom claim admin=true.</p>
  </main>;
}
