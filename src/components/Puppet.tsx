import React, { useState, FunctionComponent } from "react";
import styled from "styled-components";
import imageUrlsJSON from "./choe.json";
import hrefObjectsJSON from "./choe_hrefs.json";
import videosJSON from "./choe_videos.json";
import { Link, Switch, Route } from "react-router-dom";

// Remove the Twitter emojis and profile pic images which aren't needed
const emojiRegex = /emoji/;
const profileImageRegex = /profile_images/;

// make a set yeah could just do it here for now or for the processing.
// Example url as name=something
// should make it large

// https://pbs.twimg.com/media/EUdf40pUMAE0g-_?format=jpg&name=small

// TODO: Virtualize the lists

// newSize as either 'small', 'medium', large
const getNewSizeUrl = (prevUrl, newSize) => {
  let newUrl;
  if (prevUrl.endsWith("small")) {
    newUrl = prevUrl.slice(0, prevUrl.length - 5) + newSize;
  }
  if (prevUrl.endsWith("medium")) {
    newUrl = prevUrl.slice(0, prevUrl.length - 6) + newSize;
  }
  if (prevUrl.endsWith("large")) {
    newUrl = prevUrl.slice(0, prevUrl.length - 5) + newSize;
  }
  return newUrl;
};

const StyledVideo = styled.video`
  display: flex;
  width: 50%;
  height: 50%;
  background-color: black;
  margin: 2rem 2rem;
`;

// Removing the say 360x360 stuff at the end makes the image bigger
// look into what this means: https://pbs.twimg.com/media/EUEEeVnU8AAYz4q?format=jpg

export const Puppet = props => {
  const filteredUrlsJSON = imageUrlsJSON.slice(0, 200).filter(url => {
    return !(emojiRegex.test(url) || profileImageRegex.test(url));
  });

  const urlSet = new Set(filteredUrlsJSON);

  const urlsArr = Array.from(urlSet);

  const [urls, setUrls] = useState<string[]>(urlsArr);

  // hardcoded to medium for now
  const handleClick = (i, newSize: string) => {
    const newUrls = [...urls];
    let oldUrl = urls[i];
    let newUrl = getNewSizeUrl(oldUrl, newSize);
    newUrls[i] = newUrl;

    setUrls(newUrls);
  };

  console.log(props);

  return (
    <>
      {urls.map((url, index) => {
        return (
          <CustomImage
            key={index}
            url={urls[index]}
            index={index}
            onClick={handleClick}
          />
        );
      })}
      <ul>
        {videosJSON.map(videoURLObj => {
          const { url, poster } = videoURLObj;
          return (
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
            // Preload attribute as? hint to browser. can be one of "none" | "metadata" | "auto", spec
            // recommends metadata. Saw this because Twitter has it as none but Instagram has it as "metadata"
            // only fetches things like length, which is what MDN says specs recommend
            // Poster attribute is what's shown (or until the first frame of the video is DLed)
            <StyledVideo src={url} poster={poster} controls preload="metadata">
              <p> fallback</p>
            </StyledVideo>
          );
        })}
      </ul>
      <HrefsList
        hrefObjectsJSON={hrefObjectsJSON.filter(o => !o.href.startsWith("/"))}
      />
    </>
  );
};

const StyledDiv = styled.div`
  display: flex;
  background-color: lightgreen;
`;

const HrefsList = ({ hrefObjectsJSON }) => {
  return (
    <>
      {hrefObjectsJSON.map(obj => {
        const { href, textContent } = obj;
        // hmm a lot of hrefs are like "/davidchoe/status/1273472990051618818"
        // and need the base twitter URL appended. let's filter these out for now
        return (
          <StyledDiv>
            <h1> href is : {href}</h1>
            <a href={href}>textContent is {textContent}</a>;
          </StyledDiv>
        );
      })}
    </>
  );
};

interface Props {
  url: string;
  index: number;
  onClick: (i: number, newSize: string) => void;
}

const ImageContainer = styled.div`
  background-color: #d3d3d3;
  margin: 2rem 2rem;
`;

// probably hoist the image state up one.

const CustomImage: FunctionComponent<Props> = ({ url, index, onClick }) => {
  // remove individual state
  // const [currentUrl, setCurrentUrl] = useState<string>(url);

  let isSmall = url.endsWith("small");
  let isMedium = url.endsWith("medium");
  let isLarge = url.endsWith("large");
  let showButtons = isSmall || isMedium || isLarge;

  // strip away the '&name=360x360' in
  // https://pbs.twimg.com/media/EUEEeVPU4AEauEH?format=jpg&name=360x360
  // for better image quality and possbily add zoom in
  let imageDimensionsRegex = /(&name=[0-9]{3}x[0-9]{3}$)/;

  let shouldStripUrl = imageDimensionsRegex.test(url);

  let finalUrl = shouldStripUrl ? url.replace(imageDimensionsRegex, "") : url;

  return (
    <ImageContainer>
      <h1> image {index}</h1>
      <img src={finalUrl} />
      <h1> original url {url} </h1>
      {imageDimensionsRegex.test(url) && <h1> found 3 digits </h1>}
      {imageDimensionsRegex.test(url) && (
        <h1> stripped url is {url.replace(imageDimensionsRegex, "")}</h1>
      )}
      {!showButtons && <h1> No adjustments</h1>}
      {showButtons && (
        <h1>
          {" "}
          Ends with{" "}
          {isSmall ? "small" : isMedium ? "medium" : isLarge ? "large" : "nada"}
        </h1>
      )}
      {showButtons && (
        <>
          <button
            onClick={() => {
              // only here that I passed the passed in event handler
              onClick(index, "small");
            }}
          >
            Small for image {index}
          </button>
          <button
            onClick={() => {
              onClick(index, "medium");
            }}
          >
            Medium for image {index}
          </button>
          <button
            onClick={() => {
              onClick(index, "large");
            }}
          >
            Large for image {index}
          </button>
        </>
      )}
    </ImageContainer>
  );
};

const TestVideos = () => {
  return (
    <ul>
      {videosJSON.map(videoURLObj => {
        const { url, poster } = videoURLObj;
        return (
          // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
          // Preload attribute as? hint to browser. can be one of "none" | "metadata" | "auto", spec
          // recommends metadata. Saw this because Twitter has it as none but Instagram has it as "metadata"
          // only fetches things like length, which is what MDN says specs recommend
          // Poster attribute is what's shown (or until the first frame of the video is DLed)
          <StyledVideo src={url} poster={poster} controls preload="metadata">
            <p> fallback</p>
          </StyledVideo>
        );
      })}
    </ul>
  );
};

export const PuppetRoutes = ({ match }) => {
  // TODO: replace with let match = useRouteMatch()
  return (
    <>
      <ul>
        <li>
          <Link to={`${match.url}/videos`}> videos</Link>
        </li>
        <li>
          <Link to={`${match.url}/hrefs`}> hrefs</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/videos`} component={TestVideos}></Route>
        <Route
          path={`${match.path}/hrefs`}
          component={() => {
            return (
              <HrefsList
                hrefObjectsJSON={hrefObjectsJSON.filter(
                  o => !o.href.startsWith("/")
                )}
              />
            );
          }}
        />

        <Route path={"/"} component={Puppet} />
      </Switch>
    </>
  );
};
