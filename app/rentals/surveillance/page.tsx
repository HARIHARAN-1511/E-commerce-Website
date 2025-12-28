import { Metadata } from "next"
import { SurveillanceClient } from "./surveillance-client"

export const metadata: Metadata = {
  title: 'CCTV Camera & Surveillance System Chennai - Security Camera Rental',
  description: 'Rent CCTV cameras & surveillance systems in Chennai at best prices. HD, 4K security cameras, night vision, remote monitoring. Indoor & outdoor cameras. Free installation & 24/7 support. Call +91 9385417594.',
  keywords: [
    'CCTV camera rental Chennai',
    'surveillance system Chennai',
    'security camera rental',
    'CCTV on rent Chennai',
    'HD camera rental',
    '4K security camera',
    'night vision camera rental',
    'outdoor CCTV camera',
    'indoor security camera',
    'DVR NVR rental Chennai',
    'office security system',
    'CCTV installation Chennai',
  ],
  openGraph: {
    title: 'CCTV & Security Camera Rental Chennai | PSV IT Solutions',
    description: 'Rent CCTV cameras & surveillance systems at best prices in Chennai. Free installation & 24/7 monitoring support.',
    url: 'https://psvitsolution.in/rentals/surveillance',
  },
  alternates: {
    canonical: 'https://psvitsolution.in/rentals/surveillance',
  },
}

function ServiceJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'CCTV & Surveillance System Rental Chennai',
    description: 'Professional CCTV camera and surveillance system rental services in Chennai. HD, 4K cameras, night vision, remote monitoring available.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'PSV IT & Office Solutions',
      telephone: '+91-9385417594',
    },
    areaServed: { '@type': 'City', name: 'Chennai' },
    serviceType: 'Surveillance System Rental',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function SurveillancePage() {
  return (
    <>
      <ServiceJsonLd />
      <SurveillanceClient />
    </>
  )
}
