import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createBoardTemplate} from "./components/board.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createMockDataFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";

const TASK_COUNT = 3;
const CHECKED_FILTER_INDEX = 0;

const siteMainElement = document.querySelector(`.main`);


const render = ({container, template, place = `beforeend`}) => {
  container.insertAdjacentHTML(place, template);
};

const renderListTask = (containerElement, tasks) => {
  for (let i = 1; i < tasks.length; i++) {
    render({container: containerElement, template: createTaskTemplate(tasks[i])});
  }
};

const siteMenuRender = () => {
  const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
  return render({container: siteHeaderElement, template: createSiteMenuTemplate()});
};

const filterRender = () => {
  const mocks = createMockDataFilters();
  return render({container: siteMainElement, template: createFilterTemplate(mocks, CHECKED_FILTER_INDEX)});
};

const boardRender = () => {
  return render({container: siteMainElement, template: createBoardTemplate()});
};

const taskListRender = () => {
  const taskListElement = siteMainElement.querySelector(`.board__tasks`);
  const tasks = generateTasks(TASK_COUNT);
  render({container: taskListElement, template: createTaskEditTemplate(tasks[0])});
  renderListTask(taskListElement, tasks);
};

const loadMoreButtonRender = () => {
  const boardElement = siteMainElement.querySelector(`.board`);
  return render({container: boardElement, template: createLoadMoreButtonTemplate()});
};


siteMenuRender();
filterRender();
boardRender();
taskListRender();
loadMoreButtonRender();
