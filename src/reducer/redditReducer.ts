import * as constants from "../constants";

const initialRedditState = {
  searchTerm: "", // searchTerm for reddit username
  error: "No error",
  filterTerm: "" // default empty string with length 0
};

export default function redditReducer(state = initialRedditState, action) {
  switch (
    action.type // add a fetch user action later to update searchTerm for username
  ) {
    case constants.SET_SEARCH_TERM: // username searchTerm
      return {
        ...state,
        searchTerm: action.payload.searchTerm
      };

    case constants.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.payload.filterTerm
      };

    case constants.REQUEST_SUCCESS: //
      return {
        ...state,
        [action.payload.searchTerm]: action.payload.json,
        error: action.payload.error
      };

    case constants.FETCH_USER_REJECTED: // Request failed
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
}
