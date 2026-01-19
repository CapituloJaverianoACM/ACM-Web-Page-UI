import "../styles/globals.css";
import { cookies } from "next/headers";
import { Providers } from "@/components/shared/providers";

// https://nextjs.org/docs/app/api-reference/functions/cookies

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";
  const locale = cookieStore.get("locale")?.value ?? "en";
  const messages = (await import(`@/../messages/${locale}.json`)).default;

  return (
    <html className={`${theme}`} lang="es" style={{ scrollBehavior: "smooth" }}>
      <head>
        <meta name="description" content="Mi App en Next.js" />
        <title>Capitulo Javeriano ACM</title>
      </head>
      <body>
        <main className="dark:bg-[#121212]">
          <Providers locale={locale} messages={messages}>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
