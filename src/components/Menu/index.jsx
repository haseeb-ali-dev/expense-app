import MenuItems from 'components/MenuItems'
import ItemForm from 'components/ItemForm2'
import Resturant from 'components/Resturant2'

const menu = () => (
  <div className='p-3'>
    <Resturant />
    <ItemForm />
    <MenuItems />
  </div>
)

export default menu
