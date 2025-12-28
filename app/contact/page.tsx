import { Metadata } from "next"
import { ContactPageClient } from "./contact-client"

export const metadata: Metadata = {
  title: 'Contact PSV IT Solutions - Get Free Quote for Printer & Equipment Rental',
  description: 'Contact PSV IT Solutions Chennai for printer rental, copier rental, scanner rental & computer rental quotes. Call +91 9385417594 or visit our office at Thambuchetty Street, Chennai. 24/7 support available.',
  keywords: [
    'contact PSV IT Solutions',
    'printer rental quote Chennai',
    'IT equipment rental enquiry',
    'copier rental contact',
    'office equipment Chennai contact',
    'printer rental phone number',
    'IT solutions Chennai address',
    'PSV IT office location',
    'get quote printer rental',
  ],
  openGraph: {
    title: 'Contact PSV IT Solutions - Free Quote for IT Equipment Rental',
    description: 'Get in touch with PSV IT Solutions for printer, copier, scanner & computer rental in Chennai. Call +91 9385417594.',
    url: 'https://psvitsolution.in/contact',
  },
  alternates: {
    canonical: 'https://psvitsolution.in/contact',
  },
}

function ContactPageJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact PSV IT & Office Solutions',
    description: 'Get in touch with PSV IT Solutions for IT equipment rental services in Chennai',
    url: 'https://psvitsolution.in/contact',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'PSV IT & Office Solutions',
      telephone: '+91-9385417594',
      email: 'info@psvitsolution.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No.36/71, 2nd floor, Thambuchetty Street',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '600001',
        addressCountry: 'IN',
      },
      openingHours: 'Mo-Fr 09:00-18:00, Sa 09:00-14:00',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function ContactPage() {
  return (
    <>
      <ContactPageJsonLd />
      <ContactPageClient />
    </>
  )
}
