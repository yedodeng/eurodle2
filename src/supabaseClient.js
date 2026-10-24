import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://einddggfkorwqrradgcd.supabase.co"
const supabaseAnonKey = "sb_publishable_u8ibd9auRcTfqusynpmC9A_2NkDGs2A"
export const supabase = createClient(supabaseUrl, supabaseAnonKey)