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

    const onEditButtonClick = () => {
      replace(this._taskEditComponent, this._taskComponent);
    };

    const onFormSubmit = (evt) => {
      evt.preventDefault();
      replace(this._taskComponent, this._taskEditComponent);
    };

    this._taskComponent.setOnEditButtonClick(onEditButtonClick);

    this._taskEditComponent.setOnSubmit(onFormSubmit);

    render(this.container, this._taskComponent);
  }
}
