import "../styles/globals.css";
import { cookies } from "next/headers";
import { Providers } from "@/components/shared/providers";
import { NextIntlClientProvider } from "next-intl";
import { GoogleAnalytics } from "@next/third-parties/google";

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
        <main className="dark:bg-[#121212]">
          {/* El provider de internacionalización es especial, ya que necesariamente tiene que ser use server. */}
          <NextIntlClientProvider>
            <Providers>{children}</Providers>
          </NextIntlClientProvider>
        </main>
      </body>
      <GoogleAnalytics gaId={"G-VJ74FDQFST"} />
    </html>
  );
}
