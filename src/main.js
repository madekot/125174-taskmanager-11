import {utils} from "./utils";
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

const replaceTaskElement = (taskListElement, replaceable, substitute) => {
  taskListElement.replaceChild(replaceable.getElement(), substitute.getElement());
};

const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    replaceTaskElement(taskListElement, taskEditComponent, taskComponent);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    replaceTaskElement(taskListElement, taskComponent, taskEditComponent);
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  utils.render(taskListElement, taskComponent.getElement());
};

const boardComponentInstance = new BoardComponent();
const renderBoard = (boardComponent, tasks) => {
  utils.render(boardComponent.getElement(), new SortComponent().getElement());
  utils.render(boardComponent.getElement(), new TasksComponent().getElement());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
  tasks.slice(0, SHOWING_TASKS_COUNT_ON_START)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  if (TASK_COUNT <= SHOWING_TASKS_COUNT_ON_START) {
    return;
  }

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  utils.render(boardComponent.getElement(), loadMoreButtonComponent.getElement());
  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    tasks.slice(taskListElement.children.length, SHOWING_TASKS_COUNT_BY_BUTTON + taskListElement.children.length)
      .forEach((task) => renderTask(taskListElement, task));

    if (taskListElement.children.length >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

const mockTasks = generateTasks(TASK_COUNT);
const mockFilters = generateMockDataFilters();


utils.render(siteHeaderElement, new SiteMenuComponent(constant.SITE_MENU_ITEMS).getElement());
utils.render(siteMainElement, new FilterComponent(mockFilters).getElement());
utils.render(siteMainElement, boardComponentInstance.getElement());
renderBoard(boardComponentInstance, mockTasks);
