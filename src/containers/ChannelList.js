import ChannelList from "../components/ChannelList";
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
    channelTerm: state.youtubeState.channelTerm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick(searchTerm) {
      dispatch(actions.goToNextPage());
    },

    onTodoClick(index) {
      // modify to select the correct channel
      dispatch(actions.selectVideo(index));
    },
    onChannelClick(channelId) {
      dispatch(actions.setYoutubeChannelTerm(channelId));
    },
    // this is the ChannelList page's individual search through
    // the specific channel's videos
    handleSearchChannelVideos(channelId, optionalParametersObj = {}) {
      console.log("handling search channel videos");
      console.log(channelId);
      console.log(JSON.stringify(optionalParametersObj, null, 2));
      const CHANNEL_TITLE = "random";
      dispatch(
        actions.setYoutubeChannelTerm(
          channelId,
          CHANNEL_TITLE,
          optionalParametersObj
        )
      );
    },

    handleFilterTermChange(event) {
      dispatch(actions.setFilterTerm(event.target.value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
