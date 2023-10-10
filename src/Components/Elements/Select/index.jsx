/* eslint-disable react/display-name */
import PropTypes from "prop-types";

const SelectField = ({children, onChange, value, name, onChangeCapture }) => {
  SelectField.propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    onChangeCapture: PropTypes.func,
  }

  return (
    <select className="select select-bordered w-full rounded-full text-lg font-medium border focus:outline-primary-500 hover:border-primary-400"
      onChange={onChange} value={value} name={name} onChangeCapture={onChangeCapture}
    >
      {children}
    </select>
  );
};

export default SelectField;
