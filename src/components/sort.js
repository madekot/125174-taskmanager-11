import AbstractComponent from "./abstract-component";
import {constant} from "../constant";

const createSortItem = (text) => {
  return `<a href="#" class="board__filter">${text}</a>`;
};

const createSortTemplate = (textList) => {
  return (
    `<div class="board__filter-list">
        ${textList.map((text) => createSortItem(text)).join(constant.EMPTY)}
    </div>`
  );
};

export default class Sort extends AbstractComponent {
  constructor(textList) {
    super();
    this._textList = textList;
  }

  getTemplate() {
    return createSortTemplate(this._textList);
  }
}
