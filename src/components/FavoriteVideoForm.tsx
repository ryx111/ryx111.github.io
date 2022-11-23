import React, { useState, FunctionComponent, useEffect } from "react";
import { DBState } from "../reducer";
import { OBJECT_STORE_NAME } from "..";
import { YoutubeVideoObj } from "./VideoItem";

interface FormData {
  firstName: string;
}

const defaultFormData = {
  firstName: ""
};

interface Props {
  dbState: DBState;
  videoObj: YoutubeVideoObj;
}

export const FavoriteVideoForm: FunctionComponent<Props> = ({
  dbState,
  videoObj
}) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleOnSubmit = async e => {
    e.preventDefault();
    let y = formData;

    const {
      id: { videoId },
      snippet: { channelId, channelTitle, title }
    } = videoObj;

    const db = dbState.db;

    const partialVideoObj = {
      id: { videoId },
      snippet: { channelId, channelTitle, title }
    };

    const videoValue = {
      id: videoId,
      videoObj: partialVideoObj
    };

    await db.add(OBJECT_STORE_NAME, videoValue);

    console.log("just added" + JSON.stringify(videoValue));
  };

  const handleInputChange = e => {
    const target = e.target;
    const isTargetElemCheckbox = target.type === "checkbox";
    const value = isTargetElemCheckbox ? target.checked : target.value;

    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        [target.name]: value
      };

      return newFormData;
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {/* <input
        type="text"
        value={formData.firstName}
        onChange={e => {
          handleInputChange(e);
        }}
        name="firstName"
      /> */}
      <button type="submit"> Fav</button>
    </form>
  );
};
