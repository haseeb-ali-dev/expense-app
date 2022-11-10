import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Deductions from 'components/Deductions'
import OrderItems from 'components/OrderItems'
import PayArea from 'components/PayArea'
import SplitArea from 'components/SplitArea'

const PaymentSection = () => {
  const { ableToSave } = useSelector(state => state.menu)

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 p-0'>
          <div className='bg-light border rounded-2 m-1 position-relative'>
            <OrderItems />
          </div>
        </div>
        <div className='col-md-4 p-0'>
          <div className='bg-light border rounded-2 m-1'>
            <Deductions />
          </div>
        </div>
        <div className='col-md-5 p-0'>
          <div className='bg-light border rounded-2 m-1'>
            <PayArea />
          </div>
        </div>
      </div>
      {ableToSave ? (
        <div className='bg-light border rounded-2'>
          <SplitArea />
        </div>
      ) : <Link to='/create' className='btn btn-secondary rounded-pill float-start m-2'>Back</Link>}
    </div>
  )
}
export default PaymentSection
