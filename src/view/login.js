import { navigateTo } from '../main.js';

export function loginView() {
    const container = document.createElement('div');
    container.classList.add('login-container');

    const title = document.createElement('h2');
    title.textContent = 'Bienvenido a la App de Tareas';
    title.classList.add('title-login');

    const form = document.createElement('form');
    form.classList.add('login-form');

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
    button.type = 'submit'; 

    // Validación: solo letras (incluye ñ y acentos), y espacios
    const esTextoValido = (texto) => {
        const limpio = texto.trim();
        const soloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(?:\s[a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$/;
        return soloLetras.test(limpio);
    };

    // Manejo del envío del formulario y validación
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = name.value.trim();
        const apellido = lastname.value.trim();
        console.log('Nombre:', nombre, 'Apellido:', apellido);

        if (!nombre || !apellido) {
            alert('Por favor, completa ambos campos.');
            return;
        }

        if (!esTextoValido(nombre) || !esTextoValido(apellido)) {
            alert('Solo se permiten letras y espacios en nombre y apellido.');
            return;
        }

        localStorage.setItem('username', nombre);
        localStorage.setItem('lastname', apellido);
        navigateTo('/task');
    });

    // Estructura del DOM
    form.appendChild(name);
    form.appendChild(lastname);
    form.appendChild(button);
    container.appendChild(title);
    container.appendChild(form);
    return container;
}
