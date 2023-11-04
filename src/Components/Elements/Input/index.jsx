/* eslint-disable react/display-name */
import { forwardRef } from "react";
import Input from "./Input";
import Label from "./Label";
import PropTypes from "prop-types";

const InputField = forwardRef((props, ref) => {
  const {
    label,
    type,
    name,
    placeholder,
    required,
    value,
    onChange,
    onChangeCapture,
    readOnly,
    defaultValue,
    disabled,
    minLength,
    classNameLabel,
    classNameInput,
    inputMode
  } = props;

  InputField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onChangeCapture: PropTypes.func,
    readOnly: PropTypes.bool,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    minLength: PropTypes.number,
    classNameLabel: PropTypes.string,
    classNameInput: PropTypes.string,
    inputMode: PropTypes.string
  };

  return (
    <div className="flex flex-col">
      <Label htmlFor={name} className={classNameLabel}>{label}</Label>
      <Input
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
        ref={ref}
        minLength={minLength}
        className={classNameInput}
        inputMode={inputMode}
      />
    </div>
  );
});

export default InputField;
