import VideoItem from "../components/VideoItem";
import { connect } from "react-redux";
import * as actions from "../actions";

function mapStateToProps(state) {
  // fetchUser action will set the state username
  return {
    searchTerm: state.youtubeState.searchTerm,
    filterTerm: state.youtubeState.filterTerm,
    selectedIndex: state.youtubeState.selectedIndex,
    wholeState: state.youtubeState, //  // {username: "redux-observable", "redux-observable": jsonObj["created_at"]}
    error: state.youtubeState.error,
    channelTerm: state.youtubeState.channelTerm,
    channelTitle: state.youtubeState.channelTitle,
    globalVolume: state.youtubeState.globalVolume
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChannelClick(channelId, channelTitle) {
      // change action creator to include title
      dispatch(actions.setYoutubeChannelTerm(channelId, channelTitle));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoItem);
