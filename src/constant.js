const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const SITE_MENU_ITEMS = [
  {
    name: `new-task`,
    text: `+ ADD NEW TASK`,
  },
  {
    name: `task`,
    text: `TASKS`,
  },
  {
    name: `statistic`,
    text: `STATISTICS`,
  },
];

const LIST_SORT_TEXTS = [`SORT BY DEFAULT`, `SORT BY DATE up`, `SORT BY DATE down`];

const EMPTY = ``;

const TASK_COUNT = 25;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const constant = {
  MONTH_NAMES,
  COLORS,
  DAYS,
  SITE_MENU_ITEMS,
  LIST_SORT_TEXTS,
  EMPTY,
  TASK_COUNT,
  SHOWING_TASKS_COUNT_ON_START,
  SHOWING_TASKS_COUNT_BY_BUTTON,
};

export {constant};
