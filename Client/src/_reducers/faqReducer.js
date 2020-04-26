import { GET_FAQ, ADD_FAQ, FAQ_FAIL } from "../_actions/types";

const initalState = {
  faq: [],
  loading: true,
  error: null,
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FAQ:
      return {
        faq: payload,
        loading: false,
      };

    case ADD_FAQ:
      return {
        ...state,
        faq: [...state.faq, payload],
        loading: false,
      };

    case FAQ_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
