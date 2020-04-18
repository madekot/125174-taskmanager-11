import {utils} from "../utils.js";
import {constant} from "../constant";

const createSortItem = (text) => {
  return (`
    <a href="#" class="board__filter">${text}</a>
  `);
};

const createSortTemplate = (textList) => {
  return (
    `<div class="board__filter-list">
        ${textList.map((text) => createSortItem(text)).join(constant.EMPTY)}
    </div>`
  );
};

export default class Sort {
  constructor(textList) {
    this._textList = textList;
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(this._textList);
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
