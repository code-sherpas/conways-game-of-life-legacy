import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Conway's Game of Life",
  description: 'A simulation of Conway\'s Game of Life cellular automaton',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
