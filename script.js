let tasks = [
    "Limpiar ducha",
    "Limpiar espejo, ventanas salón",
    "Limpiar lavabo",
    "Limpiar váter",
    "Ordenar botes y mueble",
    "Barrer",
    "Pasar la mopa",
    "Rellenar agua",
    "Tirar basura",
    "Camas hechas",
    "Recoger ropa, dejarla en el lavadero",
    "Limpiar encimera y mesa",
    "Recoger restos, poner lavavajillas (o quitarlo)"
];

let permanentTasks = [
    "Tortuga - Darío",
    "Sofá - Triana"
];

let initialAssignment = [
    "Darío", "Darío", "Darío", "Darío", "Darío",
    "Triana", "Triana", "Elías", "Elías",
    "Darío", "Darío", "Triana", "Triana"
];

let cycle = ['Elías', 'Darío', 'Triana'];

function assignTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    // Obtener el día actual del año
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    const dayOfYear = Math.floor(diff / 86400000);

    // Calcular el desplazamiento basado en el día del año
    const shift = dayOfYear % cycle.length;

    // Asignar tareas principales según el desplazamiento
    initialAssignment.forEach((person, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `task-${index}`;
        checkbox.className = 'task-checkbox';
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = `${tasks[index]} - ${cycle[(cycle.indexOf(person) + shift) % cycle.length]}`;
        li.appendChild(label);
        li.appendChild(checkbox);  // Mueve la casilla al final

        // Asignar la clase de color según la persona
        const assignedPerson = cycle[(cycle.indexOf(person) + shift) % cycle.length];
        switch (assignedPerson) {
            case 'Elías':
                li.classList.add('task-elias');
                break;
            case 'Darío':
                li.classList.add('task-dario');
                break;
            case 'Triana':
                li.classList.add('task-triana');
                break;
        }

        taskList.appendChild(li);
    });

    // Agregar las tareas permanentes
    permanentTasks.forEach((task, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `permanent-task-${index}`;
        checkbox.className = 'task-checkbox';
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = task;
        li.appendChild(label);
        li.appendChild(checkbox);  // Mueve la casilla al final
        taskList.appendChild(li);
    });
}

function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    clock.textContent = now.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Inicializar la lista con las tareas asignadas
assignTasks();
// Actualizar el reloj
updateClock();
// Refrescar la lista de tareas y el reloj cada día
setInterval(() => {
    assignTasks();
    updateClock();
}, 86400000); // 86400000 ms = 1 día