export async function verifyHandle(codeforcesHandle: string): Promise<boolean> {
  try {
    const url = `https://codeforces.com/api/user.info?handles=${codeforcesHandle}`;
    const response = await fetch(url);

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.status === "OK" && data.result?.length > 0;
  } catch (error) {
    console.error("Error verificando handle de Codeforces:", error);
    return false;
  }
}
