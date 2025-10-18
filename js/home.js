function GenerarLista(arrayItems) {
  let listaHTML = "";

  for (let i = 0; i < arrayItems.length; i++) {
    const item = arrayItems[i];
    const id = item.index;

    listaHTML += `
      <div class="c-lista-items items-${id}" onclick="Detalle('${id}')">
        <img 
          src="https://www.dnd5eapi.co${item.image}"
          onerror="this.src='https://www.dnd5eapi.co/api/images/magic-items/${item.index}.png'" 
          width="auto" height="60" loading="lazy" alt="${item.name}">
        <p>${item.name}</p>
      </div>`;
  }

  return listaHTML;
}

function buscadorfuncion(asa) {
  if (asa.length >= 3) {
    const filtrados = items.filter(item => 
      item.name.toLowerCase().includes(asa.toLowerCase())
    );
    document.getElementById("la-lista").innerHTML = GenerarLista(filtrados);
  } else if (asa.length === 0) {
    document.getElementById("la-lista").innerHTML = GenerarLista(items);
  }
}

function FiltroCategoria(tipo) {
  const filtrados = items.filter(item => {
    const cat = item.equipment_category?.index || item.type || "";
    return cat === tipo;
  });

  if (filtrados.length > 0) {
    document.getElementById("la-lista").innerHTML = GenerarLista(filtrados);
  } else {
    document.getElementById("la-lista").innerHTML = `<p>No hay items en esta categoría.</p>`;
  }
}

function Home() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "Buscar item...";
  buscador.addEventListener("input", () => buscadorfuncion(buscador.value));

  const tipos = [
    "ammunition", "armor",  
    "weapon", "wondrous-items"
  ];

  const filtro = document.createElement("div");
  filtro.classList.add("c-filtros");

  tipos.forEach(tipo => {
    const btn = document.createElement("button");
    btn.textContent = tipo;
    btn.addEventListener("click", () => FiltroCategoria(tipo));
    filtro.appendChild(btn);
  });

  const contenedorLista = document.createElement("section");
  contenedorLista.classList.add("c-lista");
  contenedorLista.id = "la-lista";
  contenedorLista.innerHTML = GenerarLista(items);

  
  document.getElementById("root").appendChild(buscador);
  document.getElementById("root").appendChild(filtro);
  document.getElementById("root").appendChild(contenedorLista);
}
