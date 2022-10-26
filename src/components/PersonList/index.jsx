/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import ListItem from 'components/ListItem'
import Modal from 'components/Modal'
import SelectBox from 'components/SelectBox'

import { ADD_PERSON_ITEM, REMOVE_PERSON_ITEM } from 'store/personList'
import { HIDE_MODAL, SET_MODAL_ITEM_LIST } from 'store/modal'

import editIcon from 'assets/icons/edit.svg'
import removeIcon from 'assets/icons/remove.svg'

const PersonList = () => {
  const dispatch = useDispatch()
  const persons = useSelector(state => state.personList)
  const { items: menuItems } = useSelector(state => state.menu)
  const { showList, modalItemList } = useSelector(state => state.modal)

  const [selected, setSelected] = useState('')
  const [editPerson, setEditPerson] = useState({})

  const removePersonItem = (personIdx, itemIdx) => {
    dispatch(REMOVE_PERSON_ITEM({ personIdx, itemIdx }))
  }
  const addPeronItem = (personIdx) => {
    setEditPerson({ name: persons[personIdx].name, index: personIdx })
    const filteredItems = menuItems.filter(user => persons[personIdx].items.every(person => (person.name !== user.name)))
    const updatedItems = filteredItems.map(({ name, price }) => ({
      name: `${name} -- PKR/- ${price}`,
      value: JSON.stringify({ name, price }),
      disabled: false,
    }))
    dispatch(SET_MODAL_ITEM_LIST({ items: updatedItems }))
  }

  const handleChange = (e) => {
    const item = e.target.value
    if (item !== '') {
      const itemJson = JSON.parse(item)
      dispatch(ADD_PERSON_ITEM({ personIdx: editPerson.index, item: itemJson }))
      setSelected('')
      dispatch(HIDE_MODAL())
    }
  }

  const personList = persons.map((person, index1) => (
    <div className='mt-2 mx-1 border py-1 px-2 row bg-white' key={`person-${index1.toString()}`}>
      <div className='col-md-3'><small className='text-muted'>Name:</small> {person.name}</div>
      <div className='col-md-3'><small className='text-muted'>Total:</small> PKR/- {person.total}</div>
      <div className='col-md-5'>
        {person.items.map((item, index2) => (
          <div className='btn-group py-1' key={`person-item-${index2.toString()}`} role='group'>
            <span className='border border-2 rounded-end rounded-4 p-1'>
              <ListItem item={item} />
            </span>
            <button type='button' className='btn btn-sm border-secondary rounded-start rounded-4' onClick={() => removePersonItem(index1, index2)}>
              <img src={removeIcon} alt='+' />
            </button>
          </div>
        ))}
      </div>
      <div className='col-sm-1'>
        <button type='button' className='btn btn-sm' onClick={() => addPeronItem(index1)}>
          <img src={editIcon} alt='+' />
        </button>
      </div>
    </div>
  ))

  return (
    <div>
      {persons.length !== 0 && personList}
      {showList && (
        <Modal html={(
          <div className='mx-2'>
            <p className='mb-2'>Select Item to add For {`${editPerson.index}-${editPerson.name}`}</p>
            <SelectBox name='items' options={modalItemList} onChange={handleChange} value={selected} />
          </div>
        )}
        />
      )}
    </div>
  )
}

export default PersonList
