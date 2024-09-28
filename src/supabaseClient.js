import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sxgjpabsfpzywkqpvwfq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4Z2pwYWJzZnB6eXdrcXB2d2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM5MzU1NTksImV4cCI6MjAzOTUxMTU1OX0.FkCJEIDSYNyXUU-CF2KTvXIlqVS0mzTaITlkzLUkT2o"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)