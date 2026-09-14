import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VidaLoca MMORPG – Tú decides quién eres',
  description: 'MMORPG de mundo libre ambientado en las ciudades de España. Vive la vida que quieras.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
