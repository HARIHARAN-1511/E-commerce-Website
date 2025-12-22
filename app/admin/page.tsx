"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/types"
import { Package, TrendingUp, ShoppingBag, CreditCard, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AdminDashboard() {
    const [stats, setStats] = React.useState({
        totalProducts: 0,
        rentalsCount: 0,
        categoriesCount: 0
    })
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchStats() {
            const { data: products } = await supabase.from('products').select('*') as { data: Product[] | null }
            if (products) {
                const rentals = products.filter(p => p.is_rental).length
                const categories = new Set(products.map(p => p.category)).size
                setStats({
                    totalProducts: products.length,
                    rentalsCount: rentals,
                    categoriesCount: categories
                })
            }
            setLoading(false)
        }
        fetchStats()
    }, [])

    const cards = [
        { label: "Total Products", value: stats.totalProducts, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Active Rentals", value: stats.rentalsCount, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Categories", value: stats.categoriesCount, icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50" }
    ]

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Dashboard</h1>
                    <p className="text-slate-500 font-medium">Welcome back to the terminal, Admin.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/30 hover:scale-105 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add New Product
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center ${card.color} mb-6`}>
                            <card.icon className="w-7 h-7" />
                        </div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1">{card.label}</p>
                        <h3 className="text-4xl font-black text-slate-900">{loading ? "..." : card.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-xl font-black text-slate-900">Recent Activity</h3>
                    <TrendingUp className="w-5 h-5 text-slate-400" />
                </div>
                <div className="p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6">
                        <Package className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-medium italic">Monitor your shop items and inventory here.</p>
                </div>
            </div>
        </div>
    )
}
