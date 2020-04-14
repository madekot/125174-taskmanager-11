import {utils} from "../utils";

const createFilterMarkup = (name, count, isChecked) => {
  return (
    `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? `checked` : ``}
      />
      <label for="filter__${name}" class="filter__label">
        ${name} <span class="filter__${name}-count">${count}</span></label
      >`
  );
};

const createFilterTemplate = (filters, checkedFilterIndex) => {
  const filtersMarkup = filters.map((filter, i) => createFilterMarkup(filter.name, filter.count, i === checkedFilterIndex)).join(``);
  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default class Filter {
  constructor(filters) {
    this.filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if (!this._element) {
      utils.createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {createFilterTemplate};
