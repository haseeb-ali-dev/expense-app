import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SelectBox from 'components/SelectBox'
import PersonName from 'components/PersonName'

import { ADD_PERSON_ITEM, ADD_PERSON_TOTAL } from 'store/person'

const PersonItemForm = ({ total, setTotal }) => {
  const dispatch = useDispatch()
  const { items: menuItems } = useSelector(state => state.menu)
  const { items } = useSelector(state => state.person)

  const [options, setOptions] = useState()
  const [selected, setSelected] = useState('')

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
    if (item !== '') {
      const itemJson = JSON.parse(item)
      dispatch(ADD_PERSON_ITEM({ item: itemJson }))
      dispatch(ADD_PERSON_TOTAL({ total: parseFloat(itemJson.price) + total }))
      setTotal(prevTotal => prevTotal + parseFloat(itemJson.price))
      setSelected('')
    }
  }

  return (
    <div className='row'>
      <PersonName />
      <div className='col-sm-6'>
        <SelectBox name='items' options={options} onChange={handleChange} value={selected} />
      </div>
    </div>
  )
}

export default PersonItemForm
