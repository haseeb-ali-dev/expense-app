import PersonItems from 'components/PersonItems'
import PersonList from 'components/PersonList'
import PersonItemForm from 'components/PersonItemForm'
import 'containers/person/style.css'

const Persons = () => (
  <div className='persons-box'>
    <PersonItemForm />
    <PersonItems />
    <PersonList />
  </div>
)
export default Persons
