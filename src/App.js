import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [session , setSession] = useState(null)
  const [loginEmail, setLoginEmail] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [role, setRole] = useState(null)
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchRole(session.user.id)
    })
  }, [])

  async function fetchRole(userId) {
    const { data: roleData } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()
    setRole(roleData?.role)
  }

  async function handleLogin(e) {
    e.preventDefault()
    const { data: loginData, error } = await supabase.auth.signInWithPassword({ email: loginEmail, password:loginPassword })
    if (error) alert(error.message)
    else setSession(loginData.session)
  }

  async function handleSignup(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email:signupEmail, password:signupPassword })
    if (error) alert(error.message)
    else alert('Check email for confirmation!')
  }

  if (session) {
    return (
      <div>
        <header>
          <h1>School App</h1>
          <p>Home</p>
          <p>Classes</p>
          <p>Assignments</p>
        </header>
        <h1>Welcome {session.user.email}</h1>
        <p>Role: {role || 'Loading...'}</p>
        <button onClick={() => supabase.auth.signOut()}>Logout</button>
        {role === 'teacher' && <p>🏫Teacher controls go here!🏫</p>}
        {role === 'student' && <p>📚Student controls go here!📚</p>}
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input placeholder='Email' value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
      <form onSubmit={handleSignup}>
        <h2>Sign up</h2>
        <input placeholder='Email' value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
        <button type='submit'>Sign up</button>
      </form>
    </div>
  )
}

export default App