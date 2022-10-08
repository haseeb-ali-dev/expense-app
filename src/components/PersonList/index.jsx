import { useSelector } from 'react-redux'

import 'components/PersonList/style.css'
import ListItem from 'components/ListItem'

const PersonList = () => {
  const persons = useSelector(state => state.personList)
  return (
    persons.length === 0
      ? <h6>loading</h6>
      : persons.map((person, idx) => (
        <div className='person-list-box' key={`person-${idx.toString()}`}>
          <h5>Name: {person.name}</h5>
          <h6>Total: {person.total}</h6>
          {
            person.items.map((item, index) => <ListItem item={item} key={`item-${index.toString()}`} />)
          }
        </div>
      ))
  )
}

export default PersonList
