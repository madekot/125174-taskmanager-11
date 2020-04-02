import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createBoardTemplate} from "./components/board.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";

const TASK_COUNT = 3;

const siteMainElement = document.querySelector(`.main`);
let taskListElement;

const render = ({container, template, place = `beforeend`}) => {
  container.insertAdjacentHTML(place, template, place);
};

const renderList = (cb, count) => {
  for (let i = 0; i < count; i++) {
    cb();
  }
};

const siteMenuRender = () => {
  const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
  return render({container: siteHeaderElement, template: createSiteMenuTemplate()});
};

const fliterRender = () => {
  return render({container: siteMainElement, template: createFilterTemplate()});
};

const boardRender = () => {
  return render({container: siteMainElement, template: createBoardTemplate()});
};

const taskEditRender = () => {
  taskListElement = siteMainElement.querySelector(`.board__tasks`);
  return render({container: taskListElement, template: createTaskEditTemplate()});
};

const taskTemplateRender = () => {
  taskListElement = siteMainElement.querySelector(`.board__tasks`);
  return render({container: taskListElement, template: createTaskTemplate()});
};

const loadMoreButtonRender = () => {
  const boardElement = siteMainElement.querySelector(`.board`);
  return render({container: boardElement, template: createLoadMoreButtonTemplate()});
};

siteMenuRender();
fliterRender();
boardRender();
taskEditRender();
renderList(taskTemplateRender, TASK_COUNT);
loadMoreButtonRender();
