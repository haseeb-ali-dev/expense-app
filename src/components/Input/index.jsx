import 'components/Input/style.css'

export default ({
  type, name, required, placeholder, onChange = null, value,
}) => (<input className='input' type={type} name={name} value={value} required={required} placeholder={placeholder} onChange={onChange} />)
