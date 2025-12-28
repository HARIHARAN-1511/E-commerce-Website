"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/types"
import { useRouter } from "next/navigation"
import { Loader2, Save, X, Image as ImageIcon, Info, DollarSign, Package, Settings, ShieldCheck, Upload, Trash2, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ProductFormProps {
    initialData?: Product
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [uploading, setUploading] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = React.useState(false)

    const [formData, setFormData] = React.useState<Partial<Product>>(
        initialData || {
            name: "",
            description: "",
            price: 0,
            category: "computers",
            image_url: "",
            images: [],
            stock_quantity: 0,
            is_rental: false,
            rental_price_monthly: 0,
            specifications: {}
        }
    )

    const handleUpload = async (files: FileList | File[]) => {
        setUploading(true)
        const newImages: string[] = [...(formData.images || [])]
        
        for (const file of Array.from(files)) {
            if (!file.type.startsWith('image/')) continue

            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
            const filePath = `product-images/${fileName}`

            try {
                const { error: uploadError, data } = await supabase.storage
                    .from('products')
                    .upload(filePath, file)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('products')
                    .getPublicUrl(filePath)

                newImages.push(publicUrl)
                
                // Set first image as main image if none exists
                if (!formData.image_url) {
                    setFormData(prev => ({ ...prev, image_url: publicUrl }))
                }
            } catch (err: any) {
                console.error("Upload error:", err.message)
                alert("Failed to upload image: " + err.message)
            }
        }

        setFormData(prev => ({ ...prev, images: newImages }))
        setUploading(false)
    }

    const handlePaste = async (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items
        const files: File[] = []
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile()
                if (file) files.push(file)
            }
        }
        if (files.length > 0) {
            handleUpload(files)
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files)
        }
    }

    const removeImage = (index: number) => {
        const newImages = [...(formData.images || [])]
        const removed = newImages.splice(index, 1)[0]
        
        const update: Partial<Product> = { images: newImages }
        if (formData.image_url === removed) {
            update.image_url = newImages[0] || ""
        }
        
        setFormData(prev => ({ ...prev, ...update }))
    }

    const setMainImage = (url: string) => {
        setFormData(prev => ({ ...prev, image_url: url }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const submitData = {
                ...formData,
                images: formData.images || [],
                specifications: formData.specifications || {}
            }

            if (initialData?.id) {
                const { error } = await supabase
                    .from('products')
                    .update(submitData)
                    .eq('id', initialData.id)
                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('products')
                    .insert([submitData])
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
        <form 
            onSubmit={handleSubmit} 
            onPaste={handlePaste}
            className="space-y-12 max-w-5xl"
        >
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
                                    rows={5}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 resize-none"
                                    placeholder="Describe the product features and benefits..."
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
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Stock Quantity</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.stock_quantity}
                                        onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-900"
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

                                <AnimatePresence>
                                    {formData.is_rental && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="pt-6 border-t border-slate-200 space-y-4"
                                        >
                                            <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Monthly Rental Price (₹)</label>
                                            <input
                                                type="number"
                                                required={formData.is_rental}
                                                value={formData.rental_price_monthly}
                                                onChange={(e) => setFormData({ ...formData, rental_price_monthly: Number(e.target.value) })}
                                                className="w-full bg-white border-2 border-emerald-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all font-black text-slate-900"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <ImageIcon className="w-4 h-4" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Product Gallery</h3>
                        </div>

                        <div 
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`relative min-h-[200px] rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 ${
                                dragActive ? "border-primary bg-primary/5" : "border-slate-200 bg-slate-50"
                            }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => e.target.files && handleUpload(e.target.files)}
                                className="hidden"
                            />
                            
                            {uploading ? (
                                <div className="flex flex-col items-center gap-4">
                                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                    <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">Uploading images...</p>
                                </div>
                            ) : (
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto text-slate-400">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900">Drag & drop or paste images here</p>
                                        <p className="text-sm font-bold text-slate-400">Support for multiple files and clipboard pasting</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-white border border-slate-200 px-6 py-3 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2 mx-auto"
                                    >
                                        <Plus className="w-4 h-4" /> Browse Files
                                    </button>
                                </div>
                            )}
                        </div>

                        {formData.images && formData.images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {formData.images.map((url, idx) => (
                                    <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                                        <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setMainImage(url)}
                                                className={`p-2 rounded-lg transition-all ${formData.image_url === url ? "bg-emerald-500 text-white" : "bg-white text-slate-900 hover:bg-emerald-50"}`}
                                                title="Set as Main Image"
                                            >
                                                <ImageIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="p-2 rounded-lg bg-white text-red-500 hover:bg-red-50 transition-all"
                                                title="Remove Image"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {formData.image_url === url && (
                                            <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">
                                                Main
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                {/* Right Column: Meta */}
                <div className="space-y-8">
                    <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                                <Settings className="w-4 h-4" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Organization</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-black appearance-none text-slate-900"
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
                            disabled={loading || uploading}
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

                    <div className="p-6 rounded-[2rem] bg-indigo-50 border border-indigo-100">
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Info className="w-3 h-3" /> Pro Tip
                        </p>
                        <p className="text-sm font-medium text-indigo-900 leading-relaxed">
                            You can paste images directly from your clipboard anywhere on this form!
                        </p>
                    </div>
                </div>
            </div>
        </form>
    )
}
