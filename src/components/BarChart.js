import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { OrdinalFrame } from "semiotic";

const Wrapper = styled.div`
  padding: 1em;
  margin: 1em;
  color: black;
  background: white;
  border: 4px;
`;

const barChartData = [
  { user: "Jason", tweets: 10, retweets: 5, favorites: 15 },
  { user: "Susie", tweets: 5, retweets: 100, favorites: 100 },
  { user: "Matt", tweets: 20, retweets: 25, favorites: 50 },
  { user: "Betty", tweets: 30, retweets: 20, favorites: 10 }
];

// note order of the pieces
const inflatedBarChartData = [
  // note the rpe-sorting. first tweets for each user, then retweets.
  { user: "Jason", type: "tweets", value: 10 },
  { user: "Susie", type: "tweets", value: 5 },
  { user: "Matt", type: "tweets", value: 20 },
  { user: "Betty", type: "tweets", value: 30 },
  { user: "Jason", type: "retweets", value: 5 },
  { user: "Susie", type: "retweets", value: 100 },
  { user: "Matt", type: "retweets", value: 25 },
  { user: "Betty", type: "retweets", value: 20 },
  { user: "Jason", type: "favorites", value: 15 },
  { user: "Susie", type: "favorites", value: 100 },
  { user: "Matt", type: "favorites", value: 50 },
  { user: "Betty", type: "favorites", value: 10 }
];

// color based on dataObj.type
const colorHash = {
  tweets: "#4d430c",
  retweets: "#b3331d",
  favorites: "#b6a756"
};

const axisObj = {
  orient: "left",
  label: "Tweets, Retweets and Favorites"
};
const marginObj = { left: 70, bottom: 70, right: 5, top: 55 };

const sizeArr = [500, 700];

const getOLabelFunc = oLabel => {
  return <text transform="translate(-15,0)rotate(45)"> {oLabel} </text>;
};

const barChartObj = {
  // spread into OrdinalFrame
  size: sizeArr,
  data: inflatedBarChartData, // barChartData
  oAccessor: dataObj => {
    return dataObj.user;
  },
  rAccessor: dataObj => {
    return dataObj.value;
  },
  style: dataObj => {
    // take in a single data point and return a React style obj
    return {
      fill: colorHash[dataObj.type],
      stroke: "white"
    };
  },
  type: "bar",
  oLabel: getOLabelFunc, // return label under each bar
  oPadding: 20, // space between each bar
  axis: axisObj,
  margin: marginObj,
  pieceHoverAnnotation: true, // toolTip content is passed the array of pieces
  tooltipContent: d => {
    return (
      <Wrapper>
        <div className="tooltip-content">
          <p>{d.user}</p>
          <p>{d.value}</p>
        </div>
      </Wrapper>
    );
  }
};

export default class BarChart extends React.Component {
  render() {
    return (
      <div>
        <OrdinalFrame {...barChartObj} />
        <Link to="/"> Home </Link>
      </div>
    );
  }
}
