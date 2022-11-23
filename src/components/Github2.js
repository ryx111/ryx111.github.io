import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CustomTitle = styled.h1`
  text-align: center;
  color: ${props => (props.green ? "green" : "black")};
  font-size: ${props => (props.small ? "1.3em" : "2.0em")};
`;
const CustomDiv = styled.div`
  display: inline-block;
  width: "75%";
`;

export default class Github2 extends React.Component {
  constructor(props) {
    super(props);
    this.parseRedditUserJSON = this.parseRedditUserJSON.bind(this);
  }

  parseRedditUserJSON(filterTerm, json) {
    let index = 0;
    let commentsList = json.data.children.map(obj => {
      const {
        data: { body, link_title, link_permalink, subreddit }
      } = obj;
      index += 1;
      return (
        <div>
          <a href={link_permalink}> permalink </a>
          {/* <h2> Index is {index }</h2>
            <h2> Link_title is {link_title }</h2>
            <h2> Subreddit is {subreddit }</h2> */}
          <CustomTitle> Body is {body}</CustomTitle>
        </div>
      );
    });

    if (filterTerm.length <= 0) {
      return commentsList;
    } else {
      return json.data.children
        .filter(obj => {
          const {
            data: { body, link_title, link_permalink, subreddit }
          } = obj;
          return body.includes(filterTerm);
        })
        .map(obj => {
          const {
            data: { body, link_title, link_permalink, subreddit }
          } = obj;
          return (
            <div>
              <h1> botty </h1>
              <h3> Subreddit: r/{subreddit}</h3>
              <h3> Link_title: {link_title}</h3>
              <a href={link_permalink}> permalink </a>
              <h2> Body: {body}</h2>
            </div>
          );
        });
    }

    // else queryTerm.length > 0
    // return commentList.filter(x => x.has(filterTerm))
  }

  render() {
    return (
      <div>
        <pre>
          <code>
            <h1>This is G2</h1>
            <h1>{this.props.searchTerm}</h1>

            <h1>Comments list for the current state.redditState.searchTerm</h1>
            <ol>
              {this.props.wholeState[this.props.searchTerm]
                ? this.parseRedditUserJSON(
                    this.props.wholeState.filterTerm,
                    this.props.wholeState[this.props.searchTerm]
                  )
                : "No comments list"}
            </ol>
          </code>
        </pre>
        <button onClick={this.props.handleClick}>
          {" "}
          Send fetchUser action{" "}
        </button>
        <h1> Enter reddit username </h1>
        <input type="text" onChange={this.props.handleSearchTermChange} />
        <h1> Optional: Enter queryTerm (ie filter) </h1>
        <input type="text" onChange={this.props.handleFilterTermChange} />
        <Link to="/"> go to Home route </Link>
      </div>
    );
  }
}

//  <h1>{this.props.wholeState? JSON.stringify(this.props.wholeState, null, 2): "None"}</h1>
