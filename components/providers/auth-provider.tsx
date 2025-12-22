"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/store/use-auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const setUser = useAuth((state) => state.setUser)

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
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [setUser])

    return <>{children}</>
}
