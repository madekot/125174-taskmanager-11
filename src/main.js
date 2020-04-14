import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createBoardTemplate} from "./components/board.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createMockDataFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";

const TASK_COUNT = 25;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;
const CHECKED_FILTER_INDEX = 0;


const siteMainElement = document.querySelector(`.main`);


const render = ({container, template, place = `beforeend`}) => {
  container.insertAdjacentHTML(place, template);
};

const renderSiteMenu = () => {
  const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
  return render({container: siteHeaderElement, template: createSiteMenuTemplate()});
};

const renderFilter = () => {
  const mocks = createMockDataFilters();
  return render({container: siteMainElement, template: createFilterTemplate(mocks, CHECKED_FILTER_INDEX)});
};

const renderBoard = () => {
  render({container: siteMainElement, template: createBoardTemplate()});
};

const renderTasks = (from, to) => {
  mockTasks.slice(from, to)
    .forEach((task) => render({container: getTaskListElement(), template: createTaskTemplate(task)}));
};

const renderTaskList = (tasks) => {
  render({container: getTaskListElement(), template: createTaskEditTemplate(tasks[0])});
  renderTasks(1, showingTasksCount);
};

const renderLoadMoreButton = (cb) => {
  const boardElement = siteMainElement.querySelector(`.board`);
  render({container: boardElement, template: createLoadMoreButtonTemplate()});
  cb(boardElement);
};

const isAllTaskShowed = () => {
  return (showingTasksCount >= mockTasks.length);
};

const onClickLoadMoreButton = (boardElement, loadMoreButton) => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;
  renderTasks(prevTasksCount, showingTasksCount);
  if (isAllTaskShowed()) {
    loadMoreButton.remove();
  }
};

const addListenerloadMoreButton = (boardElement) => {
  const loadMoreButton = boardElement.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, () => onClickLoadMoreButton(boardElement, loadMoreButton));
};

const getTaskListElement = () => {
  return siteMainElement.querySelector(`.board__tasks`);
};

const mockTasks = generateTasks(TASK_COUNT);
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

renderSiteMenu();
renderFilter();
renderBoard();
renderTaskList(mockTasks);
renderLoadMoreButton(addListenerloadMoreButton);
