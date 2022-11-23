// import React from "react";
//import { combineReducers } from 'redux'
import * as constants from "../constants";
import translateReducer, {
  initialState as initialTranslateState
} from "./TranslateReducer";
import { IDBPDatabase } from "idb";
import { SetDBAction } from "../actions";

const initialPingState = {
  isPinging: false
};

export function pingReducer(state = initialPingState, action) {
  switch (action.type) {
    case constants.PING:
      return {
        ...state,
        isPinging: true
      };
    case constants.PONG:
      return {
        ...state,
        isPinging: false
      };
    default:
      return state;
  }
}

const initialGithubState = {
  username: "Find GH user",
  error: "No error"
};

export function githubReducer(state = initialGithubState, action) {
  switch (action.type) {
    case constants.FETCH_USER: // Action indicating request began
      return {
        ...state,
        username: action.payload.username // string as payoad
      };

    case constants.FETCH_USER_FULFILLED: // Request success
      return {
        ...state,
        [action.payload.json.login]: action.payload.json["created_at"],
        error: action.payload.error // "No error"
      };

    case constants.FETCH_USER_REJECTED: // Request failure
      return {
        ...state,
        error: action.payload.error
      };

    case constants.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm
      };

    case constants.REQUEST_SUCCESS:
      return {
        ...state,
        [action.payload.searchTerm]: action.payload.json,
        error: action.payload.error
      };

    default:
      return state;
  }
}

const initialRedditState = {
  searchTerm: "", // searchTerm for reddit username
  error: "No error",
  filterTerm: "" // default empty string with length 0
};

export function redditReducer(state = initialRedditState, action) {
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

const initialYoutubeState = {
  searchTerm: "", // searchTerm for reddit username
  error: "No error",
  filterTerm: "",
  selectedIndex: 0,
  channelTerm: "No channelTerm",
  listOfSelectedIndexes: [0, 1, 2, 3, 4], // default empty string with length 0
  globalVolume: 1
};

export function youtubeReducer(state = initialYoutubeState, action) {
  switch (
    action.type // add a fetch user action later to update searchTerm for username
  ) {
    case constants.SET_YOUTUBE_SEARCH_TERM: // username searchTerm
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
        selectedIndex: 0 // so selected index resets to 0 after a new search
      };

    case constants.SELECT_VIDEO: {
      return {
        ...state,
        selectedIndex: action.payload.index
        // listOfSelectedIndexes: state.listOfSelectedIndexes.concat(action.payload.index)
      };
    }

    case constants.SET_YOUTUBE_CHANNEL_TERM:
      return {
        ...state,
        channelTerm: action.payload.channelTerm,
        channelTitle: action.payload.channelTitle
      }; // username searchTerm

    case constants.SET_FILTER_TERM:
      return {
        ...state
      };

    case constants.SET_YOUTUBE_GLOBAL_VOLUME: {
      console.log("set global volume to " + action.payload.globalVolume);
      return {
        ...state,
        globalVolume: action.payload.globalVolume
      };
    }

    case constants.REQUEST_SUCCESS: //
      return {
        ...state,
        [action.payload.searchTerm]: action.payload.json,
        nextPageToken: action.payload.nextPageToken,
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

const initialTimerState = {
  isTiming: false,
  time: 0
};

export function timerReducer(state = initialTimerState, action) {
  switch (action.type) {
    case constants.START_TIMER:
      return {
        ...state,
        isTiming: true
      };
    case constants.SET_TIME:
      return {
        ...state,
        time: action.payload.time
      };
    default:
      return state;
  }
}

const initialDBState: DBState = {
  db: undefined
};

export interface DBState {
  db: IDBPDatabase | undefined;
}

export function dbReducer(
  state = initialDBState,
  action: SetDBAction
): DBState {
  switch (action.type) {
    case constants.SET_DB: {
      const newState = {
        ...state,
        db: action.payload.db
      };

      return newState;
    }
    default: {
      return state;
    }
  }
}

const initialState = {
  ...initialPingState,
  ...initialGithubState,
  ...initialRedditState,
  ...initialYoutubeState,
  ...initialTimerState,
  ...initialTranslateState,
  ...initialDBState
};
function rootReducer(state: any = initialState, action) {
  return {
    dbState: dbReducer(state.dbState, action),
    isPinging: pingReducer(state.isPinging, action),
    githubState: githubReducer(state.githubState, action),
    redditState: redditReducer(state.redditState, action),
    youtubeState: youtubeReducer(state.youtubeState, action),
    timerState: timerReducer(state.timerState, action),
    translateState: translateReducer(state.translateState, action)
  };
}
// const rootReducer = combineReducers({ pingReducer, githubReducer})
export default rootReducer;
