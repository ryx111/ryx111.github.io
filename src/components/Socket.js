import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject'
// import { take } from 'rxjs/operators'
import { fromEvent } from "rxjs";

const Wrapper = styled.div`
  padding: 1em;
  margin: 5em;
  color: black;
  background: lightblue;
  border: 4px;
`;

export default class Socket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50, // number of seconds
      error: "none",
      pauseBtnRef: null,
      stopClicks: 0
    };
    this.startStream = this.startStream.bind(this);
    this.getPauseBtnRef = this.getPauseBtnRef.bind(this);
  }

  getPauseBtnRef(elem) {
    this.setState({ pauseBtnRef: elem });
  }

  startStream() {
    let pause$ = fromEvent(this.state.pauseBtnRef, "mousedown");

    let observerA = {
      next: value => {
        this.setState({ stopClicks: this.state.stopClicks + 1 });
      }
    };

    pause$.subscribe(observerA);
  }

  render() {
    return (
      <div>
        <Wrapper>
          <h1> value: {this.state.value}</h1>
          <h1> stopClicks {this.state.stopClicks}</h1>
          <button onClick={this.startStream}> start my websocket stream</button>
          <button ref={this.getPauseBtnRef}> pause </button>
        </Wrapper>
        <Link to="/"> Home </Link>
      </div>
    );
  }
}
