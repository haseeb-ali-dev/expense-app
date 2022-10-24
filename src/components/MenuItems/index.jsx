import { useDispatch, useSelector } from 'react-redux'

import ListItem from 'components/ListItem'

import { REMOVE_ITEM } from 'store/menu'

const menuItems = () => {
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.menu)

  const removeItem = (item) => dispatch(REMOVE_ITEM(item))

  return (
    <fieldset className='border p-2'>
      <legend className='float-none w-auto p-1'>Menu</legend>
      {items.length === 0
        ? <h3 className='fw-lighter fst-italic fs-5'>No items.......</h3>
        : items.map((item, index) => (
          <div className='d-flex flex-row align-items-center' key={`item-${index.toString()}`}>
            <button type='button' className='btn btn-sm btn-outline-danger rounded-circle me-1' onClick={() => removeItem(item)}>X</button>
            <ListItem item={item} />
          </div>
        ))}
    </fieldset>
  )
}

export default menuItems
