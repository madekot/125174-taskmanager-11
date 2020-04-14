import {utils} from "../utils";

const CountFilter = {
  MIN: 0,
  MAX: 10,
};

const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

const generateMockDataFilter = (name, count) => {
  return ({
    name,
    count,
  });
};

const createRandomCounter = () => {
  return utils.createRandomIntegerNumber(CountFilter.MIN, CountFilter.MAX);
};

const generateMockDataFilters = () => {
  return filterNames.map((filterName) => generateMockDataFilter(filterName, createRandomCounter()));
};

export {generateMockDataFilters};
