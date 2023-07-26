// Función para guardar los datos de clientes en localStorage
function guardarCliente(nombre, apellido, cedula, sexo, fechaNacimiento, telefono, lugar) {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push({ nombre, apellido, cedula, sexo, fechaNacimiento, telefono, lugar });
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

// Función para eliminar una fila de la tabla de clientes
function eliminarCliente(index) {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    cargarClientes(); // Recargar la tabla para reflejar los cambios
}

// Función para cargar los datos de clientes desde localStorage y mostrarlos en la tabla
function cargarClientes() {
    const tablaBody = document.getElementById('tabla-body');
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    tablaBody.innerHTML = '';

    clientes.forEach((cliente, index) => {
        const row = document.createElement('tr');
        const nombreCell = document.createElement('td');
        const apellidoCell = document.createElement('td');
        const cedulaCell = document.createElement('td');
        const sexoCell = document.createElement('td');
        const fechaNacimientoCell = document.createElement('td');
        const telefonoCell = document.createElement('td');
        const lugarCell = document.createElement('td');
        const eliminarCell = document.createElement('td');
        const eliminarIcon = document.createElement('i');

        nombreCell.textContent = cliente.nombre;
        apellidoCell.textContent = cliente.apellido;
        cedulaCell.textContent = cliente.cedula;
        sexoCell.textContent = cliente.sexo;
        fechaNacimientoCell.textContent = cliente.fechaNacimiento;
        telefonoCell.textContent = cliente.telefono;
        lugarCell.textContent = cliente.lugar;

        eliminarIcon.classList.add('fas', 'fa-trash', 'delete-icon');
        eliminarIcon.addEventListener('click', () => eliminarCliente(index));
        eliminarCell.appendChild(eliminarIcon);

        row.appendChild(nombreCell);
        row.appendChild(apellidoCell);
        row.appendChild(cedulaCell);
        row.appendChild(sexoCell);
        row.appendChild(fechaNacimientoCell);
        row.appendChild(telefonoCell);
        row.appendChild(lugarCell);
        row.appendChild(eliminarCell);

        tablaBody.appendChild(row);
    });
}

// Evento para manejar el envío del formulario de clientes
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const cedula = document.getElementById('cedula').value;
    const sexo = document.getElementById('sexo').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const telefono = document.getElementById('telefono').value;
    const lugar = document.getElementById('lugar').value;

    guardarCliente(nombre, apellido, cedula, sexo, fechaNacimiento, telefono, lugar);
    cargarClientes();

    // Limpiar campos del formulario
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('sexo').value = 'masculino';
    document.getElementById('fechaNacimiento').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('lugar').value = '';
});

// Cargar los datos de clientes al cargar la página
cargarClientes();
