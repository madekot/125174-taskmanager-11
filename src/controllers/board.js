// import {remove, render, replace} from "../utils/render";
import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import TaskController from "./task";
import {render, remove} from "../utils/render";

import SortComponent from "../components/sort";
import {constants} from "../constants";
import TasksComponent from "../components/taskList";
import LoadMoreButtonComponent from "../components/load-more-button";

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case constants.SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case constants.SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case constants.SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class Board {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent(constants.sortTexts);
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const renderLoadMoreButton = () => {
      render(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setOnClick(() => {
        const sortedTask = getSortedTasks(tasks, this._sortComponent.getSortType(), taskListElement.children.length, constants.SHOWING_TASKS_COUNT_BY_BUTTON + taskListElement.children.length);

        renderTasks(taskListElement, sortedTask);
        if (taskListElement.children.length >= tasks.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const taskListElement = this._tasksComponent.getElement();


    renderTasks(taskListElement, tasks.slice(0, constants.SHOWING_TASKS_COUNT_ON_START));
    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedTasks = getSortedTasks(tasks, sortType, 0, constants.SHOWING_TASKS_COUNT_BY_BUTTON);

      taskListElement.innerHTML = constants.EMPTY;

      renderTasks(taskListElement, sortedTasks);
      renderLoadMoreButton();
    });
  }
}
