import "./Button.css";

function Button({ action }) {
  return <button className="btn">{action.toUpperCase()}</button>;
}

export default Button;
