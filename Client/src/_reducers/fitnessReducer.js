import { ADD_FITNESSSCHEMA, GET_FITNESSSCHEMAS, GET_FITNESSSCHEMA, UPDATE_FITNESSSCHEMA, REMOVE_FITNESSSCHEMA, UPDATE_EXERCISE, REMOVE_EXERCISE} from "../_actions/types";

const initalState = {
  token: localStorage.getItem("token"),
  schemas: [],
  selectedSchema: null,
  loading: true,
  successful: false
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {

    case GET_FITNESSSCHEMAS:
      return {
        schemas: payload,
        loading: false,
      };

      case GET_FITNESSSCHEMA:
        return {
          selectedSchema: payload,
          loading: false,
        };

    case ADD_FITNESSSCHEMA:
      return {
        schemas: [...state.schemas, payload],
        successful: true,
      };

      case UPDATE_FITNESSSCHEMA:
        return {
          ...state,
          selectedSchema: payload,
          successful: true,
        };
  
      case REMOVE_FITNESSSCHEMA:
        return {
          ...state,
          selectedSchema: null,
          successful: true,
        };

        case UPDATE_EXERCISE:
          return {
            ...state,
            selectedSchema: payload,
            successful: true,
          };

          case REMOVE_EXERCISE:
            return {
              ...state,
              selectedSchema: payload,
            }

    default:
      return state;
  }
}
