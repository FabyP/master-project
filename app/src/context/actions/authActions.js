import http from "../../utils/http-common";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import setAuthToken from "../../utils/setAuthToken";

// Register User
export const registerUser = (userData, navigation) => (dispatch) => {
  http
    .post("/users/register", userData)
    .then((res) => navigation.navigate("Login")) 
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  http
    .post("/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      save("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  remove("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

//Helper
async function save(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
}
async function remove(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
}
