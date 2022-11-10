import { useDispatch, useSelector } from 'react-redux'

import {
  ItemSelect, PersonSelect, PersonItems, PersonList,
  Modal, Select,
} from 'components'

import { ADD_PERSON, ADD_PERSON_ITEM } from 'store/personList'
import { RESET_PERSON } from 'store/person'
import { HIDE_MODAL } from 'store/modal'

const PersonDetails = () => {
  const dispatch = useDispatch()
  const { items: menuItems } = useSelector(state => state.menu)
  const person = useSelector(state => state.person)
  const persons = useSelector(state => state.personList)
  const { showPerson, modalPerson: { personIdx, items } } = useSelector(state => state.modal)

  const addToPersons = () => {
    dispatch(ADD_PERSON({ person }))
    dispatch(RESET_PERSON())
  }

  return (
    <div className='p-3'>
      <div className='row'>
        <PersonSelect dispatch={dispatch} personList={persons} personName={person.name} />
        <ItemSelect />
      </div>
      <PersonItems dispatch={dispatch} name={person.name} items={person.items} />
      <div className='mt-2 text-center'>
        {(person.name !== '' && person.items.length > 0)
          && <button className='btn btn-sm btn-success' onClick={addToPersons}>Add person</button>}
      </div>
      <div className='mt-1'>
        <PersonList dispatch={dispatch} menuItems={menuItems} persons={persons} />
        {showPerson && (
          <Modal html={(
            <Select
              className='mt-5 p-2'
              options={items}
              placeholder='Select a item to add........'
              onChange={({ value }) => {
                dispatch(ADD_PERSON_ITEM({ personIdx, item: JSON.parse(value) }))
                dispatch(HIDE_MODAL())
              }}
              value=''
              menuPortalTarget={document.body}
            />
          )}
          />
        )}
      </div>
    </div>
  )
}

export default PersonDetails
