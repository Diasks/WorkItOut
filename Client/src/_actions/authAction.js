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

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att hämta en specifik användare baserat på ID.
 *
 * @returns {Promise} Ett axios.get() Promise
 */
export const loadUser = () => async dispatch => {
  const id = localStorage.id;

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/users/${id}`);

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

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att registrera en ny användare.
 *
 * @param {String} firstname Förnamnet som matats in av användaren
 * @param {String} lastname Efternamnet som matats in av användaren
 * @param {String} email Emailen som matats in av användaren
 * @param {*} password Lösenordet som matats in av användaren
 * @param {Boolean} admin Default satt till false
 * @returns {Promise} Ett axios.post() Promise
 *
 */
export const registerUser = ({
  firstname,
  lastname,
  email,
  password,
  admin,
}) => async dispatch => {
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
      "/api/auth/register",
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

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att logga in en användare.
 *
 * @param {String} email Emailen som matats in av användaren
 * @param {*} password Lösenordet som matats in av användaren
 * @returns {Promise} Ett axios.post() Promise
 *
 */
export const loginUser = (email, password) => async dispatch => {
  dispatch(authRequest());

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "/api/auth/login",
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

/**
 * Metod som används för att logga ut användaren.
 *
 * @returns Initial state.
 */
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  history.push("/");
};
