function GenerarLista(arraypokemones) {
  let listaHTML = "";
  for (let i = 0; i < arraypokemones.length; i++) {
    // usa directamente el index (más limpio)
    let id = arraypokemones[i].index;

    listaHTML += `
      <div class="c-lista-pokemon poke-${id}" onclick="Detalle('${id}')">
          <p><strong>nombre: </strong> ${arraypokemones[i].name}</p>
          <img src="https://www.dnd5eapi.co/api/images/magic-items/${arraypokemones[i].index}.png" width="auto" height="60" loading="lazy" alt="${arraypokemones[i].name}">
      </div>`;
  }

  return listaHTML;
}

function buscadorfuncion(asa){
    if(asa.length >= 3){
        const filtrados = [];
        for (let i = 0; i < pokemones.length; i++) {
            const nombre = pokemones[i].name.toLowerCase();
            if (nombre.includes(asa.toLowerCase())) {
                filtrados.push(pokemones[i]);
            }
        }
        let listapokes = GenerarLista(filtrados)
        document.getElementById("la-lista").innerHTML = listapokes;
    }
}

function Home(){

    var root = document.getElementById("root");
    root.innerHTML = ""
    //buscador
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar item...";
    buscador.addEventListener("input", () => {
            buscadorfuncion(buscador.value);
    });

    // filtro
    const tipos = [
        "adventuring-gear", "ammunition", "arcane-foci", "armor", "artisans-tools", "druidic-foci", "equipment-packs",
        "gaming-sets", "heavy-armor", "holy-symbols", "kits", "land-vehicles", "light-armor", "martial-melee-weapons", "martial-ranged-weapons",
        "martial-weapons", "medium-armor", "melee-weapons", "mounts-and-other-animals", "mounts-and-vehicles", "musical-instruments", "other-tools", "potion",
        "ranged-weapons", "ring", "rod", "scroll", "shields", "simple-melee-weapons", "simple-melee-weapons", "simple-weapons", "staff", "standard-gear", "tack-harness-and-drawn-vehicles",
        "tools", "wand", "waterborne-vehicles", "weapon", "wondrous-items"  
    ];
    const filtro = document.createElement("div");

    for (let i = 0; i < tipos.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = tipos[i];
        
        // Agregar el evento click para filtrar por tipo
        btn.addEventListener("click", () => {
            FiltroConexion(tipos[i]); 
        });

        // Agregar el botón al contenedor
        filtro.appendChild(btn);
    }
    
    //listas
    const listapokes = GenerarLista(pokemones);
    var contenedorLista = document.createElement("section")
    contenedorLista.classList.add("c-lista");
    contenedorLista.id = "la-lista"
    contenedorLista.innerHTML = listapokes;
    //agregar

    document.getElementById("root").appendChild(buscador)
    document.getElementById("root").appendChild(filtro)
    document.getElementById("root").appendChild(contenedorLista)
}