import { Metadata } from "next"
import { ComputerRentalClient } from "./computer-rental-client"

export const metadata: Metadata = {
  title: 'Computer & Laptop Rental Chennai - Desktop PC on Rent | Best Prices',
  description: 'Rent computers & laptops in Chennai at best prices. HP, Dell, Lenovo desktops & laptops available. i5, i7, i9 processors. Daily, weekly, monthly rental. Free delivery, setup & 24/7 support. Call +91 9385417594.',
  keywords: [
    'computer rental Chennai',
    'laptop rental Chennai',
    'desktop rental Chennai',
    'PC on rent Chennai',
    'laptop on rent near me',
    'HP laptop rental',
    'Dell computer rental',
    'Lenovo laptop rental',
    'office computer rental',
    'bulk laptop rental Chennai',
    'event computer rental',
    'i7 laptop rental',
    'gaming PC rental Chennai',
  ],
  openGraph: {
    title: 'Computer & Laptop Rental Chennai - HP, Dell, Lenovo | PSV IT Solutions',
    description: 'Rent HP, Dell, Lenovo computers & laptops at best prices in Chennai. Free delivery & professional setup.',
    url: 'https://psvitsolution.in/rentals/computers',
  },
  alternates: {
    canonical: 'https://psvitsolution.in/rentals/computers',
  },
}

function ServiceJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Computer & Laptop Rental Service Chennai',
    description: 'Professional computer and laptop rental services in Chennai. HP, Dell, Lenovo desktops and laptops available for events, projects, and business expansion.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'PSV IT & Office Solutions',
      telephone: '+91-9385417594',
    },
    areaServed: { '@type': 'City', name: 'Chennai' },
    serviceType: 'Computer Rental',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function ComputerRentalPage() {
  return (
    <>
      <ServiceJsonLd />
      <ComputerRentalClient />
    </>
  )
}
