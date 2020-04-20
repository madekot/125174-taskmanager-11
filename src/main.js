import {render} from "./utils/render";
import {constant} from "./constant.js";
import SiteMenuComponent from "./components/site-menu.js";
import FilterComponent from "./components/filter.js";
import {generateMockDataFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";
import BoardComponent from "./components/board";
import Board from "./controllers/board";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const mockTasks = generateTasks(constant.TASK_COUNT);
const mockFilters = generateMockDataFilters();

const boardComponent = new BoardComponent();
const boardController = new Board(boardComponent);

render(siteHeaderElement, new SiteMenuComponent(constant.SITE_MENU_ITEMS));
render(siteMainElement, new FilterComponent(mockFilters));
render(siteMainElement, boardComponent);
boardController.render(mockTasks);
