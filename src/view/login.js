import { navigateTo } from '../main.js';

export function loginView() {
    const container = document.createElement('div');
    container.classList.add('login-container');
    const title = document.createElement('h2');
    title.textContent = 'Bienvenido a la App de Tareas';
    title.classList.add('title');

    const form = document.createElement('form');
    form.classList.add('login-form');
    form.onsubmit = (e) => {
        e.preventDefault(); 
    };

    const name = document.createElement('input');
    name.placeholder = 'Tu nombre';
    name.classList.add('input-name');
    name.type = 'text';

    const lastname = document.createElement('input');
    lastname.placeholder = 'Tu apellido';
    lastname.classList.add('input-lastname');
    lastname.type = 'text';

    const button = document.createElement('button');
    button.textContent = 'Ingresar';
    button.classList.add('login-button');
    button.onclick = () => {
        const nombre = name.value.trim();
        const apellido = lastname.value.trim();
        if (nombre && apellido) {
            localStorage.setItem('username', nombre);
            localStorage.setItem('lastname', apellido);
            navigateTo('/task');
        } else {
            alert('Ingresa un nombre y un apellido');
        }
    };

    form.appendChild(name);
    form.appendChild(lastname);
    form.appendChild(button);
    container.appendChild(title);
    container.appendChild(form);
    return container;
}
