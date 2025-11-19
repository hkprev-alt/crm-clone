// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'CRM Clone',
  description: 'CRM Clone built with Next.js App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
