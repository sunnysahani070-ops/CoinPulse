# CoinPulse 🚀

CoinPulse is a modern, high-performance cryptocurrency tracking and screening application. It acts as a comprehensive dashboard that provides real-time market data, dynamic interactive charts, and deep analytics to help you stay ahead of the crypto market. 

Built with the latest tools in the React ecosystem, CoinPulse is designed to be fully responsive, aesthetically premium, and incredibly fast.

## 🌟 Key Features

- **Real-Time Market Data**: Get up-to-the-second prices and market changes.
- **Dynamic Search Modal (Cmd+K)**: Instantly search for any token or coin globally using a debounced, auto-caching command palette. Shows trending coins by default when idle!
- **Interactive Candlestick Charts**: Dive deep into token metrics with beautiful, time-series OHLC (Open, High, Low, Close) charts.
- **Top Gainers & Losers**: Quickly visualize the market's biggest movers at a glance.
- **Live Data Streams**: Utilizes WebSockets to ensure that price changes flash on your screen the moment they happen.
- **Premium UI/UX**: Designed with a sleek dark mode, custom scrollbars, glassmorphism elements, and smooth micro-animations.

## 🛠 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Command, Dialog, Buttons, etc.)
- **Data Fetching:** [SWR](https://swr.vercel.app/) for Stale-While-Revalidate caching and background fetching.
- **Icons:** [Lucide React](https://lucide.dev/)
- **API Provider:** [CoinGecko API](https://www.coingecko.com/en/api)
- **Utilities:** `react-use` (for debouncing and keyboard shortcuts)

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Ensure you have Node.js installed (v18.x or later is recommended).

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/coinpulse.git
cd coinpulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env.local` file in the root of the project and add your CoinGecko API keys:

```env
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
COINGECKO_API_KEY=your_api_key_here
```
*(Note: If you have a Pro API key, use `https://pro-api.coingecko.com/api/v3` as the base URL)*

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deployment

This project is fully optimized and ready to be deployed on **Vercel**. 

1. Push your code to your GitHub repository.
2. Import the project into Vercel.
3. Add your `COINGECKO_BASE_URL` and `COINGECKO_API_KEY` to the Vercel Environment Variables section.
4. Click Deploy!

## 📜 License

This project is licensed under the MIT License.
