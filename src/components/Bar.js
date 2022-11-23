import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { XYFrame, Mark } from "semiotic";

const Wrapper = styled.div`
  background: white;
  color: black;
  margin: 1em;
  padding: 1em;
  border: 4px;
`;

function toolTipContentFunc(dataObj) {
  return (
    <Wrapper>
      <div className="tool-tip content">
        <h1> {dataObj.week} </h1>
        <h1> {dataObj.grossWeekly} </h1>
      </div>
    </Wrapper>
  );
}

let colorHash = {
  "Fight Club": "red",
  Avatar: "purple"
};

let ptColorHash = {
  "Fight Club": "blue",
  Avatar: "green"
};

const mLines = [
  {
    // line 1
    title: "Fight Club",
    coordinates: [{ x: 1, y: 10 }, { x: 2, y: 20 }]
  },
  {
    // line 2
    title: "Avatar",
    coordinates: [{ x: 1, y: 15 }, { x: 2, y: 30 }]
  }
];

// as a column vector [w0, w1, w2] where w0 is the bias
// threshold = - bias
let wArr = [3, 5];

let xArr = [1, 15];

function calcValue(weightVector, xVector) {
  let sumsSoFar = [0];
  let total = 0;

  for (let i = 0; i < weightVector.length; i++) {
    let currValue = weightVector[i] * xVector[i];
    total += currValue;
    sumsSoFar.push(total);
  }

  return sumsSoFar;
}

let sizeArr = [500, 700];

let mMarginObj = { left: 80, bottom: 50, right: 10, top: 40 };

// adds axis for range accessor
let mAxes = [{ orient: "left" }, { orient: "bottom" }];

const mFrame = {
  size: sizeArr,
  xAccessor: dataObj => {
    return dataObj.x;
  },
  yAccessor: dataObj => {
    return dataObj.y;
  },
  lineStyle: line => {
    return {
      stroke: colorHash[line.title],
      strokeWidth: 1
    };
  },
  lines: mLines,
  lineDataAccessor: dataObj => {
    return dataObj.coordinates;
  },
  axes: mAxes,
  margin: mMarginObj,
  hoverAnnotation: true,
  showLinePoints: true,
  pointStyle: () => {
    return {
      fill: "green",
      r: 10
    };
  }
};

export default class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let yArr = calcValue(wArr, xArr);
    return (
      <div>
        <XYFrame {...mFrame} />
        <div>
          {yArr.map((value, index) => {
            return (
              <h1>
                {" "}
                val {value} at index {index}
              </h1>
            );
          })}
        </div>
        <h1> weighted sum is {} </h1>
        <Link to="/"> Home </Link>
      </div>
    );
  }
}
