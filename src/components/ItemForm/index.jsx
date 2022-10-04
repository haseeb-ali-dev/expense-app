import { useState } from 'react'

import Button from 'components/Button'
import Input from 'components/Input'

// import { createDoc } from 'Database'

import 'components/ItemForm/style.css'

const ItemForm = ({ setItems }) => {
  const initialValues = { name: '', price: '' }

  const [values, setValues] = useState(initialValues)

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value.trim() })

  const addToDB = () => {
    // createDoc('values', values)
  }

  const addItem = (e) => {
    e.preventDefault()
    setItems(prevItems => [values, ...prevItems])
    addToDB()
    setValues(initialValues)
  }

  return (
    <form onSubmit={addItem} className='item-box'>
      <Input type='text' name='name' required placeholder='Enter Name' onChange={handleChange} value={values.name} />
      <Input type='number' name='price' required placeholder='Enter Price' onChange={handleChange} value={values.price} />
      <Button className='success' text='+ Add' type='submit' />
    </form>
  )
}

export default ItemForm
