import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackRate: 2
    };
    this.ref = this.ref.bind(this);
    this.onPlaybackRateChange = this.onPlaybackRateChange.bind(this);
  }

  onPlaybackRateChange(event) {
    this.setState({ playBackRate: parseFloat(event.target.value) });
  }

  ref(player) {
    this.player = player;
  }

  render() {
    return (
      <div>
        <ReactPlayer
          ref={this.ref}
          url={
            "https://www.youtube.com/watch?v=JWA5hJl4Dv0&list=RDJWA5hJl4Dv0&start_radio=1"
          }
          playbackRate={this.state.playbackRate}
        />
        <input type="text" onChange={this.onPlaybackRateChange} />
        <Link to="/"> Home </Link>
      </div>
    );
  }
}
