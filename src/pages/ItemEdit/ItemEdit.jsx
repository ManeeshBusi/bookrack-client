import {
  Add,
  ArrowBackIosOutlined,
  DoneAll,
  PlayArrow,
} from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Switch from "../../components/Switch/Switch";
import { AuthContext } from "../../context/AuthContext";
import Main from "../Main/Main";
import "./itemEdit.scss";
import { motion, transform } from "framer-motion";
import {
  cardChild1,
  cardChild3,
  cardChild4,
  cards,
} from "../../utils/animationVariants";
import { axiosInstance } from "../../utils/config";
import Toaster from "../../components/Toaster/Toaster";

export default function ItemEdit() {
  let { type, item, back } = useParams();
  const location = useLocation();
  let itemn = item.substring(0, item.length - 1);
  let book = {};
  let from = "/" + item;

  if (location.state) {
    book = location.state.book ? location.state.book : book;
    from = location.state.from ? location.state.from : from;
  }

  const { user } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const [msg, setMsg] = useState("Saved book");
  const [del, setDel] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      title: book.title ?? "Title",
      subtitle: book.subtitle ?? "",
      ...(item === "comics" && { series: book.series ?? "Series" }),
      author: book.author ?? "Author",
      genre: book.genre ?? "",
      status: book.status ?? "Pending",
      current: book.current,
      own: book.own ?? false,
      page: book.page ?? 0,
      progress: book.progress ?? 0,
      start: book.start ?? "",
      end: book.end ?? "",
      img: book.img ?? null,
    },
  });

  const imgLink = useWatch({
    control,
    name: "img",
  });

  let own = useWatch({
    control,
    name: "own",
  });

  const start = useWatch({
    control,
    name: "start",
  });

  const page = useWatch({
    control,
    name: "page",
  });
  const progress = useWatch({
    control,
    name: "progress",
  });

  const setOwn = (val) => {
    setValue("own", val);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (type === "add") {
        await axiosInstance.post(`/${itemn}/${user._id}`, data, {
          headers: { authorization: `Bearer ${user.token}` },
        });
      } else {
        await axiosInstance.put(`/${itemn}/${user._id}/${book._id}`, data, {
          headers: { authorization: `Bearer ${user.token}` },
        });
      }

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 4000);
    } catch (e) {
      console.log(e);
    }
  };

  const startBook = () => {
    setValue("start", new Date().toISOString());
    setValue("current", true);
    setMsg("Started Book");
  };

  const completeBook = () => {
    setValue("end", new Date().toISOString());
    if (!start) {
      setValue("start", new Date().toISOString());
    }
    setValue("progress", page);
    setValue("status", "Complete");
    setValue("current", false);
    setMsg("Completed Book");
  };

  const deleteBook = async () => {
    console.log("delete");
    setDel(true);
    setMsg("Deleted Book");
    try {
      await axiosInstance.delete(`/${itemn}/${user._id}/${book._id}`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setSaved(true);
      setTimeout(() => {
        navigate(`/${item}`);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  const [show, setShow] = useState(false);

  const fabitem = {
    hidden: {
      y: -50,
      scale: 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      scale: 1,
      transition: {
        delay: 0.08,
      },
      opacity: 1,
    },
  };

  const fabitem2 = {
    hidden: {
      y: -105,
      scale: 0,
      opacity: 0,
      transition: {
        delay: 0.09,
      },
    },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <>
      <Main>
        <motion.div
          className="editBook card"
          variants={cards}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="editBookContainer">
            <motion.div className="editBookHeader" variants={cardChild1}>
              <div className="editBookBack">
                <Link
                  to={from}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <div className="editBookBackLink">
                    <ArrowBackIosOutlined />
                    <span className="editBookBackText">{back}</span>
                  </div>
                </Link>
              </div>

              {/* FAB */}
              <div className="fabBtn">
                <div
                  className="fabBtnIconContainer"
                  onClick={() => setShow(!show)}
                >
                  <Add className={show ? "fabBtnIcon open" : "fabBtnIcon"} />
                </div>

                <ul className="fabBtnMenu">
                  <motion.li
                    variants={fabitem}
                    initial="hidden"
                    animate={show ? "visible" : "hidden"}
                    style={{ originX: 0.9 }}
                  >
                    <button
                      className="fabBtnItemIconContainer"
                      type="submit"
                      form="myForm"
                      style={{ border: "none" }}
                      onClick={handleSubmit(startBook)}
                    >
                      <PlayArrow className="fabBtnItemIcon" />
                    </button>
                    <span className="fabBtnItemText">Start Book</span>
                  </motion.li>
                  <motion.li
                    variants={fabitem2}
                    initial="hidden"
                    animate={show ? "visible" : "hidden"}
                    style={{ originX: 0.9 }}
                  >
                    <div
                      className="fabBtnItemIconContainer"
                      type="submit"
                      form="myForm"
                      onClick={handleSubmit(completeBook)}
                    >
                      <DoneAll className="fabBtnItemIcon" />
                    </div>
                    <span className="fabBtnItemText">Complete Book</span>
                  </motion.li>
                </ul>
              </div>
            </motion.div>

            <div className="editBookContent">
              <div className="editBookContentWrapper">
                <form
                  className="editBookForm"
                  id="myForm"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <motion.div
                    className="editBookImgContainer"
                    variants={cardChild3}
                  >
                    <div className="editBookImg">
                      <img src={imgLink} alt="" />
                    </div>

                    <div className="editBookImgInput">
                      <input {...register("img")} type="text" />
                    </div>

                    <div className="editBookOwnContainer topown">
                      <label>Own Book</label>

                      <Switch
                        state={own}
                        setState={setOwn}
                        onChange={(e) => setOwn(e.target.value)}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="editBookDetailsContainer"
                    variants={cardChild4}
                  >
                    <div className="editBookTitle">
                      <input {...register("title")} type="text" />
                    </div>
                    <div
                      className={
                        item === "comics"
                          ? "editBookAuthor"
                          : "editBookAuthor last"
                      }
                    >
                      <input {...register("author")} type="text" />
                    </div>
                    {item === "comics" && (
                      <div className="editBookAuthor last">
                        <input
                          {...register("series")}
                          type="text"
                          style={{ fontSize: "1.3rem", fontWeight: "400" }}
                        />
                      </div>
                    )}
                    <div className="editBookRow">
                      <div className="editBookInput">
                        <label>Subtitle</label>
                        <input {...register("subtitle")} type="text" />
                      </div>
                      <div className="editBookInput">
                        <label>Genre</label>
                        <input {...register("genre")} type="text" />
                      </div>
                    </div>
                    <div className="editBookRow">
                      <div className="editBookInput">
                        <label>Pages</label>
                        <input
                          {...register("page", {
                            valueAsNumber: true,
                          })}
                          type="number"
                        />
                      </div>
                      <div className="editBookInput">
                        <label>Progress</label>
                        <input
                          {...register("progress", {
                            valueAsNumber: true,
                          })}
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="editBookRow">
                      <div className="editBookInput">
                        <label>Start</label>
                        <input {...register("start")} type="text" />
                        {/* <Controller
                        control={control}
                        name="start"
                        render={({ field }) => (
                          <DateTimePicker
                          placeholderText="Select date"
                          onChange={(date) => field.onChange(date)}
                          selected={field.value}
                          />
                          )}
                        /> */}
                      </div>
                      <div className="editBookInput">
                        <label>End</label>
                        <input {...register("end")} type="text" />
                      </div>
                    </div>
                    <div className="editBookOwnContainer bottomown">
                      <label>Own Book</label>

                      <Switch
                        state={own}
                        setState={setOwn}
                        onChange={(e) => setOwn(e.target.value)}
                      />
                    </div>
                    <div className="editBookBtnContainer">
                      <div className="editBookBtns">
                        <button className="saveBtn" form="myForm" type="submit">
                          SAVE
                        </button>
                        <button
                          className="deleteBtn"
                          form="myForm"
                          type="submit"
                          onClick={handleSubmit(deleteBook)}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
        {saved && <Toaster msg={msg} type={del ? "delete" : ""} />}
      </Main>
    </>
  );
}
