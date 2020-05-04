import axios from "axios";
import {
  GET_USERS,
  ADD_USER,
  REMOVE_USER,
  GET_USER,
  UPDATE_USER,
  CLEAN_UP_USER,
} from "./types";
import setAuthToken from "../_utils/setAuthToken";

export const getUsers = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/api/users");

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUser = (userId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`http://localhost:5000/api/users/${userId}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const createUser = ({
  firstname,
  lastname,
  email,
  password,
  admin,
}) => async (dispatch) => {
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
      "http://localhost:5000/api/users",
      body,
      config
    );

    dispatch({
      type: ADD_USER,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);

  try {
    const res = await axios.patch(
      `http://localhost:5000/api/users/${user.userId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(
      `http://localhost:5000/api/users/${id}`,
      config
    );
    dispatch({
      type: REMOVE_USER,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const cleanUpUser = () => async (dispatch) => {
  dispatch({
    type: CLEAN_UP_USER,
  });
};
