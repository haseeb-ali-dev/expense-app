import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { signedIn, signedUp, loginWithGoogle } from 'api/auth'

import 'containers/auth/style.css'
import googleIcon from 'assets/icons/google.svg'

const auth = () => {
  const redirect = useNavigate()
  const [haveAccount, setHaveAccount] = useState(true)

  const signup = async e => {
    e.preventDefault()
    await signedUp(e.target.email.value, e.target.password.value, e.target.full_name.value)
      .then(() => redirect('/create'))
  }
  const signin = async e => {
    e.preventDefault()
    await signedIn(e.target.email.value, e.target.password.value)
      .then(() => redirect('/create'))
  }

  const googleLoggin = async () => {
    await loginWithGoogle().then(() => redirect('/create'))
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
        {!haveAccount
          && (
            <div className='form-floating  my-2'>
              <input type='text' name='full_name' className='form-control' id='floatingPassword' placeholder='Name' />
              <label htmlFor='floatingPassword'>Full Name</label>
            </div>
          )}
        <button className='w-100 btn btn-primary rounded-pill mb-1' type='submit'>{buttonText}</button>
        <div className='w-100 text-center my-1'>
          <span className='text-muted'>--OR--</span>
        </div>
        <button className='w-100 btn btn-outline-primary rounded-pill mb-1' type='button' onClick={googleLoggin}>
          <span className='mx-1 text-center'> <img src={googleIcon} alt='g' width={24} height={24} /></span>{buttonText} with Google
        </button>
        <button className='w-100 form-control-plaintext' type='button' onClick={() => setHaveAccount(!haveAccount)}>{switchInfo}</button>
      </form>
    </main>
  )
}

export default auth
