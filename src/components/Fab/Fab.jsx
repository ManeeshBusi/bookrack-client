import { Add, AddBoxOutlined, SearchOutlined } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./fab.scss";

export default function Fab(props) {
  const menuRef = useRef();
  console.log("HERE", props.type);
  const [show, setShow] = useState(false);

  const fabMen = {
    hidden: {
      scale: 0,
      transition: { duration: 0.5 },
    },
    visible: {
      scale: 1,
    },
  };

  const fabitem = {
    hidden: {
      y: 120,
      scale: 0,
    },
    visible: {
      y: 0,
      scale: 1,
      transition: {
        delay: 0.08,
      },
    },
  };
  const fabitem2 = {
    hidden: {
      y: 60,
      scale: 0,
      transition: {
        delay: 0.09,
      },
    },
    visible: {
      y: 0,
      scale: 1,
    },
  };

  return (
    <div className="circle">
      <div className="fabIconContainer" onClick={() => setShow(!show)}>
        <Add className="fabIcon" />
      </div>
      <motion.ul
        className="fabMenu"
        variants={fabMen}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
      >
        <motion.li
          variants={fabitem}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
        >
          <Link
            to={`/${props.type}s/add/${props.type}s/new`}
            style={{ textDecoration: "none" }}
            className="fabLink"
          >
            <div className="fabItemIconContainer">
              <AddBoxOutlined className="fabItemIcon" />
            </div>
          </Link>
          <span className="fabItemText">Add Custom {props.type}</span>
        </motion.li>
        <motion.li
          variants={fabitem2}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
        >
          <Link
            to={`/${props.type}s/search`}
            style={{ textDecoration: "none" }}
            className="fabLink"
          >
            <div className="fabItemIconContainer">
              <SearchOutlined className="fabItemIcon" color="secondary" />
            </div>
          </Link>
          <span className="fabItemText">Search {props.type}</span>
        </motion.li>
      </motion.ul>
    </div>
  );
}
