import "./globals.css";
import { Inter } from "next/font/google";
import ConvexClientProvider from "../ConvexClientProvider";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: "Reelsy",
  description: "Make AI shorts in minutes!",
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ConvexClientProvider>
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}