import 'components/Button/style.css'

export default ({
  className = 'default', text, onClick = null, type, disabled,
}) => (<button type={type ? 'submit' : 'button'} className={`button ${className}`} onClick={onClick} disabled={disabled}>{text}</button>)
