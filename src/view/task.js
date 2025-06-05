import { navigateTo } from '../main.js'; 

export function taskView() {
  const container = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = 'Tareas';

  container.appendChild(title);


  return container;
}