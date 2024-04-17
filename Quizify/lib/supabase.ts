import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ccytoyqkymireiaajlxi.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjeXRveXFreW1pcmVpYWFqbHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwNTExMTksImV4cCI6MjAyNzYyNzExOX0.Xg0DVxHc-LtI3Ib3CjeQYdKhBhD1eyAfHHtAizGPLzw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey
 , {
    auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}
)
