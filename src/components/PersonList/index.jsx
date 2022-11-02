import { Item } from 'components'

import { REMOVE_PERSON_ITEM } from 'store/personList'
import { SET_MODAL_PERSON } from 'store/modal'

import { editIcon2, removeIcon } from 'assets/icons'

export default ({ dispatch, menuItems, persons }) => persons.length !== 0 && (
  persons.map(({ name: personName, total, items }, personIdx) => (
    <div className='mt-2 mx-1 border py-1 px-2 row bg-white' key={`person-${personIdx.toString()}`}>
      <div className='col-md-3'><small className='text-muted'>Name:</small> {personName}</div>
      <div className='col-md-3'><small className='text-muted'>Total:</small> Rs. {total.toLocaleString('en-US')}</div>
      <div className='col-md-5'>
        {items.map((item, itemIdx) => (
          <div className='d-flex flex-row align-items-center' key={`person-item-${itemIdx.toString()}`} role='group'>
            <button className='btn btn-sm' onClick={() => dispatch(REMOVE_PERSON_ITEM({ personIdx, itemIdx }))}>
              <img src={removeIcon} alt='x' />
            </button>
            <Item item={item} />
          </div>
        ))}
      </div>
      <div className='col-sm-1'>
        <button
          className='btn btn-sm'
          onClick={() => {
            dispatch(SET_MODAL_PERSON({
              personIdx,
              items: menuItems.filter(mItm => items.every(pItm => (pItm.name !== mItm.name)))
                .map(({ name, price }) => ({
                  label: `${name} @ Rs. ${price.toLocaleString('en-US')}`,
                  value: JSON.stringify({ name, price }),
                })),
            }))
          }}
        ><img src={editIcon2} alt='+' />
        </button>
      </div>
    </div>
  ))
)
