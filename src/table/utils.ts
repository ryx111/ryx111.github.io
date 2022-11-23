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

const getCrimeText = (crime: Crime) => {
  const {
    address,
    beat,
    cdatetime,
    crimedescr,
    district,
    grid,
    ucr_ncic_code,
    longitude,
    latitude
  } = crime;
  const stringValues = `${address}${beat}${cdatetime}${crimedescr}`.toUpperCase();
  const numbersToStrings = `${String(district)} ${String(grid)} ${String(
    grid
  )} ${String(ucr_ncic_code)} ${String(longitude)} ${String(
    latitude
  )}`.toUpperCase();

  return `${stringValues}${numbersToStrings}`;
};

export const getCrimesFilteredBySearchTerm = (
  allCrimes: Crime[],
  searchTerm: string | undefined
): Crime[] => {
  const hasSearchTerm = searchTerm !== undefined && searchTerm !== "";

  if (!hasSearchTerm) {
    return [];
  }

  // Normalized search term
  const searchTermFilter = hasSearchTerm
    ? searchTerm!.toUpperCase().trim()
    : "";

  const filteredCrimes = hasSearchTerm
    ? allCrimes.filter(crime => {
        let isMatchForSearchTerm = getCrimeText(crime).includes(
          searchTermFilter
        );
        return isMatchForSearchTerm;
      })
    : [];

  return filteredCrimes;
};
