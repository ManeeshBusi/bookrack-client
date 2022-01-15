import React from "react";
import "./slides.scss";

export default function Slides(props) {
  const Slide = ({ item }) => {
    return (
      <div className="currentContent" key={item._id}>
        <div className="currentText">{item.text}</div>
        <div className="currentProgress">{item.progress}</div>
      </div>
    );
  };

  return (
    <div className="code-wrapper">
      <pre
        key={props.currentShape.id}
        className={
          "code code--active" +
          (props.direction < 0 ? " slide-left" : " slide-right")
        }
      >
        <Slide item={props.currentShape} />
      </pre>

      {props.lastShape && (
        <pre
          key={props.lastShape.id}
          className={
            "code code--last" +
            (props.direction < 0 ? " slide-left" : " slide-right")
          }
        >
          <Slide item={props.lastShape} />
        </pre>
      )}
    </div>
  );
}
