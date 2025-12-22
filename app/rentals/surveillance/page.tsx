"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"
import { ShieldCheck, Video, Globe, Moon, Radio, Monitor, CheckCircle2, Phone, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const solutionFeatures = [
    { title: "HD Video Quality", icon: Video, desc: "Crystal clear 1080p and 4K video recording with excellent low-light performance for 24/7 monitoring." },
    { title: "Remote Access", icon: Globe, desc: "Monitor your premises from anywhere using mobile apps and web interfaces with real-time alerts." },
    { title: "Night Vision", icon: Moon, desc: "Advanced infrared technology provides clear visibility even in complete darkness up to 100 feet." },
    { title: "Smart Detection", icon: ShieldCheck, desc: "Intelligent motion detection with customizable zones and instant notifications for suspicious activity." }
]

const cameraSystems = [
    {
        title: "Indoor Cameras",
        desc: "Discreet indoor surveillance cameras perfect for offices, retail stores, and indoor monitoring with wide-angle coverage.",
        features: ["360° Pan-Tilt-Zoom", "Two-way audio", "Compact design"]
    },
    {
        title: "Outdoor Cameras",
        desc: "Weather-resistant outdoor cameras with superior night vision and motion detection for perimeter security.",
        features: ["IP66 weatherproof", "100ft night vision", "Vandal resistant"]
    },
    {
        title: "Wireless Systems",
        desc: "Easy-to-install wireless camera systems with battery backup and cloud storage capabilities for flexible deployment.",
        features: ["WiFi connectivity", "Battery powered", "Cloud storage"]
    }
]

export default function SurveillancePage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="relative min-h-[60vh] flex items-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="/banner.jpeg"
                        alt="Surveillance Solutions"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div
                    className="absolute inset-0 z-10 bg-slate-950/90"
                    style={{ clipPath: 'polygon(0 0, 70% 0, 40% 100%, 0% 100%)' }}
                />
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Advanced <span className="text-primary italic">Surveillance</span> Systems
                        </h1>
                        <p className="text-lg text-slate-300 max-w-lg mb-10 font-medium">
                            Complete security solutions designed to protect your business assets, employees, and customers with cutting-edge technology.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact" className="bg-primary text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                                Get Security Quote
                            </Link>
                            <a href="tel:+919159145644" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black hover:bg-white/20 transition-all">
                                Call Specialist
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            <main className="flex-grow">
                {/* Features Grid */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                        <h2 className="text-4xl font-black mb-4">Complete Security <span className="text-primary italic">Solutions</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Protecting what matters most with smart technology</p>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {solutionFeatures.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:shadow-2xl transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Camera Systems */}
                <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <Image src="/banner.jpeg" fill className="object-cover" alt="Security Map" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-black mb-4">Our Camera <span className="text-primary italic">Systems</span></h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Tailored for different environments and security levels</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {cameraSystems.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="bg-white/5 backdrop-blur-xl p-10 rounded-[4rem] border border-white/10 hover:border-primary/50 transition-all flex flex-col"
                                >
                                    <h3 className="text-2xl font-black mb-6 text-primary">{item.title}</h3>
                                    <p className="text-slate-300 font-medium leading-relaxed mb-8 h-24">
                                        {item.desc}
                                    </p>
                                    <div className="mt-auto space-y-4">
                                        {item.features.map((feature, fidx) => (
                                            <div key={fidx} className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                                                <span className="text-sm font-bold text-slate-200">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Secure Today CTA */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-slate-50 rounded-[4rem] p-12 md:p-20 flex flex-col items-center text-center shadow-xl border border-slate-100">
                            <h2 className="text-4xl font-black mb-6">Secure Your <span className="text-primary">Business</span> Today</h2>
                            <p className="text-slate-500 font-medium text-lg max-w-2xl mb-12">
                                Don't wait for an incident. Get proactive with our premium surveillance systems and professional 24/7 monitoring services.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                                <a href="https://wa.me/919385417594" className="flex-1 bg-[#25D366] text-white py-5 rounded-2xl font-black shadow-xl shadow-[#25D366]/20 hover:scale-105 transition-all flex items-center justify-center gap-3">
                                    <MessageSquare className="w-5 h-5 fill-current" />
                                    Chat Now
                                </a>
                                <Link href="/contact" className="flex-1 bg-primary text-white py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                    Book Free Survey
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
