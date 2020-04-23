import TaskController from "./task";
import {render, remove} from "../utils/render";

import SortComponent from "../components/sort";
import {constants} from "../constants";
import TasksComponent from "../components/taskList";
import LoadMoreButtonComponent from "../components/load-more-button";

const renderTasks = (taskListElement, listTasks) => {
  return listTasks.map((task) => {
    const taskController = new TaskController(taskListElement);

    taskController.render(task);

    return taskController;
  });
};

const getSortedTasks = (listTasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = listTasks.slice();

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

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._listTasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = constants.SHOWING_TASKS_COUNT_ON_START;
    this._sortComponent = new SortComponent(constants.sortTexts);
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(listTasks) {
    this._listTasks = listTasks;

    const container = this._container.getElement();

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const taskListElement = this._tasksComponent.getElement();

    const newTask = renderTasks(taskListElement, this._listTasks.slice(0, this._showingTasksCount));
    this._showedTaskControllers = this._showedTaskControllers.concat(newTask);

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._listTasks.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setOnClick(() => {
      const taskListElement = this._tasksComponent.getElement();
      const sortedTasks = getSortedTasks(this._listTasks, this._sortComponent.getSortType(), taskListElement.children.length, constants.SHOWING_TASKS_COUNT_BY_BUTTON + taskListElement.children.length);

      const newListTasks = renderTasks(taskListElement, sortedTasks);

      this._showedTaskControllers = this._showedTaskControllers.concat(newListTasks);

      if (taskListElement.children.length >= this._listTasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    const sortedTasks = getSortedTasks(this._listTasks, sortType, 0, constants.SHOWING_TASKS_COUNT_ON_START);
    const taskListElement = this._tasksComponent.getElement();
    taskListElement.innerHTML = ``;

    const newListTasks = renderTasks(taskListElement, sortedTasks);
    this._showingTasksControllers = newListTasks;

    this._renderLoadMoreButton();
  }
}
