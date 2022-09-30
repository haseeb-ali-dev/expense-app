import Button from 'components/Button'
import Input from 'components/Input'

import 'components/ItemForm/style.css'

const ItemForm = ({ setItems }) => {
  const addItem = () => {
    const newItem = { name: 'Coffee', price: 900 }
    setItems(prevItems => [newItem, ...prevItems])
  }

  return (
    <div className='item-box'>
      <Input type='text' name='name' required placeholder='Enter Name' />
      <Input type='number' name='price' required placeholder='Enter Price' />
      <Button className='success' text='+ Add' onClick={addItem} />
    </div>
  )
}

export default ItemForm
