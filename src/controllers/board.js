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


export default class Board {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent(constant.LIST_SORT_TEXTS);
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const taskListElement = this._tasksComponent.getElement();

    tasks.slice(0, constant.SHOWING_TASKS_COUNT_ON_START)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

    render(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setOnClick(() => {
      tasks.slice(taskListElement.children.length, constant.SHOWING_TASKS_COUNT_BY_BUTTON + taskListElement.children.length)
        .forEach((task) => renderTask(taskListElement, task));

      if (taskListElement.children.length >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
