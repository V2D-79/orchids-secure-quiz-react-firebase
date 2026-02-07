import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qjjemklbiiwzxszulszp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqamVta2xiaWl3enhzenVsc3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2MjQwNDIsImV4cCI6MjA0NjIwMDA0Mn0.4OaleqstZ5z-9p1H4M2l4-6j5J5_5_5_5_5_5_5_5_5_5_5'

export const supabase = createClient(supabaseUrl, supabaseKey)