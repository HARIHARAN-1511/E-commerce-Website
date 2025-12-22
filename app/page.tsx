import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { ServiceCard } from "@/components/home/service-cards";
import { Footer } from "@/components/layout/footer";

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
