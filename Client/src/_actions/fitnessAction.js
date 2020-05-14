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

export const getFitnessSchemas = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/api/fitness");

    dispatch({
      type: GET_FITNESSSCHEMAS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getFitnessSchema = programId => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:5000/api/fitness/${programId}`
    );

    dispatch({
      type: GET_FITNESSSCHEMA,
      payload: res.data,
    });
    debugger;
  } catch (err) {
    console.error(err);
  }
};

export const createFitnessSchema = (
  exerciseObject,
  fitness
) => async dispatch => {
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
    const res = await axios.post(
      "http://localhost:5000/api/fitness",
      body,
      config
    );

    dispatch({
      type: ADD_FITNESSSCHEMA,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateFitnessSchema = program => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(program);

  try {
    const res = await axios.patch(
      `http://localhost:5000/api/fitness/${program.programId}`,
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

export const updateExercise = program => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(program);

  try {
    const res = await axios.patch(
      `http://localhost:5000/api/fitness/${program.programId}`,
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

export const deleteExercise = (programId, exerciseId) => async dispatch => {
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
      `http://localhost:5000/api/fitness/${programId}/${exerciseId}`,
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

export const deleteFitnessSchema = id => async dispatch => {
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
      `http://localhost:5000/api/fitness/${id}`,
      config
    );
    dispatch({
      type: REMOVE_FITNESSSCHEMA,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};
