let items = [];

//conexion para obtener la lista de pokemon

async function Conexion(UnFiltro) {
  const url = UnFiltro == "All"
    ? `https://www.dnd5eapi.co/api/2014/magic-items`
    : `https://www.dnd5eapi.co/api/2014/equipment-categories/${UnFiltro}`;

  const res = await fetch(url);
  const data = await res.json();

  if (UnFiltro == "All") {
    const itemsBase = data.results.slice(0, 50);
    const itemsDetallados = [];

    for (const item of itemsBase) {
      const resItem = await fetch(`https://www.dnd5eapi.co${item.url}`);
      const detalle = await resItem.json();
      itemsDetallados.push(detalle);
    }

    return itemsDetallados;
  }

  const itemsDetallados = [];
  for (const item of data.equipment) {
    const resItem = await fetch(`https://www.dnd5eapi.co${item.url}`);
    const detalle = await resItem.json();
    itemsDetallados.push(detalle);
  }
  return itemsDetallados;
}

//cargar todos los pokemon al iniciar

async function General() {
  document.getElementById("root").innerHTML = `
    <div class="loader">Cargando ítems...</div>
  `;
  if (items.length === 0) {
    items = await Conexion("All");
  }
  Home();
}


async function FiltroConexion(filtroelegido){
    pokesFiltrados = await Conexion(filtroelegido)
    document.getElementById("la-lista").innerHTML = "";
    listaFiltro = GenerarLista(pokesFiltrados)
    document.getElementById("la-lista").innerHTML = listaFiltro
}