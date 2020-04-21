import AbstractComponent from "./abstract-component.js";
import {constants} from "../constants.js";

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
  const siteMenuList = items.map((menuItem, i) => createSiteMenuItemMarkup(menuItem, i === CHECKED_DEFAULT_ITEM)).join(constants.EMPTY);
  return (
    `<section class="control__btn-wrap">${siteMenuList}</section>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor(items) {
    super();
    this._controls = items;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._controls);
  }
}

