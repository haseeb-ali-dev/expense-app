import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SelectBox from 'components/SelectBox'
import PersonName from 'components/PersonName'

import { ADD_PERSON_ITEM } from 'store/person'

const PersonItemForm = () => {
  const dispatch = useDispatch()
  const { items: menuItems } = useSelector(state => state.menu)
  const { items } = useSelector(state => state.person)

  const [options, setOptions] = useState()
  // const [total, setTotal] = useState(0)

  useEffect(() => {
    const updatedItems = menuItems.map(({ name, price }) => ({
      name: `${name} -- PKR/- ${price}`,
      value: JSON.stringify({ name, price }),
      disabled: items.some(item => (item.name === name && item.price === price)),
    }))
    setOptions(updatedItems)
  }, [menuItems, items])

  const handleChange = (e) => {
    const item = e.target.value
    return item !== '' && dispatch(ADD_PERSON_ITEM({ item: JSON.parse(item) }))
  }

  return (
    <div className='row'>
      <PersonName />
      <div className='col-sm-6'>
        <SelectBox name='items' options={options} onChange={handleChange} />
      </div>
    </div>
  )
}

export default PersonItemForm
