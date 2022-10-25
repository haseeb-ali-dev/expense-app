import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SelectBox from 'components/SelectBox'

import { ADD_PERSON_NAME } from 'store/person'
import { getUsers } from 'api/auth'

const personName = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const { name: nameOfPerson } = useSelector(state => state.person)
  const persons = useSelector(state => state.personList)

  const addPerson = (e) => {
    const personname = e.target.value
    dispatch(ADD_PERSON_NAME({ name: personname }))
  }

  useEffect(() => {
    const fetchUsers = async (personsList) => {
      const fetchedUsers = personsList.length === 0 ? await getUsers() : personsList
      const updatedUsers = fetchedUsers.map(({ name }) => ({
        name,
        value: name,
        disabled: persons.some(person => (person.name === name)),
      }))
      // eslint-disable-next-line array-callback-return, max-len
      const filteredUsers = updatedUsers.filter(user => persons.every(person => (person.name !== user.name)))
      setUsers(filteredUsers)
    }
    fetchUsers(users)
  }, [persons])

  return (
    <>
      <label htmlFor='inputPassword' className='col-sm-2 col-form-label'>Select Person</label>
      <div className='col-sm-4'>
        <SelectBox name='persons' options={users} onChange={addPerson} value={nameOfPerson} />
      </div>
    </>
  )
}

export default personName
