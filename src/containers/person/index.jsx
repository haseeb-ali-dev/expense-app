import ItemForm from 'components/ItemForm'

import 'containers/order/style.css'
import Resturant from 'components/Resturant'
import Items from 'components/Items'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Button from 'components/Button'

const Persons = () => {
  const [items, setItems] = useState([])

  return (
    <div className='persons-box'>
      <Resturant />
      <ItemForm setItems={setItems} />
      <Items items={items} />
      <Link to='/person'>
        <Button text='Add Person -->' />
      </Link>
    </div>
  )
}

export default Persons
