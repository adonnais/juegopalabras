import AdminGuard from "@/components/admin/AdminGuard";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGuard><div className="min-h-screen"><AdminNav />{children}</div></AdminGuard>;
}
