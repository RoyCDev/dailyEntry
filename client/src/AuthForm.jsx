import entryClient from '../util.js'
import { useState } from 'react'

function AuthForm() {
  const [inputs, setInputs] = useState({})
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = inputs.email ? "signup" : "login"
    const res = await entryClient.post(`/${endpoint}`, inputs)
    console.log(res.data)
  }

  const handleLogout = async () => {
    const res = await entryClient.post("http://localhost:3000/logout")
    console.log(res.data)
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        Username: <input type="text" name="username" id="username" value={inputs.username || ""} onChange={handleChange} />
        <br />
        <label htmlFor="email"></label>
        Email: <input type="email" name="email" id="email" value={inputs.email || ""} onChange={handleChange} />
        <br />
        <label htmlFor="password"></label>
        Password: <input type="password" name="password" id="password" value={inputs.password || ""} onChange={handleChange} />
        <br />
        <input type="submit" name="signup" id="signup" value="signup" />
      </form>

      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default AuthForm
