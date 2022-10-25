import { useDispatch, useSelector } from 'react-redux'

import ListItem from 'components/ListItem'

import { REMOVE_PERSON_ITEM } from 'store/personList'

const PersonList = () => {
  const dispatch = useDispatch()
  const persons = useSelector(state => state.personList)

  const removePersonItem = (personIdx, itemIdx) => {
    dispatch(REMOVE_PERSON_ITEM({ personIdx, itemIdx }))
  }
  const addPeronItem = (personIdx) => {
    console.log(personIdx)
    // dispatch(REMOVE_PERSON_ITEM({ personIdx, itemIdx }))
  }

  const personList = persons.map((person, index1) => (
    <div className='mt-2 mx-1 border py-1 px-2 row bg-white' key={`person-${index1.toString()}`}>
      <div className='col-md-3'><small className='text-muted'>Name:</small> {person.name}</div>
      <div className='col-md-3'><small className='text-muted'>Total:</small> PKR/- {person.total}</div>
      <div className='col-md-5'>
        {person.items.map((item, index2) => (
          <div className='btn-group py-1' key={`person-item-${index2.toString()}`} role='group'>
            <span className='border border-2 rounded-end rounded-4 p-1'>
              <ListItem item={item} />
            </span>
            <button type='button' className='btn btn-sm btn-danger rounded-start rounded-4 opacity-50' onClick={() => removePersonItem(index1, index2)}>x</button>
          </div>
        ))}
      </div>
      <div className='col-sm-1'>
        <button type='button' className='btn btn-sm btn-success rounded-circle' onClick={() => addPeronItem(index1)}>+</button>
      </div>
    </div>
  ))

  return (<div>{persons.length !== 0 && personList}</div>)
}

export default PersonList
