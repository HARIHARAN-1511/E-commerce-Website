import { Metadata } from "next"
import { ScannerRentalClient } from "./scanner-rental-client"

export const metadata: Metadata = {
  title: 'Scanner Rental Chennai - High Speed Document Scanners on Rent | Best Prices',
  description: 'Rent document scanners in Chennai at best prices. Fujitsu, Kodak, HP high-speed scanners available. OCR ready, cloud integration. Daily, weekly, monthly rental. Free delivery & setup. Call +91 9385417594.',
  keywords: [
    'scanner rental Chennai',
    'document scanner rental',
    'Fujitsu scanner rental',
    'Kodak scanner rental',
    'HP scanner rental',
    'high speed scanner rental',
    'scanner on rent Chennai',
    'OCR scanner rental',
    'flatbed scanner rental',
    'document digitization Chennai',
    'office scanner rental',
  ],
  openGraph: {
    title: 'Document Scanner Rental Chennai - High Speed Scanners | PSV IT Solutions',
    description: 'Rent Fujitsu, Kodak, HP document scanners at best prices in Chennai. Free delivery & professional setup.',
    url: 'https://psvitsolution.in/rentals/scanners',
  },
  alternates: {
    canonical: 'https://psvitsolution.in/rentals/scanners',
  },
}

function ServiceJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Document Scanner Rental Service Chennai',
    description: 'Professional document scanner rental services in Chennai. High-speed Fujitsu, Kodak, HP scanners available for daily, weekly, or monthly rental.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'PSV IT & Office Solutions',
      telephone: '+91-9385417594',
    },
    areaServed: { '@type': 'City', name: 'Chennai' },
    serviceType: 'Scanner Rental',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function ScannerRentalPage() {
  return (
    <>
      <ServiceJsonLd />
      <ScannerRentalClient />
    </>
  )
}
