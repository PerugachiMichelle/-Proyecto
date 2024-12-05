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

// -----------------------
// RUTAS DE ESTUDIANTES
// -----------------------
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

// Registrar un nuevo estudiante
app.post('/estudiantes', (req, res) => {
    const { nombre, correo } = req.body;
    const query = 'INSERT INTO estudiantes (nombre, correo) VALUES (?, ?)';
    db.query(query, [nombre, correo], (error, results) => {
        if (error) {
            res.status(500).send('Error al registrar al estudiante');
        } else {
            res.status(201).json('Estudiante registrado exitosamente');
        }
    });
});

// Eliminar un estudiante por ID
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

// Actualizar un estudiante por ID
app.put('/estudiantes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    const query = "UPDATE estudiantes SET nombre = ?, correo = ? WHERE id_estudiante = ?";
    db.query(query, [nombre, correo, id], (error, results) => {
        if (error) {
            res.status(500).send('Error al actualizar al estudiante');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Estudiante no encontrado');
        } else {
            res.status(200).send('Estudiante actualizado exitosamente');
        }
    });
});

// -----------------------
// RUTAS DE CURSOS
// -----------------------
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

// Registrar un nuevo curso
app.post('/cursos', (req, res) => {
    const { nombre, duracion, nivel } = req.body;
    const query = 'INSERT INTO cursos (nombre, duracion, nivel) VALUES (?, ?, ?)';
    db.query(query, [nombre, duracion, nivel], (error, results) => {
        if (error) {
            res.status(500).send('Error al registrar el curso');
        } else {
            res.status(201).json('Curso registrado exitosamente');
        }
    });
});

// Eliminar un curso por ID
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

// Actualizar un curso por ID
app.put('/cursos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, duracion, nivel } = req.body;
    const query = "UPDATE cursos SET nombre = ?, duracion = ?, nivel = ? WHERE id_curso = ?";
    db.query(query, [nombre, duracion, nivel, id], (error, results) => {
        if (error) {
            res.status(500).send('Error al actualizar el curso');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Curso no encontrado');
        } else {
            res.status(200).send('Curso actualizado exitosamente');
        }
    });
});

// -----------------------
// RUTAS DE CURSOS COMPLETADOS
// -----------------------

// Obtener todos los cursos completados
app.get('/cursos-completados', (req, res) => {
    const query = "SELECT * FROM cursoscompletados";  // Asegúrate de que el nombre de la tabla sea correcto
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al ejecutar la consulta');
        } else {
            res.status(200).json(results);
        }
    });
    console.log("Obteniendo cursos completados");
});

// Registrar un nuevo curso completado
app.post('/cursos-completados', (req, res) => {
    const { id_estudiante, id_curso, fecha_completado } = req.body;
    const query = 'INSERT INTO cursoscompletados (id_estudiante, id_curso, fecha_completado) VALUES (?, ?, ?)';
    db.query(query, [id_estudiante, id_curso, fecha_completado], (error, results) => {
        if (error) {
            res.status(500).send('Error al registrar el curso completado');
        } else {
            res.status(201).json('Curso completado registrado exitosamente');
        }
    });
});

// Eliminar un curso completado por ID de estudiante y curso
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

// Actualizar la fecha de un curso completado
app.put('/cursos-completados/:id_estudiante/:id_curso', (req, res) => {
    const { id_estudiante, id_curso } = req.params;
    const { fecha_completado } = req.body;
    const query = "UPDATE cursoscompletados SET fecha_completado = ? WHERE id_estudiante = ? AND id_curso = ?";
    db.query(query, [fecha_completado, id_estudiante, id_curso], (error, results) => {
        if (error) {
            res.status(500).send('Error al actualizar el curso completado');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Curso completado no encontrado');
        } else {
            res.status(200).send('Curso completado actualizado exitosamente');
        }
    });
});
