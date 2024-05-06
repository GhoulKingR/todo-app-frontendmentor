import { useEffect, useState } from "react";
import CheckIcon from "./images/icon-check.svg";
import "./Checkbox.css";

// eslint-disable-next-line
function Checkbox({ checked, onValueChange, darkMode }) {
  const [style, setStyle] = useState({});
  const [internalChecked, setInternalChecked] = useState(false);

  useEffect(() => {
    if (checked !== undefined) setInternalChecked(checked);
  }, [checked]);

  return (
    <div
      style={style}
      className={
        "checkbox__border" +
        (checked ? " checked" : "") +
        (darkMode ? " dark" : "")
      }
      onClick={() => {
        setInternalChecked(!internalChecked);
        if (onValueChange !== undefined)
          if (typeof onValueChange == "function")
            onValueChange(!internalChecked);
          else throw new Error("onValueChange must be a function");
      }}
    >
      {internalChecked && <img src={CheckIcon} alt="check" />}
    </div>
  );
}

export default Checkbox;
