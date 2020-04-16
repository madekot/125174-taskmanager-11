import {utils} from "../utils.js";

const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};


export default class TaskList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTasksTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}