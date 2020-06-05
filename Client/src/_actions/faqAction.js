import axios from "axios";
import { GET_FAQ, ADD_FAQ, DELETE_FAQ, FAQ_FAIL, FAQ_REQUEST } from "./types";
import { setAlert } from "./alertAction";

/**
 *  Metod som används för att ropa på vid "pending" läge i anropet
 */

export const faqRequest = () => ({
  type: FAQ_REQUEST,
});

/**
 *  Metod som används för att göra API-anrop till vårt REST-API för att hämta faq baserat på sidonummer.
 *
 * @param {Number} page Numret som kommer från URL-parametern.
 * @returns {Promise} Ett axios.get() Promise
 */
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

/**
 * Metod som används för att göra API-anrop till vårt REST-API för att lägga till en ny fråga med svar.
 *
 * @param {Object} data Objekt innehållande fråga och svar.
 * @returns {Promise} Ett axios.post() Promise
 */
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

/**
 * Metod som används för att göra API-anrop till vårt REST-API för att radera en fråga med dess tillhörande svar.
 *
 * @param {Number} id Objektets ID som skickas med från en onClick-function-call.
 * @returns {Promise} Ett axios.delete() Promise
 */
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
