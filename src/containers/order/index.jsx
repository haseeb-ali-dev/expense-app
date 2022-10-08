import ItemActions from 'components/ItemActions'
import ItemForm from 'components/ItemForm'
import Items from 'components/Items'

import 'containers/order/style.css'

const Order = () => (
  <div className='container-fluid pb-3'>
    <div className='d-grid gap-3' style={{ gridTemplateColumns: '1fr 2fr' }}>
      <div className='bg-light border rounded-3'>

        <ItemForm />
        <Items />
        <ItemActions />
      </div>
      <div className='bg-light border rounded-3' />
    </div>
  </div>
)

export default Order
