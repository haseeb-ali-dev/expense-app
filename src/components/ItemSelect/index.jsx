import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ADD_PERSON_ITEM } from 'store/person'

const itemSelect = () => {
  const dispatch = useDispatch()
  const { items: menuItems } = useSelector(state => state.menu)
  const { items: personItems, name: personName } = useSelector(state => state.person)
  const [items, setItems] = useState()

  useEffect(() => {
    setItems(() => menuItems.filter(item => personItems.every(pItem => item.name !== pItem.name))
      .map(({ name, price }) => ({ label: `${name} @ Rs. ${price.toLocaleString('en-US')}`, value: JSON.stringify({ name, price }) })))
  }, [menuItems, personItems])

  return (
    <div className='col-sm-6'>
      <Select
        options={items}
        placeholder={`Select ${personName === '' ? 'person first' : 'an item from menu'}`}
        onChange={({ value }) => dispatch(ADD_PERSON_ITEM({ item: JSON.parse(value) }))}
        value=''
        isDisabled={personName === ''}
      />
    </div>
  )
}

export default itemSelect
