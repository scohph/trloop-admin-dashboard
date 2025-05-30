import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '@/contexts/web3-provider';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/sonner';
import DataProvider from '@/contexts/data-provider';
import { StoreProvider } from '@/store/storeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Trloop Token Admin Panel',
  description: 'Trloop Token Admin Panel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="false"
      >
        <Web3Provider>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
              enableSystem
            >
              <DataProvider>
                <Header />
                <div className="h-[20px] lg:h-[100px]" />
                {children}
                <div className="h-[100px]" />
                <Toaster />
              </DataProvider>
            </ThemeProvider>
          </StoreProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
