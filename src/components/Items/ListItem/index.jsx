import 'components/Items/ListItem/style.css'

const ListItem = ({ item }) => (
  <div className='list-item-box'>
    <span className='list-item'><small className='text-muted'>Name:</small> {item.name}</span>
    <span className='list-item'><small className='text-muted'>Price:</small> PKR {item.price ?? 0}</span>
  </div>
)

export default ListItem
