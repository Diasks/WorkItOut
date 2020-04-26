import { GET_FAQ } from "../_actions/types";

const initalState = {
  loading: true,
  faq: [],
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FAQ:
      return {
        loading: false,
        faq: payload,
      };
    default:
      return state;
  }
}
