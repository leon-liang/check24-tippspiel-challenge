"use server";

const SSOSignOut = async (refreshToken: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sso-sign-out`, {
      headers: {
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    console.error("Error occurred during sign out:", error);
  }
};

export default SSOSignOut;
