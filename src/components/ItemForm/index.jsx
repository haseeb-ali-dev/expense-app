import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { ADD_NEW_ITEM } from 'store/items'

import Button from 'components/Button'
import Input from 'components/Input'
import Resturant from 'components/Resturant'

// import { addItem } from 'api/items'

import 'components/ItemForm/style.css'

const ItemForm = () => {
  const initialValues = { name: '', price: '' }

  const dispatch = useDispatch()

  const [values, setValues] = useState(initialValues)

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value.trim() })

  // const addToDB = async () => {
  //   try {
  //     // await addItem(values).then(() => alert('Added Succesfully'))
  //     await dispatch(ADD_NEW_ITEM({ item: values }))
  //   } catch (error) {
  //     // console.log('Error in adding doc: ', error)
  //   }
  // }

  const submitHandler = (e) => {
    e.preventDefault()
    // addToDB()
    dispatch(ADD_NEW_ITEM({ item: values }))
    setValues(initialValues)
  }

  return (
    <form onSubmit={submitHandler} className='item-box'>
      <Resturant />
      <div className='mb-3'>
        <label htmlFor='exampleFormControlInput1' className='form-label'>Email address</label>
        <input type='email' className='form-control' id='exampleFormControlInput1' placeholder='name@example.com' />
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleFormControlTextarea1' className='form-label'>Example textarea</label>
        <textarea className='form-control' id='exampleFormControlTextarea1' rows='3' />
      </div>
      <span>
        <Input type='text' name='name' required placeholder='Enter Name' onChange={handleChange} value={values.name} />
        <Input type='number' name='price' required placeholder='Enter Price' onChange={handleChange} value={values.price} />
        <Button className='success' text='➕ Add' type='submit' />
      </span>
    </form>
  )
}

export default ItemForm
