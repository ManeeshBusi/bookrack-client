import React from "react";
import { useRef } from "react";
import "./switch.scss";

export default function Switch(props) {
  const { state, setState } = props;
  const switchRef = useRef("switch");

  return (
    <div className="switch">
      <span>
        <input
          type="checkbox"
          ref={switchRef}
          checked={state}
          onChange={(e) => setState(e.target.checked)}
          name="own"
        />
        <button
          className="slider"
          type="button"
          name="own"
          onClick={() => setState(!state)}
        ></button>
      </span>
    </div>
  );
}
