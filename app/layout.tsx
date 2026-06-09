import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CoinPulse',
  description: 'Crypto Screener App with a built-in High-Frequency Terminal & Dashboard',
};

import { fetcher } from '@/lib/coingecko.actions';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let trendingCoins: TrendingCoin[] = [];
  try {
    const data = await fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300);
    trendingCoins = data.coins || [];
  } catch (error) {
    console.error('Failed to fetch trending coins for Header', error);
  }

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header trendingCoins={trendingCoins} />
        {children}
      </body>
    </html>
  );
}