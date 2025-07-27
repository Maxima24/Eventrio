import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from './context/CurrencyContext'
import { DataProvider } from './context/DataContext'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EventHive",
  description: "Create your events in a jiffy, fast and reliable.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataProvider>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </DataProvider>
      </body>
    </html>
  );
}
