import PropTypes from "prop-types";

const SelectField = ({children, onChange, value}) => {
  SelectField.propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    value: PropTypes.string,

  }
  return (
    <select className="select select-bordered w-full rounded-full border focus:outline-primary-500 hover:border-primary-400"
      onChange={onChange} value={value}
    >
      {children}
    </select>
  );
};

export default SelectField;
