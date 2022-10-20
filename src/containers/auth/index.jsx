import { useState } from 'react'
import { signedIn, signedUp } from 'api/auth'
import 'containers/auth/style.css'

const auth = () => {
  const [haveAccount, setHaveAccount] = useState(true)

  const signup = e => {
    e.preventDefault()
    signedUp(e.target.email.value, e.target.password.value)
  }
  const signin = e => {
    e.preventDefault()
    signedIn(e.target.email.value, e.target.password.value)
  }
  const label = haveAccount ? 'Please Sign In' : 'Create Account'
  const buttonText = haveAccount ? 'Sign In' : 'Sign Up'
  const switchInfo = haveAccount ? 'Not have account yet?' : 'Already have account!'

  return (
    <main className='form-signin'>
      <form onSubmit={haveAccount ? signin : signup}>
        <h1 className='h3 mb-3 fw-normal text-center'>Expense App</h1>
        <h1 className='h6 mb-3 fw-normal text-center'>{label}</h1>
        <div className='form-floating my-2'>
          <input type='email' name='email' className='form-control' id='floatingInput' placeholder='name@example.com' required />
          <label htmlFor='floatingInput'>Email address</label>
        </div>
        <div className='form-floating  my-2'>
          <input type='password' name='password' className='form-control' id='floatingPassword' placeholder='Password' required />
          <label htmlFor='floatingPassword'>Password</label>
        </div>
        <button className='w-100 btn btn-primary rounded-pill' type='submit'>{buttonText}</button>
        <button className='w-100 form-control-plaintext' type='button' onClick={() => setHaveAccount(!haveAccount)}>{switchInfo}</button>
      </form>
    </main>
  )
}

export default auth
