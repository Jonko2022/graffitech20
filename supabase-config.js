// Supabase public config — DO NOT add service_role or other secret keys here.
const SUPABASE_URL = 'https://rlvlfwjglaxtvlunkhca.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsdmxmd2pnbGF4dHZsdW5raGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODAxOTcsImV4cCI6MjA3NzM1NjE5N30.7ef-pnd11virx3mKHxtVFeD_wGKto0tmjSN1PcThXxA';

if (typeof supabase === 'undefined') {
  console.error('Supabase CDN not loaded. Include <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script> before supabase-config.js');
} else {
  window.SUPABASE = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}