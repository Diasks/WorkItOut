import { GET_FAQ, ADD_FAQ, FAQ_FAIL, DELETE_FAQ } from "../_actions/types";

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

    case DELETE_FAQ:
      return {
        ...state,
        faq: state.faq.filter(
          (questionAnswer) => questionAnswer._id !== payload
        ),
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
