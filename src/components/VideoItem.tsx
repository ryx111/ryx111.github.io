import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 95%;
  background-color: #f6f6ef;
  color: black;
  align-content: center;
  margin: auto;
`;

const StyledLink = styled(Link)`
  font-size: 15px;
`;

const SpeedInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: white;
  color: black;
  width: 60px;
  height: 20px;
  font-size: 16px;
  border-radius: 3px;
  font-weight: 400;
`;

const CustomButton = styled.button`
  width: "100px";
  height: "40px";
  font-size: 28px;
  padding: 0.5em;
`;
const CustomButton2 = styled.button`
  width: "200px";
  height: "40px";
  font-size: 20px;
  padding: 0.5em;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
function getGoldWidth(goldHeight) {
  let goldY = Number(goldHeight.substring(0, goldHeight.length - 2)); // "640"
  let goldWidth = goldY * 1.618 + "px";
  return goldWidth;
}

const goldHeight = "220px";
const goldWidth = getGoldWidth(goldHeight);

// interface from Youtube API
// https://developers.google.com/youtube/v3/docs/videos

export interface YoutubeVideoObj {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: any;
    channelId: string;
    channelTitle: string;
    title;
  };
}

interface Props {
  videoObj: YoutubeVideoObj;
  channelTerm: string;
  selectedChannel: string;
  index: number;
  selectedIndex: number;
  onChannelClick: () => void;
  globalVolume: number;
}

interface State {
  playbackRate: number;
  seeking: boolean;
  isShowing: boolean;
}

class VideoItem extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      playbackRate: 1,
      seeking: false,
      isShowing: false
    };
  }

  showPlayer = () => {
    this.setState({ isShowing: true });
  };

  onPlaybackRateChange = (event: ChangeEvent<HTMLInputElement>) => {
    // prevent value of NaN when input has emtpy string
    this.setState({ playbackRate: parseFloat(event.target.value) || 1.0 });
  };

  render() {
    const {
      id: { videoId },
      //snippet: { thumbnails: { high: { url: thumbnail }}, title}
      snippet: { publishedAt, channelId, channelTitle, title }
    } = this.props.videoObj;
    let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    let mSet = new Set([0, 1, 2]);
    const aposttropheRegex = /&#39;/gi;

    return (
      <Wrapper>
        <div>
          <div>
            {this.props.index == this.props.selectedIndex ? (
              <h1> {title.replace(aposttropheRegex, "'")}</h1>
            ) : (
              <h1>{title.replace(aposttropheRegex, "'")} </h1>
            )}
          </div>
          <ContentContainer>
            <div
              className="player-container"
              style={{
                margin: "2rem"
              }}
            >
              {this.state.isShowing || mSet.has(this.props.index) ? (
                <ReactPlayer
                  url={videoUrl}
                  playbackRate={this.state.playbackRate}
                  controls={true}
                  width={goldWidth}
                  height={goldHeight}
                  volume={this.props.globalVolume}
                />
              ) : (
                <CustomButton onClick={this.showPlayer}> Play </CustomButton>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className="speed-playback-container"
                style={{
                  margin: "1rem"
                }}
              >
                {(this.state.isShowing || mSet.has(this.props.index)) && (
                  <SpeedInput
                    placeholder="Speed"
                    type="text"
                    onChange={this.onPlaybackRateChange}
                  />
                )}
              </div>
              <div
                className="channel-title-container"
                style={{
                  margin: "1rem"
                }}
              >
                <CustomButton2 onClick={this.props.onChannelClick}>
                  {channelTitle}
                </CustomButton2>
                {/* <h1> {JSON.stringify(publishedAt, null, 2)}</h1> */}
              </div>
              <div
                style={{
                  margin: "1rem"
                }}
              >
                {channelId == this.props.channelTerm &&
                  this.props.selectedChannel && (
                    <StyledLink to={process.env.PUBLIC_URL + "/ChannelList"}>
                      Latest from {this.props.selectedChannel}
                    </StyledLink>
                  )}
              </div>
              <div
                className="link-container"
                style={{
                  margin: "1rem"
                }}
              >
                <a href={videoUrl}> YT </a>
              </div>
            </div>
          </ContentContainer>
        </div>
      </Wrapper>
    );
  }
}

export default VideoItem;

/*
{ Math.abs(this.props.index - this.props.selectedIndex) <= 1 && 
                <SpeedInput 
                  placeholder="Speed"
                  type="text"
                  onChange={this.onPlaybackRateChange}
                />
            }
            <h2> channelId is {channelId}</h2>
            <h2> currChannelTerm is {this.props.channelTerm}</h2>
            :  <CustomButton onClick={this.props.onTodoClick}> Play </CustomButton>   

            // this.props.onTodoClick dispatches a select video action
*/
