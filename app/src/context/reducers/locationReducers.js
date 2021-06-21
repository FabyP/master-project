import { GET_LOCATION } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION:
      return action.payload;
    default:
      return state;
  }
}
