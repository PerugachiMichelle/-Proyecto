import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Bienvenidos a mi api");
});

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'sistema_aprendizaje',
});

db.connect((error) => {
    if (error) {
        console.log("Error al conectar a la base de datos");
        return;
    } else {
        console.log("Conexion Exitosa");
    }
});

app.get('/estudiantes/', (req, res) => {
    const query = "SELECT * FROM estudiantes";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al ejecutar la consulta');
            return;
        } else {
            res.status(200).json(results);
        }
    });
});


app.delete('/estudiantes/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM estudiantes WHERE id_estudiante = ?";
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar al estudiante');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Estudiante no encontrado');
        } else {
            res.status(200).send('Estudiante eliminado exitosamente');
        }
    });
});

app.get('/cursos/', (req, res) => {
    const query = "SELECT * FROM cursos";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al ejecutar la consulta');
        } else {
            res.status(200).json(results);
        }
    });
});

app.delete('/cursos/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM cursos WHERE id_curso = ?";
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el curso');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Curso no encontrado');
        } else {
            res.status(200).send('Curso eliminado exitosamente');
        }
    });
});


app.get('/cursos-completados', (req, res) => {
    const query = "SELECT * FROM cursoscompletados";  
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al ejecutar la consulta');
        } else {
            res.status(200).json(results);
        }
    });
    console.log("Obteniendo cursos completados");
});

app.delete('/cursos-completados/:id_estudiante/:id_curso', (req, res) => {
    const { id_estudiante, id_curso } = req.params;
    const query = "DELETE FROM cursoscompletados WHERE id_estudiante = ? AND id_curso = ?";
    db.query(query, [id_estudiante, id_curso], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el curso completado');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Curso completado no encontrado');
        } else {
            res.status(200).send('Curso completado eliminado exitosamente');
        }
    });
});
