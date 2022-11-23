import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { interval } from "rxjs/observable/interval";
import { map, takeUntil, take } from "rxjs/operators";
import { fromEvent } from "rxjs";

const Wrapper = styled.div`
  padding: 1em;
  margin: 5em;
  color: black;
  background: lightblue;
  border: 4px;
`;
// @ param: num - the number of seconds
class Clock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { numOfSecs } = this.props;

    let clockSecs = numOfSecs % 60;
    let clockMins = Math.trunc(numOfSecs / 60);

    return (
      <div>
        <h1>
          {" "}
          {clockMins.toString()} :{" "}
          {clockSecs < 10 ? "0" + clockSecs.toString() : clockSecs.toString()}
        </h1>
      </div>
    );
  }
}

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0, // number of seconds
      error: "none",
      array: [],
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
    // 0 - 1 - 2 and then map(x => 1) so stream 1 - 1 - 1
    let stop$ = fromEvent(this.state.pauseBtnRef, "mousedown");

    let observerA = {
      next: singleClick => {
        this.setState({ stopClicks: this.state.stopClicks + 1 });
      }
    };

    stop$.subscribe(observerA);

    let interval$ = interval(1000).pipe(
      map(x => 1),
      take(30),
      takeUntil(stop$)
    );

    let observerObj = {
      next: value => {
        this.setState({ value: this.state.value + 1 });
        // this.setState({ array: this.state.array.push(val)})
      },
      error: err => {
        this.setState({ error: err });
      },
      complete: () => {
        console.log("complete");
      }
    };

    interval$.subscribe(observerObj);
  }

  render() {
    return (
      <div>
        <Wrapper>
          <h1> value: {this.state.value}</h1>
          <button onClick={this.startStream}> start </button>
          <button ref={this.getPauseBtnRef}> pause </button>
          <Clock numOfSecs={this.state.value} />
        </Wrapper>
        <Link to="/"> Home </Link>
      </div>
    );
  }
}
