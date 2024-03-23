import { createClient } from "@supabase/supabase-js";

export const client = createClient(
    'https://zujszcuwbctlhowucxyz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1anN6Y3V3YmN0bGhvd3VjeHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3NDg2NTEsImV4cCI6MjAyNDMyNDY1MX0.k48ElkB7wQGqUIaawyPpVs8uFEJQysiAktjefmlhmAg'
    );