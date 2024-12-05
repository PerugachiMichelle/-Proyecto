class ListarEstudiantes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.contenedor = document.createElement('div');
        this.contenedor.className = 'contenedor';
        this.estilos = document.createElement('style');
        this.estilos.textContent = `
            .contenedor {
                width: 80%;
                margin: 20px auto;
                padding: 15px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            th, td {
                padding: 10px;
                text-align: left;
                border: 1px solid #ddd;
            }
            th {
                background-color: #f2f2f2;
            }
            .alerta-error {
                color: #721c24;
                background-color: #f8d7da;
                padding: 15px;
                border-radius: 5px;
                margin-top: 20px;
                border: 1px solid #f5c6cb;
            }
            .botones {
                display: flex;
                justify-content: space-evenly;
                margin-top: 10px;
            }
            .boton {
                padding: 8px 16px;
                cursor: pointer;
                border: none;
                border-radius: 5px;
                background-color: #4CAF50;
                color: white;
            }
            .boton:hover {
                background-color: #45a049;
            }
            .boton.eliminar {
                background-color: #e74c3c;
            }
            .boton.eliminar:hover {
                background-color: #c0392b;
            }
        `;
        this.shadowRoot.appendChild(this.estilos);
        this.shadowRoot.appendChild(this.contenedor);
    }

    connectedCallback() {
        const apiUrl = this.getAttribute('api-url');
        this.fetchData(apiUrl);
    }

    fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.render(data);
        } catch (error) {
            console.error(`Error al obtener los estudiantes: ${error}`);
            this.contenedor.innerHTML = `<p class="alerta-error">Hubo un error al obtener los estudiantes. Intenta más tarde.</p>`;
        }
    };

    eliminarEstudiante = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/estudiantes/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Estudiante eliminado con éxito');
                this.fetchData(this.getAttribute('api-url')); // Recargar la lista
            } else {
                alert('Error al eliminar el estudiante');
            }
        } catch (error) {
            console.error(`Error al eliminar el estudiante: ${error}`);
        }
    };

    render = (estudiantes) => {
        if (estudiantes.length === 0) {
            this.contenedor.innerHTML = `<p class="alerta-error">No se encontraron estudiantes.</p>`;
            return;
        }

        let html = `
            <table>
                <thead>
                    <tr>
                        <th>ID Estudiante</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Nivel</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        estudiantes.forEach(estudiante => {
            html += `
                <tr>
                    <td>${estudiante.id_estudiante}</td>
                    <td>${estudiante.nombre}</td>
                    <td>${estudiante.correo}</td>
                    <td>${estudiante.nivel}</td>
                    <td class="botones">
                        <button class="boton eliminar" onclick="document.querySelector('listar-estudiantes').eliminarEstudiante(${estudiante.id_estudiante})">Eliminar</button>
                        <button class="boton actualizar")">Actualizar</button>
                    </td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        this.contenedor.innerHTML = html;
    };
}

window.customElements.define('listar-estudiantes', ListarEstudiantes);
