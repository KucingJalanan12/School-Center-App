import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => setData(data.slice(0,5)))
  }, [])

  useEffect(() => {
    supabase.from('profiles').select('*').then(({ data }) => {
      console.log('Supabase connection test: ', data)
      setUsers(data || [])
    })
  }, [])

  return <div>
    {data.map(item => <p key={item.id}>{item.title}</p>)}
    <p>Count: {count}</p>
    <button onClick={() => setCount(count + 1)}>Add</button>
    <p>Check console for Supabase Connection</p>
  </div>
}

export default App