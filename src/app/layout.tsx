import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://encontro-manjedoura.vercel.app"),
  title: {
    template: "%s | Encontro Manjedoura",
    default: "Encontro Manjedoura - Descubra o seu Propósito",
  },
  description: "Plataforma oficial de inscrições para os encontros do Movimento Manjedoura. Assim como a manjedoura revelou ao mundo um Rei, ajudamos você a descobrir o propósito para o qual nasceu.",
  keywords: ["Encontro Manjedoura", "Manjedoura", "Retiro Espiritual", "Propósito", "Encontro de Casais", "Retiro de Jovens", "Acampamento"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://encontromanjedoura.com.br",
    title: "Encontro Manjedoura - Descubra o seu Propósito",
    description: "Plataforma oficial de inscrições para os eventos do Movimento Manjedoura.",
    siteName: "Encontro Manjedoura",
    images: [
      {
        url: "/FotoManjedoura.jpg", // A foto principal de fundo servirá como excelente capa de compartilhamento
        width: 1200,
        height: 630,
        alt: "Imagem do Encontro Manjedoura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Encontro Manjedoura - Descubra o seu Propósito",
    description: "Plataforma oficial de inscrições. Inscreva-se para os próximos retiros.",
    images: ["/FotoManjedoura.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col font-sans bg-spiritual-white dark:bg-spiritual-dark text-spiritual-dark dark:text-spiritual-white transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
