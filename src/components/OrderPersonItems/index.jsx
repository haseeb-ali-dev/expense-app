import { memo } from 'react'

import { Item } from 'components'

export default memo(({ person }) => (
  <div>
    <div className='fs-5 mt-2'>Items:</div>
    <div>
      {person.items.map(item => <Item item={item} key={item.name} />)}
    </div>
    {person.balance === 0 && <div className='text-end'><small className='text-muted fst-italic'>settled up</small></div>}
  </div>
))
