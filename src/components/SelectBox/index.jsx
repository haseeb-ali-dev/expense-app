const SelectBox = ({
  name, required, options = [], onChange = null,
}) => (
  <select name={name} className='form-control' required={required} onChange={onChange}>
    <option value=''>Please select a option</option>
    {options.length > 0
      && options.map((option, index) => (
        <option value={option.value} key={`item-${index.toString()}`} disabled={option.disabled}>
          {option.name}
        </option>
      ))}
  </select>
)

export default SelectBox
