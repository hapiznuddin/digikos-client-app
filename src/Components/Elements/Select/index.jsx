import PropTypes from "prop-types";

const SelectField = ({children}) => {
  SelectField.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string
  }
  return (
    <select className="select select-bordered w-full rounded-full">
      {children}
    </select>
  );
};

export default SelectField;
