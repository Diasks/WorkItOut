import axios from "axios";
import {
  GET_USERS,
  ADD_USER,
  REMOVE_USER,
  GET_USER,
  UPDATE_USER,
  USER_REQUEST,
  USER_FAIL,
  CLEAN_UP_USER,
  REMOVE_ACCOUNT,
} from "./types";
import { setAlert } from "./alertAction";
import setAuthToken from "../_utils/setAuthToken";

export const userRequest = () => ({
  type: USER_REQUEST,
});

export const getUsers = () => async dispatch => {
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

export const getUser = userId => async dispatch => {
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
    dispatch({
      type: USER_FAIL,
      payload: err,
    });
  }
};

export const getUserProfile = () => async dispatch => {
  const userId = localStorage.id;

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    dispatch(userRequest());
    const res = await axios.get(`http://localhost:5000/api/users/${userId}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_FAIL,
      payload: err,
    });
  }
};

export const createUser = ({
  firstname,
  lastname,
  email,
  password,
  admin,

}) => async dispatch => {
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

export const uploadImage = user => async dispatch => {
  const formData = new FormData();
  formData.append("profilePicture", user.profilePicture);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  try {
    const res = await axios.patch(
      `http://localhost:5000/api/users/${user.userId}`,
      formData,
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

export const updateUser = user => async dispatch => {
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

    dispatch(setAlert("Dina ändringar sparades!", "success"));
  } catch (error) {
    console.log(error);
  }
};

export const cleanUpUser = () => async dispatch => {
  dispatch({
    type: CLEAN_UP_USER,
  });
};

export const registerNewPassword = password => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(password);

  try {
    const res = await axios.patch(
      `http://localhost:5000/api/users/password`,
      body,
      config
    );

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });

    dispatch(setAlert("Dina ändringar sparades!", "success"));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = id => async dispatch => {
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

export const removeAccount = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.patch(
      "http://localhost:5000/api/users/removeaccount",
      config
    );
    dispatch({
      type: REMOVE_ACCOUNT,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};


export const addActivity = user => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);

  try {
    const res = await axios.post(
      `http://localhost:5000/api/users/activities/${user.userId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_USER,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const editActivity = user => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  const body = JSON.stringify(user);

  try {
    const res = await axios.patch(
      `http://localhost:5000/api/users/activities/${user.userId}`,
      config,
      body
    );

    dispatch({
      type: UPDATE_USER,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteActivity = user => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(
      `http://localhost:5000/api/users/activities/${user.userId}/${user.activityId}`,
      config
    );

    dispatch({
      type: UPDATE_USER,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

