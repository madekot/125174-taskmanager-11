import {utils} from "../utils.js";
import {constant} from "../constant.js";

const CHECKED_DEFAULT_ITEM = 1;

const createSiteMenuItemMarkup = (item, isChecked) => {
  const {name, text} = item;
  return (
    `<input
       type="radio"
       name="control"
       id="control__${name}"
       class="control__input visually-hidden"
       ${isChecked ? `checked` : ``}
    />
    <label for="control__new-task" class="control__label control__label--${name}">${text}</label>`
  );
};

const createSiteMenuTemplate = (items) => {
  const siteMenuList = items.map((menuItem, i) => createSiteMenuItemMarkup(menuItem, i === CHECKED_DEFAULT_ITEM)).join(constant.EMPTY);
  return (
    `<section class="control__btn-wrap">${siteMenuList}</section>`
  );
};

export default class SiteMenu {
  constructor(items) {
    this._controls = items;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._controls);
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

