import ItemForm from 'components/ItemForm'

import 'containers/order/style.css'
import Resturant from 'components/Resturant'
import Items from 'components/Items'

const Order = () => (
  <div className='order-box'>
    <Resturant />
    <ItemForm />
    <Items />
  </div>
)

export default Order
