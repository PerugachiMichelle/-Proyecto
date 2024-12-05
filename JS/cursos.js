class ListarCursos extends HTMLElement {
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
        this.obtenerCursos(apiUrl);
    }

    obtenerCursos = async (url) => {
        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();
            const cursos = datos || [];
            this.mostrarCursos(cursos);
        } catch (error) {
            console.error(`Error al obtener los cursos: ${error}`);
            this.contenedor.innerHTML = `<p class="alerta-error">Hubo un error al obtener los cursos. Intenta más tarde.</p>`;
        }
    }

    eliminarCurso = async (id) => {
        try {
            const respuesta = await fetch(`http://localhost:8000/cursos/${id}`, {
                method: 'DELETE',
            });
            if (respuesta.ok) {
                alert("Curso eliminado exitosamente");
                this.obtenerCursos('http://localhost:8000/cursos/');
            } else {
                alert("Error al eliminar el curso");
            }
        } catch (error) {
            console.error(`Error al eliminar el curso: ${error}`);
        }
    }


    mostrarCursos = (cursos) => {
        if (cursos.length === 0) {
            this.contenedor.innerHTML = `<p class="alerta-error">No se encontraron cursos disponibles.</p>`;
            return;
        }

        let tablaHtml = `
            <table>
                <thead>
                    <tr>
                        <th>ID Curso</th>
                        <th>Nombre</th>
                        <th>Duración (hrs)</th>
                        <th>Nivel</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        cursos.forEach(curso => {
            tablaHtml += `
                <tr>
                    <td>${curso.id_curso}</td>
                    <td>${curso.nombre}</td>
                    <td>${curso.duracion}</td>
                    <td>${curso.nivel}</td>
                    <td class="botones">
                        <button class="boton eliminar" onclick="document.querySelector('listar-cursos').eliminarCurso(${curso.id_curso})">Eliminar</button>
                        <button class="boton actualizar")">Actualizar</button>
                    </td>
                </tr>
            `;
        });

        tablaHtml += `
                </tbody>
            </table>
        `;

        this.contenedor.innerHTML = tablaHtml;
    }
}

window.customElements.define('listar-cursos', ListarCursos);
