import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Deductions from 'components/Deductions'
import OrderItems from 'components/OrderItems'
import PayArea from 'components/PayArea'
import SplitArea from 'components/SplitArea'

const paymentSection = () => {
  const { ableToSave } = useSelector(state => state.menu)
  const styling = { gridTemplateColumns: '1fr 1fr' }

  return (
    <div className='container-fluid pb-3'>
      <div className='d-grid gap-2 mb-2' style={styling}>
        <div className='bg-light border rounded-2'>
          <OrderItems />
        </div>
        <div className='bg-light border rounded-2'>
          <Deductions />
        </div>
      </div>
      <div className='d-grid gap-2' style={styling}>
        <div className='bg-light border rounded-2'>
          <PayArea />
        </div>
        <div className='bg-light border rounded-2'>
          <SplitArea />
        </div>
      </div>
      {!ableToSave && <Link to='/create' className='btn btn-secondary rounded-pill float-start m-2'>Back</Link>}
    </div>
  )
}
export default paymentSection
