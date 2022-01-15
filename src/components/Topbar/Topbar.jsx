import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { btn1, cardChild1, topMenu } from "../../utils/animationVariants";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../context/apiCalls";
import { CloseOutlined, Menu } from "@material-ui/icons";
import "./topbar.scss";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";

export default function Topbar() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = (e) => {
    logout(dispatch);
  };

  return (
    <>
      <motion.header
        className="topbar"
        variants={cardChild1}
        initial="hidden"
        animate="visible"
      >
        <div className="topbarContent">
          <div className="topbarBtn">
            <span className="topbarIcon" onClick={() => setOpen(true)}>
              <Menu />
            </span>
          </div>
          <div className="topbarLogo">
            <span>
              book<span>rack</span>
            </span>
          </div>

          <div className={open ? "topbarNav open" : "topbarNav"}>
            <div className="topbarClose" onClick={() => setOpen(false)}>
              <CloseOutlined />
            </div>

            <div className="topbarNavWrapper">
              <NavLink
                to="/"
                activeclassname={"active"}
                style={{ textDecoration: "none" }}
              >
                <div className="topbarNavItem">
                  <span>Home</span>
                </div>
              </NavLink>
              <NavLink
                to="/books"
                activeclassname={"active"}
                style={{ textDecoration: "none" }}
              >
                <div className="topbarNavItem">
                  <span>Books</span>
                </div>
              </NavLink>
              <NavLink
                to="/comics"
                activeclassname={"active"}
                style={{ textDecoration: "none" }}
              >
                <div className="topbarNavItem">
                  <span>Comics</span>
                </div>
              </NavLink>
            </div>
          </div>

          <div className="topbarAccount">
            <motion.div
              className="topbarProfile"
              variants={btn1}
              whileHover="hover"
              whileTap="click"
              onClick={() => setShow(!show)}
            >
              <img src={user.img} alt="" />
            </motion.div>

            <motion.div
              className="topbarMenu"
              variants={topMenu}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
            >
              <ul>
                <li onClick={() => setModal(true)}>View Account</li>
                <li className="line"></li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.header>
      {/* MODAL */}
      {modal && <Modal open={modal} onClose={setModal} />}
    </>
  );
}
