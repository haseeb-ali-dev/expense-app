export default ({
  name, required, options = [], onChange = null, value = '',
}) => (
  <select name={name} className='form-control' required={required} onChange={onChange} value={value}>
    <option value=''>Please select a option</option>
    {options.length > 0
      && options.map((option, index) => (
        <option value={option.value} key={`item-${index.toString()}`} disabled={option.disabled}>
          {option.name}
        </option>
      ))}
  </select>
)
