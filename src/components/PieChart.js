import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { OrdinalFrame } from "semiotic";

const deaths1855 = [
  { month: "Jan", type: "Wounds & injuries", casualties: 83 },
  { month: "Feb", type: "Wounds & injuries", casualties: 42 },
  { month: "Mar", type: "Wounds & injuries", casualties: 32 },
  { month: "Apr", type: "Wounds & injuries", casualties: 48 },
  { month: "May", type: "Wounds & injuries", casualties: 49 },
  { month: "Jun", type: "Wounds & injuries", casualties: 209 },
  { month: "Jul", type: "Wounds & injuries", casualties: 134 },
  { month: "Aug", type: "Wounds & injuries", casualties: 164 },
  { month: "Sep", type: "Wounds & injuries", casualties: 276 },
  { month: "Oct", type: "Wounds & injuries", casualties: 53 },
  { month: "Nov", type: "Wounds & injuries", casualties: 33 },
  { month: "Dec", type: "Wounds & injuries", casualties: 18 },
  { month: "Jan", type: "All other causes", casualties: 324 },
  { month: "Feb", type: "All other causes", casualties: 361 },
  { month: "Mar", type: "All other causes", casualties: 172 },
  { month: "Apr", type: "All other causes", casualties: 57 },
  { month: "May", type: "All other causes", casualties: 37 },
  { month: "Jun", type: "All other causes", casualties: 31 },
  { month: "Jul", type: "All other causes", casualties: 33 },
  { month: "Aug", type: "All other causes", casualties: 25 },
  { month: "Sep", type: "All other causes", casualties: 20 },
  { month: "Oct", type: "All other causes", casualties: 18 },
  { month: "Nov", type: "All other causes", casualties: 32 },
  { month: "Dec", type: "All other causes", casualties: 28 },
  { month: "Jan", type: "Zymotic diseases", casualties: 2761 },
  { month: "Feb", type: "Zymotic diseases", casualties: 2120 },
  { month: "Mar", type: "Zymotic diseases", casualties: 1205 },
  { month: "Apr", type: "Zymotic diseases", casualties: 477 },
  { month: "May", type: "Zymotic diseases", casualties: 508 },
  { month: "Jun", type: "Zymotic diseases", casualties: 802 },
  { month: "Jul", type: "Zymotic diseases", casualties: 382 },
  { month: "Aug", type: "Zymotic diseases", casualties: 483 },
  { month: "Sep", type: "Zymotic diseases", casualties: 189 },
  { month: "Oct", type: "Zymotic diseases", casualties: 128 },
  { month: "Nov", type: "Zymotic diseases", casualties: 178 },
  { month: "Dec", type: "Zymotic diseases", casualties: 91 }
];

const deathHash = {
  "Zymotic diseases": "#00a2ce",
  "Wounds & injuries": "#b3331d",
  "All other causes": "#4d430c"
};
const Wrapper = styled.div`
  padding: 1em;
  margin: 1em;
  color: black;
  background: white;
  border: 4px;
`;
const pieChartData = [
  { user: "Jason", tweets: 10, retweets: 5, favorites: 15 },
  { user: "Susie", tweets: 5, retweets: 100, favorites: 100 },
  { user: "Matt", tweets: 20, retweets: 25, favorites: 50 },
  { user: "Betty", tweets: 30, retweets: 20, favorites: 10 }
];

let totalTweets = pieChartData.reduce((accum, dataObj) => {
  let newAccum = accum + dataObj.tweets;
  return newAccum;
}, 0);

const colorHash = {
  tweets: "#4d430c",
  retweets: "#b3331d",
  favorites: "#b6a756"
};

const colorUsersHash = {
  Jason: "#4d430c",
  Susie: "#b3331d",
  Matt: "#b6a756",
  Betty: "#4169E1" // Royal blue
};

const axisObj = {
  label: { name: "Casualties", locationDistance: 15 }
};
const marginObj = { left: 70, bottom: 70, right: 5, top: 55 };

const sizeArr = [500, 500];

const getOLabel = oLabel => {
  return <text transform="translate(-15,0)rotate(45)"> {oLabel} </text>;
};

const pieChartObj = {
  title: "Pie Chart", // spread into OrdinalFrame
  size: sizeArr, // size needs to be circle
  data: pieChartData, // barChartData
  oAccessor: dataObj => {
    return dataObj.user;
  },
  dynamicColumnWidth: "tweets", //"tweets",
  style: dataObj => {
    // take in a single data point and return a React style obj
    return { fill: colorUsersHash[dataObj.user], stroke: "white" };
  },
  type: { type: "bar", innerRadius: 10 }, // instead of just type: "bar"
  margin: marginObj,
  projection: "radial",
  oLabel: true,
  oPadding: 1,
  pieceHoverAnnotation: true,
  tooltipContent: piece => {
    return (
      <Wrapper>
        <div className="tooltip-content">
          <p>User: {piece.user}</p>
          <p>Tweets: {piece.tweets}</p>
          <p>totalTweets {totalTweets} should be 65</p>
        </div>
      </Wrapper>
    );
  }
};

export default class PieChart extends React.Component {
  render() {
    return (
      <div>
        <OrdinalFrame
          title={
            <g style={{ textAnchor: "middle" }} transform="translate(250,15)">
              <text>DIAGRAM of the CAUSES of MORTALITY</text>
              <text y={15}>in the ARMY in the EAST</text>
            </g>
          }
          size={[500, 500]}
          data={deaths1855}
          oAccessor={"month"}
          rAccessor={"casualties"}
          style={d => ({
            fill: deathHash[d.type]
            //fillOpacity: 0.75,
            //stroke: deathHash[d.type]
          })}
          type={"bar"}
          projection={"radial"}
          axis={{
            label: { name: "Casualties", locationDistance: 15 }
          }}
          margin={{ bottom: 50, top: 70, left: 25, right: 25 }}
          hoverAnnotation={true}
          oLabel={true}
        />
        <Link to="/"> Home </Link>
      </div>
    );
  }
}

/*
 <OrdinalFrame
          {...pieChartObj}
        />
*/
