export default ({
  className = 'default', text, onClick = null, type, disabled,
}) => (
  <button type={type ? 'submit' : 'button'} className={`btn btn-${className}`} onClick={onClick} disabled={disabled}>{text}</button>
)
