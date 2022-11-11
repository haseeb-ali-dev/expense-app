/* eslint-disable max-len */
import { memo, useEffect, useState } from 'react'

import { Select } from 'components'

import { ADD_PERSON_NAME } from 'store/person'
import { getUsers } from 'api/auth'

const PersonSelect = ({ dispatch, personList, personName }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers()
      const updatedUsers = fetchedUsers.map(({ id, name, avatar }) => (
        {
          value: { id, name },
          label: (
            <div className='d-flex align-items-center'>
              <img src={avatar} height='25' width='25' alt='avatar' className='me-2 rounded-circle' />
              {name}
            </div>
          ),
        }))
        .filter(user => (personList.every(person => (person.name !== user.value.name))))
      setUsers(updatedUsers)
    }
    fetchUsers()
  }, [personList])

  return (
    <div className='col-sm-6'>
      <Select
        options={users}
        placeholder='Select a person'
        onChange={({ value: { id, name } }) => dispatch(ADD_PERSON_NAME({ id, name }))}
        value={personName || ''}
      />
    </div>
  )
}

export default memo(PersonSelect)
