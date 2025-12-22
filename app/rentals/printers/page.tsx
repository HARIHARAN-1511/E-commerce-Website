"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"
import { Printer, CheckCircle2, ShieldCheck, Zap, Cog, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const printerTypes = [
    {
        title: "Laser Printers",
        desc: "High-speed monochrome and color laser printers perfect for high-volume printing with crisp text quality.",
        features: ["Fast printing speeds", "Professional quality", "Cost-effective for volume"]
    },
    {
        title: "Inkjet Printers",
        desc: "High-resolution color inkjet printers ideal for photos, graphics, and detailed color documents.",
        features: ["Excellent color quality", "Photo printing capability", "Versatile media support"]
    },
    {
        title: "Wide Format Printers",
        desc: "Large format printers for banners, posters, architectural drawings, and professional presentations.",
        features: ["Large format printing", "Professional graphics", "CAD/Technical drawings"]
    },
    {
        title: "Multi-Function Printers",
        desc: "All-in-one devices combining printing, scanning, copying, and faxing capabilities in one unit.",
        features: ["Print, scan, copy, fax", "Space-saving design", "Network connectivity"]
    },
    {
        title: "Label Printers",
        desc: "Specialized label printers for shipping, inventory, barcodes, and professional labeling applications.",
        features: ["Barcode printing", "Shipping labels", "Inventory management"]
    },
    {
        title: "Photo Printers",
        desc: "Professional photo printers for high-quality image printing, events, and photography businesses.",
        features: ["Lab-quality photos", "Multiple paper sizes", "Event photography"]
    }
]

const benefits = [
    { title: "Premium Quality Equipment", icon: ShieldCheck, desc: "Latest models from leading brands like HP, Canon, Epson, and Brother with guaranteed performance." },
    { title: "Complete Setup & Support", icon: Cog, desc: "Professional installation, network configuration, driver setup, and ongoing technical support." },
    { title: "Flexible Rental Terms", icon: Zap, desc: "Daily, weekly, monthly, or long-term rental options with competitive pricing and no hidden fees." }
]

export default function PrinterRentalPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="relative min-h-[50vh] flex items-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="/banner.jpeg"
                        alt="Printer Rentals"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div
                    className="absolute inset-0 z-10 bg-slate-950/90"
                    style={{ clipPath: 'polygon(0 0, 75% 0, 45% 100%, 0% 100%)' }}
                />
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Professional <span className="text-primary italic">Printer Rental</span> Services
                        </h1>
                        <p className="text-lg text-slate-300 max-w-lg mb-8">
                            High-quality printing solutions for your business. Reliable, cost-effective, and professionally managed.
                        </p>
                        <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-all active:scale-95">
                            Get Custom Quote
                        </Link>
                    </motion.div>
                </div>
            </div>

            <main className="flex-grow">
                {/* Benefits Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {benefits.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Collection Section */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                        <h2 className="text-4xl font-black mb-4">Our Printer <span className="text-primary italic">Collection</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Choose the perfect device for your business needs</p>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {printerTypes.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative"
                                >
                                    <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed mb-8 h-20 line-clamp-3">
                                        {item.desc}
                                    </p>
                                    <ul className="space-y-4">
                                        {item.features.map((feature, fidx) => (
                                            <li key={fidx} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                                                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-slate-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 opacity-10">
                                <Image src="/banner.jpeg" alt="CTA BG" fill className="object-cover" />
                            </div>
                            <h2 className="text-4xl font-black mb-6 relative z-10">Ready to Print with Confidence?</h2>
                            <p className="text-slate-400 text-lg mb-10 relative z-10">Join 500+ businesses who rely on PSV IT for their critical office equipment.</p>
                            <Link href="/contact" className="inline-flex items-center px-12 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all relative z-10">
                                Request a Free Quote
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
