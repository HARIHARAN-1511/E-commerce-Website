"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"
import { Laptop, Cpu, HardDrive, Monitor, CheckCircle2, ShieldCheck, Zap, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const specs = [
    { title: "High-Performance", icon: Cpu, desc: "Latest generation processors (i5, i7, i9) for demanding business applications and multitasking." },
    { title: "Ample Storage", icon: HardDrive, desc: "Fast SSD storage ensuring quick boot times and rapid data access for your projects." },
    { title: "Professional Displays", icon: Monitor, desc: "High-resolution screens with accurate color reproduction for design and professional use." },
    { title: "Reliability", icon: ShieldCheck, desc: "Enterprise-grade hardware tested for 24/7 operation and maximum uptime." }
]

const services = [
    { title: "Temporary Projects", desc: "Short-term rentals for software development, data entry, or specific project requirements." },
    { title: "Corporate Events", desc: "Bulk rentals for training sessions, seminars, conferences, and corporate exhibitions." },
    { title: "Business Expansion", desc: "Scale your workforce quickly without the heavy upfront capital expenditure of buying new hardware." }
]

export default function ComputerRentalPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="relative min-h-[50vh] flex items-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="/banner.jpeg"
                        alt="Computer Rentals"
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
                            High-Performance <span className="text-primary italic">Computer & Laptop</span> Rentals
                        </h1>
                        <p className="text-lg text-slate-300 max-w-lg mb-8 font-medium">
                            Modern computing solutions for teams of all sizes. Professional deployment and technical support included.
                        </p>
                        <Link href="/contact" className="inline-flex items-center px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-all">
                            Request Config Quote
                        </Link>
                    </motion.div>
                </div>
            </div>

            <main className="flex-grow">
                {/* Specs Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Enterprise-Grade <span className="text-primary">Hardware</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Top-tier specifications for professional workflows</p>
                    </div>

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

                {/* Services Section */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative h-[500px] rounded-[4rem] overflow-hidden shadow-2xl">
                                <Image src="/banner.jpeg" fill className="object-cover" alt="IT Setup" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <p className="text-sm font-black uppercase tracking-widest text-primary mb-2">Setup Anywhere</p>
                                    <p className="text-2xl font-bold">Fast Deployment & Configuration</p>
                                </div>
                            </div>

                            <div className="space-y-12">
                                <h2 className="text-4xl font-black leading-tight">Tailored Solutions for <span className="text-primary italic">Every Need</span></h2>
                                <div className="space-y-8">
                                    {services.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="flex gap-6 group"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                                <Zap className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Support CTA */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-slate-900 rounded-[4rem] p-16 flex flex-col items-center text-center text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
                            <h2 className="text-4xl font-black mb-6 relative z-10">Need a Specific <span className="text-primary italic">Configuration?</span></h2>
                            <p className="text-slate-400 text-lg max-w-2xl mb-12 relative z-10">
                                Talk to our IT consultants about custom RAM, GPU, or storage requirements for your specific software needs.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 relative z-10">
                                <Link href="/contact" className="bg-primary text-white px-12 py-5 rounded-2xl font-black shadow-xl shadow-primary/30 hover:scale-105 transition-all">
                                    Discuss Requirements
                                </Link>
                                <a href="tel:+919385417594" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all">
                                    Call Now
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
