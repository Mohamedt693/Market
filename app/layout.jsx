import { Outfit } from "next/font/google";
import { AppContextProvider } from "@/context/AppContext";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Market",
  description: "E-commerce project",
};

export default function RootLayout({children}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
