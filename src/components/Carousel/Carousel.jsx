import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React from "react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./carousel.scss";
import { cardChild2, cardChild3, cards } from "../../utils/animationVariants";

export default function Carousel(props) {
  const carouselRef = useRef();
  const { pathname } = useLocation();

  const handleClick = (direction) => {
    let dist = carouselRef.current.getBoundingClientRect().x;

    // translateX(calc(10px - 4rem))
    console.log(window.innerWidth);
    let r = 0;
    if (window.innerWidth < 600) {
      r = 18;
    } else {
      r = 40;
    }

    if (direction === "left") {
      carouselRef.current.style.transform = `translateX(calc(${dist}px + 8rem))`;
    }
    if (direction === "right") {
      carouselRef.current.style.transform = `translateX(calc(${dist}px - ${r}rem))`;
    }
  };

  return (
    <motion.div
      className="carousel card"
      variants={cards}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="carouselContainer">
        <motion.div className="carouselHeadContainer" variants={cardChild3}>
          <div className="carouselHead">
            <Link
              to={
                props.type === "completed"
                  ? `/list/${props.item}/complete`
                  : `/list/${props.item}/pending`
              }
              state={{ from: pathname }}
              style={{ textDecoration: "none", color: "white" }}
              className="headingLink"
            >
              <span className="heading">
                {props.type === "completed" ? (
                  <>
                    <span>C</span>ompleted
                  </>
                ) : (
                  <>
                    <span>P</span>ending
                  </>
                )}{" "}
                Books
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div className="carouselContent" variants={cardChild2}>
          {props.books.length > 0 ? (
            <>
              <ArrowBackIosOutlined
                className="slideArrow left"
                onClick={() => handleClick("left")}
              />
              <div className="carouselCards" ref={carouselRef}>
                {props.books.map((book) => (
                  <Link
                    to={`/books/edit/books/${book._id}`}
                    state={{ book: book, from: pathname }}
                    className="carouselLink"
                    style={{ textDecoration: "none" }}
                    key={book._id}
                  >
                    <div className="carouselCard">
                      <img src={book.img} alt={book.title} key={book._id} />
                    </div>
                  </Link>
                ))}
              </div>
              <ArrowForwardIosOutlined
                className="slideArrow right"
                onClick={() => handleClick("right")}
              />
            </>
          ) : (
            <div className="message">No books to display!</div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
