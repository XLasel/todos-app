import { todoRepository, toggleAll } from "../entities";
import { localStorageHandler, updateCounter } from "../features";

export const handleToggleAll = () => {
  const isChecked = toggleAll.checked;

  todoRepository.tasks.forEach((task) => {
    task.done = isChecked;
    const taskElement = document.getElementById(task.id);
    taskElement.classList.toggle("task_completed", isChecked);
    taskElement.querySelector(".task__toggle").checked = isChecked;
  });

  localStorageHandler.saveTasks();
  updateCounter();
};
