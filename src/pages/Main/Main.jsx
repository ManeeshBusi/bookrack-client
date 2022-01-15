import React from "react";
import "./main.scss";

export default function Main(props) {
  return (
    <div className={props.type === "full" ? "main full" : "main"}>
      <div className="mainContainer">{props.children}</div>
    </div>
  );
}
