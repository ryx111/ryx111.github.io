import Youtube from "../components/Youtube";
import { connect } from "react-redux";
import * as actions from "../actions";

function mapStateToProps(state) {
  // fetchUser action will set the state username
  return {
    searchTerm: state.youtubeState.searchTerm,
    filterTerm: state.youtubeState.filterTerm,
    selectedIndex: state.youtubeState.selectedIndex,
    listOfSelectedIndexes: state.youtubeState.listOfSelectedIndexes,
    wholeState: state.youtubeState, //  // {username: "redux-observable", "redux-observable": jsonObj["created_at"]}
    error: state.youtubeState.error,
    channelTerm: state.youtubeState.channelTerm,
    channelTitle: state.youtubeState.channelTitle,
    globalVolume: state.youtubeState.globalVolume,
    dbState: state.dbState
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
    onChannelClick(channelId, channelTitle) {
      // change action creator to include title
      dispatch(actions.setYoutubeChannelTerm(channelId, channelTitle));
    },

    handleSearchTermChange(event) {
      // send off a setSearchTerm action
      dispatch(actions.setYoutubeSearchTerm(event.target.value));
    },

    handleFilterTermChange(event) {
      dispatch(actions.setFilterTerm(event.target.value));
    },

    handleGlobalVolumeChange(event) {
      const globalVolume = parseFloat(event.target.value) || 1.0;
      dispatch(actions.setYoutubeVolume(globalVolume));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Youtube);
