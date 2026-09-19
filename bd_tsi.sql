-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2026 a las 22:58:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_tsi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_asignatura`
--

CREATE TABLE `tbl_asignatura` (
  `id_asignatura` smallint(5) UNSIGNED NOT NULL,
  `codigo_asignatura` varchar(15) NOT NULL,
  `nombre_asignatura` varchar(100) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_categoria_peligrosidad`
--

CREATE TABLE `tbl_categoria_peligrosidad` (
  `id_categoria` tinyint(3) UNSIGNED NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL,
  `pictograma` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_categoria_peligrosidad`
--

INSERT INTO `tbl_categoria_peligrosidad` (`id_categoria`, `nombre_categoria`, `pictograma`, `descripcion`) VALUES
(1, 'Sustancias explosivas', 'sustancias_explosivas.jpg', 'GHS01 - Explosivos o reactivos sin control'),
(2, 'Sustancias inflamables', 'sustancias_inflamable.jpg', 'GHS02 - Gases, aerosoles, líquidos o sólidos inflamables'),
(3, 'Sustancias comburentes', 'sustancias_comburentes.jpg', 'GHS03 - Oxidantes que favorecen la combustión'),
(4, 'Gas bajo presión', 'gas_bajo_presion.jpg', 'GHS04 - Gases comprimidos, licuados o disueltos'),
(5, 'Sustancias corrosivas', 'sustancias_corrosivas.jpg', 'GHS05 - Corrosión cutánea o daño ocular grave'),
(6, 'Toxicidad aguda (Cat. 1, 2, 3)', 'toxicidad_aguda(1,2,3).jpg', 'GHS06 - Mortal o tóxico en caso de ingestión, contacto o inhalación'),
(7, 'Toxicidad aguda (Cat. 4)', 'toxicidad_aguda(4).jpg', 'GHS07 - Nocivo o irritante para la piel, ojos o vías respiratorias'),
(8, 'Cancerígeno / Mutágeno', 'cancerigeno.jpg', 'GHS08 - Peligro grave para la salud a largo plazo'),
(9, 'Dañino para el medio ambiente', 'Danino_medio_ambiente.jpg', 'GHS09 - Toxicidad para organismos acuáticos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_consumo`
--

CREATE TABLE `tbl_consumo` (
  `id_consumo` int(10) UNSIGNED NOT NULL,
  `id_movimiento` int(10) UNSIGNED NOT NULL,
  `id_asignatura` smallint(5) UNSIGNED NOT NULL,
  `id_docente` smallint(5) UNSIGNED NOT NULL,
  `actividad_practica` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_docente`
--

CREATE TABLE `tbl_docente` (
  `id_docente` smallint(5) UNSIGNED NOT NULL,
  `rut` varchar(12) NOT NULL,
  `nombres` varchar(60) NOT NULL,
  `apellido_paterno` varchar(40) NOT NULL,
  `apellido_materno` varchar(40) DEFAULT NULL,
  `correo_institucional` varchar(100) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_historial_modificaciones`
--

CREATE TABLE `tbl_historial_modificaciones` (
  `id_historial` int(10) UNSIGNED NOT NULL,
  `id_usuario` smallint(5) UNSIGNED NOT NULL,
  `fecha_accion` datetime NOT NULL DEFAULT current_timestamp(),
  `accion_realizada` varchar(20) NOT NULL,
  `tabla_afectada` varchar(50) NOT NULL,
  `registro_afectado` int(10) UNSIGNED NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_lote`
--

CREATE TABLE `tbl_lote` (
  `id_lote` mediumint(8) UNSIGNED NOT NULL,
  `id_reactivo` smallint(5) UNSIGNED NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `cantidad_ingresada` decimal(10,2) NOT NULL,
  `stock_disponible` decimal(10,2) NOT NULL,
  `id_marca` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_marca`
--

CREATE TABLE `tbl_marca` (
  `id_marca` smallint(5) UNSIGNED NOT NULL,
  `nombre_marca` varchar(50) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_merma_ajuste`
--

CREATE TABLE `tbl_merma_ajuste` (
  `id_ajuste` mediumint(8) UNSIGNED NOT NULL,
  `id_lote` mediumint(8) UNSIGNED NOT NULL,
  `tipo_ajuste` enum('Entrada','Salida') NOT NULL,
  `motivo_ajuste` enum('Vencimiento','Contaminacion','Quiebre/Deterioro','Ajuste Por Conteo','Otro') NOT NULL,
  `fecha_ajuste` datetime NOT NULL DEFAULT current_timestamp(),
  `cantidad_afectada` decimal(10,2) NOT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `id_usuario` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_movimiento`
--

CREATE TABLE `tbl_movimiento` (
  `id_movimiento` int(10) UNSIGNED NOT NULL,
  `id_lote` mediumint(8) UNSIGNED NOT NULL,
  `tipo_movimiento` enum('Ingreso','Despacho','Devolucion') NOT NULL,
  `fecha_movimiento` datetime NOT NULL DEFAULT current_timestamp(),
  `cantidad` decimal(10,2) NOT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `id_usuario` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_reactivo`
--

CREATE TABLE `tbl_reactivo` (
  `id_reactivo` smallint(5) UNSIGNED NOT NULL,
  `nombre_quimico` varchar(150) NOT NULL,
  `formula_quimica` varchar(50) DEFAULT NULL,
  `unidad_medida` enum('g','kg','mL','L','unidad') NOT NULL,
  `punto_reorden_minimo` decimal(10,2) NOT NULL DEFAULT 0.00,
  `id_categoria` tinyint(3) UNSIGNED NOT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `cantidad_disponible` decimal(12,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_reactivo`
--

INSERT INTO `tbl_reactivo` (`id_reactivo`, `nombre_quimico`, `formula_quimica`, `unidad_medida`, `punto_reorden_minimo`, `id_categoria`, `estado`, `cantidad_disponible`) VALUES
(1, 'Ácido Clorhídrico 37%', 'HCl', 'L', 2.50, 5, 1, 10.00),
(2, 'Hidróxido de Sodio', 'NaOH', 'kg', 1.00, 5, 1, 5.00),
(3, 'Etanol Absoluto 99.8%', 'C2H5OH', 'L', 5.00, 2, 1, 12.50),
(4, 'Sulfato de Cobre Pentahidratado', 'CuSO4·5H2O', 'g', 500.00, 9, 1, 2500.00),
(5, 'Nitrato de Plata', 'AgNO3', 'g', 100.00, 3, 1, 450.00),
(6, 'Metanol R.A.', 'CH3OH', 'L', 3.00, 6, 1, 8.00),
(7, 'Permanganato de Potasio', 'KMnO4', 'g', 250.00, 3, 1, 1000.00),
(8, 'Acetona 99.5%', 'C3H6O', 'L', 4.00, 2, 1, 15.00),
(9, 'Dicromato de Potasio', 'K2Cr2O7', 'g', 150.00, 8, 1, 600.00),
(10, 'Agua Desionizada', 'H2O', 'L', 20.00, 7, 1, 50.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_rol`
--

CREATE TABLE `tbl_rol` (
  `id_rol` tinyint(3) UNSIGNED NOT NULL,
  `nombre_rol` varchar(30) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_rol`
--

INSERT INTO `tbl_rol` (`id_rol`, `nombre_rol`, `descripcion`) VALUES
(1, 'Administrador', 'Acceso total al sistema: gestión de inventario, usuarios, mantenedores, alertas y reportes completos.'),
(2, 'Docente', 'Acceso de visualización: consulta de stock, catálogo de reactivos, alertas de vencimiento y reportes de consumo.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuario`
--

CREATE TABLE `tbl_usuario` (
  `id_usuario` smallint(5) UNSIGNED NOT NULL,
  `rut` varchar(12) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellido_paterno` varchar(30) NOT NULL,
  `apellido_materno` varchar(30) DEFAULT NULL,
  `correo_institucional` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `id_rol` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`id_usuario`, `rut`, `nombres`, `apellido_paterno`, `apellido_materno`, `correo_institucional`, `contrasena`, `estado`, `id_rol`) VALUES
(1, '12345678-9', 'Juan Pablo', 'Pérez', 'Gómez', 'juan.perez@usm.cl', '$2b$10$WpV7xwZovkTNaBuBhgA5GOEPaCQMs9R8mxo836N9a0Cnm3fRAmVpS', 1, 1),
(2, '12345678-9', 'Juan Pablo', 'Pérez', 'Gómez', 'jorge.perez@usm.cl', '$2b$10$C8KfyC52s0c5riNf.oRWBuPkIjTQudyLfnPEpYKZzQckWSWZYKH.G', 1, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_asignatura`
--
ALTER TABLE `tbl_asignatura`
  ADD PRIMARY KEY (`id_asignatura`);

--
-- Indices de la tabla `tbl_categoria_peligrosidad`
--
ALTER TABLE `tbl_categoria_peligrosidad`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `tbl_consumo`
--
ALTER TABLE `tbl_consumo`
  ADD PRIMARY KEY (`id_consumo`),
  ADD KEY `fk_consumo_movimiento` (`id_movimiento`),
  ADD KEY `fk_consumo_asignatura` (`id_asignatura`),
  ADD KEY `fk_consumo_docente` (`id_docente`);

--
-- Indices de la tabla `tbl_docente`
--
ALTER TABLE `tbl_docente`
  ADD PRIMARY KEY (`id_docente`),
  ADD UNIQUE KEY `correo_institucional` (`correo_institucional`);

--
-- Indices de la tabla `tbl_historial_modificaciones`
--
ALTER TABLE `tbl_historial_modificaciones`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `fk_historial_usuario` (`id_usuario`);

--
-- Indices de la tabla `tbl_lote`
--
ALTER TABLE `tbl_lote`
  ADD PRIMARY KEY (`id_lote`),
  ADD KEY `fk_lote_reactivo` (`id_reactivo`),
  ADD KEY `fk_lote_marca` (`id_marca`);

--
-- Indices de la tabla `tbl_marca`
--
ALTER TABLE `tbl_marca`
  ADD PRIMARY KEY (`id_marca`);

--
-- Indices de la tabla `tbl_merma_ajuste`
--
ALTER TABLE `tbl_merma_ajuste`
  ADD PRIMARY KEY (`id_ajuste`),
  ADD KEY `fk_ajuste_lote` (`id_lote`),
  ADD KEY `fk_ajuste_usuario` (`id_usuario`);

--
-- Indices de la tabla `tbl_movimiento`
--
ALTER TABLE `tbl_movimiento`
  ADD PRIMARY KEY (`id_movimiento`),
  ADD KEY `fk_movimiento_lote` (`id_lote`),
  ADD KEY `fk_movimiento_usuario` (`id_usuario`);

--
-- Indices de la tabla `tbl_reactivo`
--
ALTER TABLE `tbl_reactivo`
  ADD PRIMARY KEY (`id_reactivo`),
  ADD KEY `fk_reactivo_categoria` (`id_categoria`);

--
-- Indices de la tabla `tbl_rol`
--
ALTER TABLE `tbl_rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo_institucional` (`correo_institucional`),
  ADD KEY `fk_usuario_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_asignatura`
--
ALTER TABLE `tbl_asignatura`
  MODIFY `id_asignatura` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_categoria_peligrosidad`
--
ALTER TABLE `tbl_categoria_peligrosidad`
  MODIFY `id_categoria` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tbl_consumo`
--
ALTER TABLE `tbl_consumo`
  MODIFY `id_consumo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_docente`
--
ALTER TABLE `tbl_docente`
  MODIFY `id_docente` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_historial_modificaciones`
--
ALTER TABLE `tbl_historial_modificaciones`
  MODIFY `id_historial` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_lote`
--
ALTER TABLE `tbl_lote`
  MODIFY `id_lote` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_marca`
--
ALTER TABLE `tbl_marca`
  MODIFY `id_marca` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_merma_ajuste`
--
ALTER TABLE `tbl_merma_ajuste`
  MODIFY `id_ajuste` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_movimiento`
--
ALTER TABLE `tbl_movimiento`
  MODIFY `id_movimiento` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_reactivo`
--
ALTER TABLE `tbl_reactivo`
  MODIFY `id_reactivo` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `tbl_rol`
--
ALTER TABLE `tbl_rol`
  MODIFY `id_rol` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  MODIFY `id_usuario` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_consumo`
--
ALTER TABLE `tbl_consumo`
  ADD CONSTRAINT `fk_consumo_asignatura` FOREIGN KEY (`id_asignatura`) REFERENCES `tbl_asignatura` (`id_asignatura`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_consumo_docente` FOREIGN KEY (`id_docente`) REFERENCES `tbl_docente` (`id_docente`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_consumo_movimiento` FOREIGN KEY (`id_movimiento`) REFERENCES `tbl_movimiento` (`id_movimiento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_historial_modificaciones`
--
ALTER TABLE `tbl_historial_modificaciones`
  ADD CONSTRAINT `fk_historial_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario` (`id_usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_lote`
--
ALTER TABLE `tbl_lote`
  ADD CONSTRAINT `fk_lote_marca` FOREIGN KEY (`id_marca`) REFERENCES `tbl_marca` (`id_marca`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_lote_reactivo` FOREIGN KEY (`id_reactivo`) REFERENCES `tbl_reactivo` (`id_reactivo`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_merma_ajuste`
--
ALTER TABLE `tbl_merma_ajuste`
  ADD CONSTRAINT `fk_ajuste_lote` FOREIGN KEY (`id_lote`) REFERENCES `tbl_lote` (`id_lote`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ajuste_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario` (`id_usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_movimiento`
--
ALTER TABLE `tbl_movimiento`
  ADD CONSTRAINT `fk_movimiento_lote` FOREIGN KEY (`id_lote`) REFERENCES `tbl_lote` (`id_lote`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_movimiento_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario` (`id_usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_reactivo`
--
ALTER TABLE `tbl_reactivo`
  ADD CONSTRAINT `fk_reactivo_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `tbl_categoria_peligrosidad` (`id_categoria`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `tbl_rol` (`id_rol`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
