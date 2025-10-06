import "../styles/globals.css";
import { cookies } from "next/headers";

// https://nextjs.org/docs/app/api-reference/functions/cookies

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";

  return (
    <html className={`${theme}`} lang="es" style={{ scrollBehavior: "smooth" }}>
      <head>
        <meta name="description" content="Mi App en Next.js" />
        <title>Capitulo Javeriano ACM</title>
      </head>
      <body>
        <main className="dark:bg-[#121212]">{children}</main>
      </body>
    </html>
  );
}
