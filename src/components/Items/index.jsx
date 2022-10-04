import 'components/Items/style.css'
import ListItem from 'components/Items/ListItem'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getItems } from 'api/items'
import { ADD_ALL_ITEMS } from 'store/items'

const Items = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.items)

  const getAllItems = async () => {
    try {
      const res = await getItems()
      dispatch(ADD_ALL_ITEMS({ items: res }))
    } catch (error) {
      // console.log('Getting users error: ', error)
    }
  }

  useEffect(() => {
    getAllItems()
  }, [items])

  return (
    <fieldset className='items-box'>
      <legend>Items</legend>
      {items.length === 0
        ? <h3 className='no-items'>Loading items.......</h3>
        : items.map(item => <ListItem item={item} key={item.name} />)}
    </fieldset>
  )
}

export default Items
