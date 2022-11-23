import * as constants from "../constants";
import { IDBPDatabase } from "idb";

export function ping() {
  return {
    type: constants.PING
  };
}

export function pong() {
  return {
    type: constants.PONG
  };
}

export function fetchUser(username) {
  return {
    type: constants.FETCH_USER,
    payload: {
      username: username
    }
  };
}

export function fetchUserFulfilled(json) {
  // JSON object returned from Github API
  return {
    type: constants.FETCH_USER_FULFILLED,
    payload: {
      username: json.login, // githubJSON.login returns the username
      json: json,
      error: "No error"
    }
  };
}

export function setSearchTerm(searchTerm) {
  return {
    type: constants.SET_SEARCH_TERM,
    payload: {
      searchTerm
    }
  };
}

export interface YoutubeSetSearchTermAction {
  type: string;
  payload: {
    searchTerm: string;
  };
}

export function setYoutubeSearchTerm(searchTerm): YoutubeSetSearchTermAction {
  return {
    type: constants.SET_YOUTUBE_SEARCH_TERM,
    payload: {
      searchTerm
    }
  };
}

export interface YoutubeSetChannelTermActionPayload {
  channelTerm: string;
  channelTitle: string;
  // https://developers.google.com/youtube/v3/docs/search/list
  optionalParametersObj: { [key: string]: any };
}

export interface YoutubeSetChannelTermAction {
  type: string;
  payload: YoutubeSetChannelTermActionPayload;
}

export function setYoutubeChannelTerm(
  channelTerm,
  channelTitle,
  optionalParametersObj = {}
): YoutubeSetChannelTermAction {
  // channelTerm is channelId
  return {
    type: constants.SET_YOUTUBE_CHANNEL_TERM,
    payload: {
      channelTerm,
      channelTitle,
      optionalParametersObj
    }
  };
}

interface YoutubeSetVolumeAction {
  type: string;
  payload: {
    globalVolume: number;
  };
}

export function setYoutubeVolume(globalVolume: number): YoutubeSetVolumeAction {
  return {
    type: constants.SET_YOUTUBE_GLOBAL_VOLUME,
    payload: {
      globalVolume
    }
  };
}

export function setFilterTerm(filterTerm) {
  return {
    type: constants.SET_FILTER_TERM,
    payload: {
      filterTerm
    }
  };
}

export function sendRequest() {
  return {
    type: constants.SEND_REQUEST
  };
}

// request success when Youtube JSON recieved

export interface RequestSuccessAction {
  type: string;
  payload: {
    searchTerm: string;
    json: any;
    nextPageToken: any;
    error: any;
  };
}
export function requestSuccess(searchTerm, json): RequestSuccessAction {
  return {
    type: constants.REQUEST_SUCCESS,
    payload: {
      searchTerm: searchTerm,
      json: json,
      nextPageToken: json["nextPageToken"],
      error: "Success"
    }
  };
}

export function goToNextPage() {
  // concat akon with new results
  return {
    type: constants.GO_TO_NEXT_PAGE // click to search and use current store state
  };
}

export function selectVideo(index) {
  return {
    type: constants.SELECT_VIDEO,
    payload: {
      index
    }
  };
}

// Timer
export function startTimer() {
  return {
    type: constants.START_TIMER
  };
}

export function setTime(time) {
  return {
    type: constants.SET_TIME,
    payload: {
      time: time
    }
  };
}

// Translate

export function setTranslateTerm(term) {
  return {
    type: constants.SET_TRANSLATE_TERM,
    payload: {
      term: term
    }
  };
}
/*

*/
export function requestTranslateSuccess(term, json) {
  // get pinyin json for term
  return {
    type: constants.REQUEST_TRANSLATE_SUCCESS,
    payload: {
      term: term,
      json: json,
      error: "Success"
    }
  };
}

export interface SetDBAction {
  type: string;
  payload: {
    db: IDBPDatabase<unknown>;
  };
}

export function setDBAction(db: IDBPDatabase<unknown>): SetDBAction {
  let action = {
    type: constants.SET_DB,
    payload: {
      db
    }
  };
  return action;
}
