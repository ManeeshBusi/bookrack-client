import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import "./toaster.scss";

export default function Toaster(props) {
  const [show, setShow] = useState(true);

  setTimeout(() => {
    setShow(false);
  }, 2500);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={props.type === "delete" ? "saved del" : "saved"}
          initial={{ y: -10, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="savedContainer">
            <CheckCircleOutlineIcon className="savedIcon" />
            <span className="savedText">{props.msg}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
