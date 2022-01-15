import {
  ArrowDropDown,
  ArrowDropUp,
  Filter1Outlined,
  FilterList,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./dropdown.scss";

export default function Dropdown(props) {
  const { data, selected, setSelected, type } = props;

  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  const handleClick = (item) => {
    toggleDropdown();
    setSelected(item);
  };

  return (
    <div className={type === "sort" ? "dropdown" : "dropdown own"}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {type === "sort" ? (
          <>
            <span className="header">{selected}</span>
            <span className="btn">
              {open ? (
                <ArrowDropDown style={{ fontSize: "14px" }} />
              ) : (
                <ArrowDropUp style={{ fontSize: "14px" }} />
              )}
            </span>
          </>
        ) : (
          <FilterList className="dropdown-icon" />
        )}
      </div>

      <div className={`dropdown-body ${open && "open"}`}>
        {data.map((item) => (
          <div
            className="dropdown-item"
            onClick={() => handleClick(item)}
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
