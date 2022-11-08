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
      const updatedUsers = fetchedUsers.map(({ name, avatar }) => (
        {
          value: name,
          label: (
            <div className='d-flex align-items-center'>
              <img src={avatar} height='25' width='25' alt='avatar' className='me-2 rounded-circle' />
              {name}
            </div>
          ),
        }))
        .filter(user => (personList.every(person => (person.name !== user.value))))
      setUsers(updatedUsers)
    }
    fetchUsers()
  }, [personList])

  return (
    <div className='col-sm-6'>
      <Select
        options={users}
        placeholder='Select a person'
        onChange={({ value }) => dispatch(ADD_PERSON_NAME({ name: value }))}
        value={personName || ''}
      />
    </div>
  )
}

export default memo(PersonSelect)
