import AbstractComponent from "./abstract-component";
import {formatTime} from "../utils/common";
import {constants} from "../constants";

const createTaskTemplate = (task) => {
  const {description, dueDate, color, repeatingDays, isArchive, isFavorite} = task;
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${constants.MONTH_NAMES[dueDate.getMonth()]}` : constants.EMPTY;
  const time = isDateShowing ? formatTime(dueDate) : constants.EMPTY;

  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : constants.EMPTY;
  const deadlineClass = isExpired ? `card--deadline` : constants.EMPTY;
  const archiveButtonInactiveClass = isArchive ? constants.EMPTY : `card__btn--disabled`;
  const favoriteButtonInactiveClass = isFavorite ? constants.EMPTY : `card__btn--disabled`;
  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${archiveButtonInactiveClass}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled  ${favoriteButtonInactiveClass}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  setOnEditButtonClick(handler) {
    this.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, handler);
  }
}
