import axios from "axios";
import { GET_FAQ, ADD_FAQ, DELETE_FAQ, FAQ_FAIL } from "./types";
import { setAlert } from "./alertAction";

export const getFaq = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/faq`);
    dispatch({
      type: GET_FAQ,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_FAIL,
    });
  }
};

export const addFaq = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`http://localhost:5000/api/faq`, data, config);

    dispatch({
      type: ADD_FAQ,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_FAIL,
      payload: error,
    });
  }
};

export const deleteFaq = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/faq/${id}`);
    dispatch({
      type: DELETE_FAQ,
      payload: id,
    });

    dispatch(setAlert("FAQ raderad!", "success"));
  } catch (error) {
    dispatch({
      type: FAQ_FAIL,
      payload: error,
    });
  }
};
