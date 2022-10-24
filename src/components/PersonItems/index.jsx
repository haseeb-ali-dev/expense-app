import { useDispatch, useSelector } from 'react-redux'

import ListItem from 'components/ListItem'

import { REMOVE_PERSON_ITEM } from 'store/person'

const personItems = () => {
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.person)
  const removePersonItem = (item) => dispatch(REMOVE_PERSON_ITEM(item))

  const itemList = (
    <fieldset className='border border-2 p-2'>
      <legend className='float-none w-auto px-1 fs-5'>Selected Items</legend>
      {items.map(item => (
        <div className='d-inline-flex mx-2 my-1 border p-2 position-relative' key={item.name}>
          <ListItem item={item} />
          <button type='button' className='btn btn-sm btn-danger position-absolute top-0 start-100 translate-middle rounded-circle' onClick={() => removePersonItem(item)}>X</button>
        </div>
      ))}
    </fieldset>
  )

  return (
    <div>{items.length !== 0 && itemList}</div>
  )
}

export default personItems
