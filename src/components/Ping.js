import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1em;
  margin: 1em;
  color: black;
  background: lightblue;
  border: 4px;
`;

export default class Ping extends React.Component {
  render() {
    return (
      <Wrapper>
        <div>
          <pre>
            <code>
              <h1>Pinging: {JSON.stringify(this.props.isPinging, null, 2)}</h1>
            </code>
          </pre>

          <button onClick={this.props.handleBtnClick}>
            {" "}
            Send ping action{" "}
          </button>
          <Link to="/"> Home </Link>
        </div>
      </Wrapper>
    );
  }
}
