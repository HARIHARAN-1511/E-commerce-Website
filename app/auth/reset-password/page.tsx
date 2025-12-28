"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Loader2, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react"

export default function ResetPasswordPage() {
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState(false)
    const router = useRouter()

    async function handleReset(e: React.FormEvent) {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.updateUser({ password })
            if (error) throw error
            setSuccess(true)
            setTimeout(() => {
                router.push('/auth')
            }, 3000)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl text-center"
                >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-black mb-4">Password Reset!</h1>
                    <p className="text-slate-500 font-medium mb-8">
                        Your password has been successfully updated. Redirecting you to login...
                    </p>
                    <button
                        onClick={() => router.push('/auth')}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all"
                    >
                        Go to Login Now
                    </button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black tracking-tight mb-2">Set New Password</h1>
                    <p className="text-slate-500 font-medium">
                        Secure your account with a new strong password.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl">
                    <form onSubmit={handleReset} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-500">New Password</label>
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
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-400">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-slate-50 pl-12 pr-12 py-4 rounded-2xl border border-transparent focus:border-primary focus:bg-white transition-all outline-none font-medium text-sm"
                                    placeholder="••••••••"
                                />
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
                                    <span>Reset Password</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
