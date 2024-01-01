import { useDispatch } from 'react-redux'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { swal } from 'components'
import { loginWithFacebook } from 'api/auth'
import { SET_GLOBAL_USER } from 'store/user'
import validate from 'utils/helpers/authValidate'

import { facebookIcon } from 'assets/icons'

const FacebookLogin = ({ setLoading, text }) => {
  const redirect = useNavigate()
  const dispatch = useDispatch()

  const handleClick = async () => {
    setLoading(true)
    try {
      const {
        displayName, photoURL, uid, provider,
      } = await loginWithFacebook()
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
    <button className='w-100 btn btn-primary rounded-pill mt-1' type='button' onClick={handleClick}>
      <span className='me-2 text-center'> <img src={facebookIcon} alt='g' width={24} height={24} /></span>{text} with Facebook
    </button>
  )
}

export default memo(FacebookLogin)
