import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ybohvmwjmhalvtankpla.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlib2h2bXdqbWhhbHZ0YW5rcGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MjcyNzcsImV4cCI6MjA4NDEwMzI3N30.SeJBs_MeKN9IghftV5eoFH6ykTgjbhRIWr0dwvoEdUQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
