import { ProductForm } from "@/components/admin/product-form"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
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
                <h1 className="text-4xl font-black text-slate-900">Add New <span className="text-primary italic">Product</span></h1>
            </div>

            <ProductForm />
        </div>
    )
}
