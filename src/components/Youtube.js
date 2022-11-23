import React from "react";
import VideoItem from "./VideoItem";
import styled from "styled-components";
// Create-react-app outputs a /build folder where the assets are served
// so this is why gh-pages does a "-d (irectory) build" to get that /build foder
// and push it to the remote gh-pages branch

// style for react-router's Link

const CustomTitle = styled.h1`
  text-align: center;
  color: ${props => (props.green ? "green" : "black")};
  font-size: ${props => (props.small ? "1.3em" : "2.0em")};
`;
const MyInput = styled.input`
  padding: 0.5em;
  margin-right: 1rem;
  margin-left: 5rem;
  background: black;
  color: white;
  width: 100%;
  height: 25px;
  font-size: 22px;
  border-radius: 1px;
  font-weight: 400;
`;

const CenterDiv = styled.div`
  display: inline-block;
`;
const ListWrapper = styled.div`
  margin: 20px;
`;

const StyledLabel = styled.label`
  display: block;
`;

const SearchAndVolumeInputContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const VolumeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Youtube = props => {
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
          channelTerm={props.channelTerm}
          selectedChannel={props.channelTitle}
          listOfSelectedIndexes={props.listOfSelectedIndexes}
          globalVolume={props.globalVolume}
        />
      );
    });

    return videosList;
  };

  return (
    // this.props.wholeState[this.props.searchTerm] returns the videoJSON for that serachTerm
    <div>
      <pre>
        <code>
          <CenterDiv>
            <CustomTitle small>searchTerm: {props.searchTerm}</CustomTitle>
            <CustomTitle small>channelTitle: {props.channelTitle}</CustomTitle>
            <CustomTitle small>
              error: {JSON.stringify(props.error, null, 2)}
            </CustomTitle>
            <SearchAndVolumeInputContainer>
              <MyInput
                placeholder="Search"
                type="text"
                onChange={props.handleSearchTermChange}
              />
              <VolumeInputContainer>
                <StyledLabel htmlFor="globalVolume">Volume</StyledLabel>
                <input
                  id="globalVolume"
                  type="number"
                  min={0}
                  max={1}
                  onChange={e => {
                    props.handleGlobalVolumeChange(e);
                  }}
                  step={0.1}
                />
              </VolumeInputContainer>
            </SearchAndVolumeInputContainer>
          </CenterDiv>
          <ListWrapper>
            {props.wholeState[props.searchTerm] &&
              parseYoutubeVideoJSON(props.wholeState[props.searchTerm])}
          </ListWrapper>
        </code>
      </pre>
    </div>
  );
};

export default Youtube;

/*
 <h1> Not working yet Optional: Enter queryTerm (ie filter) for Youtube </h1>
      <input type="text" onChange={this.props.handleFilterTermChange} />
      <button onClick={this.props.handleClick}> Go to next page  </button>
       <h1> {JSON.stringify(this.props.wholeState, null, 2)} </h1>
*/
