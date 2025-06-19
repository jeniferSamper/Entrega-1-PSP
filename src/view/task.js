export function taskView() {
  const container = document.createElement('div');
  container.classList.add('task-container');

  const content = document.createElement('div');
  content.classList.add('task-content');

  // Sección izquierda: Formulario
  const formSection = document.createElement('div');
  formSection.classList.add('form-section');

  const title = document.createElement('h2');
  title.textContent = 'Registrar Tarea';
  title.classList.add('title-task');

  const form = document.createElement('form');
  form.classList.add('task-form');

  const inputTitulo = document.createElement('input');
  inputTitulo.placeholder = 'Titulo de la tarea';
  inputTitulo.type = 'text';
  inputTitulo.required = true;

  const inputDescripcion = document.createElement('textarea');
  inputDescripcion.placeholder = 'Descripcion';
  inputDescripcion.required = true;

  const inputFecha = document.createElement('input');
  inputFecha.type = 'date';
  inputFecha.required = true;

  const selectEstado = document.createElement('select');
  ['Sin iniciar', 'En progreso', 'Culminado'].forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion;
    option.textContent = opcion;
    selectEstado.appendChild(option);
  });

  const button = document.createElement('button');
  button.textContent = 'Guardar Tarea';
  button.type = 'submit';

  form.appendChild(inputTitulo);
  form.appendChild(inputDescripcion);
  form.appendChild(inputFecha);
  form.appendChild(selectEstado);
  form.appendChild(button);

  formSection.appendChild(title);
  formSection.appendChild(form);

  // Sección derecha: Lista
  const listSection = document.createElement('div');
  listSection.classList.add('list-section');

  const listTitle = document.createElement('h2');
  listTitle.textContent = 'Lista de Tareas';
  listTitle.classList.add('title-task');

  const botonesEstados = document.createElement('div');
  botonesEstados.classList.add('estado-buttons');

  ['Sin iniciar', 'En progreso', 'Culminado'].forEach(estado => {
    const btn = document.createElement('button');
    btn.textContent = `Ver tareas ${estado}`;
    btn.classList.add('filter-button');
    btn.addEventListener('click', () => mostrarModal(estado));
    botonesEstados.appendChild(btn);
  });

  const ulTareas = document.createElement('ul');
  ulTareas.classList.add('task-list');

  listSection.appendChild(listTitle);
  listSection.appendChild(botonesEstados);
  listSection.appendChild(ulTareas);

  // Modal
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.style.display = 'none'; // Oculto al inicio
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <h3 class="modal-title"></h3>
      <ol class="modal-list"></ol>
    </div>
  `;

  const closeModal = modal.querySelector('.close-button');
  const modalTitle = modal.querySelector('.modal-title');
  const modalList = modal.querySelector('.modal-list');

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  function mostrarModal(estadoFiltro) {
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const filtradas = tareas.filter(t => t.estado === estadoFiltro);

    modalTitle.textContent = `Tareas ${estadoFiltro}`;
    modalList.innerHTML = '';

    if (filtradas.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No hay tareas en este estado.';
      modalList.appendChild(li);
    } else {
      filtradas.forEach((t, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${t.titulo}</strong> - ${t.descripcion} (${t.fecha})`;
        modalList.appendChild(li);
      });
    }

    modal.style.display = 'flex';
  }

  const renderTareas = () => {
    ulTareas.innerHTML = '';
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    // Ordenar por fecha
    tareas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    tareas.forEach((tarea, index) => {
      const li = document.createElement('li');
      li.classList.add('task-item', tarea.estado.replace(/\s/g, '-').toLowerCase());

      li.innerHTML = `
        <h3>${tarea.titulo}</h3>
        <p><strong>Descripcion:</strong> ${tarea.descripcion}</p>
        <p><strong>Fecha:</strong> ${tarea.fecha}</p>
        <label><strong>Estado:</strong></label>
      `;

      // Selector de estado editable
      const select = document.createElement('select');
      ['Sin iniciar', 'En progreso', 'Culminado'].forEach(estado => {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        if (estado === tarea.estado) option.selected = true;
        select.appendChild(option);
      });

      select.addEventListener('change', (e) => {
        tareas[index].estado = e.target.value;
        localStorage.setItem('tareas', JSON.stringify(tareas));
        renderTareas();
      });

      // Botón eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.classList.add('delete-button');
      btnEliminar.addEventListener('click', () => {
        if (confirm('¿Estás seguro de eliminar esta tarea?')) {
          tareas.splice(index, 1);
          localStorage.setItem('tareas', JSON.stringify(tareas));
          renderTareas();
        }
      });

      li.appendChild(select);
      li.appendChild(btnEliminar);
      ulTareas.appendChild(li);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevaTarea = {
      titulo: inputTitulo.value.trim(),
      descripcion: inputDescripcion.value.trim(),
      fecha: inputFecha.value,
      estado: selectEstado.value
    };

    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));

    form.reset();
    renderTareas();
  });

  content.appendChild(formSection);
  content.appendChild(listSection);
  container.appendChild(content);
  container.appendChild(modal);

  renderTareas();
  return container;
}
