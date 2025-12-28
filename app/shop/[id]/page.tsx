import { Metadata } from "next"
import { createClient } from "@supabase/supabase-js"
import { notFound } from "next/navigation"
import { ProductDetailClient } from "./product-detail-client"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Props = {
  params: Promise<{ id: string }>
}

async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const productName = product.name
  const category = product.category
  const categoryFormatted = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${productName} - Buy or Rent ${categoryFormatted} Chennai | Best Price`,
    description: `${product.description || `Buy or rent ${productName} at best prices in Chennai.`} Available for purchase at ₹${product.price} or rent at ₹${product.rental_price_monthly}/month. Free delivery & installation. PSV IT Solutions.`,
    keywords: [
      productName,
      `${productName} price`,
      `${productName} rental`,
      `${productName} Chennai`,
      `buy ${productName}`,
      `rent ${productName}`,
      `${category} rental Chennai`,
      `${category} on rent`,
      `HP ${category}`,
      `Canon ${category}`,
      `office ${category} rental`,
    ],
    openGraph: {
      title: `${productName} - Best Price in Chennai | PSV IT Solutions`,
      description: `${product.description} Buy at ₹${product.price} or rent at ₹${product.rental_price_monthly}/month. Free delivery in Chennai.`,
      url: `https://psvitsolution.in/shop/${id}`,
      type: 'website',
      images: product.image_url ? [
        {
          url: product.image_url,
          width: 800,
          height: 600,
          alt: productName,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${productName} - Buy or Rent at Best Price`,
      description: `${product.description} Available at PSV IT Solutions Chennai.`,
      images: product.image_url ? [product.image_url] : [],
    },
    alternates: {
      canonical: `https://psvitsolution.in/shop/${id}`,
    },
  }
}

function ProductJsonLd({ product }: { product: any }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url || product.images?.[0],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.name.split(' ')[0],
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: product.rental_price_monthly || product.price,
      highPrice: product.price,
      offerCount: 2,
      offers: [
        {
          '@type': 'Offer',
          name: 'Purchase',
          price: product.price,
          priceCurrency: 'INR',
          availability: product.stock_quantity > 0 
            ? 'https://schema.org/InStock' 
            : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'PSV IT & Office Solutions',
          },
        },
        ...(product.is_rental ? [{
          '@type': 'Offer',
          name: 'Monthly Rental',
          price: product.rental_price_monthly,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: product.rental_price_monthly,
            priceCurrency: 'INR',
            unitText: 'month',
          },
          seller: {
            '@type': 'Organization',
            name: 'PSV IT & Office Solutions',
          },
        }] : []),
      ],
    },
    category: product.category,
    url: `https://psvitsolution.in/shop/${product.id}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function BreadcrumbJsonLd({ product }: { product: any }) {
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
      {
        '@type': 'ListItem',
        position: 3,
        name: product.category.charAt(0).toUpperCase() + product.category.slice(1),
        item: `https://psvitsolution.in/shop?category=${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `https://psvitsolution.in/shop/${product.id}`,
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

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd product={product} />
      <ProductDetailClient product={product} />
    </>
  )
}
