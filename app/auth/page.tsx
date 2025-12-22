"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, Loader2, ArrowRight, Github, Eye, EyeOff } from "lucide-react"

export default function AuthPage() {
    const [isLogin, setIsLogin] = React.useState(true)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const router = useRouter()

    async function handleAuth(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
                throw new Error("Supabase is not configured. Please add your project URL and API key to .env.local")
            }
            const { error } = isLogin
                ? await supabase.auth.signInWithPassword({ email, password })
                : await supabase.auth.signUp({ email, password })

            if (error) throw error
            router.push('/')
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
                    <h1 className="text-4xl font-black tracking-tight mb-2">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-slate-500 font-medium">
                        {isLogin ? "Enter your details to access your gear." : "Join PSV IT Solutions for premium rentals."}
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl">
                    <form onSubmit={handleAuth} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-400">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 pl-12 pr-6 py-4 rounded-2xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none font-medium text-sm"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-400">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 pl-12 pr-12 py-4 rounded-2xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none font-medium text-sm"
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

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 text-red-500 text-sm font-bold">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>{isLogin ? "Sign In" : "Get Started"}</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="w-full text-center text-sm font-bold text-slate-500 hover:text-primary transition-colors"
                        >
                            {isLogin ? "Need an account? Create one" : "Already have an account? Sign In"}
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Secure Authentication by Supabase
                </p>
            </motion.div>
        </div>
    )
}
