import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";


export const setAlert = (errorResponse, alertType) => (dispatch) => {
  const id = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: { errorResponse, alertType, id },
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    3000
  );
};
