"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Laptop, Printer, Scan, Copy as Copier, ShieldCheck, ShoppingCart, User, LogOut } from "lucide-react"
import { useCart } from "@/store/use-cart"
import { CartDrawer } from "@/components/shop/cart-drawer"
import { useAuth } from "@/store/use-auth"

const rentals = [
    { name: "Computer/Laptop", href: "/rentals/computers", icon: Laptop },
    { name: "Printer", href: "/rentals/printers", icon: Printer },
    { name: "Scanner", href: "/rentals/scanners", icon: Scan },
    { name: "Copier", href: "/rentals/copiers", icon: Copier },
    { name: "Surveillance", href: "/rentals/surveillance", icon: ShieldCheck },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isCartOpen, setIsCartOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    const totalItems = useCart((state) => state.totalItems())
    const { user, signOut } = useAuth()

    React.useEffect(() => {
        setMounted(true)
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-effect shadow-lg py-2" : "bg-transparent py-4"}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center group">
                            <Image
                                src="/full-logo.jpg"
                                alt="PSV IT & Office Solution"
                                width={180}
                                height={40}
                                className="h-10 w-auto object-contain brightness-105"
                                priority
                            />
                        </Link>

                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-sm font-bold text-slate-700 hover:text-primary transition-colors">Home</Link>
                            <Link href="/about" className="text-sm font-bold text-slate-700 hover:text-primary transition-colors">About Us</Link>

                            <div className="relative group">
                                <button className="flex items-center space-x-1 text-sm font-bold text-slate-700 hover:text-primary transition-colors">
                                    <span>Rentals</span>
                                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="glass-effect rounded-xl shadow-xl p-2 border border-border">
                                        {rentals.map((item) => (
                                            <Link key={item.name} href={item.href} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group/item">
                                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                                    <item.icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">{item.name}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Link href="/shop" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">Shop</Link>

                            <div className="h-6 w-px bg-slate-200 mx-2" />

                            {/* Cart Toggle */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 text-slate-700 hover:text-primary transition-colors group"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {mounted && totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg group-hover:scale-110 transition-transform">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Auth Toggle */}
                            {mounted && user ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 group cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-bold hidden lg:block">{user.email?.split('@')[0]}</span>
                                    </div>
                                    <button onClick={() => signOut()} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : mounted ? (
                                <Link href="/auth" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95">
                                    Sign In
                                </Link>
                            ) : null}
                        </div>

                        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden glass-effect border-t border-border">
                            <div className="px-4 py-6 space-y-4">
                                <Link href="/" className="block text-lg font-medium">Home</Link>
                                <Link href="/about" className="block text-lg font-medium">About Us</Link>
                                <div className="space-y-2">
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Rentals</p>
                                    {rentals.map((item) => (
                                        <Link key={item.name} href={item.href} className="block py-2 text-base font-medium hover:text-primary">{item.name}</Link>
                                    ))}
                                </div>
                                <Link href="/shop" className="block text-lg font-medium text-emerald-600">Shop</Link>
                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <button onClick={() => { setIsCartOpen(true); setIsOpen(false); }} className="flex items-center gap-2 font-bold">
                                        <ShoppingCart className="w-5 h-5" /> Cart ({totalItems})
                                    </button>
                                    {user ? (
                                        <button onClick={() => signOut()} className="text-red-500 font-bold flex items-center gap-2">
                                            <LogOut className="w-5 h-5" /> Logout
                                        </button>
                                    ) : (
                                        <Link href="/auth" className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Sign In</Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <CartDrawer isOpen={isCartOpen} onCloseAction={() => setIsCartOpen(false)} />
        </>
    )
}
