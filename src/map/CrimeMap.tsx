import React, { useRef, useMemo, useEffect, useState } from "react";
import mapboxgl, { MapboxOptions, LngLatLike } from "mapbox-gl";
import styled from "styled-components";
import { CrimeDetailsContainer } from "./CrimeDetailsContainer";

const DEFAULT_MAP_LOCATION: LngLatLike = [-121.478851, 38.575764];
const SACRAMENTO_CRIME_LAYER_ID = "sacramento-crime-january-2006";

// TODO: Use Credstash client
mapboxgl.accessToken =
  "pk.eyJ1IjoiY2F0cGFhayIsImEiOiJjazZqY2lseHowYWowM2psaG04MXFpMzJhIn0.bXnTBzT1mIIvyIjlm8C5kQ";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  margin: 1rem;
`;

enum MapStyle {
  Dark = "mapbox://styles/catpaak/ck6nz45zy185x1hmnvp0ioomi"
}

const MapContainer = styled.div`
  width: 100%;
  height: 95%;
`;

const MapElement = styled.div`
  width: 100%;
  height: 100%;
`;

const getLabelValueMapForFeature = (feature: mapboxgl.MapboxGeoJSONFeature) => {
  const {
    address,
    beat,
    cdatetime,
    crimedescr,
    district,
    grid,
    ucr_ncic_code
  } = feature!.properties!;

  return {
    Address: address,
    Beat: beat,
    Date: cdatetime,
    Descr: crimedescr,
    District: district,
    Grid: grid,
    UCR: ucr_ncic_code
  };
};

export const CrimeMap = () => {
  const containerRef = useRef<string | HTMLDivElement>("");
  const [mapboxMap, setMapboxMap] = useState<mapboxgl.Map>();
  // // useEffect uses Object.Is for comparison (i.e. comparing reference)
  const memoizedMapboxMap = useMemo(() => mapboxMap, [mapboxMap]);

  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [selectedFeature, setSelectedFeature] = useState<
    mapboxgl.MapboxGeoJSONFeature | undefined
  >(undefined);

  useEffect(() => {
    if (containerRef.current) {
      const options: MapboxOptions = {
        container: containerRef.current,
        // can move into state for a toggle later
        style: MapStyle.Dark,
        center: DEFAULT_MAP_LOCATION,
        zoom: 10.75
      };
      const map = new mapboxgl.Map(options);

      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "top-left"
      );

      map.on("load", () => {
        setMapboxMap(map);
      });

      map.on("click", SACRAMENTO_CRIME_LAYER_ID, ({ features }) => {
        if (features && features.length > 0) {
          const [firstFeature] = features;
          setSelectedFeature(firstFeature);
        }
      });

      map.on("mouseenter", SACRAMENTO_CRIME_LAYER_ID, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", SACRAMENTO_CRIME_LAYER_ID, () => {
        map.getCanvas().style.cursor = "";
      });
    }
  }, [containerRef]);

  if (memoizedMapboxMap) {
    // https://stackoverflow.com/questions/46122192/mapbox-style-property-according-to-zoom-and-property
    memoizedMapboxMap.setPaintProperty(
      SACRAMENTO_CRIME_LAYER_ID,
      "circle-radius",
      [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        0,
        0,
        20,
        ["get", "pixelRadius"]
      ]
    );
  }

  // TODO: debounce
  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const crimesFilter = useMemo(() => {
    const norrmalizedSearchTerm =
      searchTerm && searchTerm.toUpperCase().trim()
        ? searchTerm.toUpperCase().trim()
        : "";

    // Check if Criime[k in keyof Crime].includes(normalizedSearchTerm)
    // Written out entirely for clarity
    const searchTermFilterExp = searchTerm
      ? [
          "any",
          ["==", ["in", norrmalizedSearchTerm, ["get", "address"]], true],
          ["==", ["in", norrmalizedSearchTerm, ["get", "beat"]], true],
          ["==", ["in", norrmalizedSearchTerm, ["get", "cdatetime"]], true],
          ["==", ["in", norrmalizedSearchTerm, ["get", "crimedescr"]], true],
          ["==", ["in", norrmalizedSearchTerm, ["get", "district"]], true],
          ["==", ["in", norrmalizedSearchTerm, ["get", "grid"]], true],
          ["==", ["in", norrmalizedSearchTerm, ["get", "ucr_ncic_code"]], true]
        ]
      : [];

    return ["all", searchTermFilterExp].filter(x => {
      return x.length > 0;
    });
  }, [searchTerm]);

  if (memoizedMapboxMap) {
    memoizedMapboxMap.setFilter(SACRAMENTO_CRIME_LAYER_ID, crimesFilter);
  }

  // When a user clicks on the map, on a spot without a clickable element, the current
  // selected item is deselected.
  useEffect(() => {
    if (memoizedMapboxMap) {
      const handler = ({
        point
      }: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        const renderedFeaturesAtPoint = memoizedMapboxMap.queryRenderedFeatures(
          point,
          {
            layers: [SACRAMENTO_CRIME_LAYER_ID]
          }
        );
        if (!renderedFeaturesAtPoint.length) {
          setSelectedFeature(undefined);
        }
      };
      memoizedMapboxMap.on("click", handler);
      return () => {
        memoizedMapboxMap.off("click", handler);
      };
    }
    return;
  }, [memoizedMapboxMap]);

  const labelValueMapForFeature = selectedFeature
    ? getLabelValueMapForFeature(selectedFeature)
    : {};

  return (
    <Container>
      <StyledInput
        placeholder="Search"
        onChange={handleSearchTermChange}
        value={searchTerm}
      />
      <MapContainer>
        {selectedFeature && (
          <CrimeDetailsContainer
            labelValueMapForFeature={labelValueMapForFeature}
          />
        )}
        <MapElement
          ref={el => {
            if (el !== null) {
              containerRef.current = el;
            }
          }}
        />
      </MapContainer>
    </Container>
  );
};
