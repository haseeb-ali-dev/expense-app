import { memo } from 'react'

const Loader = () => (
  <div className='position-fixed top-50 start-50 translate-middle'>
    <div className='spinner-grow text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  </div>
)

export default memo(Loader)
