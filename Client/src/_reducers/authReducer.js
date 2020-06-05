import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  AUTH_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../_actions/types";

const initalState = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
  admin: localStorage.getItem("admin"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("id", payload.id);
      localStorage.setItem("admin", payload.admin);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("admin");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
