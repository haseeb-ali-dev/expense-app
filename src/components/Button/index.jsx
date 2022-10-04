import 'components/Button/style.css'

export default ({
  className = 'default', text, onClick = null, type,
}) => (<button type={type ? 'submit' : 'button'} className={`button ${className}`} onClick={onClick}>{text}</button>)
