'use strict';

const taskInput = document.querySelector('.add-task');
const toggleAll = document.getElementById('toggle-all');
const sectionList = document.querySelector('.task-list');
const tasksList = document.querySelector('.task-list__items');
const footer = document.querySelector('.footer');
const counter = document.getElementById('counter');
const filterLinks = document.querySelectorAll('.filters__link')
const btnClear = document.querySelector('.footer__btn-clear');

let tasks = [];

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach((task) => renderTask(task));
}

if (window.matchMedia('(pointer: coarse)').matches) {
	const hintForMobile = `
	<div class="footer__info">
		<p>Double tab for editing the task</p>
	</div>`
	footer.insertAdjacentHTML('beforeend', hintForMobile);
} else {
	const hintHTML = `
	<div class="footer__info">
		<p>Double click to edit a task</p>
	</div>`
	footer.insertAdjacentHTML('beforeend', hintHTML);
}

updateSectionVisibility();
checkStatusTasks();
updateCounter();
applyFilterFromUrl();


taskInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		addTask();
	}
});

document.addEventListener('click', (event) => {
	if (event.target !== taskInput) {
		addTask();
	}
});

tasksList.addEventListener('click', (event) => {
	deleteTask(event);
	doneTask(event);
});

toggleAll.addEventListener('change', handleToggleAll);

if (window.matchMedia('(pointer: coarse)').matches) {
	let lastTouchEnd = 0;

	tasksList.addEventListener('touchend', function (event) {
		const now = new Date().getTime();
		if (now - lastTouchEnd <= 300) {
			editTask(event);
		}
		lastTouchEnd = now;
	});
} else {
	tasksList.addEventListener('dblclick', editTask);
}

footer.addEventListener('click', clearCompleted);

filterLinks.forEach(link => link.addEventListener('click', showByFilter));

window.addEventListener('beforeunload', saveToLocalStorage);

function renderTask(task) {
	const cssClass = task.done ? 'task-list__task task task_completed' : 'task-list__task task';
	const checked = task.done ? 'checked' : '';

	const taskHTML = `
  <li id="${task.id}" class="${cssClass}">
    <div class="task__flex task__flex_view">
      <input type="checkbox" data-action="done" class="task__toggle" ${checked}>
      <label class="task__label">${task.text}</label>
      <button data-action="delete" class="task__btn-delete"></button>
    </div>
  </li>
		`;
	tasksList.insertAdjacentHTML('beforeend', taskHTML);
};

function addTask() {
	const taskText = taskInput.value;
	if (taskText !== '') {
		const newTask = {
			id: Date.now(),
			text: taskText,
			done: false,
		};

		tasks.push(newTask);
		saveToLocalStorage();

		renderTask(newTask);

		taskInput.value = '';
		taskInput.focus();

		updateSectionVisibility();
		checkStatusTasks()
		updateCounter();
	}
}

function deleteTask(event) {
	if (event.target.dataset.action !== 'delete') return;

	const parenNode = event.target.closest('.task');
	const id = Number(parenNode.id);
	const index = tasks.findIndex((task) => task.id === id);

	tasks.splice(index, 1);
	saveToLocalStorage();

	parenNode.remove();

	updateSectionVisibility();
	checkStatusTasks();
	updateCounter();
}

function doneTask(event) {
	if (event.target.dataset.action !== 'done') return;

	const parentNode = event.target.closest('.task');
	const id = Number(parentNode.id);
	const task = tasks.find((task) => task.id === id);

	task.done = !task.done;
	saveToLocalStorage();

	parentNode.classList.toggle('task_completed');

	checkStatusTasks();
	updateCounter();
}

