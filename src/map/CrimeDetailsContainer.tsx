import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const SideBarContainer = styled.div`
  position: absolute;
  right: 0px;
  max-height: 90%;
  z-index: 100;
`;

const SideBarContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  position: relative;
  background-color: lightgray;
  max-height: inherit;
  overflow: scroll;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem;
`;

const Flex = styled.div`
  display: flex;
`;

interface LabelValueMapForFeature {
  [label: string]: string;
}

interface Props {
  labelValueMapForFeature: LabelValueMapForFeature;
}

export const CrimeDetailsContainer: FunctionComponent<Props> = ({
  labelValueMapForFeature
}) => {
  return (
    <SideBarContainer>
      <SideBarContent>
        <Flex>
          <ColumnContainer>
            {Object.keys(labelValueMapForFeature).map(label => {
              return <Typography>{label}</Typography>;
            })}
          </ColumnContainer>
          <ColumnContainer>
            {Object.keys(labelValueMapForFeature).map(label => {
              const value = labelValueMapForFeature[label];
              return <Typography>{value}</Typography>;
            })}
          </ColumnContainer>
        </Flex>
      </SideBarContent>
    </SideBarContainer>
  );
};
