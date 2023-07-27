// Función para buscar cliente por cédula en el LocalStorage
function buscarClientePorCedula(cedula) {
    const clientesString = localStorage.getItem("clientes");
    const clientes = JSON.parse(clientesString) || [];

    return clientes.find(cliente => cliente.cedula === cedula);
}

// Función para agregar un cliente al LocalStorage
function agregarCliente(nombre, apellido, cedula) {
    const clientesString = localStorage.getItem("clientes");
    const clientes = JSON.parse(clientesString) || [];

    clientes.push({ nombre, apellido, cedula });
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

// Función para mostrar mensaje de cliente no registrado y preguntar si desea registrarlo
function mostrarMensajeClienteNoRegistrado(cedula) {
    const respuesta = confirm(`Cliente con cédula ${cedula} no registrado. ¿Desea registrarlo?`);
    if (respuesta) {
        window.location.href = "clientes.html";
    }
}

// Función para eliminar un vehículo de la lista de vehículos y actualizar la tabla
function eliminarVehiculo(index) {
    const vehiculosString = localStorage.getItem("vehiculos");
    const vehiculos = JSON.parse(vehiculosString) || [];

    vehiculos.splice(index, 1);
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

    // Mostrar la tabla actualizada
    mostrarTabla();
}

// Función para procesar el formulario de vehículos
function procesarFormulario(event) {
    event.preventDefault();

    const cedulaCliente = document.getElementById("cedulaCliente").value;
    const cliente = buscarClientePorCedula(cedulaCliente);

    if (!cliente) {
        mostrarMensajeClienteNoRegistrado(cedulaCliente);
        return;
    }

    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const anio = document.getElementById("anio").value;
    const kilometraje = document.getElementById("kilometraje").value;
    const tipoMantenimiento = document.getElementById("tipoMantenimiento").value;
    const detallesMantenimiento = document.getElementById("detallesMantenimiento").value;

    // Agregar el vehículo a la lista de vehículos
    const vehiculo = {
        cedulaCliente,
        marca,
        modelo,
        anio,
        kilometraje,
        tipoMantenimiento,
        detallesMantenimiento
    };

    const vehiculosString = localStorage.getItem("vehiculos");
    const vehiculos = JSON.parse(vehiculosString) || [];

    vehiculos.push(vehiculo);
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

    // Limpiar el formulario
    document.getElementById("form").reset();

    // Mostrar la tabla actualizada
    mostrarTabla();

    console.log("Vehículo registrado:", vehiculo);
}

// Función para mostrar la tabla con los datos de los vehículos
function mostrarTabla() {
    const vehiculosString = localStorage.getItem("vehiculos");
    const vehiculos = JSON.parse(vehiculosString) || [];

    const tabla = document.getElementById("tablaVehiculos");
    tabla.innerHTML = ""; // Limpiar la tabla

    for (const [index, vehiculo] of vehiculos.entries()) {
        const cliente = buscarClientePorCedula(vehiculo.cedulaCliente);
        let fila = `<tr>
            <td>${cliente ? cliente.nombre + " " + cliente.apellido : "Cliente no registrado"}</td>
            <td>${vehiculo.marca}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.anio}</td>
            <td>${vehiculo.kilometraje}</td>
            <td>${vehiculo.tipoMantenimiento}</td>
            <td>${vehiculo.detallesMantenimiento}</td>
            <td><button type="button" class="btn btn-danger btn-sm" onclick="eliminarVehiculo(${index})"><i class="fas fa-trash"></i> Borrar</button></td>
        </tr>`;
        tabla.innerHTML += fila;
    }
}

// Escuchar el evento submit del formulario
document.getElementById("form").addEventListener("submit", procesarFormulario);

// Mostrar la tabla al cargar la página
mostrarTabla();
