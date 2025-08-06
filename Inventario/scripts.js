const API_BASE = "https://xmbks6dpt5.execute-api.us-east-1.amazonaws.com/dev/articulos";

const form = document.getElementById("formArticulo");
const tabla = document.querySelector("#tablaArticulos tbody");
const formTitle = document.getElementById("formTitle");
const filtroCategoria = document.getElementById("filtroCategoria");
const inputBusqueda = document.getElementById("busqueda");
const btnEditar = document.getElementById("btnEditar");
const btnEliminar = document.getElementById("btnEliminar");

let articulosActuales = [];

// Cargar artículos con filtros
async function cargarArticulos() {
  const res = await fetch(API_BASE);
  const articulos = await res.json();
  articulosActuales = articulos;

  const categoriaSeleccionada = filtroCategoria.value;
  const textoBusqueda = inputBusqueda.value.toLowerCase();

  tabla.innerHTML = "";

  articulos
    .filter((art) =>
      (!categoriaSeleccionada || art.categoria === categoriaSeleccionada) &&
      (!textoBusqueda || art.nombre.toLowerCase().includes(textoBusqueda))
    )
    .forEach((art) => {
      tabla.innerHTML += `
        <tr>
          <td><input type="checkbox" class="seleccion-articulo" value="${art.id}"></td>
          <td>${art.id}</td>
          <td>${art.nombre}</td>
          <td>${art.categoria}</td>
          <td>${art.cantidad_total}</td>
          <td>${art.cantidad_disponible}</td>
        </tr>
      `;
    });

  actualizarBotones();
}

// Obtener IDs seleccionados
function obtenerSeleccionados() {
  return Array.from(document.querySelectorAll(".seleccion-articulo:checked"))
    .map(cb => cb.value);
}

// Habilita/deshabilita botones
function actualizarBotones() {
  const seleccionados = obtenerSeleccionados();
  btnEditar.disabled = seleccionados.length !== 1;
  btnEliminar.disabled = seleccionados.length === 0;
}

// Evento para escuchar cambios en los checkboxes
tabla.addEventListener("change", actualizarBotones);

// Botón Editar
btnEditar.addEventListener("click", () => {
  const seleccionados = obtenerSeleccionados();
  if (seleccionados.length === 1) {
    editarArticulo(seleccionados[0]);
  }
});

// Botón Eliminar
btnEliminar.addEventListener("click", async () => {
  const seleccionados = obtenerSeleccionados();
  if (seleccionados.length === 0) return;

  if (!confirm(`¿Deseas eliminar ${seleccionados.length} artículo(s)?`)) return;

  for (const id of seleccionados) {
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  }

  cargarArticulos();
});

// Editar artículo (rellenar formulario)
function editarArticulo(id) {
  const art = articulosActuales.find(a => a.id === id);
  if (!art) return;

  form.id.value = art.id;
  form.nombre.value = art.nombre;
  form.categoria.value = art.categoria;
  form.cantidad_total.value = art.cantidad_total;
  form.descripcion.value = art.descripcion || "";

  form.id.disabled = true;
  form.modo.value = "editar";
  formTitle.textContent = "Editar Artículo";
}

// Guardar formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch(API_BASE);
  const articulos = await res.json();
  const categoriaSeleccionada = form.categoria.value.toUpperCase();

  // Generar ID si es nuevo
  let nuevoId = form.id.value;
  if (form.modo.value === "crear") {
    const idsDeCategoria = articulos
      .filter(a => a.categoria.toUpperCase() === categoriaSeleccionada)
      .map(a => {
        const partes = a.id.split("-");
        const numero = parseInt(partes[1]);
        return isNaN(numero) ? 0 : numero;
      });

    const nuevoNumero = Math.max(0, ...idsDeCategoria) + 1;
    nuevoId = `${categoriaSeleccionada}-${String(nuevoNumero).padStart(3, "0")}`;
  }

  const data = {
    id: nuevoId,
    nombre: form.nombre.value,
    categoria: form.categoria.value,
    descripcion: form.descripcion.value || "actualizado",
    cantidad_total: parseInt(form.cantidad_total.value),
    cantidad_disponible: parseInt(form.cantidad_total.value)
  };

  if (form.modo.value === "crear") {
    await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } else {
    await fetch(`${API_BASE}/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  form.reset();
  form.id.disabled = false;
  form.modo.value = "crear";
  formTitle.textContent = "Agregar Artículo";
  cargarArticulos();
});

// Listeners de búsqueda y filtro
inputBusqueda.addEventListener("input", cargarArticulos);
filtroCategoria.addEventListener("change", cargarArticulos);

// Inicialización
cargarArticulos();
