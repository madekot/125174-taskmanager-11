import {utils} from "./utils";
import SiteMenuComponent from "./components/site-menu.js";
import BoardComponent from "./components/board.js";
import SortComponent from "./components/sort.js";
import TaskComponent from "./components/task.js";
import TasksComponent from "./components/tasks.js";
import TaskEditComponent from "./components/task-edit.js";
import FilterComponent from "./components/filter.js";
import LoadMoreButtonComponent from "./components/load-more-button.js";
import NoTasksComponent from "./components/no-task.js";
import {generateMockDataFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";


const TASK_COUNT = 25;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  utils.render(taskListElement, taskComponent.getElement(), utils.RenderPosition.BEFOREEND);
};


const boardComponentInstance = new BoardComponent();
const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    utils.render(boardComponent.getElement(), new NoTasksComponent().getElement(), utils.RenderPosition.BEFOREEND);
    return;
  }

  utils.render(boardComponent.getElement(), new SortComponent().getElement(), utils.RenderPosition.BEFOREEND);
  utils.render(boardComponent.getElement(), new TasksComponent().getElement(), utils.RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  utils.render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), utils.RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

const mockTasks = generateTasks(TASK_COUNT);
const mockFilters = generateMockDataFilters();


utils.render(siteHeaderElement, new SiteMenuComponent().getElement(), utils.RenderPosition.BEFOREEND);
utils.render(siteMainElement, new FilterComponent(mockFilters).getElement(), utils.RenderPosition.BEFOREEND);
utils.render(siteMainElement, boardComponentInstance.getElement(), utils.RenderPosition.BEFOREEND);
renderBoard(boardComponentInstance, mockTasks);
