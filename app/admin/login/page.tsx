"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, Loader2, ArrowRight, ShieldAlert, Eye, EyeOff } from "lucide-react"
import { ADMIN_CONFIG } from "@/lib/config"

export default function AdminLoginPage() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [isResetting, setIsResetting] = React.useState(false)
    const [resetSent, setResetSent] = React.useState(false)
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

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // Only allow admins to request reset
            if (!ADMIN_CONFIG.isAdmin(email)) {
                throw new Error("Access denied. Invalid admin email.")
            }

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`,
            })
            if (error) throw error
            setResetSent(true)
        } catch (err: any) {
            setError(err.message)
        } finally {
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
                        {isResetting ? "Admin Reset" : "Admin Portal"}
                    </h1>
                    <p className="text-slate-500 font-medium">
                        {isResetting ? "Request a password reset link." : "Authorized Access Only"}
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl">
                    {resetSent ? (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Email Sent</h3>
                            <p className="text-slate-500 text-sm mb-6">
                                If <span className="font-bold text-slate-900">{email}</span> is an admin, you'll receive a link shortly.
                            </p>
                            <button
                                onClick={() => {
                                    setIsResetting(false)
                                    setResetSent(false)
                                }}
                                className="text-primary font-bold text-sm hover:underline"
                            >
                                Back to Login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={isResetting ? handleResetPassword : handleLogin} className="space-y-6">
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

                            {!isResetting && (
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="text-sm font-bold uppercase tracking-wide text-slate-400">Secret Key</label>
                                        <button
                                            type="button"
                                            onClick={() => setIsResetting(true)}
                                            className="text-xs font-bold text-primary hover:underline"
                                        >
                                            Forgot?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-slate-50 border border-transparent text-slate-900 pl-12 pr-12 py-4 rounded-2xl focus:border-primary focus:bg-white transition-all outline-none font-medium text-sm"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

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
                                        <span>{isResetting ? "Request Access" : "Enter Dashboard"}</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {isResetting && (
                                <button
                                    type="button"
                                    onClick={() => setIsResetting(false)}
                                    className="w-full text-center text-sm font-bold text-slate-500 hover:text-primary transition-colors mt-4"
                                >
                                    Cancel and Sign In
                                </button>
                            )}
                        </form>
                    )}
                </div>

                <p className="mt-8 text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Corporate Terminal Layer
                </p>
            </motion.div>
        </div>
    )
}
