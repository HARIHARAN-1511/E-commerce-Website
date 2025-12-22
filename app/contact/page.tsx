"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Contact Hero */}
            <div className="relative min-h-[40vh] flex items-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-30">
                    <Image
                        src="/banner.jpeg"
                        alt="Contact PSV IT"
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
                            Get in <span className="text-primary italic">Touch</span>
                        </h1>
                        <p className="text-lg text-slate-300 max-w-md">
                            Ready to transform your business with premium IT equipment? Contact us today for personalized solutions.
                        </p>
                    </motion.div>
                </div>
            </div>

            <main className="flex-grow py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100"
                            >
                                <h2 className="text-3xl font-black mb-8">Send us a <span className="text-primary">Message</span></h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                                            <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                                            <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="john@company.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                                        <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
                                            <option>Printer Rental</option>
                                            <option>Computer Rental</option>
                                            <option>Scanner Rental</option>
                                            <option>Copier Rental</option>
                                            <option>Surveillance Systems</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Message</label>
                                        <textarea rows={6} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="How can we help you?" />
                                    </div>
                                    <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 active:scale-95">
                                        <span>Send Message</span>
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </motion.div>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="space-y-8">
                            {/* Contact Cards */}
                            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl space-y-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />

                                <h3 className="text-2xl font-black relative z-10">Contact <span className="text-primary italic">Information</span></h3>

                                <div className="space-y-8 relative z-10">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                            <MapPin className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Office Address</p>
                                            <p className="text-sm font-medium leading-relaxed">No.36/71, 2nd floor, Thambuchetty Street, Chennai - 600001, Tamil Nadu</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                            <Phone className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Phone Numbers</p>
                                            <p className="text-sm font-medium leading-relaxed">+91 9385417594<br />+91 9159145644</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                            <Mail className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Address</p>
                                            <p className="text-sm font-medium leading-relaxed">info@psvitsolution.in</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                            <Clock className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Business Hours</p>
                                            <p className="text-sm font-medium leading-relaxed">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Need Help? Card */}
                            <div className="bg-primary rounded-[3rem] p-10 text-white shadow-xl shadow-primary/20">
                                <h3 className="text-xl font-black mb-4">Need Help Fast?</h3>
                                <p className="text-white/80 text-sm font-medium leading-relaxed mb-8">
                                    Equipment breakdown? Call our emergency support hotline for immediate assistance.
                                </p>
                                <div className="space-y-4">
                                    <a href="tel:+919159145644" className="block w-full bg-white text-primary py-4 rounded-2xl font-black text-center hover:bg-slate-50 transition-colors shadow-lg shadow-black/10">
                                        Call Emergency
                                    </a>
                                    <a href="https://wa.me/919385417594" className="block w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-center hover:bg-emerald-600 transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2">
                                        <MessageSquare className="w-5 h-5 fill-current" />
                                        WhatsApp Chat
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
