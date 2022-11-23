import Github from "../components/Github";
import { connect } from "react-redux";
import * as actions from "../actions";

function mapStateToProps(state) {
  // fetchUser action will set the state username
  return {
    username: state.githubState.username,
    wholeState: state, //  // {username: "redux-observable", "redux-observable": jsonObj["created_at"]}
    error: state.githubState.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleGithubClick() {
      dispatch(actions.fetchUser("redux-observable"));
    },

    onSearchTermChange(event) {
      // send off a setSearchTerm action
      dispatch(actions.fetchUser(event.target.value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Github);
