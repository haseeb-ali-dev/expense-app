import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from 'components/Button'
import Input from 'components/Input'
import SelectBox from 'components/SelectBox'

import 'components/PersonItemForm/style.css'
import { ADD_PERSON_ITEM } from 'store/personItems'
import { ADD_PERSON } from 'store/person'
import { ADD_NEW_PERSON } from 'store/personList'

const PersonItemForm = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.items)
  const person = useSelector(state => state.person)
  const personItems = useSelector(state => state.personItems)

  const [options, setOptions] = useState()
  const [selected, setSelected] = useState('')
  const [total, setTotal] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const updatedItems = items.map(({ name, price }) => ({ name: `${name} -- PKR/- ${price}`, value: JSON.stringify({ name, price }) }))
    // console.log(updatedItems)
    setOptions(updatedItems)
  }, [items])

  const handleChange = (e) => setSelected(e.target.value)

  const handleSelectedValue = () => {
    const newItem = JSON.parse(selected)
    dispatch(ADD_PERSON_ITEM({ item: newItem }))
    setTotal(total + parseFloat(newItem.price))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(ADD_PERSON({ name, total, items: personItems }))
    dispatch(ADD_NEW_PERSON({ person }))
  }
  return (
    <form className='person-item-form' onSubmit={handleSubmit}>
      <span>
        <span className='person-name-label'>Person Name</span>
        <Input type='text' name='person_name' required placeholder='Enter Person Name' value={name} onChange={(e) => setName(e.target.value)} />
      </span>
      <span className='selection-box'>
        {!options || options.length === 0
          ? <h3 className='no-menu'>There are no menu items added</h3>
          : (
            <>
              <SelectBox name='items' options={options} onChange={handleChange} />
              <Button text='✅' onClick={handleSelectedValue} disabled={selected === ''} />
            </>
          )}
      </span>
      <Button text='Save' type='submit' className='success save-btn' disabled={personItems.length === 0} />
      <Link to='/person' className='next-btn'>
        <Button text='Next ->' />
      </Link>
    </form>

  )
}

export default PersonItemForm
