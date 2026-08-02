import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          transition:
            "background .3s ease,color .3s ease",
        }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}