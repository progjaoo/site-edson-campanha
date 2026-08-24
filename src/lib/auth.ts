import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "emilly";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Conquistas@07";
const AUTH_COOKIE_NAME = "edson_admin_session";
const SESSION_SECRET_TOKEN = "albertassi_auth_token_active_2026";

export function checkCredentials(user: string, pass: string): boolean {
  return user === ADMIN_USERNAME && pass === ADMIN_PASSWORD;
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, SESSION_SECRET_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    return token === SESSION_SECRET_TOKEN;
  } catch {
    return false;
  }
}
