// testAuth.ts
import { supabase } from '../migration/supabase'

async function testLogin() {
  const email = 'test@example.com'
  const password = 'password123'

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log('Login failed:', error.message)
  } else {
    console.log('Login successful:', data)
  }
}

testLogin()
