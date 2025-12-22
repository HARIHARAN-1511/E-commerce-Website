import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface AuthStore {
    user: User | null
    isLoading: boolean
    setUser: (user: User | null) => void
    signOut: () => Promise<void>
}

export const useAuth = create<AuthStore>((set) => ({
    user: null,
    isLoading: true,
    setUser: (user) => set({ user, isLoading: false }),
    signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null, isLoading: false })
    },
}))
