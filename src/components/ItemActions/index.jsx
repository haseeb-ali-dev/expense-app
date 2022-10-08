import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { addResturantAndItems } from 'api/items'
import { ADD_ORDER_REF } from 'store/ref'

import Button from 'components/Button'

import 'components/ItemActions/style.css'

const ItemActions = () => {
  const dispatch = useDispatch()

  const items = useSelector(state => state.items)
  const resturant = useSelector(state => state.resturant)
  const ref = useSelector(state => state.ref)

  const disabled = resturant.length === 0 || items.length === 0

  const [linkDisabled, setLinkDisabled] = useState(disabled)

  const handleSave = async () => {
    try {
      await addResturantAndItems(resturant, items, ref)
        .then((refId) => {
          setLinkDisabled(disabled)
          dispatch(ADD_ORDER_REF({ id: refId }))
        })
    } catch (error) {
      console.log('Error in adding items and resturant: ', error)
    }
  }

  return (
    <>
      <Button text='💾 Save' className='success save-btn' disabled={disabled} onClick={handleSave} />
      <Link to='/person' className={`add-person-btn ${linkDisabled ? 'disabled' : ''}`}>
        <Button text='Add Person ➡️' />
      </Link>
    </>
  )
}

export default ItemActions
