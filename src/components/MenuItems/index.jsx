import { useDispatch, useSelector } from 'react-redux'

import EditItemForm from 'components/ItemForm/edit'
import ListItem from 'components/ListItem'
import Modal from 'components/Modal'

import { REMOVE_ITEM } from 'store/menu'
import { SET_MODAL_ITEM, SHOW_MODAL } from 'store/modal'

import removeIcon from 'assets/icons/remove.svg'
import editIcon from 'assets/icons/edit2.svg'

const menuItems = () => {
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.menu)
  const { show: showModal, modalItem } = useSelector(state => state.modal)

  const removeItem = (item) => dispatch(REMOVE_ITEM(item))
  const editItem = (item) => {
    dispatch(SET_MODAL_ITEM({ item }))
    dispatch(SHOW_MODAL())
  }

  return (
    <fieldset className='border p-2'>
      <legend className='float-none w-auto p-1'>Menu</legend>
      {items.length === 0
        ? <h3 className='fw-lighter fst-italic fs-5'>No items.......</h3>
        : items.map((item, index) => (
          <div className='d-flex flex-row align-items-center' key={`item-${index.toString()}`}>
            <button type='button' className='btn btn-sm mx-0' onClick={() => removeItem(item)}>
              <img src={removeIcon} alt='X' />
            </button>
            <button type='button' className='btn btn-sm me-1' onClick={() => editItem(item)}>
              <img src={editIcon} alt='E' />
            </button>
            <ListItem item={item} />
          </div>
        ))}
      {showModal && <Modal html={<EditItemForm item={modalItem} />} />}
    </fieldset>
  )
}

export default menuItems
