import { combineReducers } from "redux";

import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import locationReducer from "./locationReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  location: locationReducer,
});
