import "./addProduct.css";
import PropTypes from "prop-types";

export function AddProduct({ onAddClick }) {
  return (
    <div className="add">
      <button
        onClick={(e) => {
          e.preventDefault();
          onAddClick();
        }}
      >
        +
      </button>
    </div>
  );
}

AddProduct.propTypes = {
  onAddClick: PropTypes.func,
};
