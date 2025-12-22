"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/store/use-auth"
import { useRouter } from "next/navigation"

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const setUser = useAuth((state) => state.setUser)
    const router = useRouter()

    useEffect(() => {
        // Check active session on mount
        supabase.auth.getSession()
            .then(({ data: { session } }) => {
                setUser(session?.user ?? null)
            })
            .catch(err => {
                console.error("🔒 Auth Session Error:", err.message)
                setUser(null)
            })

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)

            // Handle Password Recovery Event
            if (event === 'PASSWORD_RECOVERY') {
                router.push('/auth/reset-password')
            }
        })

        return () => subscription.unsubscribe()
    }, [setUser, router])

    return <>{children}</>
}
