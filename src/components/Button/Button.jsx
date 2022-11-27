import React from "react";
import "./Button.scss";

const Button = ({ onClick, className, children }) => {
  return (
    <a
      href="#"
      className={`${className ?? ""}`}
      onClick={() => typeof onClick === "function" && onClick()}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {children}
    </a>
  );
};

export default Button;
