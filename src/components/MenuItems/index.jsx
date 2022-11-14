import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EditItemForm, Item, Modal } from 'components'

import { REMOVE_ITEM } from 'store/menu'
import { SET_MODAL_ITEM } from 'store/modal'

import { editIcon, removeIcon } from 'assets/icons'

const MenuItems = () => {
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.menu)
  const { showItem, modalItem } = useSelector(state => state.modal)

  const itemsList = items.map((item, index) => (
    <div className='d-flex flex-row align-items-center' key={`item-${index.toString()}`}>
      <button className='btn btn-sm mx-0 px-1' onClick={() => dispatch(REMOVE_ITEM({ index }))}>
        <img src={removeIcon} alt='X' />
      </button>
      <button className='btn btn-sm mx-0 px-1' onClick={() => dispatch(SET_MODAL_ITEM({ item }))}>
        <img src={editIcon} alt='E' />
      </button>
      <Item item={item} />
    </div>
  ))

  return items.length > 0 && (
    <fieldset className='border p-2'>
      <legend className='float-none w-auto p-1'>Menu</legend>
      {itemsList}
      {showItem && <Modal html={<EditItemForm item={modalItem} />} />}
    </fieldset>
  )
}

export default memo(MenuItems)
