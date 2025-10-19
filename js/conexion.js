let items = [];

async function Conexion(UnFiltro) {
  const baseUrl = "https://www.dnd5eapi.co/api/2014";

  if (UnFiltro === "All") {
    

    const res = await fetch(`${baseUrl}/magic-items`);
    const data = await res.json();

    // Solo 50 ítems
    const itemsBase = data.results.slice(0, 50);

    const detalles= await Promise.all(
      itemsBase.map(async (item) => {


        const resItem = await fetch(`${baseUrl}/magic-items/${item.index}`);
        return await resItem.json();

        const itemLigero = {
          name: itemData.name,
          fullImageUrl: itemData.image ? `https://www.dnd5eapi.co${itemData.image}` : null,
        };

        return itemLigero;
      })
    );

    return detalles;
  }
}


async function General() {
  const root = document.getElementById("root");
  root.innerHTML = `<div class="loader">Cargando ítems... ✨</div>`;

  // Solo cargamos una vez
  if (items.length === 0) {
    items = await Conexion("All");
  }

  Home(); // muestra el home cuando ya cargaron
}
