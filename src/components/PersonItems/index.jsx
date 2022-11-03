import { memo } from 'react'

import { Item } from 'components'

import { REMOVE_PERSON_ITEM } from 'store/person'
import { removeIcon } from 'assets/icons'

export default memo(({ dispatch, name, items }) => name !== '' && (
  <fieldset className='border border-2 p-2 mt-1'>
    <legend className='float-none w-auto px-1 fs-5'>{name}</legend>
    {items.map(item => (
      <div className='d-inline-flex mx-2 my-1 border p-2 position-relative' key={item.name}>
        <Item item={item} />
        <button
          className='btn btn-sm bg-light position-absolute top-0 start-100 translate-middle rounded-circle'
          onClick={() => dispatch(REMOVE_PERSON_ITEM(item))}
        ><img src={removeIcon} alt='x' />
        </button>
      </div>
    ))}
  </fieldset>
))
