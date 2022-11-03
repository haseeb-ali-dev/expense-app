import { memo } from 'react'

export default memo(() => (
  <div className='position-fixed top-50 start-50 translate-middle'>
    <div className='spinner-grow text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  </div>
))
