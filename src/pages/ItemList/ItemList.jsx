import { ArrowBackIosOutlined } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../utils/config";
import Main from "../Main/Main";
import { motion } from "framer-motion";
import { cardChild1, cardChild3, cards } from "../../utils/animationVariants";
import Loader from "../../components/Loader/Loader";
import "./itemList.scss";

export default function ItemList({ setTitle }) {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  let { type, item } = useParams();
  const location = useLocation();
  item = item.substring(0, item.length - 1);

  setTitle(`${type[0].toUpperCase() + type.slice(1).toLowerCase()} ${item}s`);

  const sort = ["Created", "Author", "A-Z", "Z-A", "Series", "Last Read"];

  const match = {
    Author: "author",
    "A-Z": "asc",
    "Z-A": "desc",
    Series: "series",
    Created: "createdAt",
    "Last read": "end",
  };

  const filter = ["Bought", "Not Bought", "All"];

  const [selected, setSelected] = useState("Created");
  const [filtered, setFiltered] = useState(
    type === "own" ? "Bought" : type === "not-own" ? "Not Bought" : "All"
  );

  let [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        let res = [];
        if (type === "complete") {
          res = await axiosInstance.get(
            `/${item}/${user._id}?status=Complete&sortBy=${match[selected]}` +
              (filtered !== "All" ? `&own=${filtered === "Bought"}` : ""),
            { headers: { authorization: `Bearer ${user.token}` } }
          );

          item === "book"
            ? setBooks(res.data[0].books)
            : setBooks(res.data[0].comics);
        } else if (type === "pending") {
          res = await axiosInstance.get(
            `/${item}/${user._id}?status=Pending&sortBy=${match[selected]}` +
              (filtered !== "All" ? `&own=${filtered === "Bought"}` : ""),
            { headers: { authorization: `Bearer ${user.token}` } }
          );

          item === "book"
            ? setBooks(res.data[0].books)
            : setBooks(res.data[0].comics);
        } else {
          res = await axiosInstance.get(
            `/${item}/${user._id}?sortBy=${match[selected]}` +
              (filtered !== "All" ? `&own=${filtered === "Bought"}` : ""),
            { headers: { authorization: `Bearer ${user.token}` } }
          );
          item === "book"
            ? setBooks(res.data[0].books)
            : setBooks(res.data[0].comics);
        }

        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    getBooks();
  }, [selected, type, filtered, item, user._id, user.token, match]);

  const [input, setInput] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setInput(e.target.value);
    setLoading(false);
  };

  if (input.length > 0) {
    books = books.filter((i) => {
      return (
        i.title.toLowerCase().match(input.toLowerCase()) ||
        i.author.toLowerCase().match(input.toLowerCase())
      );
    });
  }

  return (
    <Main>
      <motion.div
        className="booksList card"
        variants={cards}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="booksListContainer">
          <motion.div className="booksListHeader" variants={cardChild1}>
            <div className="booksListBack">
              <Link
                to={`/${item}s`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <div className="booksListBackLink">
                  <ArrowBackIosOutlined />
                  <span className="booksListBackText">Books</span>
                </div>
              </Link>
            </div>

            <div className="booksListSearch">
              <input
                type="text"
                placeholder="Search Book"
                value={input}
                onChange={handleSearch}
              />
            </div>

            <div className="booksListDrop">
              <Dropdown
                data={filter}
                selected={filtered}
                setSelected={setFiltered}
              />
              <Dropdown
                data={sort}
                selected={selected}
                setSelected={setSelected}
                type="sort"
              />
            </div>
          </motion.div>

          <div className="booksListContent">
            {/* {loading ? (
              <Loader />
            ) : ( */}
            <motion.div
              className="booksListContentWrapper"
              variants={cardChild3}
            >
              {books.map((book) => (
                <Link
                  to={`/${type}/edit/${item}s/${book._id}`}
                  state={{ book: book, from: location.pathname }}
                  style={{
                    textDecoration: "none",
                    border: book.own ? "none" : "2px solid #ec5d57",
                  }}
                  className="booksListItem"
                  key={book._id}
                >
                  <div>
                    <div className="booksListImgContainer">
                      <img src={book.img} alt={book.title} />
                    </div>

                    <div className="booksListDetails">
                      <span className="booksListTitle">{book.title}</span>
                      <span className="booksListAuthor">{book.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
            {/* )} */}
          </div>
        </div>
      </motion.div>
      {/* <h1>Is it working?</h1> */}
    </Main>
  );
}
