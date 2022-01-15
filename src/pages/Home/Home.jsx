import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Main from "../Main/Main";
import { motion } from "framer-motion";
import "./home.scss";
import { cardChild3, cardChild4, cards } from "../../utils/animationVariants";

export default function Home() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [comics, setComics] = useState([]);

  return (
    <Main type="full">
      <motion.div
        className="hero"
        variants={cards}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div className="heroLeft" variants={cardChild3}>
          <img src="/images/quote.png" alt="" />
          <span className="heroText">
            The library is inhabited by spirits that come out of the pages at
            night.
          </span>
        </motion.div>
        <motion.div className="heroRight" variants={cardChild4}>
          <img src="/images/Book lover-bro.png" alt="" />
        </motion.div>
      </motion.div>

      {/* <div className="home">
        <div className="homeLeft card"></div>
        <div className="homeRight card"></div>
      </div> */}
      <a href="https://storyset.com/education" style={{ opacity: "0" }}>
        Education illustrations by Storyset
      </a>
      <a
        href="https://www.vecteezy.com/free-vector/quotation-mark"
        style={{ opacity: "0" }}
      >
        Quotation Mark Vectors by Vecteezy
      </a>
    </Main>
  );
}
