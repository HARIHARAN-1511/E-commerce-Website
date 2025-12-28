import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { ServiceCard } from "@/components/home/service-cards";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Printer, Scanner, Copier & Computer Rental Chennai - Best Prices',
  description: 'PSV IT Solutions offers premium printer rental, scanner rental, copier rental & computer rental in Chennai. HP, Canon, Epson brands available. Free delivery, professional installation & 24/7 support. Get quote now!',
  keywords: [
    'printer rental Chennai',
    'scanner rental Chennai', 
    'copier rental Chennai',
    'computer rental Chennai',
    'laptop rental Chennai',
    'HP printer on rent Chennai',
    'Canon printer rental',
    'office equipment rental',
    'IT equipment rental Chennai',
    'photocopier rental',
    'multifunction printer rental',
  ],
  alternates: {
    canonical: 'https://psvitsolution.in',
  },
  openGraph: {
    title: 'PSV IT Solutions - Best Printer & IT Equipment Rental Chennai',
    description: 'Premium printer, scanner, copier & computer rental services in Chennai. Top brands, best prices, free delivery & 24/7 support.',
    url: 'https://psvitsolution.in',
  },
};

function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PSV IT & Office Solutions',
    url: 'https://psvitsolution.in',
    logo: 'https://psvitsolution.in/logo.png',
    description: 'Leading IT equipment rental company in Chennai offering printers, copiers, scanners, computers and laptops on rent.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No.36/71, 2nd floor, Thambuchetty Street',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600001',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9385417594',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Tamil'],
    },
    sameAs: [
      'https://wa.me/919385417594',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://psvitsolution.in',
    name: 'PSV IT & Office Solutions',
    image: 'https://psvitsolution.in/banner.jpeg',
    url: 'https://psvitsolution.in',
    telephone: '+91-9385417594',
    email: 'info@psvitsolution.in',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No.36/71, 2nd floor, Thambuchetty Street',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.0827,
      longitude: 80.2707,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Chennai',
    },
    serviceType: [
      'Printer Rental',
      'Copier Rental',
      'Scanner Rental',
      'Computer Rental',
      'Laptop Rental',
      'IT Equipment Rental',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PSV IT & Office Solutions',
    url: 'https://psvitsolution.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://psvitsolution.in/shop?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

const services = [
  {
    title: "Computer & Laptop Rental",
    description: "High-performance computers and laptops for temporary projects, events, or business expansion needs.",
    iconName: "Laptop",
    color: "bg-blue-600",
  },
  {
    title: "Professional Printers",
    description: "Advanced printing solutions including laser, inkjet, and wide-format printers for all your business needs.",
    iconName: "Printer",
    color: "bg-indigo-600",
  },
  {
    title: "Document Scanners",
    description: "High-speed document scanners for digitization projects, archiving, and document management solutions.",
    iconName: "Scan",
    color: "bg-emerald-600",
  },
  {
    title: "Multi-Function Copiers",
    description: "Advanced copiers with printing, scanning, and faxing capabilities for comprehensive office solutions.",
    iconName: "Copy",
    color: "bg-purple-600",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebsiteJsonLd />
      <Navbar />
      <Hero />

      {/* Services Section */}
      <section className="py-24 bg-background overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">Our Premium <span className="text-primary italic">Services</span></h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Comprehensive IT equipment rental solutions designed to meet your business needs with flexibility, reliability, and expert support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Ready to Transform Your Business?</h2>
              <p className="text-xl text-slate-400 mb-12 font-medium">
                Get started with our premium IT equipment rental services today. Contact us for a free consultation and customized quote tailored to your specific business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/contact" className="px-10 py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all shadow-xl active:scale-95">
                  Get Free Quote
                </a>
                <a href="tel:+919385417594" className="px-10 py-5 bg-white/10 text-white font-black rounded-2xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm active:scale-95">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
