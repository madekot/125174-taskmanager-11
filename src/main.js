import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createBoardTemplate} from "./components/board.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";


const TASK_COUNT = 3;


const siteMainElement = document.querySelector(`.main`);


const render = ({container, template, place = `beforeend`}) => {
  container.insertAdjacentHTML(place, template);
};

const renderList = ({cb, containerElement, count}) => {
  for (let i = 0; i < count; i++) {
    cb(containerElement);
  }
};

const siteMenuRender = () => {
  const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
  return render({container: siteHeaderElement, template: createSiteMenuTemplate()});
};

const filterRender = () => {
  return render({container: siteMainElement, template: createFilterTemplate()});
};

const boardRender = () => {
  return render({container: siteMainElement, template: createBoardTemplate()});
};

const taskTemplateRender = (containerElement) => {
  return render({container: containerElement, template: createTaskTemplate()});
};

const taskListRender = () => {
  const taskListElement = siteMainElement.querySelector(`.board__tasks`);
  render({container: taskListElement, template: createTaskEditTemplate()});
  renderList({cb: taskTemplateRender, containerElement: taskListElement, count: TASK_COUNT});
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
