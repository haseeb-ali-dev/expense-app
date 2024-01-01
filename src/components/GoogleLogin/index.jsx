import { useDispatch } from 'react-redux'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { swal } from 'components'
import { loginWithGoogle } from 'api/auth'
import { SET_GLOBAL_USER } from 'store/user'
import validate from 'utils/helpers/authValidate'

import { googleIcon } from 'assets/icons'

const GoogleLogin = ({ setLoading, text }) => {
  const dispatch = useDispatch()
  const redirect = useNavigate()

  const handleClick = async () => {
    setLoading(true)
    try {
      const {
        displayName, photoURL, uid, provider,
      } = await loginWithGoogle()
      dispatch(SET_GLOBAL_USER({
        name: displayName, avatar: photoURL, id: uid, provider,
      }))
      redirect('/all')
    } catch (error) {
      swal({ text: validate(error.code), icon: 'error' })
    }
    setLoading(false)
  }

  return (
    <button className='w-100 btn btn-light border border-2 rounded-pill mb-1' onClick={handleClick}>
      <span className='me-2 text-center'> <img src={googleIcon} alt='g' width={24} height={24} /></span>{text} with Google
    </button>
  )
}

export default memo(GoogleLogin)
