import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vdcdtyjbgqfvfbjngnjw.supabase.co'
const supabaseAnonKey = 'sb_publishable_8UF_-R3xzFdApKo16_SvoA_yedotRAJ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)