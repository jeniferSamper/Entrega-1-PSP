export function taskView() {
    const container = document.createElement('div');
    container.classList.add('task-container');

    const content = document.createElement('div');
    content.classList.add('task-content');

    // Sección del formulario (izquierda)
    const seccionFormulario = document.createElement('div');
    seccionFormulario.classList.add('form-section');

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

    seccionFormulario.appendChild(title);
    seccionFormulario.appendChild(form);

    // Sección de lista de tareas (derecha)
    const listaTareas = document.createElement('div');
    listaTareas.classList.add('list-section');

    const listaTitulo = document.createElement('h2');
    listaTitulo.textContent = 'Lista de Tareas';
    listaTitulo.classList.add('title-task');

    const renderTareas = () => {
        // Limpiar lista
        listaTareas.querySelectorAll('ul, p').forEach(el => el.remove());

        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        if (tareas.length === 0) {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'No hay tareas registradas.';
            listaTareas.appendChild(mensaje);
            return;
        }

        const ul = document.createElement('ul');
        ul.classList.add('task-list');

        tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            li.innerHTML = `
                <h3>${tarea.titulo}</h3>
                <p><strong>Descripcion:</strong> ${tarea.descripcion}</p>
                <p><strong>Fecha:</strong> ${tarea.fecha}</p>
                <p class="estado ${tarea.estado.replace(/\s/g, '-').toLowerCase()}"><strong>Estado:</strong> ${tarea.estado}</p>
            `;
            ul.appendChild(li);
        });

        listaTareas.appendChild(ul);
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

    listaTareas.appendChild(listaTitulo);
    content.appendChild(seccionFormulario);
    content.appendChild(listaTareas);
    container.appendChild(content);

    renderTareas();

    return container;
}
