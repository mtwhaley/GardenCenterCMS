export function StatusError({ message, onClose }) {
  return (
    <div className="pop-down">
      <p className="pop-downMessage">
        <button className="closePop-down" onClick={onClose}>
          &times;
        </button>
        {message}
      </p>
    </div>
  );
}
