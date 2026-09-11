import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PK Fotografia — Histórias em imagens",
  description: "Histórias, fotografias e filmes. Conheça o portfólio da PK Fotografia.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:"try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')||'system'}catch(e){}"}}/></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
