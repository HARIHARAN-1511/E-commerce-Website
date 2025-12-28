"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function Hero() {
    return (
        <div className="relative min-h-[calc(100vh-5rem)] flex items-center py-12 overflow-hidden bg-white">
            {/* Base Background Image Layer */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src="/banner.jpeg"
                    alt="IT Infrastructure"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Diagonal Dark Overlay Layer */}
            <div
                className="absolute inset-0 z-10 bg-slate-950/90"
                style={{
                    clipPath: 'polygon(0 0, 65% 0, 35% 100%, 0% 100%)'
                }}
            />

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-white">
                            Empowering Your Business with <span className="text-indigo-400 italic">Smart IT</span> Solutions
                        </h1>

                        <p className="text-lg text-slate-100 mb-10 leading-relaxed max-w-lg font-medium">
                            High-performance rentals for printers, copiers, computers, and surveillance systems.
                            Get flexible plans, fast delivery, and expert support.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-20">
                            <Link href="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95">
                                <span>Get Free Quote</span>
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Features as Buttons */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center space-x-4 bg-white border-2 border-slate-100 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-default group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xl font-black text-slate-900 leading-tight">100%</p>
                            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Certified Equipment</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center space-x-4 bg-white border-2 border-slate-100 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-default group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xl font-black text-slate-900 leading-tight">24/7</p>
                            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Expert Support</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center space-x-4 bg-white border-2 border-slate-100 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-default group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xl font-black text-slate-900 leading-tight">Instantly</p>
                            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Fast Delivery</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
