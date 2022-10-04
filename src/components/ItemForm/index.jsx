import { useState } from 'react'

import Button from 'components/Button'
import Input from 'components/Input'

import { addItem } from 'api/items'
import { ADD_NEW_ITEM } from 'store/items'
import { useDispatch } from 'react-redux'

import 'components/ItemForm/style.css'

const ItemForm = () => {
  const initialValues = { name: '', price: '' }

  const dispatch = useDispatch()

  const [values, setValues] = useState(initialValues)

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value.trim() })

  const addToDB = async () => {
    try {
      await addItem(values).then(() => alert('Added Succesfully'))
      dispatch(ADD_NEW_ITEM({ item: values }))
    } catch (error) {
      // console.log('Error in adding doc: ', error)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    addToDB()
    setValues(initialValues)
  }

  return (
    <form onSubmit={submitHandler} className='item-box'>
      <Input type='text' name='name' required placeholder='Enter Name' onChange={handleChange} value={values.name} />
      <Input type='number' name='price' required placeholder='Enter Price' onChange={handleChange} value={values.price} />
      <Button className='success' text='+ Add' type='submit' />
    </form>
  )
}

export default ItemForm
