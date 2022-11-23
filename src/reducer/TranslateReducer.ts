import * as constants from "../constants";

export const initialState = {
  term: ""
};

export default function translateReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_TRANSLATE_TERM:
      return {
        ...state,
        term: action.payload.term
      };
    case constants.REQUEST_TRANSLATE_SUCCESS:
      return {
        ...state,
        [action.payload.term]: action.payload.json,
        error: action.payload.error // Success
      };
    case "REQUEST_FAIL":
      return {
        ...state,
        errror: action.payload.error
      };
    default:
      return state;
  }
}
