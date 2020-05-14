import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER,
} from "../_actions/types";

const initalState = {
  token: localStorage.getItem("token"),
  users: [],
  selectedUser: null,
  successful: false,
  loading: true
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        users: payload,
        loading: false,
      };

    case GET_USER:
      return {
        selectedUser: payload,
        loading: false,
      };

    case ADD_USER:
      return {
        users: [...state.users, payload],
        successful: true,
      };

    case UPDATE_USER:
      return {
        ...state,
        selectedUser: payload,
        successful: true,
      };

    case REMOVE_USER:
      return {
        ...state,
        selectedUser: null,
        successful: true,
      };

    default:
      return state;
  }
}
