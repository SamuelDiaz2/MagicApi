let pokemones = [];
let totalPokes = 100;

//conexion para obtener la lista de pokemon

async function Conexion(UnFiltro) {
    if(UnFiltro == "All"){
    const res = await fetch(`https://www.dnd5eapi.co/api/2014/magic-items`);
    const data = await res.json();
    return data.results.slice(0, 50);
  }else{
    const res = await fetch(`https://www.dnd5eapi.co/api/2014/equipment-categories/${UnFiltro}`);
    const data = await res.json();
    const pokemonesTipo = [];
    for (let i = 0; i < data.equipment.length; i++) {
      pokemonesTipo.push(data.equipment[i]);
    }
    return pokemonesTipo;
    }
}

//cargar todos los pokemon al iniciar

async function General() {
  if (pokemones.length === 0) {
    pokemones = await Conexion("All");
  }
  Home();
}


async function FiltroConexion(filtroelegido){
    pokesFiltrados = await Conexion(filtroelegido)
    document.getElementById("la-lista").innerHTML = "";
    listaFiltro = GenerarLista(pokesFiltrados)
    document.getElementById("la-lista").innerHTML = listaFiltro
}