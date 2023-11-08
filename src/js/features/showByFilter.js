import { tasksList, filterLinks } from "../entities/dom.js";

function showByFilter(event) {
  if (event.target.classList.contains("filters__link_selected")) return;

  filterLinks.forEach((item) => {
    if (item === event.target) {
      item.classList.add("filters__link_selected");
    } else if (item.classList.contains("filters__link_selected")) {
      item.classList.remove("filters__link_selected");
    }
  });

  if (event.target.id === "filter-all") {
    tasksList.className = "task-list__items";
  }

  if (event.target.id === "filter-active") {
    tasksList.classList.remove("task-list__items_completed");
    tasksList.classList.add("task-list__items_active");
  }

  if (event.target.id === "filter-completed") {
    tasksList.classList.remove("task-list__items_active");
    tasksList.classList.add("task-list__items_completed");
  }
}

export default showByFilter;
