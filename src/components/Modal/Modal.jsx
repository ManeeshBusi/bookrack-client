import React from "react";
import ReactDom from "react-dom";
import { useState } from "react";
import { useContext } from "react";
import { logout } from "../../context/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../utils/config";
import Toaster from "../Toaster/Toaster";
import "./modal.scss";
import { CloseOutlined } from "@material-ui/icons";
import storage from "../../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";
import "firebase/storage";
import { cards } from "../../utils/animationVariants";

export default function Modal(props) {
  const { user, dispatch } = useContext(AuthContext);

  const [saved, setSaved] = useState(false);

  //   const { register, handleSubmit } = useForm({});
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    img: user.img,
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const res = await axiosInstance.put(`/auth/${user._id}`, data, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        logout(dispatch);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("A: 1");
    const storageRef = ref(storage, `/images/${image.name}`);
    console.log("A: 2");
    const uploadTask = uploadBytesResumable(storageRef, image);
    console.log("A: 3");
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          handleInputState("img", url);
        });
      }
    );
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  console.log(image);

  //   if (!props.open) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay" />
      <motion.div
        className="modal"
        variants={cards}
        initial="hidden"
        animate="visible"
      >
        {saved && (
          <Toaster msg="Profile has been updated. Please login again." />
        )}

        <div className="modalWrapper">
          <button className="closeBtn" onClick={() => props.onClose(false)}>
            <CloseOutlined />
          </button>
          <div className="modalHead">
            <span className="modalHeading">
              View <span>Account</span>
            </span>
          </div>
          <form onSubmit={handleSubmit} className="modalForm">
            <div className="modalLeft">
              <div className="modalImgContainer">
                <img src={user.img} alt="" />
              </div>
              {/* <FileInput
                name="img"
                label="Choose Image"
                handleInputState={handleInputState}
                type="image"
                value={data.img}
                fname={data.firstname}
              /> */}
              <input type="file" onChange={handleFile} />
              <button onClick={handleUpload}>Upload</button>
            </div>

            <div className="modalRight">
              <div className="modalInput">
                <label>First name</label>
                <input
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  value={data.firstname}
                />
              </div>
              <div className="modalInput">
                <label>Last name</label>
                <input
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  value={data.lastname}
                />
              </div>
              <div className="modalInput">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={data.username}
                />
              </div>
              <div className="modalInput last">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                />
              </div>
              <button className="modalBtn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </>,
    document.getElementById("modal")
  );
}
