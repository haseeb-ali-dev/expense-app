import { useNavigate } from 'react-router-dom'

import { swal } from 'components'
import { loginWithFacebook } from 'api/auth'

import { facebookIcon } from 'assets/icons'

const FacebookLogin = ({ setLoading, text }) => {
  const redirect = useNavigate()

  return (
    <button
      className='w-100 btn btn-primary rounded-pill mt-1'
      type='button'
      onClick={async () => {
        setLoading(true)
        await loginWithFacebook().then(() => {
          redirect('/create')
          setLoading(false)
          swal({ text: 'Logged in with Facebook successfully!', icon: 'success' })
        })
      }}
    >
      <span className='me-2 text-center'> <img src={facebookIcon} alt='g' width={24} height={24} /></span>{text} with Facebook
    </button>
  )
}

export default FacebookLogin
