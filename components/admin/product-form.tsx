"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/types"
import { useRouter } from "next/navigation"
import { Loader2, Save, X, Image as ImageIcon, Info, DollarSign, Package, Settings } from "lucide-react"
import { motion } from "framer-motion"

interface ProductFormProps {
    initialData?: Product
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [formData, setFormData] = React.useState<Partial<Product>>(
        initialData || {
            name: "",
            description: "",
            price: 0,
            category: "computers",
            image_url: "",
            stock_quantity: 0,
            is_rental: false,
            rental_price_monthly: 0,
            specifications: {}
        }
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (initialData?.id) {
                const { error } = await (supabase
                    .from('products') as any)
                    .update(formData)
                    .eq('id', initialData.id)
                if (error) throw error
            } else {
                const { error } = await (supabase
                    .from('products') as any)
                    .insert([formData])
                if (error) throw error
            }
            router.push('/admin/products')
            router.refresh()
        } catch (err: any) {
            alert("Error saving product: " + err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-12 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Essential Info */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                <Info className="w-4 h-4" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Basic Information</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                                    placeholder="High Performance Laptop"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                                    placeholder="Describe the product features..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Purchase Price (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Stock Quantity</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.stock_quantity}
                                        onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="p-8 rounded-[2.5rem] bg-slate-50 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Enable for Rental</p>
                                            <p className="text-xs font-bold text-slate-500">Allow customers to rent this item.</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, is_rental: !formData.is_rental })}
                                        className={`w-14 h-8 rounded-full transition-all relative ${formData.is_rental ? "bg-emerald-500" : "bg-slate-200"}`}
                                    >
                                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${formData.is_rental ? "left-7" : "left-1"}`} />
                                    </button>
                                </div>

                                {formData.is_rental && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="pt-4 border-t border-slate-200"
                                    >
                                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Monthly Rental Price (₹)</label>
                                        <input
                                            type="number"
                                            required={formData.is_rental}
                                            value={formData.rental_price || ''}
                                            onChange={(e) => setFormData({ ...formData, rental_price: Number(e.target.value) })}
                                            className="w-full bg-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                                        />
                                    </motion.div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                                    placeholder="Describe the product features and benefits..."
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <DollarSign className="w-4 h-4" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Pricing & Inventory</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Purchase Price (₹)</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Stock Quantity</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.stock_quantity}
                                    onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50 space-y-6">
                            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                                <div>
                                    <p className="font-black text-slate-900">Enable Rental Option</p>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Allow customers to rent this item</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, is_rental: !formData.is_rental })}
                                    className={`w-14 h-8 rounded-full transition-all relative ${formData.is_rental ? 'bg-primary' : 'bg-slate-300'}`}
                                >
                                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${formData.is_rental ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>

                            {formData.is_rental && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="overflow-hidden"
                                >
                                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Monthly Rental Price (₹)</label>
                                    <input
                                        type="number"
                                        value={formData.rental_price_monthly}
                                        onChange={(e) => setFormData({ ...formData, rental_price_monthly: parseFloat(e.target.value) })}
                                        className="w-full bg-white border-2 border-primary/20 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-black"
                                    />
                                </motion.div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column: Media & Meta */}
                <div className="space-y-8">
                    <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <ImageIcon className="w-4 h-4" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Product Image</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="relative aspect-square rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center group">
                                {formData.image_url ? (
                                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                                        <p className="text-xs font-bold text-slate-400 uppercase">Input URL Below</p>
                                    </>
                                )}
                            </div>
                            <input
                                type="text"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-bold font-mono"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </section>

                    <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                                <Settings className="w-4 h-4" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Organization</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-black appearance-none"
                            >
                                <option value="computers">Computers</option>
                                <option value="printers">Printers</option>
                                <option value="scanners">Scanners</option>
                                <option value="copiers">Copiers</option>
                                <option value="surveillance">Surveillance</option>
                                <option value="spare-parts">Spare Parts</option>
                            </select>
                        </div>
                    </section>

                    <div className="flex flex-col gap-4">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Save className="w-6 h-6" /> Save Product</>}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full bg-white text-slate-400 py-5 rounded-[2rem] font-bold shadow-sm border border-slate-100 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <X className="w-5 h-5" /> Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
