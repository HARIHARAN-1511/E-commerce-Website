"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"
import { Scan, FileText, Share2, Database, CheckCircle2, Zap, Cog, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const specs = [
    { title: "High-Speed Scanning", icon: Zap, desc: "Process hundreds of pages per minute with advanced automatic document feeders (ADF)." },
    { title: "OCR Ready", icon: FileText, desc: "Built-in Optical Character Recognition to turn scanned documents into searchable and editable files." },
    { title: "Cloud Integration", icon: Share2, desc: "Scan directly to Email, Google Drive, Dropbox, or your local network storage." },
    { title: "Double-Sided", icon: Database, desc: "Simultaneous double-sided scanning for faster processing of complex records." }
]

export default function ScannerRentalPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="relative min-h-[50vh] flex items-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="/banner.jpeg"
                        alt="Scanner Rentals"
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
                            Professional <span className="text-primary italic">Document Scanner</span> Rentals
                        </h1>
                        <p className="text-lg text-slate-300 max-w-lg mb-8 font-medium">
                            High-speed document digitization for archiving, legal management, and efficient document workflows.
                        </p>
                        <Link href="/contact" className="inline-flex items-center px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-all">
                            Get Quote
                        </Link>
                    </motion.div>
                </div>
            </div>

            <main className="flex-grow">
                {/* Stats/Features Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {specs.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:shadow-2xl transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white text-primary flex items-center justify-center mb-8 shadow-lg shadow-slate-200 group-hover:bg-primary group-hover:text-white transition-all">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Info Section */}
                <section className="py-24 bg-slate-50 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white relative flex flex-col lg:flex-row items-center gap-16 shadow-2xl">
                            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                                <Image src="/banner.jpeg" fill className="object-cover" alt="Scan Pattern" />
                            </div>

                            <div className="flex-1 relative z-10">
                                <h2 className="text-4xl font-black mb-8 leading-tight">Digitalize Your <span className="text-primary italic">Archive</span> in Record Time</h2>
                                <p className="text-slate-400 font-medium text-lg leading-relaxed mb-10">
                                    PSV IT provides the industry's most reliable scanners from brands like Fujitsu and Kodak, perfect for large-scale digitization projects.
                                </p>
                                <ul className="space-y-6">
                                    <li className="flex items-center gap-4 text-lg font-bold">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        Fast Delivery & On-site Setup
                                    </li>
                                    <li className="flex items-center gap-4 text-lg font-bold">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        24/7 Priority Technical Support
                                    </li>
                                </ul>
                            </div>

                            <div className="flex-1 relative group w-full max-w-lg">
                                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all" />
                                <div className="relative aspect-square rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                                    <Image src="/banner.jpeg" fill className="object-cover" alt="Scanner Hardware" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-black mb-6">Ready to Go <span className="text-primary italic">Paperless?</span></h2>
                        <p className="text-slate-500 font-medium mb-10">Our specialists will help you determine the best scanner model based on your document volume and type.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="bg-primary text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                Request Rental Pricing
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
