import { tasksList } from "../entities";

export function renderTask(task) {
  const cssClass = task.done
    ? "task-list__task task task_completed"
    : "task-list__task task";

  const taskHTML = `
  <li id="${task.id}" class="${cssClass}">
    <div class="task__flex task__flex_view">
      <input type="checkbox" data-action="done" class="task__toggle" checked=${task.done}>
      <label class="task__label">${task.text}</label>
      <button data-action="delete" class="task__btn-delete"></button>
    </div>
  </li>
		`;
  tasksList.insertAdjacentHTML("afterbegin", taskHTML);
};