function editTask(event) {
	if (event.target.className !== 'task__label') return;

	const taskItem = event.target;
	let taskHeight = taskItem.offsetHeight;
	console.log(taskItem.nextSibling)

	const parentNode = event.target.closest('.task');
	parentNode.classList.add('task_editing');

	const editTaskHTML = `<textarea class="task__edit">`;
	parentNode.insertAdjacentHTML('beforeend', editTaskHTML);

	const editTaskInput = parentNode.querySelector('.task__edit');
	editTaskInput.value = taskItem.textContent;
	editTaskInput.style.height = taskHeight + 'px';
	editTaskInput.focus();

	function inputHandler() {
		editTaskInput.style.height = (editTaskInput.scrollHeight) + 'px';
	}

	function saveEdit() {
		const id = Number(parentNode.id);
		const task = tasks.find((task) => task.id === id);
		const editedText = editTaskInput.value.trim();

		if (editedText === '') {
			parentNode.querySelector('[data-action="delete"]').click();
		} else {
			task.text = editedText;
			taskItem.textContent = editedText;
			parentNode.classList.remove('task_editing');
			editTaskInput.remove();
			saveToLocalStorage();
		}

		editTaskInput.removeEventListener('input', inputHandler);
		editTaskInput.removeEventListener('blur', blurHandler);
		editTaskInput.removeEventListener('keydown', keydownHandler);
	}

	function blurHandler() {
		saveEdit();
	}

	function keydownHandler(event) {
		if (event.key === 'Enter') {
			editTaskInput.blur();
		}
	}

	editTaskInput.addEventListener('input', inputHandler);
	editTaskInput.addEventListener('blur', blurHandler);
	editTaskInput.addEventListener('keydown', keydownHandler);
}

function updateSectionVisibility() {
	if (tasks.length === 0) {
		footer.classList.add('hidden');
		sectionList.classList.add('hidden');
		toggleAll.classList.add('hidden');
	}
	if (tasks.length > 0) {
		footer.classList.remove('hidden');
		sectionList.classList.remove('hidden');
		toggleAll.classList.remove('hidden');
	}
}

function handleToggleAll() {
	const isChecked = toggleAll.checked;

	tasks.forEach(function (task) {
		task.done = isChecked;
		const taskElement = document.getElementById(task.id);
		taskElement.classList.toggle('task_completed', isChecked);
		taskElement.querySelector('.task__toggle').checked = isChecked;
	});

	saveToLocalStorage();
	updateCounter();
}

function checkStatusTasks() {
	if (tasks.length === 0) {
		return toggleAll.checked = false;
	}
	tasks.every((task) => task.done ? toggleAll.checked = true : toggleAll.checked = false);
}

function updateCounter() {
	const count = tasks.reduce((total, task) => (task.done === true) ? total : total + 1, 0);
	const textCase = (count === 0 || count === 1) ? 'item' : 'items';
	counter.textContent = `${count} ${textCase} left`;
}

function clearCompleted(event) {
	if (event.target !== btnClear) return;
	const doneTasks = tasks.filter(task => task.done);
	doneTasks.forEach((task) => {
		const id = task.id;
		document.getElementById(id).remove();
		const indexTask = tasks.findIndex((task) => task.id === id);
		tasks.splice(indexTask, 1);
	});

	saveToLocalStorage();
	updateSectionVisibility();
	checkStatusTasks();
}

function showByFilter(event) {
	if (event.target.classList.contains('filters__link_selected')) return;

	filterLinks.forEach((item) => {
		if (item === event.target) {
			item.classList.add('filters__link_selected');
		} else if (item.classList.contains('filters__link_selected')) {
			item.classList.remove('filters__link_selected');
		}
	});

	if (event.target.id === 'filter-all') {
		tasksList.className = 'task-list__items';
	}

	if (event.target.id === 'filter-active') {
		tasksList.classList.remove('task-list__items_completed');
		tasksList.classList.add('task-list__items_active');
	}


	if (event.target.id === 'filter-completed') {
		tasksList.classList.remove('task-list__items_active');
		tasksList.classList.add('task-list__items_completed');
	}
}

function applyFilterFromUrl() {
	const section = location.hash.replace('#/', '');
	const link = document.querySelector(`#filter-${section}`);

	if (link) {
		link.click();
	}
}

function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}