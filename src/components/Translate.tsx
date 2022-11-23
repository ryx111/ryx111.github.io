import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Zi from "./Zi";

const CustomInput = styled.input`
  height: ${props => props.height};
`;

const Wrapper = styled.div`
  padding: 1em;
  margin: 1em;
  color: black;
  background: lightblue;
  border: 4px;
`;
interface Props {
  langSetting: string;
  term: string;
  onTermChange: () => void;
  translateState: any;
}

interface State {
  isSimplified: boolean;
}

// need my input search which sends off a SET_TRANSLATE_TERM
export class Translate extends Component<Props, State> {
  state = {
    isSimplified: true
  };

  // constructor(props) {
  //   super(props)
  //   this.renderListOfZi = this.renderListOfZi.bind(this)
  //   this.state = {
  //     simplified: true
  //   }
  // }

  renderListOfZi = (jsonArr: any[]) => {
    // pass in Zi's props
    return jsonArr.map((itemObj, index) => {
      // each item is an obj
      return <Zi itemObj={itemObj} index={index} />;
    });
  };

  render() {
    // render only this.props.translateState[this.props.translateState.term]
    return (
      <Wrapper>
        <div>
          <h1> Mandarin to English (in progress)</h1>
          <h1> 在雷霆他每次进攻大概要面对两个人的防守 </h1>
          <h1>
            {" "}
            On the Thunder, he (Kevin Durant) had to always face two defeneders{" "}
          </h1>
          <h1> curr setting is {this.props.langSetting} </h1>
          <h1> curr term is {this.props.term} </h1>
          <CustomInput
            height="80px"
            type="text"
            placeholder="Translate"
            onChange={this.props.onTermChange}
          />
          <ol>
            {this.props.translateState[this.props.term] &&
              this.renderListOfZi(this.props.translateState[this.props.term])}
          </ol>
          <pre>
            <code>
              <h1>{JSON.stringify(this.props.translateState, null, 2)}</h1>
            </code>
          </pre>
          <Link to="/"> Home </Link>
        </div>
      </Wrapper>
    );
  }
}
