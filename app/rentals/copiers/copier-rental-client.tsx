"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"
import { Copy, CheckCircle2, Zap, Network, Lock, Battery } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const models = [
    {
        title: "Multi-Function Copier",
        desc: "Professional multi-function device with automatic duplex printing, energy-saving technology, and high-speed processing.",
        icon: Copy
    },
    {
        title: "Color Photocopier",
        desc: "High-quality color photocopier perfect for marketing materials and presentations. Advanced color management.",
        icon: Zap
    },
    {
        title: "High-Volume Copier",
        desc: "Enterprise-grade designed for high-volume environments. Features advanced security and finishing options.",
        icon: Battery
    }
]

const features = [
    { title: "Energy Saving Mode", desc: "Reduce power consumption by up to 50% with intelligent sleep modes.", icon: Zap },
    { title: "Duplex Printing", desc: "Automatic double-sided printing saves paper costs by up to 50%.", icon: Copy },
    { title: "Advanced Security", desc: "User authentication, secure printing, and data encryption.", icon: Lock },
    { title: "Network Connectivity", desc: "Seamless integration with your office network and mobile devices.", icon: Network },
]

export function CopierRentalClient() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="relative min-h-[50vh] flex items-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="/banner.jpeg"
                        alt="Copier Rentals"
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
                            Professional <span className="text-primary italic">Copier Rental</span> Services
                        </h1>
                        <p className="text-lg text-slate-300 max-w-lg mb-8">
                            Advanced photocopying solutions with high-speed processing and enterprise-grade security features.
                        </p>
                        <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-all active:scale-95">
                            Request Quotation
                        </Link>
                    </motion.div>
                </div>
            </div>

            <main className="flex-grow">
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Premium Copier <span className="text-primary">Models</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Enterprise-grade performance for your office</p>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {models.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed mb-8">{item.desc}</p>
                                    <Link href="/contact" className="text-primary font-black flex items-center gap-2 group/link">
                                        Get Quote
                                        <span className="w-8 h-[2px] bg-primary group-hover/link:w-12 transition-all" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                        <Image src="/banner.jpeg" fill className="object-cover" alt="BG" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-black mb-4">Advanced <span className="text-primary italic">Features</span> & Benefits</h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">State-of-the-art technology at your fingertips</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:border-primary/50 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-primary/5 rounded-[4rem] p-16 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-xl">
                                <h2 className="text-3xl md:text-4xl font-black mb-6">Need Professional <span className="text-primary italic">Assistance?</span></h2>
                                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                                    Our technical experts are available 24/7 to help you choose the right copier model for your specific office volume and workflow requirements.
                                </p>
                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-center gap-3 font-bold text-slate-700">
                                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </div>
                                        24/7 Technical Support & Maintenance
                                    </li>
                                    <li className="flex items-center gap-3 font-bold text-slate-700">
                                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </div>
                                        Next-day delivery & network setup
                                    </li>
                                </ul>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/contact" className="bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                        Contact Support
                                    </Link>
                                    <a href="tel:+919385417594" className="bg-white text-slate-900 border-2 border-slate-100 px-8 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all">
                                        +91 9385417594
                                    </a>
                                </div>
                            </div>
                            <div className="relative w-full max-w-md aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                                <Image src="/banner.jpeg" fill className="object-cover" alt="Copier Team" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
