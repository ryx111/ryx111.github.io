import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fromEvent } from "rxjs";
// import { interval } from 'rxjs/observable/interval';
import { takeUntil, switchMap, map } from "rxjs/operators";

const Wrapper = styled.div`
  margin: 1em;
  color: black;
  background: white;
`;

const Title = styled.h1`
  width: 50%;
  background: ${props => (props.visible ? "yellow" : "red")};
  top: ${props => (props.top ? props.top : "0px")};
`;

export default class Drag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "Initial",
      coordinates: "0,0",
      myRef: null,
      myDragRef: null,
      myStyleObj: {
        background: "lightblue",
        top: "500px"
      },
      visible: true
    };
    // this.myDragRef = React.createRef()
    this.getMyRef = this.getMyRef.bind(this);
    this.getMyDragRef = this.getMyDragRef.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
    //this.onBtn2Click = this.onBtn2Click.bind(this)
  }

  getMyRef(elem) {
    this.setState({ myRef: elem });
  }

  getMyDragRef(elem) {
    // drag me h1
    this.setState({ myDragRef: elem });
  }

  onBtnClick() {
    let docElem = this.state.myRef; // document element
    let dragElem = this.state.myDragRef; // box to drag
    let mouseDown$ = fromEvent(dragElem, "mousedown");
    let mouseMove$ = fromEvent(docElem, "mousemove");
    let mouseUp$ = fromEvent(docElem, "mouseup");

    let source$ = mouseDown$.pipe(
      switchMap(md => {
        let startX = md.offsetX;
        let startY = md.offsetY;

        return mouseMove$.pipe(
          map(mm => {
            return {
              left: mm.clientX - startX,
              top: mm.clientY - startY
            };
          }),
          takeUntil(mouseUp$)
        );
      })
    );

    source$.subscribe(posObj => {
      this.setState({ coordinates: posObj.left + "," + posObj.top }); // for debugging
      dragElem.style.color = posObj.left > 200 ? "red" : "blue";
      dragElem.style.left = `${posObj.left}px`;
      dragElem.style.top = `${posObj.top}px`;
    });
  }

  render() {
    return (
      <div ref={this.getMyRef} style={{ height: "1000px" }}>
        <pre>
          <code>
            <h1 ref={this.getMyDragRef} style={this.state.myStyleObj}>
              {" "}
              Drag me
            </h1>
            <Title visible={this.state.visible}>
              {" "}
              {this.state.coordinates}{" "}
            </Title>
            <button onClick={this.onBtnClick}> start stream </button>
          </code>
        </pre>

        <Link to="/"> Home </Link>
      </div>
    );
  }
}
/*
 onBtnClick () {
    let docElem = this.state.myRef
    let mouseMove$ = fromEvent(docElem, 'mousemove')

    mouseMove$.subscribe((event) => {
      this.setState({ coordinates: event.clientX + ", " + event.clientY})
    })
  }

  const mouseup = fromEvent(target, 'mouseup');
const mousemove = fromEvent(document, 'mousemove');
const mousedown = fromEvent(target, 'mousedown');

const mousedrag = mousedown.selectMany((md) => {
  const startX = md.clientX + window.scrollX,
        startY = md.clientY + window.scrollY,
        startLeft = parseInt(md.target.style.left, 10) || 0,
        startTop = parseInt(md.target.style.top, 10) || 0;
  
  return mousemove.map((mm) => {
    mm.preventDefault();
    
    return {
      left: startLeft + mm.clientX - startX,
      top: startTop + mm.clientY - startY
    };
  }).takeUntil(mouseup);
});

const subscription = mousedrag.subscribe((pos) => {
  target.style.top = pos.top + 'px';
  target.style.left = pos.left + 'px';
});
*/
