import {
  todoRepository,
  taskInput,
  toggleAll,
  tasksList,
  footer,
  filterLinks,
  btnClear,
} from "../entities";

import { applyFilterFromUrl, localStorageHandler, renderTask, showByFilter, updateSectionVisibility, updateStatusToggleAll, updateCounter } from "../features";

import {
  clearCompleted,
  handleToggleAll,
  addTaskDom,
  doneTaskDom,
  deleteTaskDom,
  editTaskDom,
} from "../widget";

localStorageHandler.getTasks();
if (todoRepository.tasks.length > 0) {
  todoRepository.tasks.forEach((task) => renderTask(task));
  updateStatusToggleAll();
  updateCounter();
}
updateSectionVisibility();

if (window.matchMedia("(pointer: coarse)").matches) {
  let lastTouchEnd = 0;

  tasksList.addEventListener("touchend", function (event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      editTaskDom(event);
    }
    lastTouchEnd = now;
  });

  const hintForMobile = `
	<div class="footer__info">
		<p>Double tab for editing the task</p>
	</div>`;

  footer.insertAdjacentHTML("beforeend", hintForMobile);
} else {
  tasksList.addEventListener("dblclick", editTaskDom);

  const hintHTML = `
	<div class="footer__info">
		<p>Double click to edit a task</p>
	</div>`;

  footer.insertAdjacentHTML("beforeend", hintHTML);
}

document.addEventListener("click", (event) => {
  if (event.target !== taskInput) {
    addTaskDom();
  }
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTaskDom();
  }
});

toggleAll.addEventListener("change", handleToggleAll);

tasksList.addEventListener("click", (event) => {
  if (event.target.dataset.action === "done") {
    doneTaskDom(event);
  }
  if (event.target.dataset.action === "delete") {
    deleteTaskDom(event);
  }
});

footer.addEventListener("click", (event) => {
  if (event.target !== btnClear) return;
  clearCompleted();
});

filterLinks.forEach((link) => link.addEventListener("click", showByFilter));

applyFilterFromUrl();

window.addEventListener("beforeunload", localStorageHandler.saveTasks());
