import axios from "axios";
import { GET_FAQ, FAQ_FAIL } from "./types";

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
