"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, Loader2, ArrowRight, ShieldAlert } from "lucide-react"
import { ADMIN_CONFIG } from "@/lib/config"

export default function AdminLoginPage() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // First check if email is even whitelisted
            if (!ADMIN_CONFIG.isAdmin(email)) {
                throw new Error("Access denied. This email is not authorized for admin access.")
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) throw error

            // Final double check of the logged in user's email
            if (!ADMIN_CONFIG.isAdmin(data.user?.email)) {
                await supabase.auth.signOut()
                throw new Error("Access denied. Unauthorized administrator.")
            }

            router.push('/admin')
        } catch (err: any) {
            setError(err.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center text-primary mb-6">
                        <ShieldAlert className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900">
                        Admin Portal
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Authorized Access Only
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-400">Admin Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-transparent text-slate-900 pl-12 pr-6 py-4 rounded-2xl focus:border-primary focus:bg-white transition-all outline-none font-medium text-sm"
                                    placeholder="admin@psvitsolution.in"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-400">Secret Key</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-transparent text-slate-900 pl-12 pr-6 py-4 rounded-2xl focus:border-primary focus:bg-white transition-all outline-none font-medium text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 text-red-500 text-sm font-bold border border-red-100">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Enter Dashboard</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Corporate Terminal Layer
                </p>
            </motion.div>
        </div>
    )
}
