import React from "react";
import "./Switch.scss";

const Switch = ({ value, className, setValue, id }) => {
  return (
    <div className={`switch ${className ?? ""} `}>
      <input
        type="checkbox"
        id={id}
        checked={value}
        onClick={() => {
          setValue(!value);
        }}
      />
      <label for={id}>Toggle</label>
    </div>
  );
};

export default Switch;
