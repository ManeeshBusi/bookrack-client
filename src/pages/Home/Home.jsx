import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Main from "../Main/Main";
import "./home.scss";

export default function Home() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [comics, setComics] = useState([]);

  return (
    <Main>
      <div className="hero">
        <div className="heroLeft"></div>
        <div className="heroRight">
          <img src="/images/Book lover-bro.png" alt="" />
        </div>
      </div>
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
