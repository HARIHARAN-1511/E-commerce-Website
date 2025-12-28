import { Metadata } from "next"
import { ShopPageClient } from "./shop-client"

export const metadata: Metadata = {
  title: 'Buy Printers, Scanners, Copiers & Computers Online Chennai',
  description: 'Shop printers, scanners, copiers, computers & laptops at best prices in Chennai. HP, Canon, Epson, Brother brands. Buy or rent with free delivery & installation. PSV IT Solutions - Trusted IT equipment provider.',
  keywords: [
    'buy printer Chennai',
    'buy scanner Chennai',
    'buy copier Chennai',
    'buy computer Chennai',
    'buy laptop Chennai',
    'HP printer price Chennai',
    'Canon printer price',
    'Epson printer buy',
    'office equipment shop Chennai',
    'IT equipment store Chennai',
    'printer shop near me',
    'laser printer buy Chennai',
    'inkjet printer price',
    'multifunction printer Chennai',
  ],
  openGraph: {
    title: 'Shop IT Equipment - Printers, Scanners, Computers | PSV IT Solutions',
    description: 'Buy or rent printers, scanners, copiers & computers at best prices. Top brands, free delivery in Chennai.',
    url: 'https://psvitsolution.in/shop',
  },
  alternates: {
    canonical: 'https://psvitsolution.in/shop',
  },
}

function ItemListJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'IT Equipment Catalog - PSV IT Solutions',
    description: 'Browse our collection of printers, scanners, copiers, computers and laptops available for purchase or rental in Chennai.',
    url: 'https://psvitsolution.in/shop',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: 100,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function BreadcrumbJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://psvitsolution.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: 'https://psvitsolution.in/shop',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function ShopPage() {
  return (
    <>
      <ItemListJsonLd />
      <BreadcrumbJsonLd />
      <ShopPageClient />
    </>
  )
}
