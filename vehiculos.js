// Función para guardar los datos de vehículos en localStorage
function guardarVehiculo(marca, modelo, anio, precio, kilometraje, lugar) {
    const vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
    vehiculos.push({ marca, modelo, anio, precio, kilometraje, lugar });
    localStorage.setItem('vehiculos', JSON.stringify(vehiculos));
}

// Función para eliminar una fila de la tabla de vehículos
function eliminarVehiculo(index) {
    const vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
    vehiculos.splice(index, 1);
    localStorage.setItem('vehiculos', JSON.stringify(vehiculos));
    cargarVehiculos(); // Recargar la tabla para reflejar los cambios
}

// Función para cargar los datos de vehículos desde localStorage y mostrarlos en la tabla
function cargarVehiculos() {
    const tablaBody = document.getElementById('tabla-body');
    const vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];

    tablaBody.innerHTML = '';

    vehiculos.forEach((vehiculo, index) => {
        const row = document.createElement('tr');
        const marcaCell = document.createElement('td');
        const modeloCell = document.createElement('td');
        const anioCell = document.createElement('td');
        const precioCell = document.createElement('td');
        const kilometrajeCell = document.createElement('td');
        const lugarCell = document.createElement('td');
        const eliminarCell = document.createElement('td');
        const eliminarIcon = document.createElement('i');

        marcaCell.textContent = vehiculo.marca;
        modeloCell.textContent = vehiculo.modelo;
        anioCell.textContent = vehiculo.anio;
        precioCell.textContent = vehiculo.precio;
        kilometrajeCell.textContent = vehiculo.kilometraje;
        lugarCell.textContent = vehiculo.lugar;

        eliminarIcon.classList.add('fas', 'fa-trash', 'delete-icon');
        eliminarIcon.addEventListener('click', () => eliminarVehiculo(index));
        eliminarCell.appendChild(eliminarIcon);

        row.appendChild(marcaCell);
        row.appendChild(modeloCell);
        row.appendChild(anioCell);
        row.appendChild(precioCell);
        row.appendChild(kilometrajeCell);
        row.appendChild(lugarCell);
        row.appendChild(eliminarCell);

        tablaBody.appendChild(row);
    });
}

// Evento para manejar el envío del formulario de vehículos
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const anio = document.getElementById('anio').value;
    const precio = document.getElementById('precio').value;
    const kilometraje = document.getElementById('kilometraje').value;
    const lugar = document.getElementById('lugar').value;

    guardarVehiculo(marca, modelo, anio, precio, kilometraje, lugar);
    cargarVehiculos();

    // Limpiar campos del formulario
    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('anio').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('kilometraje').value = '';
    document.getElementById('lugar').value = '';
});

// Cargar los datos de vehículos al cargar la página
cargarVehiculos();
