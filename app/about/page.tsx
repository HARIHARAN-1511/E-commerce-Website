import { Metadata } from "next"
import { AboutPageClient } from "./about-client"

export const metadata: Metadata = {
  title: 'About PSV IT Solutions - Leading IT Equipment Rental Company Chennai',
  description: 'PSV IT & Office Solutions is Chennai\'s trusted IT equipment rental company. We provide printers, scanners, copiers, computers on rent with free delivery, installation & 24/7 support. Serving businesses since years.',
  keywords: [
    'about PSV IT Solutions',
    'IT equipment rental company Chennai',
    'printer rental company',
    'office equipment provider Chennai',
    'copier rental service',
    'IT solutions Chennai',
    'office solutions provider',
    'printer rental near me',
    'best IT rental company Chennai',
  ],
  openGraph: {
    title: 'About PSV IT & Office Solutions - Your IT Partner in Chennai',
    description: 'Learn about PSV IT Solutions - Chennai\'s premier IT equipment rental provider with expert team, 24/7 support & flexible pricing.',
    url: 'https://psvitsolution.in/about',
  },
  alternates: {
    canonical: 'https://psvitsolution.in/about',
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
