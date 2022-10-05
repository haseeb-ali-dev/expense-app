import 'containers/person/style.css'
import { Link } from 'react-router-dom'
import Button from 'components/Button'
import PersonOrder from 'components/PersonOrder'

const Persons = () => (
  <div className='persons-box'>
    <PersonOrder />
    <Link to='/person' className='next-btn'>
      <Button text='Next ->' />
    </Link>
  </div>
)

export default Persons
