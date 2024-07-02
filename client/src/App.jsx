import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [text, setText] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // const handleClick = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3000/book");
  //     setBook(res.data[0].page);
  //   }
  //   catch (e) {
  //     console.error(e)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = {
      username: username,
      // email: email,
      password: password
    };

    const res = await axios.post("http://localhost:3000/login", inputs)
    console.log(res.data)
  }

  const handleUsername = e => setUsername(e.target.value);
  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value)

  return (
    <>
      {/* <button onClick={handleClick}>Fetch book</button>
      {book} */}
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        Username: <input type="text" name="username" id="username" value={username} onChange={handleUsername} />
        <br />
        <label htmlFor="email"></label>
        Email: <input type="email" name="email" id="email" value={email} onChange={handleEmail} />
        <br />
        <label htmlFor="password"></label>
        Password: <input type="password" name="password" id="password" value={password} onChange={handlePassword} />
        <br />
        <input type="submit" name="signup" id="signup" value="signup" />
      </form>
      {text}
    </>
  )
}

export default App
