const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = "https://bptdccebrfkytjrfwoiz.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdGRjY2VicmZreXRqcmZ3b2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2Mjc5ODYsImV4cCI6MjAzNjIwMzk4Nn0.Gas2q5c-flB9tl3VHHBdOhYZQMtvb6HgMIVGWNjlUcw";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

