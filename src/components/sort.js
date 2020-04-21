import AbstractComponent from "./abstract-component";
import {constants} from "../constants";

const createSortItem = (text, type) => {
  return `<a href="#" data-sort-type="${type}" class="board__filter">${text}</a>`;
};

const createSortTemplate = (sorts) => {
  return (
    `<div class="board__filter-list">
        ${sorts.map((sortItem, i) => createSortItem(constants.sortTexts[i], Object.values(constants.SortType)[i])).join(constants.EMPTY)}
    </div>`
  );
};

export default class Sort extends AbstractComponent {
  constructor(textList) {
    super();
    this._textList = textList;
    this._currenSortType = constants.currenSortType;
  }

  getTemplate() {
    return createSortTemplate(this._textList);
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
