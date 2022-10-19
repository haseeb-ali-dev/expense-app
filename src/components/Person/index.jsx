import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_PERSON } from 'store/personList'
import { RESET_PERSON } from 'store/person'

import PersonForm from 'components/PersonForm'
import PersonItems from 'components/PersonItems'
import PersonList from 'components/PersonList'

const personDetails = () => {
  const dispatch = useDispatch()
  const person = useSelector(state => state.person)
  const flag = person.name !== '' && person.items.length > 0
  const [total, setTotal] = useState(parseFloat(person.total))

  const addToPersons = () => {
    dispatch(ADD_PERSON({ person }))
    dispatch(RESET_PERSON())
    setTotal(0)
  }

  return (
    <div className='p-3'>
      <PersonForm total={total} setTotal={setTotal} />
      <PersonItems />
      <div className='mt-2 text-center'>
        {flag && <button type='button' className='btn btn-sm btn-success' onClick={addToPersons}>Add person</button>}
      </div>
      <div className='mt-1'>
        <PersonList />
      </div>
    </div>
  )
}

export default personDetails
