async function toggleFavorito(paramid, paramname) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const existe = favoritos.some(f => f.index === paramid);

    if (existe) {
        
        favoritos = favoritos.filter(f => f.index !== paramid);
        esFavorito = false;
    } else {
        
        const res = await fetch(`https://www.dnd5eapi.co/api/2014/magic-items/${paramid}`);
        const data = await res.json();

        
        favoritos.push(data);
        esFavorito = true;
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    
    const boton = document.querySelector(`#corazon-${paramid}`);
    if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}


async function Detalle(h) {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const res = await fetch(`https://www.dnd5eapi.co/api/2014/magic-items/${h}`);
  const data = await res.json();

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  esFavorito = favoritos.some(item => item.index === data.index);

  root.innerHTML = `
    <section class="c-detalle">
        <h2>${data.name}</h2>
        <p><strong>Categoría:</strong> ${data.equipment_category?.name || "N/A"}</p>
        <p>${data.desc ? data.desc.join("<br>") : "Sin descripción"}</p>

        <img src="https://www.dnd5eapi.co${data.image}" 
             height="120" width="auto" alt="${data.name}"
             onerror="this.style.display='none'">
        <br>     
        <button onClick="toggleFavorito('${data.index}', '${data.name}')">
            <span id="corazon-${data.index}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
        </button>
    </section>
  `;
}