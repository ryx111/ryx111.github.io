import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import VideoItem from "./VideoItem";
import styled from "styled-components";

// style for react-router's Link
const StyledLink = styled(Link)`
  color: red;
`;

function getDebouncedFunction(fn, delayInMs) {
  let timerId = undefined;

  return (...args) => {
    console.log(timerId);
    console.log("clearing prev timeout");

    window.clearTimeout(timerId);

    // set new timeout
    timerId = window.setTimeout(() => {
      // do I need to clear it here as well?
      // but the this would be for the inner function if I don't use
      // an anon function
      console.log("now running the cb");
      fn.apply(this, args);
    }, delayInMs);
  };
}

const ChannelList = props => {
  const [queryTerm, setQueryTerm] = useState("");

  // Initializing the controlled component as undefined instead of an
  // empty string shows the following warning and messes up the React render.
  // https://stackoverflow.com/questions/50970793/react-warning-componentxxx-is-changing-an-uncontrolled-input-of-type-undefine
  const [publishedAfterDateString, setPublishedAfterDateString] = useState("");
  const [publishedBeforeDateString, setPublishedBeforeDateString] = useState(
    ""
  );

  const parseYoutubeVideoJSON = json => {
    let videosList = json.items.map((obj, index) => {
      // items prop of the youtube JSON returns array of objects
      let currChannelId = obj.snippet.channelId;
      let currChannelTitle = obj.snippet.channelTitle;

      return (
        <VideoItem
          videoObj={obj}
          index={index}
          onTodoClick={() => props.onTodoClick(index)}
          onChannelClick={() =>
            props.onChannelClick(currChannelId, currChannelTitle)
          }
          selectedIndex={props.selectedIndex}
          selectedChannel={props.channelTitle}
          channelTerm={props.channelTerm}
        />
      );
    });

    return videosList;
  };

  // Something odd happened when using event as the argument with the synthetic React event
  // It blew up because it said it was null? weird, just modify the argument
  // to be the actual argument instead of the event
  // Also note that if this function didn't take in a parameter, and its then memo-ed
  // with useCallback(), it would close over queryTerm but the function would be memo-ed
  // over the original empty string.
  const handleSearchChannelVideos = queryValue => {
    let optionalParametersObj = {
      q: queryValue
    };

    props.handleSearchChannelVideos(props.channelTerm, optionalParametersObj);
    // setQueryTerm(e.target.value);
    // this was moved because we don't want to debounce the actual state query term update
    // for the controlled component
  };

  const debouncedHandleQueryTermChange = getDebouncedFunction(
    handleSearchChannelVideos,
    600
  );

  // what happens if I don't memo this function?
  // the callback will run always after keypress, instead of properly debouncing
  // because? See article below
  const memoedCb = useCallback(debouncedHandleQueryTermChange, []);

  // https://stackoverflow.com/questions/47809666/lodash-debounce-not-working-in-react
  // https://rajeshnaroth.medium.com/using-throttle-and-debounce-in-a-react-function-component-5489fc3461b3
  const handleChange = e => {
    setQueryTerm(e.target.value);

    memoedCb(e.target.value);
  };

  const handleClickSearchVideos = () => {
    // later add the query term if there is one
    // YoutubeAPI needs the date time in a particular format
    // This can be Number(undefined) which is NaN but the conditional spread
    const publishedAfterYearNum = Number(publishedAfterDateString);
    const publishedAfter = new Date(publishedAfterYearNum, 0, 1).toISOString(); // month is zero indexed

    const publishedBeforeYearNum = Number(publishedBeforeDateString);
    const publishedBefore = new Date(
      publishedBeforeYearNum,
      0,
      1
    ).toISOString();

    let optionalParametersObj = {
      // hardcode
      ...(publishedAfterDateString
        ? {
            publishedAfter
          }
        : {}),
      ...(publishedBeforeDateString
        ? {
            publishedBefore
          }
        : {})
    };

    props.handleSearchChannelVideos(props.channelTerm, optionalParametersObj);
  };

  return (
    // this.props.wholeState[this.props.searchTerm] returns the videoJSON for that serachTerm
    <div>
      <pre>
        <code>
          <Link to={process.env.PUBLIC_URL + "/Youtube"}>
            {" "}
            Back to Youtube !
          </Link>
          <div style={{ marginTop: "1rem", marginLeft: "2rem" }}>
            <input
              style={{
                padding: "1rem",
                backgroundColor: "black",
                color: "white"
              }}
              type="text"
              value={queryTerm}
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              flexDirection: "row"
            }}
          >
            <input
              id="publishedAfter"
              type="text"
              value={publishedAfterDateString}
              onChange={e => {
                setPublishedAfterDateString(e.target.value);
              }}
            />

            <input
              id="publishedBefore"
              type="text"
              value={publishedBeforeDateString}
              onChange={e => {
                setPublishedBeforeDateString(e.target.value);
              }}
            />

            <button onClick={handleClickSearchVideos}> Search</button>
          </div>
          <ol>
            {props.wholeState[props.channelTerm]
              ? parseYoutubeVideoJSON(props.wholeState[props.channelTerm])
              : "Please select a channel to view their latest videos"}
          </ol>
        </code>
      </pre>
    </div>
  );
};

export default ChannelList;
