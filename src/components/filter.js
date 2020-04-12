const createFilterMarkup = ({name, count, isChecked}) => {
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
  const filtersMarkup = filters.map((filter, i) => createFilterMarkup({name: filter.name, count: filter.count, isChecked: i === checkedFilterIndex})).join(`\n`);
  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export {createFilterTemplate};
