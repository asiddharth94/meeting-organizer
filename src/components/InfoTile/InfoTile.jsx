import "./InfoTile.css";

function InfoTile(props) {
  const tileProps = Object.keys({ ...props });

  return (
    <div className="app_info-tile">
      {tileProps.map((item) => (
        <p key={props[item]}>{props[item]}</p>
      ))}
    </div>
  );
}

export default InfoTile;
