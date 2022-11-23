import Github2 from "../components/Github2";
import { connect } from "react-redux";
import * as actions from "../actions";

function mapStateToProps(state) {
  // fetchUser action will set the state username
  return {
    searchTerm: state.redditState.searchTerm,
    filterTerm: state.redditState.filterTerm,
    wholeState: state.redditState, //  // {username: "redux-observable", "redux-observable": jsonObj["created_at"]}
    error: state.redditState.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick() {
      dispatch(actions.sendRequest());
    },

    handleSearchTermChange(event) {
      // send off a setSearchTerm action
      dispatch(actions.setSearchTerm(event.target.value));
    },

    handleFilterTermChange(event) {
      dispatch(actions.setFilterTerm(event.target.value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Github2);
