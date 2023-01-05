import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Progress from "../Progress/Progress";
import Slides from "../Slides/Slides";
import { motion } from "framer-motion";
import "./current.scss";
import { cards } from "../../utils/animationVariants";

export default function Current(props) {
  const location = useLocation();
  // const { user } = useContext(AuthContext);
  // let greet = new Date().getHours < 12 ? "Morning" : "Evening";

  let i = 99;

  let data = [];

  data = props.current.map((book) => {
    i = i - 1;
    return {
      id: i,
      text: (
        <>
          <span>
            You are now reading: <br />{" "}
            <Link
              to={`/${props.type}/edit/${props.type}/${book._id}`}
              state={{ from: location.pathname, book: book }}
              style={{ textDecoration: "none" }}
            >
              <span>{book.title}</span>
            </Link>
          </span>
        </>
      ),
      progress: (
        <Progress
          done={book.progress}
          full={book.page}
          width={110}
          height={30}
          font={16}
        />
      ),
    };
  });

  data.push(
    {
      id: 2,
      text: (
        <>
          <span>
            You have completed reading <br />
            {props.complete} {props.type}!
          </span>
        </>
      ),
      progress: (
        <Link
          to={`/list/${props.type}/complete`}
          state={{ from: location.pathname }}
          style={{ textDecoration: "none" }}
        >
          <span>Take a look!</span>
        </Link>
      ),
    },
    {
      id: 3,
      text: (
        <>
          <span>
            You still have to read <br />
            {props.pending} {props.type}!
          </span>
        </>
      ),
      progress: (
        <Link
          to={`/list/${props.type}/pending`}
          state={{ from: location.pathname }}
          style={{ textDecoration: "none" }}
        >
          <span>Check them out!</span>
        </Link>
      ),
    },
    {
      id: 4,
      text: (
        <>
          <span>
            You have collected <br />{" "}
            <Link
              to={`/list/${props.type}/own`}
              state={{ from: location.pathname }}
              style={{ textDecoration: "none" }}
            >
              <span>{props.owned}</span>
            </Link>{" "}
            out of{" "}
            <Link
              to={`/list/${props.type}/all`}
              state={{ from: location.pathname }}
              style={{ textDecoration: "none" }}
            >
              <span>{props.complete + props.pending}</span>
            </Link>{" "}
            {props.type}!
          </span>
        </>
      ),
      progress: (
        <Link
          to={`/list/${props.type}/not-own`}
          state={{ from: location.pathname }}
          style={{ textDecoration: "none" }}
        >
          <span style={{ fontSize: "1rem" }}>Complete your collection!</span>
        </Link>
      ),
    }
  );
  // if (props.type === "books") {
  //   // OTHER STUFF
  // } else if (props.type === "comics") {
  //   data.push(
  //     {
  //       id:5,
  //       text:(
  //         <>
  //           <span></span>
  //         </>
  //       )
  //     }
  //   )
  // }

  const [sli, updateSli] = useState({
    currentIndex: 0,
    lastIndex: -1,
    direction: 0,
  });

  const showNext = (index) => {
    let lastIndex =
      index < 0 ? 0 : index === data.length ? data.length - 1 : index;

    let currentIndex = index + 1 === data.length ? 0 : index + 1;
    updateSli({ currentIndex, lastIndex, direction: 1 });
  };

  const showPrevious = (index) => {
    let lastIndex = index < 0 ? 0 : index;
    let currentIndex = index - 1 < 0 ? data.length - 1 : index - 1;
    updateSli({ currentIndex, lastIndex, direction: -1 });
  };

  return (
    <motion.div
      className="current card"
      variants={cards}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="currentWrapper">
        <div
          className="controls controls--back"
          onClick={() => showPrevious(sli.currentIndex)}
        >
          <ArrowBackIosOutlined />
        </div>

        <Slides
          direction={sli.direction}
          currentIndex={sli.currentIndex}
          lastIndex={sli.lastIndex}
          updateSli={updateSli}
          lastShape={data[sli.lastIndex]}
          currentShape={data[sli.currentIndex]}
          shapes={data}
          type="books"
        />

        <div
          className="controls controls--next"
          onClick={() => showNext(sli.currentIndex)}
        >
          <ArrowForwardIosOutlined />
        </div>
      </div>
    </motion.div>
  );
}
