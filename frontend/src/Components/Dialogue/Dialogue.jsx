import "./Dialogue.scss";
export default function Dialogue({ message, setShow, title }) {
  return (
    <div className="overlay">
      <div className="dialogue">
        {title ? (
          <h3 className="dialogue__heading"> {title} </h3>
        ) : (
          <h3 className="dialogue__heading">Oops!</h3>
        )}
        <p className="dialogue__text">{message}</p>
        <button
          className="dialogue__closeBtn"
          type="button"
          onClick={() => {
            setShow(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
