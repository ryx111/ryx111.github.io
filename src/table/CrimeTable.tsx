import React, { useState, createContext, useContext } from "react";
import { Table, Column, AutoSizer, SortDirection } from "react-virtualized";
import "react-virtualized/styles.css";
import dataObj from "../Sacramento_Crime_JSON.json";
import _ from "lodash";
import styled from "styled-components";
// import { Typography, TextField, Button } from "@material-ui/core";
import { getCrimesFilteredBySearchTerm } from "./utils";

const AppContext = createContext<{ crimes: Crime[] }>(dataObj);

const SearchBarContainer = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-evenly;
`;

const StyledTextField = styled.input`
  width: 90%;
`;

const TableContainer = styled.div`
  display: flex;
`;

interface Crime {
  address: string;
  beat: string;
  cdatetime: string;
  crimedescr: string;
  district: number;
  grid: number;
  ucr_ncic_code: number;
  longitude: number;
  latitude: number;
}

const dataKeyLabelMap = {
  address: "Address",
  beat: "Beat",
  cdatetime: "Date Time",
  crimedescr: "Description",
  district: "District",
  grid: "Grid",
  ucr_ncic_code: "UCR NCIC",
  longitude: "Longitude",
  latitude: "Latitude"
};

const dataKeyWidthMap = {
  address: 700,
  beat: 250,
  cdatetime: 400,
  crimedescr: 700,
  district: 250,
  grid: 250,
  ucr_ncic_code: 300,
  longitude: 400,
  latitude: 400
};

export const CrimeTable = () => {
  const { crimes: allCrimes } = useContext(AppContext);

  // Crime results to show for the current search term
  const [crimes, setCrimes] = useState<Crime[] | undefined>(undefined);

  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const [sortBy, setSortBy] = useState<keyof Crime>("cdatetime");

  const [sortDirection, setSortDirection] = useState<any>(SortDirection.ASC);

  const [showEmptySearchTermMessage, setShowEmptySearchTermMessage] = useState<
    boolean
  >(false);

  // TODO: debounce
  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const _sortList = ({ sortBy, sortDirection }) => {
    let newCrimes = _.orderBy(
      crimes,
      [sortBy],
      [sortDirection === SortDirection.ASC ? "asc" : "desc"]
    );

    return newCrimes;
  };

  const _sort = ({ sortBy, sortDirection }) => {
    const sortedList = _sortList({ sortBy, sortDirection });
    setSortBy(sortBy);
    setSortDirection(sortDirection);
    setCrimes(sortedList as Crime[]);
  };

  // Normally make the API call here to query results
  // instead of filtering client side from React context (global state)
  const handleButtonClick = async () => {
    const hasSearchTerm = searchTerm !== undefined && searchTerm !== "";

    if (!hasSearchTerm) {
      setShowEmptySearchTermMessage(true);
      return;
    }

    if (hasSearchTerm && showEmptySearchTermMessage === true) {
      setShowEmptySearchTermMessage(false);
    }

    const filteredCrimes = getCrimesFilteredBySearchTerm(allCrimes, searchTerm);

    const sortedCrimes = _.orderBy(
      filteredCrimes,
      [sortBy],
      [sortDirection === SortDirection.ASC ? "asc" : "desc"]
    );

    setCrimes(sortedCrimes);
  };

  // TODO: Move Search bar and button into own componentt
  return (
    <AppContext.Provider value={dataObj}>
      <>
        <SearchBarContainer>
          <StyledTextField
            id="standard-search"
            // type="search"
            // variant="outlined"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button onClick={handleButtonClick}>Search</button>
        </SearchBarContainer>

        {showEmptySearchTermMessage && (
          <h5>Please enter a query with one or more characters.</h5>
        )}

        {crimes && (
          <h5>
            {crimes ? crimes.length : 0} out of {allCrimes.length} records match
            the current query.
          </h5>
        )}

        <TableContainer>
          <div style={{ height: 800, width: 2000 }}>
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  width={width}
                  height={height}
                  headerHeight={60}
                  rowHeight={60}
                  overscanRowCount={30}
                  sort={_sort}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  rowCount={crimes ? crimes.length : 0}
                  rowGetter={({ index }) =>
                    crimes ? crimes[index] : undefined
                  }
                >
                  {Object.keys(dataKeyLabelMap).map(dataKey => {
                    const label = dataKeyLabelMap[dataKey];
                    const width = dataKeyWidthMap[dataKey];
                    return (
                      <Column width={width} label={label} dataKey={dataKey} />
                    );
                  })}
                </Table>
              )}
            </AutoSizer>
          </div>
        </TableContainer>
      </>
    </AppContext.Provider>
  );
};
