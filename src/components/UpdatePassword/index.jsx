import { useState } from 'react'

import { editPassword } from 'api/auth'
import { swal } from 'components'

import validate from 'utils/helpers/authValidate'

const UpdatePassword = ({ styling, setLoading }) => {
  const [password, setPassword] = useState({ edited: '', confirmed: '' })
  const { edited, confirmed } = password
  const flag = (edited.length === 0 && confirmed.length === 0) || edited !== confirmed

  const submitHandler = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await editPassword(password.confirmed)
      swal({ text: 'Password updated successfully!', icon: 'success' })
    } catch (err) {
      swal({ text: validate(err.code), icon: 'error' })
    }
    setLoading(false)
  }
  return (
    <div className='card mx-auto my-3' style={styling}>
      <div className='card-body pb-1'>
        <h5 className='card-title fst-italic'>
          Update Password
        </h5>
        <form onSubmit={submitHandler} className='py-2'>
          <div className='row mb-3'>
            <div className='col-12'>
              <input type='password' className='form-control' placeholder='Enter new Password' required value={password.edited} onChange={e => setPassword({ ...password, edited: e.target.value })} />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-12'>
              <input type='password' className='form-control' placeholder='Re-Enter Password to Confirm' required value={password.confirmed} onChange={e => setPassword({ ...password, confirmed: e.target.value })} />
            </div>
          </div>
          <div className='text-end'>
            <button type='submit' className='btn btn-sm btn-success rounded-0 w-25' disabled={flag}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
