import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import {render, replace} from "../utils/render";

export default class TaskController {
  constructor(container) {
    this.container = container;

    this._taskComponent = null;
    this._taskEditComponent = null;
  }

  render(task) {
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.setOnArchiveButtonClick(() => {
    });

    this._taskComponent.setOnFavoritesButtonClick(() => {
    });

    this._taskComponent.setOnEditButtonClick(() => {
      this._replaceTaskToEdit();
    });

    this._taskEditComponent.setOnSubmit((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    render(this.container, this._taskComponent);
  }

  _replaceEditToTask() {
    replace(this._taskComponent, this._taskEditComponent);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }
}
