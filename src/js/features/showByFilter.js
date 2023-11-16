import { tasksList, filterLinks } from "../entities";

export function showByFilter(event) {
  if (event.target.classList.contains("filters__link_selected")) return;

  filterLinks.forEach((item) => {
    item.classList.toggle("filters__link_selected", item === event.target);
  });

  switch (event.target.id) {
    case "filter-all":
      tasksList.className = "task-list__items";
      break;
    case "filter-active":
      tasksList.classList.remove("task-list__items_completed");
      tasksList.classList.add("task-list__items_active");
      break;
    case "filter-completed":
      tasksList.classList.remove("task-list__items_active");
      tasksList.classList.add("task-list__items_completed");
      break;
  }
}
