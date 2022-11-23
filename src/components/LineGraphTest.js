import React from "react";
import { XYFrame } from "semiotic";

const ordinalColors = ["#9c7561", "#e15759", "#f0cd6b", "#fabfd2", "#8cd17d"];

function generateDataArray3(index) {
  // yearObj with {"asian" : 1< "year

  const classObj2018 = {
    Year: 18,
    Female: 1666,
    Male: 1595,
    Total: 3261,
    AfricanAmerican: 6.1,
    AsianAmerican: 19.1,
    BiMultiracial: 4.4,
    Caucasian: 42.2,
    HispanicAmerican: 12.7,
    NativeAmericanHawaiian: 0.6,
    NotReportedAndOther: 5.6
  };

  const classObj2019 = {
    Year: 19,
    Female: 1686,
    Male: 1533,
    Total: 3219,
    AfricanAmerican: 7,
    AsianAmerican: 20.1,
    BiMultiracial: 4.4,
    Caucasian: 36.9,
    HispanicAmerican: 14,
    NativeAmericanHawaiian: 0.6,
    NotReportedAndOther: 7.4
  };

  const classObj2020 = {
    Year: 20,
    Female: 1785,
    Male: 1557,
    Total: 3342,
    AfricanAmerican: 6.8, // percentages
    AsianAmerican: 18.1,
    BiMultiracial: 4.7,
    Caucasian: 36.3,
    HispanicAmerican: 13.8,
    NativeAmericanHawaiian: 0.7,
    NotReportedAndOther: 8.2
  };

  let classObjArr = [classObj2018, classObj2019, classObj2020];

  let AfricanAmericanPoints = classObjArr.map((item, index) => {
    return {
      x: item.Year,
      y: item.AfricanAmerican
    };
  });

  let AsianAmericanDataPoints = classObjArr.map((item, index) => {
    return {
      x: item.Year,
      y: item.AsianAmerican
    };
  });

  let BiMultiracialDataPoints = classObjArr.map((item, index) => {
    return {
      x: item.Year,
      y: item.BiMultiracial
    };
  });

  let CaucasianDataPoints = classObjArr.map((item, index) => {
    return {
      x: item.Year,
      y: item.Caucasian
    };
  });

  let HispanicAmericanDataPoints = classObjArr.map((item, index) => {
    return {
      x: item.Year,
      y: item.HispanicAmerican
    };
  });

  switch (index) {
    // x as year, y as percentage admitted
    case 0: // Year by Year
      return AfricanAmericanPoints;
      break;
    case 1: // Asian
      return AsianAmericanDataPoints;
      break;
    case 2: // Asian
      return BiMultiracialDataPoints;
      break;
    case 3: // Asian
      return CaucasianDataPoints;
      break;
    case 4: // Asian
      return HispanicAmericanDataPoints;
      break;

    default:
      return [];
  }
}

const chartAxes = [{ orient: "left" }, { orient: "bottom" }];

const tooltipStyles = {
  header: {
    fontWeight: "bold",
    borderBottom: "thin solid black",
    marginBottom: "10px",
    textAlign: "center"
  },
  lineItem: { position: "relative", display: "block", textAlign: "left" },
  title: { display: "inline-block", margin: "0 5px 0 15px" },
  value: { display: "inline-block", fontWeight: "bold", margin: "0" },
  wrapper: {
    background: "rgba(255,255,255,0.8)",
    minWidth: "max-content",
    whiteSpace: "nowrap"
  }
};

// const ethnicityArr = ["Hispanic", "Asian", "Black", "White", "Not Reported"]
const testArr = [
  "African American",
  "Asian American",
  "Bi/Multiracial",
  "Caucasian",
  "Hispanic American"
];

// array of lines. Each line object has an id (ethnicity), color and dataArr (which is an
// array of dateObjects of type {x: 10, y: 25}) for example
const linesRace = testArr.map((value, index) => {
  return {
    id: value, // "race"
    color: ordinalColors[index],
    data: generateDataArray3(index) // return array of data points :: index => {x: Asian, y:15}
  };
});

function fetchBro(passedData) {
  // find an array of points that match the passedData.x
  // lines as diff lines each with a color, id, and dataPoints generated
  const pointsArr = linesRace
    .map(line => {
      let point = {
        id: line.id,
        color: line.color,
        singleDataObj: line.data.filter(dObj => dObj.x === passedData.x)[0] // matches x which is the year
      };
      return point; // return single point
    })
    .sort((a, b) => b.singleDataObj.y - a.singleDataObj.y);

  const returnArray = [
    <div key={"header_multi"} style={tooltipStyles.header}>
      {`Records`}
    </div>
  ];

  pointsArr.forEach((point, i) => {
    const title = point.id;
    const valString = `${point.singleDataObj.y} %`; // percentage

    returnArray.push([
      <div key={`tooltip_line_${i}`} style={tooltipStyles.lineItem}>
        <p
          key={`tooltip_color_${i}`}
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: point.color,
            display: "inline-block",
            position: "absolute",
            top: "8px",
            left: "0",
            margin: "0"
          }}
        />
        <p key={`tooltip_p_${i}`} style={tooltipStyles.title}>{`${title} =`}</p>
        <p key={`tooltip_p_val_${i}`} style={tooltipStyles.value}>
          {valString}
        </p>
      </div>
    ]);
  });

  return (
    <div className="tooltip-content" style={tooltipStyles.wrapper}>
      {returnArray}
    </div>
  );
}

const hoverArr = [
  { type: "x", disable: ["connector", "note"] },
  { type: "frame-hover" },
  { type: "vertical-points", threshold: 1, r: () => 5 }
];

const sizeArr = [1200, 500];

const marginObj = { left: 130, bottom: 50, right: 10, top: 40 };

const lineStyle = {
  stroke: "#00a2ce"
};

const sharedTooltipChart = {
  title: "Cornell Admissions",
  size: sizeArr,
  className: "sharedTooltip",
  lineDataAccessor: "data",
  xAccessor: "x",
  yAccessor: "y",
  lines: linesRace,
  lineStyle: d => {
    return { stroke: d.color, strokeWidth: "2px" };
  },
  axes: chartAxes,
  margin: marginObj,
  pointStyle: () => {
    return {
      fill: "none",
      stroke: "black",
      strokeWidth: "2.5px"
    };
  },
  hoverAnnotation: hoverArr,
  tooltipContent: d => fetchBro(d)
};

export default class LineGraphTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: []
    };
  }

  render() {
    return (
      <div>
        <XYFrame {...sharedTooltipChart} />
      </div>
    );
  } // End of the render function
} // End of the component
