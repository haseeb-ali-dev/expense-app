import 'components/Button/style.css'

export default ({ className = 'default', text, onClick = null }) => (<button type='button' className={`button ${className}`} onClick={onClick}>{text}</button>)
