import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Loader } from 'components'
import { avatarUpload } from 'api/auth'
import { SET_GLOBAL_USER } from 'store/user'

const Profile = () => {
  const dispatch = useDispatch()
  const { name, avatar } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)
  const styling = { maxWidth: '540px' }

  const upload = async e => {
    setLoading(true)
    try {
      const { photoURL, name: displayName } = await avatarUpload(e.target.files[0])
      dispatch(SET_GLOBAL_USER({ name: displayName, avatar: photoURL }))
    } catch (error) {
      alert('Sign In Error: '.error)
    }
    setLoading(false)
  }

  return loading ? <Loader /> : (
    <div className='card m-auto' style={styling}>
      <div className='row g-0'>
        <div className='col-md-6 p-2'>
          <img src={avatar} alt='avatar' className='w-100 h-100 rounded-circle border' />
        </div>
        <div className='col-md-6'>
          <div className='card-body'>
            <h5 className='card-title'>{name}</h5>
            <p className='card-text'>
              <input className='form-control my-3' type='file' name='avatar' id='avatar' onChange={upload} accept='image/*' />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
