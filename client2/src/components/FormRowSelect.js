
const FormRowSelect = ({ name, value, list, handleChange, labelText }) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className="form-select"
            >
                {list.map((item, index) => <option key={`${name}-${index}`} value={item}>{item}</option>)}

            </select>

        </div>
    )
}

export default FormRowSelect;