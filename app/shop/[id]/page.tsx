"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Product } from "@/types"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Loader2, ArrowLeft, ShoppingCart, ShieldCheck, Zap, Package, RefreshCcw } from "lucide-react"
import { useCart } from "@/store/use-cart"

export default function ProductDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [product, setProduct] = React.useState<Product | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [activeImage, setActiveImage] = React.useState<string>("")
    const addItem = useCart((state) => state.addItem)

    React.useEffect(() => {
        async function fetchProduct() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                setProduct(data)
                setActiveImage(data.image_url || (data.images?.[0] || ""))
            } catch (err) {
                console.error("Error fetching product:", err)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchProduct()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-black text-slate-900 mb-4">Product Not Found</h1>
                <button 
                    onClick={() => router.push('/shop')}
                    className="flex items-center gap-2 text-primary font-bold hover:underline"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Shop
                </button>
            </div>
        )
    }

    const gallery = product.images || [product.image_url].filter(Boolean)

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            
            <main className="flex-grow py-12 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-500 font-bold mb-12 hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
                        Back to Catalog
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Gallery Section */}
                        <div className="space-y-6">
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={activeImage || '/placeholder-product.jpg'}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-2"
                                            priority
                                            unoptimized
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {gallery.length > 1 && (
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                    {gallery.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                                                activeImage === img ? "border-primary ring-4 ring-primary/10 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${product.name} gallery ${idx}`}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col">
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                                        {product.category}
                                    </span>
                                    {product.is_rental && (
                                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                            Rental Available
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                                    {product.name}
                                </h1>
                            </div>

                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-5xl font-black text-slate-900">₹{product.price}</span>
                                {product.is_rental && (
                                    <span className="text-lg font-bold text-slate-500">
                                        or <span className="text-primary">₹{product.rental_price_monthly}</span>/month
                                    </span>
                                )}
                            </div>

                            <p className="text-lg text-slate-600 leading-relaxed mb-12">
                                {product.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-12">
                                <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Status</p>
                                        <p className="font-bold text-slate-900">{product.stock_quantity > 0 ? `${product.stock_quantity} units available` : 'Out of Stock'}</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Warranty</p>
                                        <p className="font-bold text-slate-900">1 Year Support</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <button 
                                    onClick={() => addItem(product)}
                                    className="flex-grow bg-primary text-white px-8 py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-4"
                                >
                                    <ShoppingCart className="w-6 h-6" /> Add to Cart
                                </button>
                                {product.is_rental && (
                                    <button className="flex-grow bg-white text-slate-900 border-2 border-slate-200 px-8 py-6 rounded-[2rem] font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-4">
                                        <RefreshCcw className="w-6 h-6" /> Rent Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
