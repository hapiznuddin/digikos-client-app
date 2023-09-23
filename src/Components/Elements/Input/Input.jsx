/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import { forwardRef } from "react";


const Input = forwardRef((props, ref) => {
  const {type, placeholder, onChange, value, name, required, readOnly, defaultValue, minLength, disabled, onChangeCapture} = props;
  Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    defaultValue: PropTypes.string,
    minLength: PropTypes.number,
    disabled: PropTypes.bool,
    onChangeCapture: PropTypes.func,
  };
  return (
      <input
        disabled={disabled}
        onChange={onChange}
        onChangeCapture={onChangeCapture}
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        readOnly={readOnly}
        defaultValue={defaultValue}
        minLength={minLength}
        ref={ref}
        className={`input input-ghost w-full min-w-xs bg-neutral-25 text-neutral-800 rounded-full md:text-lg 
            border border-neutral-300 shadow-inner focus:outline-primary-500 hover:border-primary-400`}
      />
  );
});

export default Input;
