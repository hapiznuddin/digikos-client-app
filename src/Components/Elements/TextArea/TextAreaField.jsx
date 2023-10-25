import Label from "../Input/Label"
import PropTypes from "prop-types"

const TextAreaField = ({ name, label, classNameLabel, onChange, value, onChangeCapture, type, placeholder, required, readOnly, defaultValue, }) => {
  TextAreaField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    onChangeCapture: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    defaultValue: PropTypes.string,
  }
  return (
    <div className="flex flex-col">
    <Label htmlFor={name} className={classNameLabel}>{label}</Label>
    <textarea className="textarea textarea-bordered rounded-3xl w-full min-w-xs bg-neutral-25 text-neutral-800 md:text-lg 
            border border-neutral-300 shadow-inner focus:outline-primary-500 hover:border-primary-400"
        onChange={onChange}
        onChangeCapture={onChangeCapture}
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        readOnly={readOnly}
        defaultValue={defaultValue}></textarea>
    </div>
  )
}

export default TextAreaField