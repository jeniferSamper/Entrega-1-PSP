// main.js
import { loginView } from './view/login.js';
import { taskView } from './view/task.js';
import { resultView } from './view/result.js';


const root = document.getElementById('root');

// Mapa de rutas
const routes = {
  '/': loginView,
  '/task': taskView,
  '/result': resultView,
};

// Cambiar de vista (SPA)
export function navigateTo(pathname) {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  renderView(pathname);
}

// Mostrar la vista correspondiente
function renderView(pathname) {
  const view = routes[pathname] || routes['/'];
  root.replaceChildren(view());
}

// Manejar botón atrás/adelante del navegador
window.onpopstate = () => {
  renderView(window.location.pathname);
};

// Mostrar la vista correcta al cargar la página
window.addEventListener('load', () => {
  renderView(window.location.pathname);
});
