import {render, replace, remove} from "./utils/render";
import {constant} from "./constant.js";
import SiteMenuComponent from "./components/site-menu.js";
import BoardComponent from "./components/board.js";
import SortComponent from "./components/sort.js";
import TaskComponent from "./components/task.js";
import TasksComponent from "./components/taskList.js";
import TaskEditComponent from "./components/task-edit.js";
import FilterComponent from "./components/filter.js";
import LoadMoreButtonComponent from "./components/load-more-button.js";
import {generateMockDataFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";


const TASK_COUNT = 25;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    replace(taskEditComponent, taskComponent);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    replace(taskComponent, taskEditComponent);
  };

  const taskComponent = new TaskComponent(task);
  const editButtonElement = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButtonElement.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  const editFormElement = taskEditComponent.getElement().querySelector(`form`);
  editFormElement.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent);
};

const boardComponentInstance = new BoardComponent();
const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new SortComponent(constant.LIST_SORT_TEXTS));
  render(boardComponent.getElement(), new TasksComponent());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
  tasks.slice(0, SHOWING_TASKS_COUNT_ON_START)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  if (TASK_COUNT <= SHOWING_TASKS_COUNT_ON_START) {
    return;
  }

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent);
  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    tasks.slice(taskListElement.children.length, SHOWING_TASKS_COUNT_BY_BUTTON + taskListElement.children.length)
      .forEach((task) => renderTask(taskListElement, task));

    if (taskListElement.children.length >= tasks.length) {
      remove(loadMoreButtonComponent);
    }
  });
};

const mockTasks = generateTasks(TASK_COUNT);
const mockFilters = generateMockDataFilters();


render(siteHeaderElement, new SiteMenuComponent(constant.SITE_MENU_ITEMS));
render(siteMainElement, new FilterComponent(mockFilters));
render(siteMainElement, boardComponentInstance);
renderBoard(boardComponentInstance, mockTasks);
