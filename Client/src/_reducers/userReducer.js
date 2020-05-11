import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER,
  USER_REQUEST,
  USER_FAIL,
} from "../_actions/types";

const initalState = {
  token: localStorage.getItem("token"),
  users: [],
  selectedUser: {},
  successful: false,
  loading: true,
  error: null,
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
        loading: false,
      };

    case UPDATE_USER:
      return {
        ...state,
        selectedUser: payload,
        successful: true,
        loading: false,
      };

    case REMOVE_USER:
      return {
        ...state,
        selectedUser: null,
        successful: true,
        loading: false,
      };

    case USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_FAIL:
      return {
        ...state,
        loading: true,
        error: payload,
      };

    default:
      return state;
  }
}
