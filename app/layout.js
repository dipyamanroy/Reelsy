import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "./provider";

export const metadata = {
  title: "Reelsy",
  description: "Make AI shorts in minutes!",
};

const inter = Inter({subsets:['latin']})
export default function RootLayout({ children }) {
  return (
    <Provider>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={inter.className}
        >
          {children}
        </body>
      </html>
    </Provider>
  );
}
