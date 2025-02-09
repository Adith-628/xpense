import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Xpense - Smart Expense Tracker",
  description:
    "Xpense helps you track your income, spending, and budget effortlessly. Categorize transactions, analyze spending trends, and stay financially organized.",
  keywords:
    "expense tracker, budget manager, finance app, money management, track expenses, personal finance, spending tracker",
  authors: [{ name: "Adithyan T", url: "https://adithyant.me" }], // Replace with your details
  openGraph: {
    title: "Xpense - Your Personal Expense Tracker",
    description:
      "Track your expenses, manage your budget, and gain financial clarity with Xpense.",
    // url: "https://yourapp.com", // Replace with your actual app URL
    siteName: "Xpense",
    icons: {
      icon: "./logo-x.png", // Favicon for all browsers
      shortcut: "/favicon.ico", // For iOS home screen
    },
    images: [
      {
        // url: "https://yourapp.com/og-image.png", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Xpense - Track and Manage Your Expenses",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitter", // Replace with your Twitter handle
    title: "Xpense - Smart Expense Tracking",
    description:
      "Manage your expenses efficiently with Xpense. Categorize, analyze, and take control of your finances.",
    images: ["https://yourapp.com/twitter-image.png"], // Replace with actual image
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-x.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
