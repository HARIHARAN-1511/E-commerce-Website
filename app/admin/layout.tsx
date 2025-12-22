"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { ADMIN_CONFIG } from "@/lib/config"
import { Loader2, LayoutDashboard, Package, LogOut, Globe, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = React.useState(true)
    const [authorized, setAuthorized] = React.useState(false)
    const router = useRouter()
    const pathname = usePathname()

    React.useEffect(() => {
        const checkAdmin = async () => {
            if (pathname === '/admin/login') {
                setLoading(false)
                return
            }

            const { data: { session } } = await supabase.auth.getSession()

            if (!session || !ADMIN_CONFIG.isAdmin(session.user.email)) {
                router.push('/admin/login')
            } else {
                setAuthorized(true)
            }
            setLoading(false)
        }

        checkAdmin()
    }, [pathname, router])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    if (!authorized) return null

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-50">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="font-black text-lg leading-tight text-slate-900">Admin</h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">PSV IT Solutions</p>
                    </div>
                </div>

                <nav className="flex-grow px-4 space-y-2 mt-4">
                    <Link
                        href="/admin"
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-bold group ${pathname === '/admin' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-bold group ${pathname.startsWith('/admin/products') ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}`}
                    >
                        <Package className="w-5 h-5" />
                        Products
                    </Link>
                </nav>

                <div className="p-4 space-y-2 border-t border-slate-100">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-6 py-4 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-primary transition-all font-bold"
                    >
                        <Globe className="w-5 h-5" />
                        View Site
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow ml-64 p-12 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
