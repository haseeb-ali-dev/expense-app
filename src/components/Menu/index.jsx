import ItemForm from 'components/ItemForm'
import MenuItems from 'components/MenuItems'
import Resturant from 'components/Resturant'

const menu = () => (
  <div className='p-3'>
    <Resturant />
    <ItemForm />
    <MenuItems />
  </div>
)

export default menu
