// Componente Menu
class Menu extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
  
      const container = document.createElement("div");
      container.classList.add("menu-container");
  
      // Agregar título
      const titulo = document.createElement("h1");
      titulo.textContent = "Proyecto Primer Parcial";
      titulo.classList.add("menu-title");
      container.appendChild(titulo);
  
      const opciones = [
        { item: "Estudiantes", link: "../HTML/estudiantes.html" },
        { item: "Cursos", link: "../HTML/cursos.html" },
        { item: "Cursos Completados", link: "../HTML/completos.html" },
      ];
  
      const lista = document.createElement("ul");
      lista.classList.add("menu-list");
  
      opciones.forEach(op => {
        const itemList = document.createElement("li");
        itemList.classList.add("menu-item");
        const enlace = document.createElement("a");
        enlace.textContent = op.item;
        enlace.href = op.link;
        enlace.classList.add("menu-link");
        itemList.appendChild(enlace);
        lista.appendChild(itemList);
      });
  
      container.appendChild(lista);
  
      const estilo = document.createElement("style");
      estilo.textContent = `
        .menu-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #fef5f5;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .menu-title {
          font-family: 'Arial', sans-serif;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #555;
        }
        .menu-list {
          display: flex;
          gap: 20px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .menu-item {
          transition: transform 0.3s ease;
        }
        .menu-item:hover {
          transform: scale(1.1);
        }
        .menu-link {
          text-decoration: none;
          color: #6c757d;
          font-size: 16px;
          font-weight: bold;
          text-transform: uppercase;
          padding: 8px 15px;
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .menu-link:hover {
          background-color: #c3e3f3;
          color: #333;
        }
      `;
  
      shadow.appendChild(container);
      shadow.appendChild(estilo);
    }
  }
  
  window.customElements.define("mi-menu", Menu);
  
  // Componente Footer
  class Footer extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: "open" });
  
      const container = document.createElement("footer");
      container.textContent = "Todos los derechos reservados ESPE";
  
      const estilo = document.createElement("style");
      estilo.textContent = `
        footer {
          font-family: Arial, sans-serif;
          font-size: 14px;
          text-align: center;
          padding: 10px;
          background-color: #fef5f5;
          color: white;
          position: fixed;
          bottom: 0;
          width: 100%;
          color: #555;
          font-family: 'Arial', sans-serif;
        }
      `;
  
      this.shadowRoot.appendChild(estilo);
      this.shadowRoot.appendChild(container);
    }
  }
  
  window.customElements.define("mi-footer", Footer);
  