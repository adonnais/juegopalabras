 "use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { LayoutDashboard, Users, Images, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase/client";

const items = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/equipos", label: "Equipos", icon: Users },
  { href: "/admin/imagenes", label: "Imágenes", icon: Images },
];

export default function AdminNav() {
  const path = usePathname();
  const router = useRouter();
  async function logout() {
    if (auth) await signOut(auth);
    router.replace("/login");
  }
  return <header className="border-b border-violet-400/15 bg-[#100a1d]">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
      <Link href="/admin" className="font-black tracking-tight">ADIVINA <span className="text-violet-400">LA PALABRA</span></Link>
      <nav className="flex flex-wrap items-center gap-2">
        {items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${path === href ? "bg-violet-600 text-white" : "text-violet-100/70 hover:bg-violet-900/40"}`}><Icon size={16}/>{label}</Link>)}
        <button onClick={logout} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"><LogOut size={16}/>Salir</button>
      </nav>
    </div>
  </header>;
}
