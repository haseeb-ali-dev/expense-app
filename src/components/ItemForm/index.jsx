import { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ADD_ITEM, UPDATE_ITEM } from 'store/menu'

import { plusIcon } from 'assets/icons'

const ItemForm = () => {
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.menu)
  const initialItem = { name: '', price: 0 }
  const [item, setItem] = useState(initialItem)

  const handleChange = e => setItem({ ...item, [e.target.name]: e.target.value.trimLeft() })

  const submitHandler = e => {
    e.preventDefault()
    if (items.some(({ name }) => name === item.name)) {
      if (confirm('This menu item is already existed. Do you want update that?')) dispatch(UPDATE_ITEM({ key: item.name, updated: item }))
    } else {
      dispatch(ADD_ITEM({ item }))
    }
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
          <input type='number' name='price' className='form-control' placeholder='Enter Price' min={1} required onChange={handleChange} />
        </div>
        <button type='submit' className='btn btn-sm btn-success rounded-circle mt-auto ms-3'>
          <img className='py-1' src={plusIcon} alt='+' />
        </button>
      </div>
    </form>
  )
}

export default memo(ItemForm)
