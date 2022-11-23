import React from "react";
import { Link } from "react-router-dom";

export default class Github extends React.Component {
  /*constructor(props) {
    super(props)
  }
  */
  render() {
    return (
      <div>
        <pre>
          <code>
            <h1>{this.props.username}</h1>
            <h1>
              {this.props.wholeState
                ? JSON.stringify(this.props.wholeState, null, 2)
                : "None"}
            </h1>
          </code>
        </pre>
        <button onClick={this.props.handleGithubClick}>
          {" "}
          Send fetchUser action for user redux-observable{" "}
        </button>
        <input type="text" onChange={this.props.onSearchTermChange} />
        <Link to="/Ping"> go to Ping route </Link>
        <Link to="/Github2"> go to Github2 route </Link>
        <Link to="/Youtube"> go to Youtube route </Link>
        <Link to="/Test"> go to Test route</Link>
      </div>
    );
  }
}
