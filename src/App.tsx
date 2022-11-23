import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";

import { Provider, Store } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { Route, Link, BrowserRouter } from "react-router-dom";
import { withRouter, WithRouterProps } from "react-router";
import rootReducer from "./reducer";
import rootEpic from "./epic";

import { openDB, OpenDBCallbacks } from "idb/with-async-ittr";
// Components

//import Socket from './components/Socket'
//import Timer from './components/Timer'
import Bar from "./components/Bar";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
//import LineGraph from './components/LineGraph'
import LineGraphTest from "./components/LineGraphTest";
//import ChannelList from './containers/ChannelList'
import ScrollToTop from "./components/ScrollToTop";

// Containers

//import Github from './containers/Github'
import Ping from "./containers/Ping";
import Github2 from "./containers/Github2"; // Reddit
import Youtube from "./containers/Youtube";
import Drag from "./containers/Drag";
import ChannelList from "./containers/ChannelList";
import Translate from "./containers/Translate";

import { Blog } from "./components/Blog";
import styled from "styled-components";
import { CrimeTable } from "./table/CrimeTable";
import { CrimeMap } from "./map/CrimeMap";
import { Puppet, PuppetRoutes } from "./components/Puppet";
import { FavoriteVideoForm } from "./components/FavoriteVideoForm";
import { FavoriteVideos } from "./components/FavoriteVideos";

// goal{ [routeobj.path]: routeObj } for 0(1) feature flag detection
const routesArr = [
  {
    path: "/Youtube",
    component: Youtube
  },
  {
    hasFlag: true,
    path: "/Favorites",
    component: FavoriteVideos
  },
  {
    path: "/CrimeMap",
    component: CrimeMap
  },
  {
    path: "/CrimeTable",
    component: CrimeTable
  },
  {
    path: "/ChannelList",
    component: ChannelList
  },
  {
    hasFlag: true,
    path: "/Random",
    component: Blog
  },
  {
    hasFlag: true,
    path: "/Puppet",
    component: PuppetRoutes
  },
  {
    hasFlag: true,
    path: "/Translate",
    component: Translate
  },
  {
    hasFlag: true,
    path: "/LineGraphTest",
    component: LineGraphTest
  },
  {
    hasFlag: true,
    path: "/PieChart",
    component: PieChart
  },
  {
    hasFlag: true,
    path: "/BarChart",
    component: BarChart
  },
  {
    hasFlag: true,
    path: "/Bar",
    component: Bar
  },

  {
    hasFlag: true,
    path: "/Ping",
    component: Ping
  },
  {
    hasFlag: true,
    path: "/Drag",
    component: Drag
  },
  {
    hasFlag: true,
    path: "/Reddit",
    component: Github2
  }
];

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap
  margin: 2rem;
`;

const StyledLink = styled(Link)`
  margin: 1rem;
`;

// Use "process.env.PUBLIC_URL" for both React Router's <Route /> and <Link >, appending as a
// prfix to the path so that dev and prod routing works
// https://github.com/facebook/create-react-app/issues/1765
const BASE_URL = process.env.PUBLIC_URL;

class App extends Component {
  render() {
    const listItems = routesArr.map(routeObj => {
      return (
        !routeObj.hasFlag && (
          <StyledLink to={BASE_URL + routeObj.path}>{routeObj.path}</StyledLink>
        )
      );
    });

    return (
      <>
        <LinksWrapper>{listItems}</LinksWrapper>
        <div className="App">
          {routesArr.map((routeObj, index) => {
            return (
              <Route
                path={BASE_URL + routeObj.path}
                component={routeObj.component}
              />
            );
          })}
        </div>
        {/* <FavoriteVideoForm /> */}
      </>
    );
  }
}

export default App;
