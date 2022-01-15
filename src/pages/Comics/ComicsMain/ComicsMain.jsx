import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import Carousel from "../../../components/Carousel/Carousel";
import Current from "../../../components/Current/Current";
import Fab from "../../../components/Fab/Fab";
import { AuthContext } from "../../../context/AuthContext";
import { axiosInstance } from "../../../utils/config";
import Main from "../../Main/Main";

export default function ComicsMain() {
  const { user } = useContext(AuthContext);

  const [complete, setComplete] = useState([]);
  const [pending, setPending] = useState([]);
  const [current, setCurrent] = useState([]);
  const [owned, setOwned] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getComics = async () => {
      let res1 = [];
      let res2 = [];
      let res3 = [];
      let res4 = [];

      try {
        res1 = await axiosInstance.get(
          `/comic/${user._id}?status=Complete&sortBy=latest`,
          { headers: { authorization: `Bearer ${user.token}` } }
        );
        setComplete(res1.data[0].comics);
      } catch (e) {
        console.log(e);
      }

      try {
        res2 = await axiosInstance.get(
          `/comic/${user._id}?status=Pending&sortBy=latest`,
          { headers: { authorization: `Bearer ${user.token}` } }
        );
        setPending(res2.data[0].comics);
      } catch (e) {
        console.log(e);
      }
    };

    getComics();
  }, []);

  console.log(complete);

  return (
    <>
      <Main>
        {/* <Current
          complete={complete.length}
          pending={pending.length}
          owned={6}
          type="comics"
          current={current}
        /> */}
        <Carousel type="completed" books={complete} />
        <Carousel type="pending" books={pending} />
      </Main>
      <Fab type="comic" />
    </>
  );
}
