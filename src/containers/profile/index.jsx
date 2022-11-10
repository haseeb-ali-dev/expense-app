import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Loader, swal } from 'components'
import { avatarUpload, updateName } from 'api/auth'
import { SET_GLOBAL_USER } from 'store/user'
import validate from 'utils/helpers/authValidate'

import { saveIcon } from 'assets/icons'
import UpdatePassword from 'components/UpdatePassword'

const Profile = () => {
  const dispatch = useDispatch()
  const { name, avatar } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState(name)
  const styling = { maxWidth: '540px' }

  const upload = async e => {
    setLoading(true)
    try {
      const { photoURL, name: displayName } = await avatarUpload(e.target.files[0])
      dispatch(SET_GLOBAL_USER({ name: displayName, avatar: photoURL }))
      swal({ text: 'Avatar updated successfully!', icon: 'success' })
    } catch (error) {
      swal({ text: validate(error.code), icon: 'error' })
    }
    setLoading(false)
  }

  const editName = async () => {
    setLoading(true)
    try {
      const { photoURL, name: displayName } = await updateName(username)
      dispatch(SET_GLOBAL_USER({ name: displayName, avatar: photoURL }))
      swal({ text: 'Username updated successfully!', icon: 'success' })
    } catch (error) {
      swal({ text: validate(error.code), icon: 'error' })
    }
    setLoading(false)
  }

  return loading ? <Loader /> : (
    <>

      <div className='card m-auto' style={styling}>
        <div className='row g-0'>
          <div className='col-md-6 p-2'>
            <img src={avatar} alt='avatar' className='w-100 h-100 rounded-circle border' />
          </div>
          <div className='col-md-6'>
            <div className='card-body'>
              <h5 className='card-title'>
                <input className='form-control' type='text' defaultValue={username} onChange={e => setUsername(e.target.value)} />
                <button className='btn btn-sm mb-2 float-end' onClick={editName}><img src={saveIcon} alt='e' /></button>
              </h5>
              <p className='card-text'>
                <input className='form-control my-3' type='file' name='avatar' id='avatar' onChange={upload} accept='image/*' />
              </p>
            </div>
          </div>
        </div>
      </div>
      <UpdatePassword styling={styling} setLoading={setLoading} />
    </>
  )
}

export default Profile
