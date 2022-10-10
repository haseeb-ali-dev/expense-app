import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Menu from 'components/Menu'
import Person from 'components/Person'

const Order = () => {
  const styling = { gridTemplateColumns: '1fr 2fr' }
  const personList = useSelector(state => state.personList)

  return (
    <div className='container-fluid pb-3'>
      <div className='d-grid gap-2' style={styling}>
        <div className='bg-light border rounded-2'>
          <Menu />
        </div>
        <div className='bg-light border rounded-2'>
          <Person />
        </div>
      </div>
      {personList.length > 0 && <Link to='/payment' className='btn btn-primary rounded-pill float-end m-2'>Proceed to payment section -&gt;</Link>}
    </div>
  )
}
export default Order
