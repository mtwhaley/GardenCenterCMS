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
