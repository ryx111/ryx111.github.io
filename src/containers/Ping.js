import Ping from "../components/Ping";
import { connect } from "react-redux";
import * as actions from "../actions";

function mapStateToProps(state) {
  return {
    isPinging: state.isPinging
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleBtnClick() {
      dispatch(actions.ping());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ping);
