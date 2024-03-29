/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  FacebookLogin, GoogleLogin, Loader, swal,
} from 'components'

import { signedIn, signedUp } from 'api/auth'
import { SET_GLOBAL_USER } from 'store/user'
import validate from 'utils/helpers/authValidate'
// import authFields from 'utils/constants/authFields'

import 'containers/auth/style.css'

const Auth = ({ haveAccount, setHaveAccount }) => {
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const signup = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { user } = await signedUp(e.target.email.value, e.target.password.value, e.target.full_name.value)
      dispatch(SET_GLOBAL_USER({ name: user.displayName, avatar: user.photoURL, id: user.uid }))
      redirect('/all')
    } catch (error) {
      swal({ text: validate(error.code), icon: 'error' })
    }
    setLoading(false)
  }
  const signin = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { user } = await signedIn(e.target.email.value, e.target.password.value)
      dispatch(SET_GLOBAL_USER({ name: user.displayName, avatar: user.photoURL, id: user.uid }))
      redirect('/all')
    } catch (error) {
      swal({ text: validate(error.code), icon: 'error' })
    }
    setLoading(false)
  }

  const label = haveAccount ? 'Please Sign In' : 'Create Account'
  const buttonText = haveAccount ? 'Sign In' : 'Sign Up'
  const switchInfo = haveAccount ? 'Not have account yet?' : 'Already have account!'

  return (
    <main className='form-signin'>
      {loading ? <Loader />
        : (
          <form onSubmit={haveAccount ? signin : signup}>
            <h1 className='h3 mb-3 fw-normal text-center'>Expense App</h1>
            <h1 className='h6 mb-3 fw-normal text-center'>{label}</h1>
            {!haveAccount
              && (
                <div className='form-floating  my-2'>
                  <input type='text' name='full_name' className='form-control' id='floatingPassword' placeholder='Name' />
                  <label htmlFor='floatingPassword'>Full Name</label>
                </div>
              )}
            <div className='form-floating my-2'>
              <input type='email' name='email' className='form-control' id='floatingInput' placeholder='name@example.com' required />
              <label htmlFor='floatingInput'>Email address</label>
            </div>
            <div className='form-floating  my-2'>
              <input type='password' name='password' className='form-control' id='floatingPassword' placeholder='Password' required />
              <label htmlFor='floatingPassword'>Password</label>
            </div>
            <button className='w-100 btn btn-primary rounded-pill mb-1' type='submit'>{buttonText}</button>
            {haveAccount && (
              <div className='text-center'>
                <button type='button' className='btn btn-sm p-0 m-0' onClick={() => redirect('/forgot-password')}>Forgot password?</button>
              </div>
            )}
            <div className='w-100 text-center my-1'>
              <span className='text-muted'>--OR--</span>
            </div>
            <GoogleLogin setLoading={setLoading} text={buttonText} />
            <FacebookLogin setLoading={setLoading} text={buttonText} />
            <div className='text-center'>
              <button type='button' className='btn btn-sm p-0 m-0' onClick={() => setHaveAccount(!haveAccount)}>{switchInfo}</button>
            </div>
          </form>
        )}
    </main>
  )
}

export default Auth
