import { ArrowBackIosOutlined, SearchOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Main from "../Main/Main";
import { motion } from "framer-motion";
import "./itemSearch.scss";
import { cardChild1, cards } from "../../utils/animationVariants";
import Loader from "../../components/Loader/Loader";

export default function ItemSearch({ setTitle }) {
  let { item } = useParams();
  item = item.substring(0, item.length - 1);
  setTitle(`Search ${item}`);
  const inputRef = useRef();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  const handleClick = async () => {
    setLoading(true);
    try {
      const name = inputRef.current.value.split(" ").join("+");
      const res = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          name +
          "&key=AIzaSyDp8QIKQZwEDYbf4N-3-mufkzp2pv74S84"
      );
      const raw = res.data.items;

      const bookData = raw.map((item) => {
        const itemR = item.volumeInfo;

        return {
          id: item.id ? item.id : "none",
          title: itemR.title ? itemR.title : "No title",
          subtitle: itemR.subtitle ? itemR.subtitle : "No subtitle",
          author: itemR.authors
            ? itemR.authors[0]
              ? itemR.authors[0]
              : "No author"
            : "No author",
          genre: itemR.categories ? itemR.categories[0] : "No genre",
          img: itemR.imageLinks
            ? itemR.imageLinks.thumbnail
              ? itemR.imageLinks.thumbnail
              : ""
            : "",
          page: itemR.pageCount ? itemR.pageCount : 0,
        };
      });
      setLoading(false);
      setBooks(bookData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleKey = (e) => {
    if (e.which === 13) {
      handleClick();
    }
  };

  return (
    <Main>
      <motion.div
        className="searchBook card"
        variants={cards}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="searchBookContainer">
          <motion.div className="searchBookHeader" variants={cardChild1}>
            <div className="searchBookBack">
              <Link
                to={`/${item}s`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <div className="searchBookBackLink">
                  <ArrowBackIosOutlined />
                  <span className="searchBookBackText">{item}s</span>
                </div>
              </Link>
            </div>

            <div className="searchBookInputContainer">
              <div className="searchBookInput">
                <input
                  type="text"
                  placeholder="Enter title of the book"
                  ref={inputRef}
                  onKeyPress={(e) => handleKey(e)}
                />
                <SearchOutlined
                  className="searchBookIcon"
                  onClick={handleClick}
                />
              </div>
            </div>
          </motion.div>

          <div className="searchBookContent">
            {loading ? (
              <Loader />
            ) : (
              <div>
                <div className="searchBookContentWrapper">
                  {books.map((book) => (
                    <motion.div
                      key={book.id}
                      className="searchBookItem card"
                      variants={cards}
                    >
                      <Link
                        to={`/search/add/${item}s/${book.id}`}
                        state={{ book: book, from: pathname }}
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                        className="linkitem"
                      >
                        <div className="searchBookItemLeft">
                          <img src={book.img} alt={book.title} />
                        </div>
                        <div className="searchBookItemRight">
                          <div className="searchBookItemTop">
                            <span className="searchBookItemTitle">
                              {book.title}
                            </span>
                            <span className="searchBookItemAuthor">
                              {book.author}
                            </span>
                          </div>
                          <div className="searchBookItemBottom">
                            <div className="searchBookItemField">
                              <label>Subtitle: </label>
                              <span className="searchBookItemDetail">
                                {book.subtitle}
                              </span>
                            </div>
                            <div className="searchBookItemField">
                              <label>Genre: </label>
                              <span className="searchBookItemDetail">
                                {book.genre}
                              </span>
                            </div>
                            <div className="searchBookItemField">
                              <label>Pages: </label>
                              <span className="searchBookItemDetail">
                                {book.page}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Main>
  );
}
