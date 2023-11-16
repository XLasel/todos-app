import { todoRepository } from "../entities";
import { localStorageHandler, updateSectionVisibility, updateStatusToggleAll } from "../features";

export function clearCompleted() {
  const doneTasks = todoRepository.tasks.filter((task) => task.done);
  doneTasks.forEach((task) => {
    const { id } = task;
    document.getElementById(id).remove();
    todoRepository.deleteTask(id);
  });

  localStorageHandler.saveTasks();
  updateSectionVisibility();
  updateStatusToggleAll();
};
