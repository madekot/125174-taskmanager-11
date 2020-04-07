import {utils} from "../utils";

const CountFilter = {
  MIN: 0,
  MAX: 10,
};

const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

const createMockDataFilter = (name, count) => {
  return ({
    name,
    count,
  });
};

const createRandomCounter = () => {
  return utils.createRandomIntegerNumber(CountFilter.MIN, CountFilter.MAX);
};

const createMockDataFilters = () => {
  return filterNames.map((filterName) => createMockDataFilter(filterName, createRandomCounter()));
};

export {createMockDataFilters};
