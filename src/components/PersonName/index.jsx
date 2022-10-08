import { useSelector, useDispatch } from 'react-redux'
import { ADD_PERSON_NAME } from 'store/person'

const personName = () => {
  const dispatch = useDispatch()
  const { name } = useSelector(state => state.person)
  const addPerson = (e) => {
    const personname = e.target.value
    dispatch(ADD_PERSON_NAME({ name: personname.length === 0 ? 'Auto Generated Person 1' : personname }))
  }
  return (
    <>
      <label htmlFor='inputPassword' className='col-sm-2 col-form-label'>Person Name</label>
      <div className='col-sm-4'>
        <input type='text' className='form-control' placeholder='Enter Person Name' onChange={addPerson} value={name} />
      </div>
    </>
  )
}

export default personName
