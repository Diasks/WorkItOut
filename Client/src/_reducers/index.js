import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import faq from "./faqReducer";

export default combineReducers({ alert, auth, faq });
