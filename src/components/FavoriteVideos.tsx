import React, { useEffect, useState, FunctionComponent } from "react";
import { DBState } from "../reducer";
import { YoutubeVideoObj } from "./VideoItem";
import { OBJECT_STORE_NAME } from "..";
import { connect } from "react-redux";
import VideoItem from "../containers/VideoItem";

interface Props {
  dbState: DBState;
  videoObj: YoutubeVideoObj;
}

export const FavoriteVideosComponent: FunctionComponent<Props> = ({
  dbState
}) => {
  const [videos, setVideos] = useState<any>([]);

  useEffect(() => {
    async function getFavoriteVideos(dbState: DBState) {
      const currDBOrUndefined = dbState.db;

      if (currDBOrUndefined === undefined) {
        console.log("no db yet");
        return;
      }

      try {
        const values = await dbState.db.getAll(OBJECT_STORE_NAME);
        console.log(values);

        // had some test data added before, now filter out
        const filteredVideos = values.filter(video => {
          return video.videoObj !== undefined;
        });

        setVideos(filteredVideos);
      } catch (e) {
        console.log("failred to get videos");
        return;
      }
    }

    getFavoriteVideos(dbState);
  }, [dbState]);

  return (
    <>
      {videos.map(videoValue => {
        const { videoObj } = videoValue;
        return <VideoItem videoObj={videoObj} />;
      })}
    </>
  );
};

function mapStateToProps(state) {
  return {
    dbState: state.dbState
  };
}
export const FavoriteVideos = connect(mapStateToProps)(FavoriteVideosComponent);
