import { motion } from "framer-motion";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  btn1,
  cardChild1,
  cardChild2,
  cards,
} from "../../utils/animationVariants";
import { axiosInstance } from "../../utils/config";
import "./register.scss";

export default function Register({ setTitle }) {
  setTitle("BookRack | Register");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const password = useRef({});
  password.current = watch("password", "");

  const [pages, setPages] = useState(0);

  const onSubmit = async (data) => {
    const { confirmpassword, ...others } = data;

    try {
      await axiosInstance.post("/auth/register", others);

      setTimeout(() => {
        navigate("/login", { state: "saved" });
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(errors);
  return (
    <div className="register">
      <motion.div
        className="registerContainer"
        variants={cards}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div className="registerTop" variants={cardChild1}>
          <h1>Register</h1>
          <form
            className="registerForm"
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
            })}
          >
            {pages === 0 && (
              <>
                <input
                  {...register("firstname", {
                    required: "Firstname is required",
                  })}
                  placeholder="First Name"
                  type="text"
                />

                <span className="error">{errors.firstname?.message}</span>
                <input
                  {...register("lastname", {
                    required: "Lastname is required",
                  })}
                  placeholder="Last Name"
                  type="text"
                />

                <span className="error">{errors.lastname?.message}</span>
              </>
            )}
            {pages === 1 && (
              <>
                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="Email"
                  type="email"
                />

                <span className="error">{errors.email?.message}</span>
                <input
                  {...register("username", {
                    required: "Username is required",
                    minLength: 4,
                  })}
                  placeholder="Username"
                  type="text"
                />

                <span className="error">{errors.username?.message}</span>
              </>
            )}
            {pages === 2 && (
              <>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password should be more than 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])/,
                      message:
                        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
                    },
                  })}
                  name="password"
                  placeholder="Password"
                  type="password"
                />

                <span className="error">{errors.password?.message}</span>
                <input
                  {...register("confirmpassword", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  placeholder="Confirm Password"
                  type="password"
                />

                <span className="error">{errors.confirmpassword?.message}</span>
              </>
            )}
            {pages !== 0 && (
              <motion.button
                variants={btn1}
                whileHover="hover"
                whileTap="click"
                onClick={() => setPages(pages - 1)}
              >
                prev
              </motion.button>
            )}
            {pages !== 2 && (
              <motion.button
                variants={btn1}
                whileHover="hover"
                whileTap="click"
                onClick={() => setPages(pages + 1)}
              >
                next
              </motion.button>
            )}
            {pages === 2 && (
              <>
                <motion.button
                  variants={btn1}
                  whileHover="hover"
                  whileTap="click"
                  type="submit"
                >
                  REGISTER
                </motion.button>
              </>
            )}
          </form>
        </motion.div>

        <motion.div className="registerBottom" variants={cardChild2}>
          <div className="registerSignUpContainer">
            <span>
              Already have an account?
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
                className="signupLink"
              >
                {" "}
                <u>Log in</u>
              </Link>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
