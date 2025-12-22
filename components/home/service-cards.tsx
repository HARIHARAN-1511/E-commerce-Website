"use client"

import * as React from "react"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"

interface ServiceCardProps {
    title: string
    description: string
    iconName: string
    color: string
}

export function ServiceCard({ title, description, iconName, color }: ServiceCardProps) {
    // @ts-ignore
    const Icon = Icons[iconName] || Icons.HelpCircle

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300"
        >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${color}`}>
                <Icon className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
                {description}
            </p>

            <div className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn More</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </motion.div>
    )
}
