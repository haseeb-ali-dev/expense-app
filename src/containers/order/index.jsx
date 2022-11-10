import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { UPDATE_GRAND } from 'store/order'

import Menu from 'components/Menu'
import Person from 'components/Person'

const Order = () => {
  const dispatch = useDispatch()
  const { resturant } = useSelector(state => state.order)
  const personList = useSelector(state => state.personList)
  const flag = personList.length > 0 && resturant !== ''
  const updateGrand = () => dispatch(UPDATE_GRAND({ personList }))

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-4 p-0'>
          <div className='bg-light border rounded-2 m-1'>
            <Menu />
          </div>
        </div>
        <div className='col-md-8 p-0'>
          <div className='bg-light border rounded-2 m-1'>
            <Person />
          </div>
        </div>
      </div>
      {flag && <Link to='/payment' className='btn btn-primary rounded-pill float-end my-2' onClick={updateGrand}>Proceed to payment section -&gt;</Link>}
    </div>
  )
}
export default Order
