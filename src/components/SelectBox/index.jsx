const SelectBox = ({ name, required, options = [] }) => (
  <select name={name} className='input' required={required}>
    {options.length > 0
      && options.map(option => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
  </select>
)

export default SelectBox
