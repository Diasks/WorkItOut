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

/**
 *  Metod som används för att ropa på vid "pending" läge i anropet
 */

export const userRequest = () => ({
  type: USER_REQUEST,
});

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att hämta alla användare.
 *
 * @returns {Promise} Ett axios.get() Promise
 *
 */

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

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att hämta en specifik användare baserat på ID.
 *
 * @param {Number} userId Användarens ID som hämtas från URL-parametern
 * @returns {Promise} Ett axios.get() Promise
 *
 */

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
    dispatch({
      type: USER_FAIL,
      payload: err,
    });
  }
};

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att hämta en specifik användares profil baserat på ID.
 *
 * @returns {Promise} Ett axios.get() Promise
 *
 */

export const getUserProfile = () => async (dispatch) => {
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

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att admin ska skapa en ny användare.
 *
 * @param {String} firstname Förnamnet som matats
 * @param {String} lastname Efternamnet som matats in
 * @param {String} email Emailen som matats in
 * @param {*} password Lösenordet som matats in
 * @param {Boolean} admin Checkbox som valts
 * @returns {Promise} Ett axios.post() Promise
 *
 */

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

/**
 * Metod som används för att göra API-anrop till vårt REST-API för att uppdatera användarens profilbild.
 *
 * @param {Object} user Objekt innehållande användarens ID och profilbild
 * @returns {Promise} Ett axios.post() Promise
 */

export const uploadImage = (user) => async (dispatch) => {
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

/**
 * Metod som används för att göra API-anrop till vårt REST-API för att uppdatera användaren.
 *
 * @param {Object} user Objekt innehållande användarens ID, förnamn, efternamn, email och roll(admin)
 * @returns {Promise} Ett axios.patch() Promise
 */

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

    dispatch(setAlert("Dina ändringar sparades!", "success"));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Metod som används för att rensa alla våra states.
 *
 * @returns Initial state.
 */

export const cleanUpUser = () => async (dispatch) => {
  dispatch({
    type: CLEAN_UP_USER,
  });
};

/**
 * Metod som används för att göra API-anrop till vårt REST-API för att uppdatera användarens lösenord.
 *
 * @param {Object} password Objekt innehållande användarens gamla lösenord och användarens nya lösenord.
 * @returns {Promise} Ett axios.patch() Promise
 */

export const registerNewPassword = (password) => async (dispatch) => {
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

/**
 * Metod som används för att göra API-anrop till vårt REST-API när admin vill radera användaren baserat på användarens ID.
 *
 * @param {Number} id Användarens ID som hämtas från URL-parametern
 * @returns {Promise} Ett axios.delete() Promise
 */

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

/**
 * Metod som används för att göra API-anrop till vårt REST-API när användaren vill radera sitt konto.
 *
 * @returns {Promise} Ett axios.patch() Promise
 */

export const removeAccount = () => async (dispatch) => {
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

/**
 * Metod som används för att göra API-anrop till vårt REST-API när användaren vill lägga till en aktivitet.
 *
 * @param {Object} user Objekt som innehåller användarens ID, titel på aktivitet och tid på aktivitet.
 * @returns {Promise} Ett axios.post() Promise
 */

export const addActivity = (user) => async (dispatch) => {
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

/**
 * Metod som används för att göra API-anrop till vårt REST-API när användaren vill uppdatera en aktivitet.
 *
 * @param {Object} user Objekt som innehåller användarens ID, titel på aktivitet och tid på aktivitet.
 * @returns {Promise} Ett axios.patch() Promise
 */

export const editActivity = (user) => async (dispatch) => {
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

/**
 * Metod som används för att göra API-anrop till vårt REST-API när användaren vill radera en aktivitet.
 *
 * @param {Object} user Objekt som innehåller användarens ID och aktivitetens ID.
 * @returns {Promise} Ett axios.delete() Promise
 */

export const deleteActivity = (user) => async (dispatch) => {
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

export const updateUserChallenge = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);

  try {
    const res = await axios.patch(
      `http://localhost:5000/api/users/${user.userId}/${user.programId}/${user.exerciseNumberId}`,
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
