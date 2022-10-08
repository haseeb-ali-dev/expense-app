import 'components/Items/style.css'
import { useSelector } from 'react-redux'
import ListItem from 'components/ListItem'

const menuItems = () => {
  const { items } = useSelector(state => state.menu)

  return (
    <fieldset className='border p-2'>
      <legend className='float-none w-auto p-1'>Menu</legend>
      {items.length === 0
        ? <h3 className='fw-lighter fst-italic fs-5'>Loading items.......</h3>
        : items.map((item, index) => <ListItem item={item} key={`item-${index.toString()}`} />)}
    </fieldset>
  )
}

export default menuItems
