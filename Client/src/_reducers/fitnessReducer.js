import { ADD_FITNESSSCHEMA } from "../_actions/types";

const initalState = {
  token: localStorage.getItem("token"),
  schemas: [],
  selectedSchema: null,
  successful: false,
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_FITNESSSCHEMA:
      return {
        schemas: [...state.schemas, payload],
        successful: true,
      };

    default:
      return state;
  }
}
