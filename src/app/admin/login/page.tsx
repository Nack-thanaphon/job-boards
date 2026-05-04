import { redirect } from "next/navigation";

import { loginAdmin } from "@/features/adminAuth/adminAuth";
import { requiredString } from "@/lib/validators";
import { Container } from "@/ui/container";
import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const error = sp.error === "1";

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Container>
        <Card className="mx-auto max-w-md p-8 bg-white border-0 shadow-2xl rounded-3xl space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Admin</h1>
            <p className="text-sm text-slate-600">ใส่รหัสผ่านเพื่อเข้าใช้งาน</p>
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
              รหัสผ่านไม่ถูกต้อง
            </div>
          ) : null}

          <form action={login} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">รหัสผ่าน</label>
              <Input name="password" type="password" autoFocus required className="rounded-2xl py-3 px-4" />
            </div>
            <Button type="submit" className="w-full py-3 rounded-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0">
              เข้าสู่ระบบ
            </Button>
          </form>
        </Card>
      </Container>
    </div>
  );
}

async function login(formData: FormData) {
  "use server";

  const password = requiredString(formData.get("password"));
  if (!password) redirect("/admin/login?error=1");

  const result = await loginAdmin(password);
  if (!result.ok) redirect("/admin/login?error=1");

  redirect("/admin/jobs");
}

