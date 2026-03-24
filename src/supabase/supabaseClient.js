import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://frbcwaivnhvmrjhdyrye.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyYmN3YWl2bmh2bXJqaGR5cnllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzAzMjgsImV4cCI6MjA4OTgwNjMyOH0.IIpVr6N7l9NHcgVNxumXy1-cNJQRSVoDQ33CShTrzHo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
