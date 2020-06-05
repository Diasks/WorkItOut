import axios from "axios";
import {
  ADD_FITNESSSCHEMA,
  GET_FITNESSSCHEMAS,
  GET_FITNESSSCHEMA,
  REMOVE_FITNESSSCHEMA,
  UPDATE_FITNESSSCHEMA,
  UPDATE_EXERCISE,
  REMOVE_EXERCISE,
} from "./types";
import setAuthToken from "../_utils/setAuthToken";

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att hämta alla fitnessmallar.
 *
 * @returns {Promise} Ett axios.get() Promise
 *
 */
export const getFitnessSchemas = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/fitness");

    dispatch({
      type: GET_FITNESSSCHEMAS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att hämta en specifik fitnessmall baserat på ID.
 *
 * @param {Number} programId Fitnessmallens ID som hämtas från URL-parametern
 * @returns {Promise} Ett axios.get() Promise
 *
 */
export const getFitnessSchema = (programId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/fitness/${programId}`);

    dispatch({
      type: GET_FITNESSSCHEMA,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att admin ska skapa en ny fitnessmall.
 *
 * @param {Object} exerciseObject Objekt som innehåller titel på övning, sets, reps och url
 * @param {Object} fitness Objekt som innehåller titel på program, beskrivning, längd och titel
 * @returns {Promise} Ett axios.post() Promise
 *
 */
export const createFitnessSchema = (exerciseObject, fitness) => async (
  dispatch
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    exerciseObject,
    fitness,
  });

  try {
    const res = await axios.post("/api/fitness", body, config);

    dispatch({
      type: ADD_FITNESSSCHEMA,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att admin ska uppdatera en specifik fitnessmall
 *
 * @param {Object} program Objekt som innehåller ID på program
 * @returns {Promise} Ett axios.patch() Promise
 *
 */
export const updateFitnessSchema = (program) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(program);

  try {
    const res = await axios.patch(
      `/api/fitness/${program.programId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_FITNESSSCHEMA,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att admin ska uppdatera ett specifikt objekt i en specifik fitnessmall.
 *
 * @param {Object} program Objekt som innehåller ID på övning, ID på mall, titel på övning, sets, reps och url
 * @returns {Promise} Ett axios.patch() Promise
 *
 */
export const updateExercise = (program) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(program);

  try {
    const res = await axios.patch(
      `/api/fitness/${program.fitnessId}/exerciseNumber/${program.exerciseId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_EXERCISE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att admin ska kunna radera ett specifikt objekt i en specifik fitnessmall.
 *
 * @param {Number} programId Fitnessmallens ID som skickas med från ett onClick-function-call
 * @param {Number} exerciseId Övningsobjektets ID som skickas med från ett onClick-function-call
 * @returns {Promise} Ett axios.delete() Promise
 *
 */
export const deleteExercise = (programId, exerciseId) => async (dispatch) => {
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
      `/api/fitness/${programId}/exerciseNumber/${exerciseId}`,
      config
    );
    dispatch({
      type: REMOVE_EXERCISE,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att admin ska kunna radera en specifik fitnessmall.
 *
 * @param {Number} id Fitnessmallens ID som skickas med från ett onClick-function-call
 * @returns {Promise} Ett axios.delete() Promise
 *
 */
export const deleteFitnessSchema = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(`/api/fitness/${id}`, config);
    dispatch({
      type: REMOVE_FITNESSSCHEMA,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};
