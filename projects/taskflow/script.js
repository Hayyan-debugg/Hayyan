const form = document.getElementById('add-form');
const input = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const taskList = document.getElementById('task-list');
const statTotal = document.getElementById('stat-total');
const statDone = document.getElementById('stat-done');
const clearBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('taskflow-tasks')) || [];
let currentFilter = 'all';

function save() {
  localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
}

function updateStats() {
  const done = tasks.filter(t => t.completed).length;
  statTotal.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;
  statDone.textContent = `${done} completed`;
  clearBtn.hidden = done === 0;
}

function render() {
  let filtered = tasks;
  if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);
  if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);

  if (filtered.length === 0) {
    taskList.innerHTML = `<li class="empty-state">${tasks.length === 0 ? 'No tasks yet. Add one above!' : 'No tasks match this filter.'}</li>`;
  } else {
    taskList.innerHTML = filtered.map(task => `
      <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <input type="checkbox" class="task-check" ${task.completed ? 'checked' : ''}>
        <span class="task-text">${escapeHtml(task.text)}</span>
        <span class="priority priority--${task.priority}">${task.priority}</span>
        <button class="task-delete" aria-label="Delete task">&times;</button>
      </li>
    `).join('');
  }

  updateStats();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.unshift({
    id: Date.now(),
    text,
    priority: prioritySelect.value,
    completed: false
  });

  input.value = '';
  save();
  render();
});

taskList.addEventListener('click', e => {
  const item = e.target.closest('.task-item');
  if (!item) return;
  const id = Number(item.dataset.id);

  if (e.target.classList.contains('task-check')) {
    const task = tasks.find(t => t.id === id);
    if (task) task.completed = e.target.checked;
    save();
    render();
  }

  if (e.target.classList.contains('task-delete')) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

clearBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.completed);
  save();
  render();
});

render();
