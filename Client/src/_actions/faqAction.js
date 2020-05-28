import axios from "axios";
import { GET_FAQ, ADD_FAQ, DELETE_FAQ, FAQ_FAIL, FAQ_REQUEST } from "./types";
import { setAlert } from "./alertAction";

export const faqRequest = () => ({
  type: FAQ_REQUEST,
});

export const getFaq = (page) => async (dispatch) => {
  try {
    dispatch(faqRequest());
    const res = await axios.get(`http://localhost:5000/api/faq?page=${page}`);

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
    dispatch(faqRequest());
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
    dispatch(faqRequest());
    await axios.delete(`http://localhost:5000/api/faq/${id}`);
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
