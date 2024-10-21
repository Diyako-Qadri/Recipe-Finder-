import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { UserProvider } from '@/utils/contexts';
import LayoutWrapper from '@/components/LayoutWrapper';
import HeroMessage from '@/components/HeroMessage';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
 
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Gourmet Guide',
  description: 'Generated by create next app',
  icons: {
    icon: '/headerlogo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <UserProvider>
          <LayoutWrapper children={children} />
        </UserProvider>
      </body>
    </html>
  );
}
