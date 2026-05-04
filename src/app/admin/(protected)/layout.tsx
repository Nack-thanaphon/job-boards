import Link from "next/link";

import { logoutAdmin, requireAdmin } from "@/features/adminAuth/adminAuth";
import { Container } from "@/ui/container";
import { Button } from "@/ui/button";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-lg sticky top-0 z-40">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ระบบหางาน
            </Link>
            <nav className="flex items-center gap-2">
              <Link href="/admin/jobs" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                งาน
              </Link>
              <Link href="/admin/news" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                ข่าว
              </Link>
              <Link href="/admin/interests" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                ผู้สนใจ
              </Link>
            </nav>
          </div>

          <form action={logout}>
            <Button variant="secondary" size="sm" type="submit" className="rounded-xl">
              ออกจากระบบ
            </Button>
          </form>
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-10">{children}</Container>
      </main>
    </div>
  );
}

async function logout() {
  "use server";
  await logoutAdmin();
}

