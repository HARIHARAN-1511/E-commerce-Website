"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import { useCart } from "@/store/use-cart"
import Image from "next/image"
import Link from "next/link"

interface CartDrawerProps {
    isOpen: boolean
    onCloseAction: () => void
}

export function CartDrawer({ isOpen, onCloseAction }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCloseAction}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tight">Your Cart</h2>
                                    <p className="text-xs text-slate-500 font-bold uppercase">{totalItems()} Items Selected</p>
                                </div>
                            </div>
                            <button
                                onClick={onCloseAction}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                                            <Image src={item.image_url || '/placeholder.jpg'} alt={item.name} fill className="object-cover" unoptimized />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between mb-1">
                                                <h3 className="font-bold text-slate-900 line-clamp-1">{item.name}</h3>
                                                <span className="font-black text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3 uppercase font-bold">{item.category}</p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center bg-slate-100 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                                                    >
                                                        <Minus className="w-3 x-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                                                    >
                                                        <Plus className="w-3 x-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors p-2"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBag className="w-10 h-10 text-slate-400" />
                                    </div>
                                    <p className="font-bold text-lg">Your cart is empty</p>
                                    <p className="text-sm">Start adding some premium gear!</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Subtotal</span>
                                        <span>₹{totalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-bold uppercase text-xs">Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-black pt-2 text-slate-900 border-t border-slate-100">
                                        <span>Total</span>
                                        <span>₹{totalPrice().toFixed(2)}</span>
                                    </div>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={onCloseAction}
                                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]"
                                >
                                    <span>Checkout Now</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <p className="text-center mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                    Secure Checkout Powered by PSV IT Solutions
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
