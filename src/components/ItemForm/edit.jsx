import { useDispatch } from 'react-redux'

import { HIDE_MODAL } from 'store/modal'
import { UPDATE_ITEM } from 'store/menu'

const EditItemForm = ({ item }) => {
  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    const name = e.target.name.value
    const price = e.target.price.value
    dispatch(UPDATE_ITEM({ key: item.name, updated: { name, price } }))
    dispatch(HIDE_MODAL())
  }

  return (
    <form onSubmit={submitHandler} className='pt-5 px-2'>
      <div className='mb-2'>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Item Name</span>
          <input type='text' name='name' className='form-control' placeholder='Item Name' defaultValue={item.name} />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Price</span>
          <input type='number' name='price' className='form-control' required placeholder='Price in Rs.' defaultValue={item.price} />
        </div>
        <div className='text-end'>
          <button type='submit' className='btn btn-sm btn-outline-success rounded-pill'>Update</button>
        </div>
      </div>
    </form>
  )
}

export default EditItemForm
