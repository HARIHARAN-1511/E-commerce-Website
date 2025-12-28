import { Metadata } from "next"
import { PrinterRentalClient } from "./printer-rental-client"

export const metadata: Metadata = {
  title: 'Printer Rental Chennai - HP, Canon, Epson Printers on Rent | Best Prices',
  description: 'Rent printers in Chennai at best prices. HP, Canon, Epson, Brother laser & inkjet printers available. Daily, weekly, monthly rental plans. Free delivery, installation & 24/7 support. Call +91 9385417594.',
  keywords: [
    'printer rental Chennai',
    'HP printer rental',
    'Canon printer rental',
    'Epson printer rental',
    'Brother printer rental',
    'laser printer on rent Chennai',
    'inkjet printer rental',
    'multifunction printer rental',
    'office printer rental',
    'printer on rent near me',
    'monthly printer rental Chennai',
    'printer hire Chennai',
    'color printer rental',
    'printer rental service',
  ],
  openGraph: {
    title: 'Printer Rental Chennai - HP, Canon, Epson | PSV IT Solutions',
    description: 'Rent HP, Canon, Epson printers at best prices in Chennai. Free delivery & installation. Daily, weekly, monthly plans available.',
    url: 'https://psvitsolution.in/rentals/printers',
  },
  alternates: {
    canonical: 'https://psvitsolution.in/rentals/printers',
  },
}

function ServiceJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Printer Rental Service Chennai',
    description: 'Professional printer rental services in Chennai. HP, Canon, Epson, Brother laser and inkjet printers available for daily, weekly, or monthly rental.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'PSV IT & Office Solutions',
      telephone: '+91-9385417594',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No.36/71, 2nd floor, Thambuchetty Street',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '600001',
        addressCountry: 'IN',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Chennai',
    },
    serviceType: 'Printer Rental',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '500',
      highPrice: '10000',
      offerCount: 50,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function PrinterRentalPage() {
  return (
    <>
      <ServiceJsonLd />
      <PrinterRentalClient />
    </>
  )
}
