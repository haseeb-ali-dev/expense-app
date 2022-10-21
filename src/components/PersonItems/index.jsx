import { useSelector } from 'react-redux'

import ListItem from 'components/ListItem'

const personItems = () => {
  const { items } = useSelector(state => state.person)
  const itemList = (
    <fieldset className='border border-2 p-2'>
      <legend className='float-none w-auto px-1 fs-5'>Selected Items</legend>
      {items.map(item => <div className='d-inline-flex m-1 border py-1 px-2' key={item.name}><ListItem item={item} /></div>)}
    </fieldset>
  )

  return (
    <div>{items.length !== 0 && itemList}</div>
  )
}

export default personItems
