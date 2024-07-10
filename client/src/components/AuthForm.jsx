import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import entryClient from '../../util.js'
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
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" name="username" bg="white" value={inputs.username || ""} onChange={handleChange}></Input>
        </FormControl>

        {isSignupMode && (
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" bg="white" value={inputs.email || ""} onChange={handleChange}></Input>
          </FormControl>
        )}

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" bg="white" value={inputs.password || ""} onChange={handleChange}></Input>
        </FormControl>

        <br />
        <Button type="submit">{isSignupMode ? "signup" : "login"}</Button>
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