import { motion } from "framer-motion";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import Toaster from "../../components/Toaster/Toaster";
import { login } from "../../context/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import {
  btn1,
  cardChild1,
  cardChild2,
  cards,
} from "../../utils/animationVariants";
import "./login.scss";

export default function Login({ setTitle }) {
  const location = useLocation();
  setTitle("BookRack | Login");
  // let location = { state: "saved" };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { dispatch, error } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    login(data, dispatch);
    console.log(error);
  };

  return (
    <div className="login">
      {location.state === "saved" && (
        <Toaster msg="Account created successfully!" />
      )}
      <motion.div
        className="loginContainer"
        variants={cards}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div className="loginTop" variants={cardChild1}>
          <h1>Login</h1>
          <form
            className="loginForm"
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
            })}
          >
            <input
              {...register("username", {
                required: "Username is required",
                minLength: 4,
              })}
              placeholder="Username"
              type="text"
            />

            <span className="error">{errors.username?.message}</span>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: 8,
              })}
              placeholder="Password"
              type="password"
            />

            <span className="error">{errors.username?.message}</span>
            <motion.button
              type="submit"
              variants={btn1}
              whileHover="hover"
              whileTap="click"
            >
              LOGIN
            </motion.button>
          </form>
        </motion.div>

        <motion.div className="loginBottom" variants={cardChild2}>
          <div className="center">
            <div className="line"></div>
            <div className="or">OR</div>
          </div>
          <div className="loginOAuth">
            <div className="google-btn">
              <div className="google-icon-wrapper">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt=""
                  className="google-icon"
                />
              </div>
              <div className="btn-text">
                <span>Sign in with google</span>
              </div>
            </div>
          </div>

          <div className="loginSignUpContainer">
            <span>
              Don't have an account?
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
                className="signupLink"
              >
                {" "}
                <u>Sign up</u>
              </Link>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
