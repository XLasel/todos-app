import { todoRepository, taskInput } from "../entities";
import {
  localStorageHandler,
  renderTask,
  updateCounter,
  updateSectionVisibility,
  updateStatusToggleAll,
} from "../features";

export function addTaskDom() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const newTask = todoRepository.addTask(taskText);
    localStorageHandler.saveTasks();
    renderTask(newTask);

    taskInput.value = "";
    taskInput.focus();

    updateSectionVisibility();
    updateStatusToggleAll();
    updateCounter();
  }
}

export function doneTaskDom(event) {
  const parentNode = event.target.closest(".task");
  const id = Number(parentNode.id);

  todoRepository.doneTask(id);
  localStorageHandler.saveTasks();

  parentNode.classList.toggle("task_completed");

  updateStatusToggleAll();
  updateCounter();
}

export function deleteTaskDom(event) {
  const parentNode = event.target.closest(".task");
  const id = Number(parentNode.id);

  todoRepository.deleteTask(id);
  localStorageHandler.saveTasks();

  parentNode.remove();

  updateSectionVisibility();
  updateStatusToggleAll();
  updateCounter();
}

export function editTaskDom(event) {
  if (event.target.className !== "task__label") return;

  const taskItem = event.target;
  const parentNode = event.target.closest(".task");
  const id = Number(parentNode.id);

  let { offsetHeight } = taskItem;
  const editTaskHTML = `<textarea class="task__edit">`;

  parentNode.classList.add("task_editing");
  parentNode.insertAdjacentHTML("beforeend", editTaskHTML);

  const editTaskInput = parentNode.querySelector(".task__edit");
  editTaskInput.value = taskItem.textContent;
  editTaskInput.focus();
  editTaskInput.style.height = offsetHeight + "px";

  function inputHandler() {
    editTaskInput.style.height = editTaskInput.scrollHeight + "px";
  }

  function saveEdit() {
    const task = todoRepository.getTask(id);
    const editedText = editTaskInput.value.trim();

    if (editedText === "") {
      todoRepository.deleteTask(id);
      localStorageHandler.saveTasks();

      parentNode.remove();

      updateSectionVisibility();
      updateStatusToggleAll();
      updateCounter();
    } else {
      task.text = editedText;
      localStorageHandler.saveTasks();

      editTaskInput.remove();
      parentNode.classList.remove("task_editing");

      taskItem.textContent = editedText;
    }

    editTaskInput.removeEventListener("input", inputHandler);
    document.removeEventListener("keydown", keydownHandler);
    document.removeEventListener("click", clickHandler);
  }

  function resetEdit() {
    editTaskInput.remove();
    parentNode.classList.remove("task_editing");

    taskItem.textContent = todoRepository.getTask(id).text;

    editTaskInput.removeEventListener("input", inputHandler);
    document.removeEventListener("keydown", keydownHandler);
    document.removeEventListener("click", clickHandler);
  }

  function keydownHandler(event) {
    if (event.key === "Enter") {
      saveEdit();
    } else if (event.key === "Escape") {
      resetEdit();
    }
  }

  function clickHandler(event) {
    if (!event.target.closest(".task_editing")) {
      saveEdit();
    }
  }

  editTaskInput.addEventListener("input", inputHandler);
  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("click", clickHandler);
}
