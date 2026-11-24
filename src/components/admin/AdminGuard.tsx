 "use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import { asignarAdministrador } from "@/lib/firebase/guards";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">("loading");

  useEffect(() => {
    if (!auth) {
      setStatus("denied");
      return;
    }
    return onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        router.replace("/login");
        return;
      }
      try {
        const allowed = await asignarAdministrador(user);
        if (!allowed) {
          await auth.signOut();
          router.replace("/login?error=unauthorized");
          return;
        }
        setStatus("allowed");
      } catch {
        setStatus("denied");
      }
    });
  }, [router]);

  if (status === "loading") return <main className="grid min-h-screen place-items-center text-violet-200">Verificando permisos...</main>;
  if (status === "denied") return <main className="grid min-h-screen place-items-center px-6 text-center text-red-300">No se pudo verificar el acceso. Revisa la configuración de Firebase y los permisos de administrador.</main>;
  return <>{children}</>;
}
