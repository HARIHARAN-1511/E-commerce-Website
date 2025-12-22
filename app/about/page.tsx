"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"
import { ShieldCheck, Clock, Truck, Banknote, Users, Layers, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const stats = [
    { label: "Quality Service", icon: CheckCircle2, description: "Top-quality equipment and exceptional service to ensure smooth operations." },
    { label: "24/7 Support", icon: Clock, description: "Our team is always available for technical assistance whenever you need it." },
    { label: "Fast Delivery", icon: Truck, description: "Free delivery and professional installation to get you running quickly." },
    { label: "Flexible Pricing", icon: Banknote, description: "Customizable rental packages with competitive rates and flexible terms." },
    { label: "Expert Team", icon: Users, description: "Experienced professionals providing consultancy for all your IT needs." },
    { label: "Wide Range", icon: Layers, description: "Latest IT equipment from leading brands to meet diverse requirements." },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* About Hero */}
            <div className="relative min-h-[40vh] flex items-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-30">
                    <Image
                        src="/banner.jpeg"
                        alt="About PSV IT"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div
                    className="absolute inset-0 z-10 bg-slate-950/90"
                    style={{ clipPath: 'polygon(0 0, 70% 0, 40% 100%, 0% 100%)' }}
                />
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                            About <span className="text-primary italic">PSV IT Solutions</span>
                        </h1>
                        <p className="text-lg text-slate-300 max-w-md">
                            Reputed for commitment to operational excellence and world-class IT solutions.
                        </p>
                    </motion.div>
                </div>
            </div>

            <main className="flex-grow">
                {/* Company Story Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">Our Company <span className="text-primary italic">Story</span></h2>
                                <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                                    <p>
                                        PSV IT Office Solutions is an organization of motivated and passionate professionals reputed for their commitment to achieving operational excellence, delivering world class solutions and achieving customer satisfaction.
                                    </p>
                                    <p>
                                        PSVIT has made a pertinent impact on all markets forayed and every industry segment touched upon. We are well known for our broad range of products including the latest printers, scanners, photocopiers, printer rental and copier rental services.
                                    </p>
                                    <p>
                                        Our customers belong to all business segments and verticals. This has helped us achieve deep expertise in every sector and achieve customer delight at every step. Our extensive range and consultancy-based approach helps our clients achieve economy, choice and value, thereby ensuring their success.
                                    </p>
                                </div>
                            </motion.div>
                            <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl">
                                <Image
                                    src="/banner.jpeg"
                                    alt="Our Team"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Grid */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">Why Choose <span className="text-primary">PSV IT Solutions?</span></h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Commitment to quality, reliability, and satisfaction</p>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {stats.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.label}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
