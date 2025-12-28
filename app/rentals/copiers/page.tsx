import { Metadata } from "next"
import { CopierRentalClient } from "./copier-rental-client"

export const metadata: Metadata = {
  title: 'Copier Rental Chennai - Photocopier Machine on Rent | Best Prices',
  description: 'Rent photocopiers & copiers in Chennai at best prices. Multi-function copiers, color copiers, high-volume copiers available. Daily, weekly, monthly rental plans. Free delivery & 24/7 support. Call +91 9385417594.',
  keywords: [
    'copier rental Chennai',
    'photocopier rental Chennai',
    'xerox machine rental',
    'multifunction copier rental',
    'color copier rental',
    'copier on rent Chennai',
    'office copier rental',
    'photocopier on rent near me',
    'high volume copier rental',
    'Canon copier rental',
    'Ricoh copier rental',
    'Konica Minolta rental',
  ],
  openGraph: {
    title: 'Copier & Photocopier Rental Chennai | PSV IT Solutions',
    description: 'Rent photocopiers & multi-function copiers at best prices in Chennai. Free delivery & professional setup.',
    url: 'https://psvitsolution.in/rentals/copiers',
  },
  alternates: {
    canonical: 'https://psvitsolution.in/rentals/copiers',
  },
}

function ServiceJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Copier Rental Service Chennai',
    description: 'Professional copier and photocopier rental services in Chennai. Multi-function, color, and high-volume copiers available.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'PSV IT & Office Solutions',
      telephone: '+91-9385417594',
    },
    areaServed: { '@type': 'City', name: 'Chennai' },
    serviceType: 'Copier Rental',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function CopierRentalPage() {
  return (
    <>
      <ServiceJsonLd />
      <CopierRentalClient />
    </>
  )
}
