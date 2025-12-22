"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/types"
import { ProductCard } from "@/components/shop/product-card"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Search, Loader2 } from "lucide-react"

export default function ShopPage() {
    const [products, setProducts] = React.useState<Product[]>([])
    const [loading, setLoading] = React.useState(true)
    const [search, setSearch] = React.useState("")
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        async function fetchProducts() {
            try {
                if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
                    setError("Supabase is not configured. Please add your credentials to .env.local")
                    setLoading(false)
                    return
                }

                const { data, error } = await supabase
                    .from('products')
                    .select('*')

                if (error) throw error
                setProducts(data || [])
            } catch (err: any) {
                console.error("Error fetching products:", err)
                setError(err.message || "Failed to load products. Make sure you've run the SQL schema in your Supabase dashboard.")
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Shop Hero Section */}
            <div className="relative min-h-[50vh] flex items-center overflow-hidden bg-white">
                {/* Base Background Image Layer */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <Image
                        src="/banner.jpeg"
                        alt="Shop Header"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Diagonal Dark Overlay Layer */}
                <div
                    className="absolute inset-0 z-10 bg-slate-950/90"
                    style={{
                        clipPath: 'polygon(0 0, 70% 0, 40% 100%, 0% 100%)'
                    }}
                />

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                                Premium <span className="text-primary italic">IT Gear</span> Catalog
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 max-w-md">
                                Rent or purchase high-performance equipment. Filter by category or search for specific models.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <main className="flex-grow py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search & Filter Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 -mt-32 relative z-30">
                        <div className="relative w-full md:w-[500px] group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search products, brands, models..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white pl-14 pr-8 py-5 rounded-3xl border-2 border-slate-100 shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-lg"
                            />
                        </div>

                        {/* Feature Stats as Buttons (Reduced Version for Shop) */}
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-md border border-slate-200 p-3 rounded-2xl shadow-lg">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <Loader2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">Live Stock</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-500">Real-time update</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center min-h-[400px]">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                            <p className="mt-4 text-slate-500 font-black text-xl">Bootstrapping Catalog...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-red-50 rounded-[3rem] border-2 border-dashed border-red-200">
                            <p className="text-red-500 font-bold text-xl mb-4">{error}</p>
                            <p className="text-slate-500 max-w-md mx-auto mb-8">
                                Please check your <code className="bg-white px-2 py-1 rounded">.env.local</code> file and ensure you have run the SQL schema in your Supabase dashboard.
                            </p>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
                            <p className="text-slate-400 font-black text-2xl">No products found for "{search}"</p>
                            <button
                                onClick={() => setSearch("")}
                                className="mt-6 bg-slate-100 px-8 py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
