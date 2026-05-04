import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "admin_session";

function getSecret() {
  return process.env.ADMIN_SECRET ?? "dev-secret";
}

function getPassword() {
  return process.env.ADMIN_PASSWORD ?? "admin";
}

function sign(payloadBase64: string) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payloadBase64)
    .digest("base64url");
}

function encodeSession(exp: number) {
  const payloadBase64 = Buffer.from(JSON.stringify({ exp })).toString("base64url");
  const signature = sign(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

function decodeSession(token: string) {
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) return null;
  const expected = sign(payloadBase64);
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }
  const payload = JSON.parse(
    Buffer.from(payloadBase64, "base64url").toString("utf8"),
  ) as { exp?: number };
  if (!payload.exp || Date.now() > payload.exp) return null;
  return payload;
}

export async function requireAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || !decodeSession(token)) redirect("/admin/login");
}

export async function loginAdmin(password: string) {
  const expected = getPassword();
  const ok =
    password.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expected));

  if (!ok) return { ok: false as const };

  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
  (await cookies()).set(cookieName, encodeSession(exp), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    expires: new Date(exp),
  });
  return { ok: true as const };
}

export async function logoutAdmin() {
  (await cookies()).delete(cookieName);
  redirect("/admin/login");
}
