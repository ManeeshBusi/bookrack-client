import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./progress.scss";

export default function Progress(props) {
  let { done, full, height, width, font } = props;
  const [style, setStyle] = useState({});
  const [size, setSize] = useState({});
  let progress = 0;

  if (done) {
    progress = Math.round((done / full) * 100);
  }

  useEffect(() => {
    let newStyle = {
      opacity: 1,
      width: `${progress}%`,
      fontSize: `${font}px`,
    };

    let newSize = {
      width: `${width}%`,
      height: `${height}px`,
    };

    setStyle(newStyle);
    setSize(newSize);
  }, []);

  return (
    <div className="progress" style={size}>
      <div className="progress-done" style={style}></div>
      <span className="progress-text" style={{ fontSize: `${font}px` }}>
        {progress}%
      </span>
    </div>
  );
}
