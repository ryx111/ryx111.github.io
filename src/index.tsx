import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./App.css";

import { Provider, Store } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { Route, Link, BrowserRouter } from "react-router-dom";
import { withRouter, WithRouterProps } from "react-router";
import rootReducer from "./reducer";
import rootEpic from "./epic";

import { openDB, OpenDBCallbacks } from "idb/with-async-ittr";

import { setDBAction } from "./actions";

// import { CrimeMap } from "./map/CrimeMap";

const composeEnhancers =
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()) ||
  compose;

let epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

export let DB_NAME = "Articles";
export let DB_VERSION = 1;
export const OBJECT_STORE_NAME = "articles";

async function demo(store: Store<any>) {
  let OPEN_DB_CALLBACKS_OBJ: OpenDBCallbacks<unknown> = {
    upgrade: db => {
      // add/remove stores
      // add/remove indices
      const storeParameters: IDBObjectStoreParameters = {
        keyPath: "id",
        autoIncrement: true
      };
      const store = db.createObjectStore(OBJECT_STORE_NAME, storeParameters);

      const indexName = "date";
      const keyPath = "date";
      store.createIndex(indexName, keyPath);
    }
  };

  const db = await openDB(DB_NAME, DB_VERSION, OPEN_DB_CALLBACKS_OBJ);

  store.dispatch(setDBAction(db));

  // // Add an article:
  // await db.add('articles', {
  //     title: 'Article 1',
  //     date: new Date('2019-01-01'),
  //     body: '…',
  //   });
}

demo(store);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
