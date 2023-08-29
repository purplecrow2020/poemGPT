import IncreaseScaleOnhover from "./IncreaseScaleOnhover";

export default function Button(props) {
  const { name, clickHandler } = props;
  return (
    <IncreaseScaleOnhover>
      <div className="button" onClick={clickHandler}>
        <span>{name}</span>
      </div>
    </IncreaseScaleOnhover>
  );
}


// icon