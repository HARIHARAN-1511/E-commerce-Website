"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Heart, Info, Plus, Minus } from "lucide-react"
import { Product } from "@/types"
import { useCart } from "@/store/use-cart"
import { useState } from "react"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCart((state) => state.addItem)
    const items = useCart((state) => state.items)
    const updateQuantity = useCart((state) => state.updateQuantity)

    const cartItem = items.find(i => i.id === product.id)
    const [isHovered, setIsHovered] = useState(false)
    const [mounted, setMounted] = useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Category Badge */}
            <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest">
                {product.category}
            </span>

            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-slate-100">
                <Image
                    src={product.image_url || '/placeholder-product.jpg'}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                />

                {/* Quick Action Overlay */}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <Heart className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <Info className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed h-10">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-2xl font-black text-slate-900">
                            ${product.price}
                        </span>
                        {product.is_rental && (
                            <span className="block text-[10px] text-primary font-bold uppercase">
                                Rental: ${product.rental_price_monthly}/mo
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {!mounted || !cartItem ? (
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => addItem(product)}
                                className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add</span>
                            </motion.button>
                        ) : (
                            <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-3">
                                <button
                                    onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-bold text-sm w-4 text-center">{cartItem.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
