import { Translate } from "../components/Translate";
import { connect } from "react-redux";
import * as actions from "../actions";

function mapStateToProps(state) {
  return {
    translateState: state.translateState,
    term: state.translateState.term
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTermChange(event) {
      dispatch(actions.setTranslateTerm(event.target.value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Translate);
