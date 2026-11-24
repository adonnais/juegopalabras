import Link from "next/link";
import { Image, Settings, Trophy } from "lucide-react";

const links = [
  
  { href: "/juego", label: "Juego", icon: Image, detail: "Control de partidas" },
  
]

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">by: Adonais Medrano Marmol</p>
      <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Adivina la <span className="text-violet-400">Palabra</span></h1>
      <p className="mt-4 max-w-xl text-lg text-violet-100/70">Identifica las palabras a partir de imágenes y compite contra el cronómetro.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {links.map(({ href, label, icon: Icon, detail }) => (
          <Link key={href} href={href} className="rounded-2xl border border-violet-400/20 bg-violet-950/30 p-6 transition hover:border-violet-300/60 hover:bg-violet-900/40">
            <Icon className="mb-5 h-7 w-7 text-violet-300" />
            <h2 className="text-xl font-bold">{label}</h2>
            <p className="mt-2 text-sm text-violet-100/60">{detail}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
