import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Button from 'components/Button'
import SelectBox from 'components/SelectBox'
import Input from 'components/Input'
import PersonItems from 'components/PersonItems'

import 'components/PersonOrder/style.css'

const PersonOrder = () => {
  const [options, setOptions] = useState()

  const items = useSelector(state => state.items)

  useEffect(() => {
    const updatedItems = items.map(({ id, name, price }) => ({ name: `${name} -- ${price}`, value: id }))
    // console.log(updatedItems)
    setOptions(updatedItems)
  }, [items])

  const handleCLick = () => null

  return (
    <div className='personorder-box'>
      <Input type='text' name='person_name' required placeholder='Enter Person Name' />
      <span><SelectBox name='items' options={options} /><Button text='+' className='primary' /></span>
      <Button text='Save' className='success' onClick={handleCLick} />
      <PersonItems />
    </div>
  )
}

export default PersonOrder
