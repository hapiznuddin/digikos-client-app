import PropTypes from "prop-types";

const Label = ({ name, children }) => {
  Label.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
  };
  return (
    <label
      htmlFor={name}
      className="block text-lg font-medium text-neutral-800 md:text-xl md:font-medium"
    >
      {children}
    </label>
  );
};

export default Label;
