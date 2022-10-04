import ItemForm from 'components/ItemForm'

import 'containers/order/style.css'
import Resturant from 'components/Resturant'
import Items from 'components/Items'

import { Link } from 'react-router-dom'
import Button from 'components/Button'

const Order = () => (
  <div className='order-box'>
    <Resturant />
    <ItemForm />
    <Items />
    <Link to='/person' className='add-person-btn'>
      <Button text='Add Person -->' />
    </Link>
  </div>
)

export default Order
