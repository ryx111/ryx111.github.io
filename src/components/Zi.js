import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CustomTitle = styled.h1`
  text-align: ${props => (props.left ? "left" : "center")};
  color: ${props => props.color};
  font-size: ${props => props.fontsize + "px"};
`;
const Wrapper = styled.div`
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  width: ${props => props.width}
  background: ${props => props.background};
  font-size: ${props => props.fontsize};
  border: 2px;
`;

const InLineWrapper = styled.div`
  display: inline-block;
  padding: 0.5em;
`;
// Used as a presentational component
class TranslationList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CustomTitle fontsize="30">
          {" "}
          -- {this.props.translations.join(" -- ")}{" "}
        </CustomTitle>
      </div>
    );
  }
}

export default class Zi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myZiRef: null,
      isShowingTranslations: true
    };
    this.getMyZiRef = this.getMyZiRef.bind(this);
    this.toggleTranslations = this.toggleTranslations.bind(this);
  }

  getMyZiRef(elem) {
    this.setState({ myZiRef: elem });
  }

  toggleTranslations() {
    this.setState({ isShowingTranslations: !this.state.isShowingTranslations });
  }

  render() {
    const { simplified, definitions } = this.props.itemObj;

    let valsArr = Object.values(definitions);

    // Extract and render the pinyin and the TranslationsList
    let valsExtracted = valsArr.map(valObj => {
      const { pinyin, translations } = valObj;
      return (
        <div>
          <InLineWrapper>
            <CustomTitle fontsize="40" left>
              {" "}
              {pinyin}{" "}
            </CustomTitle>
          </InLineWrapper>
          <InLineWrapper>
            {this.state.isShowingTranslations && (
              <TranslationList translations={translations} />
            )}
          </InLineWrapper>
        </div>
      );
    });

    return (
      <Wrapper background="lightgrey" width="200" fontsize="30">
        <div>
          <InLineWrapper>
            <button onClick={this.toggleTranslations}>
              {" "}
              Toggle {this.props.index}{" "}
            </button>
            <CustomTitle fontsize="75" ref={this.getMyZiRef}>
              {" "}
              {simplified}
            </CustomTitle>
          </InLineWrapper>
          <InLineWrapper>{valsExtracted}</InLineWrapper>
        </div>
      </Wrapper>
    );
  }
}
