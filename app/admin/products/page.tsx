"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/types"
import { Package, Search, Plus, Edit2, Trash2, Filter, Loader2, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function AdminProductsPage() {
    const [products, setProducts] = React.useState<Product[]>([])
    const [loading, setLoading] = React.useState(true)
    const [search, setSearch] = React.useState("")
    const [isDeleting, setIsDeleting] = React.useState<string | null>(null)

    const fetchProducts = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false }) as { data: Product[] | null, error: any }

        if (!error && data) setProducts(data)
        setLoading(false)
    }

    React.useEffect(() => {
        fetchProducts()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return

        setIsDeleting(id)
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id)

        if (!error) {
            setProducts(products.filter(p => p.id !== id))
        } else {
            alert("Error deleting product: " + error.message)
        }
        setIsDeleting(null)
    }

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Products</h1>
                    <p className="text-slate-500 font-medium">Manage your inventory and shop listings.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/30 hover:scale-105 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    New Product
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-4 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all">
                    <Filter className="w-5 h-5" />
                    Filters
                </button>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                        <p className="font-bold">Loading products...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                        <Package className="w-12 h-12 mb-4 opacity-20" />
                        <p className="font-bold text-lg">No products found</p>
                        <p className="text-sm">Try searching for something else or add a new product.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-500">Product</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-500">Category</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-500">Price</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-500">Stock</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filtered.map((product) => (
                                        <motion.tr
                                            key={product.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                                                        {product.image_url ? (
                                                            <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                                                        ) : (
                                                            <Package className="w-6 h-6 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{product.name}</p>
                                                        <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                                            {product.is_rental ? (
                                                                <span className="text-emerald-500 bg-emerald-50 px-2 rounded-md">Rental Available</span>
                                                            ) : (
                                                                <span className="text-blue-500 bg-blue-50 px-2 rounded-md">Purchase Only</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 font-black text-slate-900">
                                                ₹{product.price.toLocaleString()}
                                            </td>
                                            <td className="px-8 py-6 font-bold text-slate-500">
                                                {product.stock_quantity} units
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                    <Link
                                                        href={`/admin/products/edit/${product.id}`}
                                                        className="p-2 hover:bg-white hover:text-primary rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-200"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        disabled={isDeleting === product.id}
                                                        className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all shadow-sm border border-transparent hover:border-red-100 disabled:opacity-50"
                                                    >
                                                        {isDeleting === product.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
