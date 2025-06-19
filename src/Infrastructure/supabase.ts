import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://afppzrsvrkksjmzecjds.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseKey) {
  throw new Error('Supabase key is not defined. Please set the SUPABASE_KEY environment variable.')
}

const supabase = createClient(supabaseUrl, supabaseKey)