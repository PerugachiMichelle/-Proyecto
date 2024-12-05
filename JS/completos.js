class ListarCompletos extends HTMLElement {
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
        this.obtenerCompletos(apiUrl);
    }

    obtenerCompletos = async (url) => {
        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();
            this.render(datos);
        } catch (error) {
            console.error(`Error al obtener los cursos completados: ${error}`);
            this.contenedor.innerHTML = `<p class="alerta-error">Hubo un error al obtener los cursos completados. Intenta más tarde.</p>`;
        }
    };

    eliminarCursoCompletado = async (id_estudiante, id_curso) => {
        try {
            const response = await fetch(`http://localhost:8000/cursos-completados/${id_estudiante}/${id_curso}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Curso completado eliminado con éxito');
                this.obtenerCompletos(this.getAttribute('api-url')); // Recargar la lista
            } else {
                alert('Error al eliminar el curso completado');
            }
        } catch (error) {
            console.error(`Error al eliminar el curso completado: ${error}`);
            alert('Hubo un problema al eliminar el curso completado. Intente más tarde.');
        }
    };

    formatearFecha(fechaISO) {
        const fecha = new Date(fechaISO);
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const día = fecha.getDate().toString().padStart(2, '0');
        return `${año}/${mes}/${día}`;
    }

    render = (completados) => {
        if (completados.length === 0) {
            this.contenedor.innerHTML = `<p class="alerta-error">No se encontraron cursos completados.</p>`;
            return;
        }

        let html = `
            <table>
                <thead>
                    <tr>
                        <th>ID Estudiante</th>
                        <th>ID Curso</th>
                        <th>Fecha Completado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        completados.forEach(completo => {
            const fechaFormateada = this.formatearFecha(completo.fecha_completado);
            html += `
                <tr>
                    <td>${completo.id_estudiante}</td>
                    <td>${completo.id_curso}</td>
                    <td>${fechaFormateada}</td>
                    <td class="botones">
                        <button class="boton eliminar" onclick="document.querySelector('listar-completos').eliminarCursoCompletado(${completo.id_estudiante}, ${completo.id_curso})">Eliminar</button>
                        <button class="boton actualizar")">Actualizar</button>
                    </td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        this.contenedor.innerHTML = html;
    };
}

window.customElements.define('listar-completos', ListarCompletos);
