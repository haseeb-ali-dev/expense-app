import 'components/Input/style.css'

export default ({
  type, name, required, placeholder,
}) => (<input className='input' type={type} name={name} required={required} placeholder={placeholder} />)
