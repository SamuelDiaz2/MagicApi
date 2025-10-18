async function Original() {
  document.getElementById("root").innerHTML = "informativa"
  root.innerHTML = `
    <div id="contenedor-original" 
         style="background:#0b0b1e; color:white; min-height:100vh; padding:30px; border-radius:12px;">
      <h2>🔮 Descubre tu Ítem Mágico</h2>
      <p>Presiona el botón para revelar qué objeto mágico te ha elegido...</p>
      <button id="btn-descubrir" style="margin-top:20px; padding:10px 20px; font-size:16px; cursor:pointer;">
        Descubrir mi ítem ✨
      </button>
      <div id="resultado-item" style="margin-top:30px;"></div>
    </div>
  `;

  const questions = [
    {
      text: "¿Qué tipo de héroe serías?",
      options: [
        { text: "Un poderoso mago 🧙‍♂️", value: "magic" },
        { text: "Un guerrero valiente ⚔️", value: "weapon" },
        { text: "Un ladrón sigiloso 🕶️", value: "stealth" },
        { text: "Un protector con armadura 🛡️", value: "armor" },
      ],
    },
    {
      text: "¿Qué prefieres en una batalla?",
      options: [
        { text: "Lanzar hechizos", value: "magic" },
        { text: "Golpear con fuerza", value: "weapon" },
        { text: "Evitar ser visto", value: "stealth" },
        { text: "Resistir ataques", value: "armor" },
      ],
    },
    {
      text: "Elige una cualidad que te define:",
      options: [
        { text: "Sabiduría", value: "magic" },
        { text: "Coraje", value: "weapon" },
        { text: "Astucia", value: "stealth" },
        { text: "Lealtad", value: "armor" },
      ],
    },
  ];

  let current = 0;
  let scores = { magic: 0, weapon: 0, stealth: 0, armor: 0 };

  function renderQuestion() {
    root.innerHTML = "";
    if (current < questions.length) {
      const q = questions[current];
      const h2 = document.createElement("h2");
      h2.textContent = q.text;
      root.appendChild(h2);

      q.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.textContent = opt.text;
        btn.style.margin = "10px";
        btn.style.padding = "10px 20px";
        btn.style.background = "#2c2c54";
        btn.style.border = "none";
        btn.style.color = "white";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.onmouseenter = () => (btn.style.background = "#474787");
        btn.onmouseleave = () => (btn.style.background = "#2c2c54");
        btn.onclick = () => {
          scores[opt.value]++;
          current++;
          renderQuestion();
        };
        root.appendChild(btn);
      });
    } else {
      showResult();
    }
  }

  async function showResult() {
    root.innerHTML = "<h2>Analizando tus respuestas mágicas... 🪄</h2>";

    const category = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );

    const keywordMap = {
      magic: "wand",
      weapon: "sword",
      stealth: "cloak",
      armor: "armor",
    };
    const keyword = keywordMap[category];

    const res = await fetch("https://www.dnd5eapi.co/api/magic-items");
    const data = await res.json();
    const filtered = data.results.filter((i) =>
      i.name.toLowerCase().includes(keyword)
    );

    const randomItem = filtered[Math.floor(Math.random() * filtered.length)];
    const itemRes = await fetch(`https://www.dnd5eapi.co${randomItem.url}`);
    const itemData = await itemRes.json();

    renderResult(itemData);
  }

  function renderResult(item) {
    root.innerHTML = `
      <h2>✨ Tu ítem mágico ideal es...</h2>
      <h1>${item.name}</h1>
      ${item.image ? `<img src="https://www.dnd5eapi.co${item.image}" width="250">` : ""}
      <p><b>Rareza:</b> ${item.rarity?.name || "Desconocida"}</p>
      <p style="max-width:600px; color:#ccc;">${
        item.desc?.[0] || "Un objeto envuelto en misterio..."
      }</p>
      <button id="retry">🔁 Intentar de nuevo</button>
    `;

    const retry = document.getElementById("retry");
    retry.style.marginTop = "20px";
    retry.style.padding = "10px 20px";
    retry.style.border = "none";
    retry.style.background = "#2c2c54";
    retry.style.color = "white";
    retry.style.borderRadius = "8px";
    retry.onclick = () => {
      current = 0;
      scores = { magic: 0, weapon: 0, stealth: 0, armor: 0 };
      renderQuestion();
    };
  }

  renderQuestion();
}
