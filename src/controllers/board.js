import {remove, render, replace} from "../utils/render";
import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import SortComponent from "../components/sort";
import {constant} from "../constant";
import TasksComponent from "../components/taskList";
import LoadMoreButtonComponent from "../components/load-more-button";

const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    replace(taskEditComponent, taskComponent);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    replace(taskComponent, taskEditComponent);
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setOnEditButtonClick(onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setOnSubmit(onFormSubmit);

  render(taskListElement, taskComponent);
};


const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new SortComponent(constant.LIST_SORT_TEXTS));
  render(boardComponent.getElement(), new TasksComponent());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
  tasks.slice(0, constant.SHOWING_TASKS_COUNT_ON_START)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  if (constant.TASK_COUNT <= constant.SHOWING_TASKS_COUNT_ON_START) {
    return;
  }

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent);
  loadMoreButtonComponent.setOnClick(() => {
    tasks.slice(taskListElement.children.length, constant.SHOWING_TASKS_COUNT_BY_BUTTON + taskListElement.children.length)
      .forEach((task) => renderTask(taskListElement, task));

    if (taskListElement.children.length >= tasks.length) {
      remove(loadMoreButtonComponent);
    }
  });
};

export default class Board {
  constructor(container) {
    this._container = container;
  }

  render(tasks) {
    renderBoard(this._container, tasks);
  }
}
