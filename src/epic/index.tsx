// import React from "react";
import "rxjs";
import { of } from "rxjs/observable/of";
import { interval } from "rxjs/observable/interval";
import { ajax } from "rxjs/observable/dom/ajax";
import { ofType } from "redux-observable";
import {
  switchMap,
  debounceTime,
  map,
  delay,
  catchError,
  filter
} from "rxjs/operators";
import { combineEpics } from "redux-observable";
import * as constants from "../constants";
import * as actions from "../actions";

export function pingEpic(action$) {
  return action$.pipe(
    ofType("PING"),
    delay(1000),
    map(action => ({ type: "PONG" }))
  );
}

export interface ActionWithPayload {
  type: string;
  action: {
    payload: string;
  };
}

// export function githubEpic (action$) {
//  return  action$.pipe(
//    ofType(constants.FETCH_USER),
//    map(action => action.payload.username),
//    debounceTime(400),
//    switchMap(username =>
//       ajax.getJSON(`https://api.github.com/users/${username}`)
//         .pipe(
//           map(responseJSON => actions.fetchUserFulfilled(responseJSON)),
//           catchError(error => of({ // note that the error handling is after the AJAX call
//             type: constants.FETCH_USER_REJECTED,
//             payload: {
//               error: error.xhr.response
//             }
//           }))
//         )
//     )
//  )
// }

// export function github2Epic(action$, store) {
//   return action$.pipe(
//     ofType(constants.SET_SEARCH_TERM),
//     map(action => action.payload.searchTerm),
//     debounceTime(400),
//     switchMap(searchTerm =>
//       ajax
//         .getJSON(
//           `https://www.reddit.com/user/${searchTerm}/comments.json?limit=100`
//         )
//         .pipe(
//           map(json => actions.requestSuccess(searchTerm, json)),
//           catchError(error =>
//             of({
//               // note that the error handling is after the AJAX call
//               type: constants.FETCH_USER_REJECTED,
//               payload: {
//                 error: error.xhr.response
//               }
//             })
//           )
//         )
//     )
//   );
// }

export const API_KEY = "AIzaSyDbMbZ0JMDq1b_1-xuxUfvK0WXuJBmX4FA";
export const MAX_RESULTS = 15;

const makeUrl = searchTerm => {
  // replace empty white space

  let flag = searchTerm.slice(-3).replace(/\s/g, ""); // replace all white spaces
  switch (flag) {
    case "-1": // date
      return `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&order=date&type=video&q=${searchTerm}&key=${API_KEY}`;
    case "-2": // rating
      return `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&order=rating&type=video&q=${searchTerm}&key=${API_KEY}`;
    default:
      return `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&type=video&q=${searchTerm}&key=${API_KEY}`;
  }
};

// return `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&type=video&q=${searchTerm}&key=${API_KEY}`

const makeChannelUrl = (
  channelTerm,
  wholePayload: actions.YoutubeSetChannelTermActionPayload
) => {
  // From the inputs on the <ChannelList />
  const queryTerm = wholePayload.optionalParametersObj.q;
  const publishedAfter = wholePayload.optionalParametersObj.publishedAfter;
  const publishedBefore = wholePayload.optionalParametersObj.publishedBefore;
  // get five latest videos from a channel
  let URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelTerm}&maxResults=${MAX_RESULTS}&order=date&type=video&key=${API_KEY}`;

  if (queryTerm) {
    URL += `&q=${queryTerm}`;
  }

  if (publishedAfter) {
    URL += `&publishedAfter=${publishedAfter}`;
  }

  if (publishedBefore) {
    URL += `&publishedBefore=${publishedBefore}`;
  }

  return URL;
};

export function youtubeEpic(action$) {
  return action$.pipe(
    ofType(constants.SET_YOUTUBE_SEARCH_TERM),
    debounceTime(400),
    map(
      (action: actions.YoutubeSetSearchTermAction) => action.payload!.searchTerm
    ),
    filter(searchTerm => !!searchTerm), // call only if searchTerm is not null or empty
    switchMap(searchTerm =>
      ajax.getJSON(makeUrl(searchTerm)).pipe(
        map(responseJSON => actions.requestSuccess(searchTerm, responseJSON)),
        // map(responseJSON => actions.setNextPageToken(responseJSON)),
        catchError(error =>
          of({
            type: constants.FETCH_USER_REJECTED,
            payload: {
              error: error.xhr.response
            }
          })
        )
      )
    )
  );
}

export function channelEpic(action$) {
  // have the selected channel displayed
  return action$.pipe(
    ofType(constants.SET_YOUTUBE_CHANNEL_TERM),
    map((action: actions.YoutubeSetChannelTermAction) => action.payload),
    filter((payload: actions.YoutubeSetChannelTermActionPayload) => {
      return !!payload.channelTerm;
    }),
    switchMap((payload: actions.YoutubeSetChannelTermActionPayload) =>
      ajax.getJSON(makeChannelUrl(payload.channelTerm, payload)).pipe(
        map(responseJSON =>
          actions.requestSuccess(payload.channelTerm, responseJSON)
        ),
        catchError(error =>
          of({
            type: constants.FETCH_USER_REJECTED,
            payload: {
              error: error.xhr.response
            }
          })
        )
      )
    )
  );
}

export function timerEpic(action$) {
  return action$.pipe(
    ofType(constants.START_TIMER),
    switchMap(() => interval(1000).pipe(map(num => actions.setTime(num))))
  );
}

// const getPinyinDef = term => {
//   // e.g. 江水浑浊 returns an array of two objects
//   return `https://pinyin-rest.pepebecker.com/hanzi/${term}`;
// };
// function translateEpic(action$) {
//   return action$.pipe(
//     ofType(constants.SET_TRANSLATE_TERM),
//     debounceTime(400),
//     map(action => action.payload.term),
//     filter(term => term), // so no empty or null terms
//     switchMap(term => {
//       return ajax.getJSON(getPinyinDef(term)).pipe(
//         map(responseJSON =>
//           actions.requestTranslateSuccess(term, responseJSON)
//         ),
//         catchError(error =>
//           of({
//             type: "REQUEST_FAIL",
//             payload: {
//               error: error.xhr.response
//             }
//           })
//         )
//       );
//     })
//   );
// }
// https://www.reddit.com/r/starslatecodex/search.json?q=money&sort=relevance
// https://www.reddit.com/user/catpaak/comments.json
// deleted github2 epic because using same actions as Youtube epic
const rootEpic = combineEpics(
  youtubeEpic,
  pingEpic,
  timerEpic,
  channelEpic
  // translateEpic
);
export default rootEpic;
