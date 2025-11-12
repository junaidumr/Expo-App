// supabase/supabase.js

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://prqdhteuhelmrssohtwx.supabase.co"
const supabasePublishableKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBycWRodGV1aGVsbXJzc29odHd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDYxMDgsImV4cCI6MjA3ODQyMjEwOH0.NK5jCIortSkczz9dccvdsSFHJvSafZS7Ns9KLgymsqY"

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
