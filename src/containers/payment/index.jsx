import { Link } from 'react-router-dom'

import Deductions from 'components/Deductions'
import PayArea from 'components/PayArea'
import SplitArea from 'components/SplitArea'

const paymentSection = () => {
  const styling = { gridTemplateColumns: '1fr 1.5fr 2fr' }

  return (
    <div className='container-fluid pb-3'>
      <div className='d-grid gap-2' style={styling}>
        <div className='bg-light border rounded-2'>
          <Deductions />
        </div>
        <div className='bg-light border rounded-2'>
          <PayArea />
        </div>
        <div className='bg-light border rounded-2'>
          <SplitArea />
        </div>
      </div>
      <Link to='/create' className='btn btn-secondary rounded-pill float-start m-2'>Back</Link>
    </div>
  )
}
export default paymentSection
