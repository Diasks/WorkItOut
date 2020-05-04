import axios from "axios";
import history from "../_utils/history";
import { setAlert } from "./alertAction";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  AUTH_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import setAuthToken from "../_utils/setAuthToken";
import { cleanUpUser } from "../_actions/userAction";

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const loadUser = () => async (dispatch) => {
  const id = localStorage.id;

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`http://localhost:5000/api/users/${id}`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const registerUser = ({
  firstname,
  lastname,
  email,
  password,
  admin,
}) => async (dispatch) => {
  dispatch(authRequest());

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    firstname,
    lastname,
    email,
    password,
    admin,
  });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errorResponse = error.response.data;

    if (errorResponse) {
      dispatch(setAlert(errorResponse, "danger"));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(authRequest());

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errorResponse = error.response.data;

    if (errorResponse) {
      dispatch(setAlert(errorResponse, "danger"));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(cleanUpUser());
  history.push("/");
};
