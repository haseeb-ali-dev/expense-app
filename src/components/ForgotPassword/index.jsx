import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { sendResetLink } from 'api/auth'

import { ok3Icon } from 'assets/icons'

const ForgotPassword = () => {
  const redirect = useNavigate()
  const [email, setEmail] = useState()
  const [disabled, setDisabled] = useState(false)

  const sendLink = async () => {
    setDisabled(true)
    await sendResetLink(email)
    redirect('/auth')
  }

  return (
    <div className='mx-auto my-5 border p-5' style={{ maxWidth: '400px' }}>
      <p className='text-center mb-2 fs-4'>Forgot Password</p>
      <div className='form-floating my-2'>
        <input type='email' className='form-control' id='floatingInput' defaultValue={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor='floatingInput'>Email address</label>
      </div>
      <button className='w-100 btn btn-primary rounded-pill mb-1' onClick={sendLink} disabled={disabled}>
        Send Password Reset Link
      </button>
      <div className='text-center'>
        <button type='button' className='btn btn-sm p-0 m-0' onClick={() => redirect('/auth')}>
          <span className='d-flex align-items-center'>
            <img src={ok3Icon} alt='ok' className='me-1' /><span>Back to Login</span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword
