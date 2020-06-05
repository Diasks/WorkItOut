import axios from "axios";


/**
 *  Metod som används för att sätta token i headers om det finns en token, annars radera headern. 
 *
 * @param {*} token Token som mottagits om man är autentiserad.
 *
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-access-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-access-token"];
  }
};

export default setAuthToken;
