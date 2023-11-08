import todoRepository from "../entities/todoRepository";
import localStorageHandler from "../features/localStorageHandler";
import updateSectionVisibility from "../features/updateSectionVisibility";
import updateStatusToggleAll from "../features/updateStatusToggleAll";

function clearCompleted() {
  const doneTasks = todoRepository.tasks.filter((task) => task.done);
  doneTasks.forEach((task) => {
    const id = task.id;
    document.getElementById(id).remove();
    todoRepository.deleteTask(id);
  });

  localStorageHandler.saveTasks();
  updateSectionVisibility();
  updateStatusToggleAll();
}

export default clearCompleted;
