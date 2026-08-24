import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, createAdminSession, clearAdminSession, isAdminAuthenticated } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (checkCredentials(username, password)) {
      await createAdminSession();
      return NextResponse.json({ success: true, message: "Login realizado com sucesso!" });
    }

    return NextResponse.json(
      { success: false, message: "Usuário ou senha incorretos." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao processar login." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true, message: "Logout efetuado." });
}
