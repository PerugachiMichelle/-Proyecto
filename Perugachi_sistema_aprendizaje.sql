-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 10-12-2024 a las 21:43:19
-- Versión del servidor: 5.7.40
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_aprendizaje`
--
CREATE DATABASE IF NOT EXISTS `sistema_aprendizaje` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sistema_aprendizaje`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

DROP TABLE IF EXISTS `cursos`;
CREATE TABLE IF NOT EXISTS `cursos` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `duracion` int(11) NOT NULL,
  `nivel` varchar(50) NOT NULL,
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `nombre`, `duracion`, `nivel`) VALUES
(4, 'DB', 50, 'Basico'),
(5, 'Redes de Computadoras', 35, 'Avanzado'),
(6, 'Seguridad Informática', 30, 'Avanzado'),
(7, 'Análisis de Datos', 30, 'Intermedio'),
(8, 'Machine Learning', 50, 'Avanzado'),
(9, 'Desarrollo Móvil', 25, 'Intermedio'),
(10, 'Fundamentos de Computación', 15, 'Básico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursoscompletados`
--

DROP TABLE IF EXISTS `cursoscompletados`;
CREATE TABLE IF NOT EXISTS `cursoscompletados` (
  `id_estudiante` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `fecha_completado` date NOT NULL,
  PRIMARY KEY (`id_estudiante`,`id_curso`),
  KEY `fk_curso` (`id_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursoscompletados`
--

INSERT INTO `cursoscompletados` (`id_estudiante`, `id_curso`, `fecha_completado`) VALUES
(4, 4, '2024-03-20'),
(5, 5, '2024-04-10'),
(6, 6, '2024-05-01'),
(7, 7, '2024-04-15'),
(8, 8, '2024-05-20'),
(9, 9, '2024-06-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
CREATE TABLE IF NOT EXISTS `estudiantes` (
  `id_estudiante` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `nivel` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estudiante`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id_estudiante`, `nombre`, `correo`, `nivel`) VALUES
(4, 'Carlos Sánchez', 'carlos.sanchez@hotmail.com', 'Intermedio'),
(5, 'Juan Pérez', 'juan.perez@hotmail.com', 'Básico'),
(6, 'Pedro Ramírez', 'pedro.ramirez@hotmail.com', 'Básico'),
(7, 'Sofía Martínez', 'sofia.martinez@hotmail.com', 'Intermedio'),
(8, 'Luis Gómez', 'luis.gomez@hotmail.com', 'Avanzado'),
(9, 'Elena Rodriguez', 'elena.rodriguez@hotmail.com', 'Básico');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cursoscompletados`
--
ALTER TABLE `cursoscompletados`
  ADD CONSTRAINT `fk_curso` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_estudiante` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
