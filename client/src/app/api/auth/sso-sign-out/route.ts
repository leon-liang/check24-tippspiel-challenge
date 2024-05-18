import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const refreshToken = req.headers.get("refresh_token");

    if (
      !refreshToken ||
      !process.env.KEYCLOAK_END_SESSION_ENDPOINT ||
      !process.env.KEYCLOAK_CLIENT_ID
    ) {
      throw Error;
    }

    const body = `client_id=${process.env.KEYCLOAK_CLIENT_ID}&client_secret=${process.env.KEYCLOAK_CLIENT_SECRET}&refresh_token=${refreshToken}`;

    const endSession = await fetch(process.env.KEYCLOAK_END_SESSION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: `Bearer ${refreshToken}`,
      },
      body,
    });

    if (endSession && endSession.status && endSession.status >= 300) {
      console.error("END_SESSION ERROR", endSession.status);
      throw Error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error Sign out",
    });
  }
}
