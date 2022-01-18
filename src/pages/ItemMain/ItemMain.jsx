import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import Current from "../../components/Current/Current";
import Fab from "../../components/Fab/Fab";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../utils/config";
import Main from "../Main/Main";

export default function ItemMain({ setTitle }) {
  const { user } = useContext(AuthContext);
  const { item } = useParams();
  setTitle(item[0].toUpperCase() + item.slice(1).toLowerCase());
  let itemx = item.substring(0, item.length - 1);
  const [complete, setComplete] = useState([]);
  const [pending, setPending] = useState([]);
  const [current, setCurrent] = useState([]);
  const [owned, setOwned] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      let res1 = [];
      let res2 = [];
      let res3 = [];
      let res4 = [];

      try {
        res1 = await axiosInstance.get(
          `/${itemx}/${user._id}?status=Complete&sortBy=latest`,
          { headers: { authorization: `Bearer ${user.token}` } }
        );
        item === "books"
          ? setComplete(res1.data[0].books)
          : setComplete(res1.data[0].comics);
      } catch (e) {
        console.log(e);
      }

      try {
        res2 = await axiosInstance.get(
          `/${itemx}/${user._id}?status=Pending&sortBy=latest`,
          { headers: { authorization: `Bearer ${user.token}` } }
        );
        item === "books"
          ? setPending(res2.data[0].books)
          : setPending(res2.data[0].comics);
      } catch (e) {
        console.log(e);
      }
      try {
        res3 = await axiosInstance.get(`/${itemx}/${user._id}?current=true`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        item === "books"
          ? setCurrent(res3.data[0].books)
          : setCurrent(res3.data[0].comics);
      } catch (e) {
        console.log(e);
      }
      try {
        res4 = await axiosInstance.get(`/${itemx}/${user._id}?own=true`, {
          headers: { authorization: `Bearer ${user.token}` },
        });
        item === "books"
          ? setOwned(res4.data[0].books)
          : setOwned(res4.data[0].comics);
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    };

    getBooks();
  }, []);

  return (
    <>
      <Main>
        {loading ? (
          <Loader center={true} />
        ) : (
          <>
            <Current
              complete={complete.length}
              pending={pending.length}
              owned={owned.length}
              type={item}
              current={current}
            />
            <Carousel type="completed" books={complete} item={item} />
            <Carousel type="pending" books={pending} item={item} />
          </>
        )}
      </Main>
      <Fab type={`${itemx}`} />
    </>
  );
}
