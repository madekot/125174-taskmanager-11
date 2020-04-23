import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import {render, replace} from "../utils/render";

export default class TaskController {
  constructor(container, onDataChange) {
    this.container = container;
    this._onDataChange = onDataChange;

    this._taskComponent = null;
    this._taskEditComponent = null;
  }

  render(task) {
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.setOnArchiveButtonClick(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._taskComponent.setOnFavoritesButtonClick(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
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
