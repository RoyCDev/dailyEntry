import FormInput from './FormInput'
import { useForm } from 'react-hook-form'
import { Button } from '@chakra-ui/react'
import entryClient from '../../util.js'
import { useState } from 'react'

function AuthForm() {
  const { register, handleSubmit } = useForm()
  const [isSignupMode, setIsSignupMode] = useState(false)

  const toggleMode = () => {
    setIsSignupMode(prev => !prev)
  }

  const onSubmit = async (inputs) => {
    const endpoint = isSignupMode ? "signup" : "login"
    const res = await entryClient.post(`/auth/${endpoint}`, inputs)
    console.log(res.data)
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Username" type="text" name="username" register={register} />
        {isSignupMode &&
          <FormInput label="Email" type="email" name="email" register={register} />
        }
        <FormInput label="Password" type="password" name="password" register={register} />

        <Button type="submit" w="100%" colorScheme="brand">
          {isSignupMode ? "signup" : "login"}
        </Button>
      </form>

      {isSignupMode ?
        <p>Already have an account? <span onClick={toggleMode}>Sign in</span></p> :
        <p>Don't have an account? <span onClick={toggleMode}>Create One</span></p>
      }
    </>
  )
}

export default AuthForm