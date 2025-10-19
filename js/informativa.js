function Informativa(){
    let listaHTML = "";
    document.getElementById("root").innerHTML = "informativa"

    root.innerHTML = `
    <div id="informativa" 
         style="background:#121212; color:white; min-height:100vh; padding:30px; border-radius:12px;">
      <h2>Sobre Esta API de Objetos magicos</h2>
      <p>Esta APP obtiene toda su informacion de <a href=https://www.dnd5eapi.co/api/2014/magic-items target="_blank">Magic Items</a>
      cada elemenento con su respectiva imagen e informacion fue extraida de esta API.</p>
      <p>Este proyecto fue hecho con el proposito de aprender de javascript y el funcionamiento de las APIs,
      En este mismo podras encontrar:</p>
        <ul><li>Buscador de objetos magicos</li>
            <li>Filtro por categoria</li>
            <li>Detalle de cada objeto</li>
            <li>¿Quien soy?</li>
            <li>Favoritos</li>
        </ul>
      <p>Desarrollado por: <strong>Samuel Elias Diaz Fernandez</strong></p>
    </div>
  `;
    
}