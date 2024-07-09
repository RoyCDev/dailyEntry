import entryClient from '../util.js'
import { useState } from 'react'

function AuthForm() {
  const [inputs, setInputs] = useState({})
  const [isSignupMode, setIsSignupMode] = useState(false)

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleMode = () => {
    setIsSignupMode(prev => !prev)
    setInputs({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endpoint = isSignupMode ? "signup" : "login"
    const res = await entryClient.post(`/auth/${endpoint}`, inputs)
    console.log(res.data)
  }

  const handleLogout = async () => {
    const res = await entryClient.post("/auth/logout")
    console.log(res.data)
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        Username: <input type="text" name="username" id="username" value={inputs.username || ""} onChange={handleChange} />
        <br />
        {isSignupMode && (
          <>
            <label htmlFor="email"></label>
            Email: <input type="email" name="email" id="email" value={inputs.email || ""} onChange={handleChange} />
            <br />
          </>)
        }
        <label htmlFor="password"></label>
        Password: <input type="password" name="password" id="password" value={inputs.password || ""} onChange={handleChange} />
        <br />
        <button>{isSignupMode ? "signup" : "login"}</button>
      </form>

      {isSignupMode ?
        <p>Already have an account? <span onClick={toggleMode}>Sign in</span></p> :
        <p>Don't have an account? <span onClick={toggleMode}>Create One</span></p>
      }
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default AuthForm