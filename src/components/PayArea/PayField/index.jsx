import { useSelector } from 'react-redux'

const PayField = ({
  paidAmounts, person, remain, setDisabled, setPaidAmounts, setRemain,
}) => {
  const { id: uid } = useSelector(state => state.user)

  const handleBlur = e => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
    setRemain(prevRemain => prevRemain.toFixed(2) - value)
    setPaidAmounts({
      ...paidAmounts,
      [e.target.name]: value,
    })
    setDisabled((remain - value) !== 0)
  }

  const handleFocus = e => {
    setDisabled(true)
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
    if (value > remain) setRemain(remain + value)
  }

  return (
    <input
      className='form-control form-control-sm'
      type='number'
      onBlur={handleBlur}
      onFocus={handleFocus}
      min={0}
      defaultValue={uid === person.id ? remain : 0}
      name={person.name}
      step={0.01}
    />
  )
}

export default PayField
