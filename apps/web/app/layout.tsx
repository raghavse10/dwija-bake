import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/theme-context";
import { Navbar } from "./components/navbar";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading-raw",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-accent-raw",
  display: "swap",
});

const nunito = Nunito({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body-raw",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dwija Bake Studio",
  description: "Monorepo demo app",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${greatVibes.variable} ${nunito.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var m=t==="dark"||(!t&&d);document.documentElement.classList.toggle("dark",m);})();`,
          }}
        />
      </head>
      <body className={`${nunito.className} antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
