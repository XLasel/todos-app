import { todoRepository, toggleAll } from "../entities";

export const updateStatusToggleAll = () => {
  if (todoRepository.tasks.length === 0) {
    return (toggleAll.checked = false);
  }
  todoRepository.tasks.every((task) =>
    task.done ? (toggleAll.checked = true) : (toggleAll.checked = false),
  );
};
