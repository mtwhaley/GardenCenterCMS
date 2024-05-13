export function ConnectionError() {
  return (
    <div className="popup-container">
      <div className="popup-form">
        <h3>Trouble connecting to server</h3>
        <p>please try again later</p>
        <button
          className="refreshButton"
          onClick={() => {
            window.location.reload();
          }}
        >
          <div className="refreshSymbol">&#x21bb;</div>
        </button>
      </div>
    </div>
  );
}
