import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gnciukpwpniugarazbks.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduY2l1a3B3cG5pdWdhcmF6YmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2OTY1ODYsImV4cCI6MjA5NDI3MjU4Nn0.-2PEmpIslk32UKjdB3cxDuRbnuC2e8y-yf8IrkroumY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)