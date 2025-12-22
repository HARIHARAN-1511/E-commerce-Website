import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing or invalid. Please check your .env.local file.")
} else {
    try {
        const url = new URL(supabaseUrl)
        console.log(`📡 Connected to Supabase at: ${url.hostname}`)
    } catch (e) {
        console.error("❌ Invalid NEXT_PUBLIC_SUPABASE_URL in .env.local:", supabaseUrl)
    }
}

export const supabase = createClient<Database>(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
)
