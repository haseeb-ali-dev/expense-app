import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { ADD_ITEM } from 'store/menu'

const itemForm = () => {
  const dispatch = useDispatch()
  const initialItem = { name: '', price: '' }
  const [item, setItem] = useState(initialItem)
  const handleChange = (e) => setItem({ ...item, [e.target.name]: e.target.value.trim() })
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(ADD_ITEM({ item }))
    setItem(initialItem)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='mb-2'>
        <label className='form-label'>Menu Item</label>
        <input type='text' name='name' className='form-control' placeholder='Enter Product Name' required onChange={handleChange} value={item.name} />
      </div>
      <div className='mb-2 d-flex flex-row'>
        <div className='w-100'>
          <label className='form-label'>Price</label>
          <input type='number' name='price' className='form-control' placeholder='Enter Price' required onChange={handleChange} value={item.price} />
        </div>
        <button type='submit' className='btn btn-success rounded-circle mt-auto ms-3'>+</button>
      </div>
    </form>
  )
}

export default itemForm
