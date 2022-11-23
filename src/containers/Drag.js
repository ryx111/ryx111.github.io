import Drag from "../components/Drag";
import { connect } from "react-redux";
import * as actions from "../actions";

function mapStateToProps(state) {
  return {
    time: state.timerState.time,
    wholeState: state.timerState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleBtnClick() {
      dispatch(actions.startTimer());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drag);
