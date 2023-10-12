/* eslint-disable react/display-name */
import PropTypes from "prop-types";

const SelectField = ({
  children,
  onChange,
  value,
  name,
  onChangeCapture,
  defaultValue,
}) => {
  SelectField.propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    onChangeCapture: PropTypes.func,
    defaultValue: PropTypes.string,
  };

  return (
    <select
      className="select select-bordered w-full rounded-full text-lg border focus:outline-primary-500 hover:border-primary-400"
      onChange={onChange}
      value={value}
      name={name}
      onChangeCapture={onChangeCapture}
      defaultValue={defaultValue}
    >
      {children}
    </select>
  );
};

export default SelectField;
