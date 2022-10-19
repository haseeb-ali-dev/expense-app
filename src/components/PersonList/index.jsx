import { useSelector } from 'react-redux'
import ListItem from 'components/ListItem'

const PersonList = () => {
  const persons = useSelector(state => state.personList)
  const personList = persons.map((person, idx) => (
    <div className='mt-2 mx-1 border py-1 px-2 row bg-white' key={`person-${idx.toString()}`}>
      <div className='col'><small className='text-muted'>Name:</small> {person.name}</div>
      <div className='col'><small className='text-muted'>Total:</small> PKR/- {person.total}</div>
      <div className='col'>
        {person.items.map(item => <ListItem item={item} key={item.name} />)}
      </div>
    </div>
  ))

  return (
    <div>{persons.length !== 0 && personList}</div>
  )
}

export default PersonList
