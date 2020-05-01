import axios from "axios";
import { ADD_FITNESSSCHEMA } from "./types";
import setAuthToken from "../_utils/setAuthToken";

export const createFitnessSchema = ({
  programTitle,
  description,
  length,
  title,
  exerciseTitle
}) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    programTitle,
    description,
    length,
    title,
    exerciseTitle
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
