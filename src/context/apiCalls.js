import { axiosInstance } from "../utils/config";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
} from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());

  try {
    const res = await axiosInstance.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (e) {
    dispatch(loginFailure(e));
    console.log(e);
  }
};

export const logout = (dispatch) => {
  dispatch(logoutUser());
};
