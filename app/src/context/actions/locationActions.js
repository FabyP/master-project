import { GET_LOCATION, SET_LOCATION } from "./types";

export const getLocation = (location) => {
  return {
    type: GET_LOCATION,
    payload: location,
  };
};
