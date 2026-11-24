import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adivina la Palabra",
  description: "Competencia por equipos basada en imágenes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
