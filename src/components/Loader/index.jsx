import { memo } from 'react'

export default memo(() => (
  <div className='d-flex align-items-center justify-content-center'>
    <div className='spinner-grow text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  </div>
))
