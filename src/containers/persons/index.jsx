import ItemForm from 'components/ItemForm'

import 'containers/order/style.css'
import Resturant from 'components/Resturant'
import Items from 'components/Items'

import { useState } from 'react'

const Persons = () => {
  const [items, setItems] = useState([])

  return (
    <div className='persons-box'>
      <Resturant />
      <ItemForm setItems={setItems} />
      <Items items={items} />
    </div>
  )
}

export default Persons
