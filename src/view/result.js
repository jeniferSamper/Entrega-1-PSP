import { navigateTo } from '../main.js';

export function resultView() {
  const container = document.createElement('div');
  container.classList.add('result-container');

  const title = document.createElement('h2');
  title.textContent = 'Resumen de Tareas';
  container.appendChild(title);

 const canvas = document.createElement('canvas');
canvas.classList.add('result-canvas');

// Asegura el tamaño real del canvas para evitar distorsión
canvas.width = 500;
canvas.height = 300;

container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

  const estados = ['Sin iniciar', 'En progreso', 'Culminado'];
  const colores = ['#f39c12', '#3498db', '#2ecc71'];
  const conteo = [0, 0, 0];

  tareas.forEach(t => {
    const index = estados.indexOf(t.estado);
    if (index >= 0) conteo[index]++;
  });

  const max = Math.max(...conteo, 1);
  const barWidth = 100;
  const gap = 50;

  ctx.font = '16px Arial';
  ctx.textAlign = 'center';

  conteo.forEach((valor, i) => {
    const barHeight = (valor / max) * 200;
    const x = i * (barWidth + gap) + 50;
    const y = canvas.height - barHeight - 30;

    // Dibuja barra
    ctx.fillStyle = colores[i];
    ctx.fillRect(x, y, barWidth, barHeight);

    // Dibuja valor
    ctx.fillStyle = '#000';
    ctx.fillText(valor, x + barWidth / 2, y - 5);

    // Dibuja etiqueta
    ctx.fillText(estados[i], x + barWidth / 2, canvas.height - 5);
  });

  const backButton = document.createElement('button');
  backButton.textContent = 'Volver a tareas';
  backButton.classList.add('back-button');
  backButton.addEventListener('click', () => {
    navigateTo('/task');
  });

  container.appendChild(backButton);
  return container;
}
