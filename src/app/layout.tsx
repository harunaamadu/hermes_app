import { baseMetadata } from "@/lib/seo/metadata";
import { Geist_Mono, Geom, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import MobileBottomNav from "@/components/header/ui/MobileBottomNav";
import Providers from "@/components/providers/providers";
import LayoutContent from "./LayoutContent";

const geomHeading = Geom({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "font-sans",
        "antialiased",
        geistMono.variable,
        inter.variable,
        geomHeading.variable,
      )}
      suppressHydrationWarning
    >
      <body className="w-full" suppressHydrationWarning>
        <Providers>
          <CurrencyProvider>
            <TooltipProvider>
              <MobileBottomNav />
              <LayoutContent>{children}</LayoutContent>
            </TooltipProvider>
          </CurrencyProvider>
        </Providers>
      </body>
    </html>
  );
}
