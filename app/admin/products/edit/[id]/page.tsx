"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/types"
import { ProductForm } from "@/components/admin/product-form"
import { ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function EditProductPage() {
    const params = useParams()
    const [product, setProduct] = React.useState<Product | null>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchProduct() {
            const { id } = params
            if (!id || typeof id !== 'string') return

            const { data } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single()

            if (data) setProduct(data)
            setLoading(false)
        }
        fetchProduct()
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="p-12 text-center bg-white rounded-[3rem] border border-slate-100">
                <p className="text-xl font-black text-slate-900 mb-4">Product not found</p>
                <Link href="/admin/products" className="text-primary font-bold">Return to product list</Link>
            </div>
        )
    }

    return (
        <div className="space-y-12">
            <div>
                <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-primary transition-all mb-4 group"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Products
                </Link>
                <h1 className="text-4xl font-black text-slate-900">Edit <span className="text-primary italic">{product.name}</span></h1>
            </div>

            <ProductForm initialData={product} />
        </div>
    )
}
