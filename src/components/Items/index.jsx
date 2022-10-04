import 'components/Items/style.css'
import ListItem from 'components/Items/ListItem'

const Items = ({ items }) => (
  <fieldset className='items-box'>
    <legend>Items</legend>
    {items.length === 0
      ? <h3 className='no-items'>No items exists</h3>
      : items.map(item => <ListItem item={item} key={item.name} />)}
  </fieldset>
)

export default Items
