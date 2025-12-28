import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://psvitsolution.in'),
  title: {
    template: '%s | PSV IT & Office Solutions Chennai',
    default: 'PSV IT & Office Solutions - Printer, Copier, Scanner & Computer Rental Chennai',
  },
  description: 'Leading IT equipment rental company in Chennai. Rent printers, copiers, scanners, computers & laptops at best prices. HP, Canon, Epson printer rental. Free delivery & 24/7 support. Call +91 9385417594.',
  keywords: [
    'printer rental Chennai',
    'copier rental Chennai',
    'scanner rental Chennai',
    'computer rental Chennai',
    'laptop rental Chennai',
    'HP printer rental',
    'Canon printer rental',
    'Epson printer rental',
    'office equipment rental Chennai',
    'IT equipment rental',
    'printer on rent',
    'copier on rent',
    'multifunction printer rental',
    'laser printer rental',
    'inkjet printer rental',
    'photocopier rental Chennai',
    'PSV IT Solutions',
    'office solutions Chennai',
    'Tamil Nadu printer rental',
  ],
  authors: [{ name: 'PSV IT & Office Solutions' }],
  creator: 'PSV IT & Office Solutions',
  publisher: 'PSV IT & Office Solutions',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://psvitsolution.in',
    siteName: 'PSV IT & Office Solutions',
    title: 'PSV IT & Office Solutions - Best Printer & IT Equipment Rental in Chennai',
    description: 'Rent printers, copiers, scanners, computers at best prices in Chennai. HP, Canon, Epson brands. Free delivery, installation & 24/7 support. Call +91 9385417594.',
    images: [
      {
        url: '/banner.jpeg',
        width: 1200,
        height: 630,
        alt: 'PSV IT & Office Solutions - Premium IT Equipment Rental Chennai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PSV IT & Office Solutions - Printer & IT Equipment Rental Chennai',
    description: 'Rent printers, copiers, scanners, computers at best prices in Chennai. Free delivery & 24/7 support.',
    images: ['/banner.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://psvitsolution.in',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
