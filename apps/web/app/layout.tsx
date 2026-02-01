import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/theme-context";
import { Navbar } from "./components/navbar";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var m=t==="dark"||(!t&&d);document.documentElement.classList.toggle("dark",m);})();`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
