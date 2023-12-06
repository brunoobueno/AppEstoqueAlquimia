-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/12/2023 às 06:07
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_alquimia`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `actor`
--

CREATE TABLE `actor` (
  `actor_id` smallint(5) UNSIGNED NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `actor_info`
--

CREATE TABLE `actor_info` (
  `actor_id` int(11) DEFAULT NULL,
  `first_name` int(11) DEFAULT NULL,
  `last_name` int(11) DEFAULT NULL,
  `film_info` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `address`
--

CREATE TABLE `address` (
  `address_id` smallint(5) UNSIGNED NOT NULL,
  `address` varchar(50) NOT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `district` varchar(20) NOT NULL,
  `city_id` smallint(5) UNSIGNED NOT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `category`
--

CREATE TABLE `category` (
  `category_id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(25) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `city`
--

CREATE TABLE `city` (
  `city_id` smallint(5) UNSIGNED NOT NULL,
  `city` varchar(50) NOT NULL,
  `country_id` smallint(5) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `com_compra`
--

CREATE TABLE `com_compra` (
  `com_id` int(11) NOT NULL,
  `data_compra` date DEFAULT NULL,
  `for_fornecedor_for_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `country`
--

CREATE TABLE `country` (
  `country_id` smallint(5) UNSIGNED NOT NULL,
  `country` varchar(50) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `customer`
--

CREATE TABLE `customer` (
  `customer_id` smallint(5) UNSIGNED NOT NULL,
  `store_id` tinyint(3) UNSIGNED NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address_id` smallint(5) UNSIGNED NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `create_date` datetime NOT NULL,
  `last_update` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Table storing all customers. Holds foreign keys to the address table and the store table where this customer is registered.\n\nBasic information about the customer like first and last name are stored in the table itself. Same for the date the record was created and when the information was last updated.';

-- --------------------------------------------------------

--
-- Estrutura para tabela `customer_list`
--

CREATE TABLE `customer_list` (
  `ID` int(11) DEFAULT NULL,
  `name` int(11) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `zip code` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  `notes` int(11) DEFAULT NULL,
  `SID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `film`
--

CREATE TABLE `film` (
  `film_id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `release_year` year(4) DEFAULT NULL,
  `language_id` tinyint(3) UNSIGNED NOT NULL,
  `original_language_id` tinyint(3) UNSIGNED DEFAULT NULL,
  `rental_duration` tinyint(3) UNSIGNED NOT NULL DEFAULT 3,
  `rental_rate` decimal(4,2) NOT NULL DEFAULT 4.99,
  `length` smallint(5) UNSIGNED DEFAULT NULL,
  `replacement_cost` decimal(5,2) NOT NULL DEFAULT 19.99,
  `rating` enum('G','PG','PG-13','R','NC-17') DEFAULT 'G',
  `special_features` set('Trailers','Commentaries','Deleted Scenes','Behind the Scenes') DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `film_actor`
--

CREATE TABLE `film_actor` (
  `actor_id` smallint(5) UNSIGNED NOT NULL,
  `film_id` smallint(5) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `film_category`
--

CREATE TABLE `film_category` (
  `film_id` smallint(5) UNSIGNED NOT NULL,
  `category_id` tinyint(3) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `film_list`
--

CREATE TABLE `film_list` (
  `FID` int(11) DEFAULT NULL,
  `title` int(11) DEFAULT NULL,
  `description` int(11) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `actors` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `film_text`
--

CREATE TABLE `film_text` (
  `film_id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `fin_fornecedor_insumo`
--

CREATE TABLE `fin_fornecedor_insumo` (
  `ins_id` int(11) NOT NULL,
  `id_fornecedor` int(11) NOT NULL,
  `fin_id` int(11) NOT NULL,
  `com_compra_com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `for_fornecedor`
--

CREATE TABLE `for_fornecedor` (
  `for_id` int(11) NOT NULL,
  `for_nome` varchar(45) DEFAULT NULL,
  `for_email` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `insumo_receita`
--

CREATE TABLE `insumo_receita` (
  `idInsumo_receita` int(11) NOT NULL,
  `insumo_id` int(11) DEFAULT NULL,
  `receita_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ins_insumo`
--

CREATE TABLE `ins_insumo` (
  `ins_id` int(11) NOT NULL,
  `ins_codigo` int(11) DEFAULT NULL,
  `ins_nome` varchar(45) DEFAULT NULL,
  `ins_quantidade` int(11) DEFAULT NULL,
  `ins_minimo` int(11) DEFAULT NULL,
  `ins_medida` varchar(45) DEFAULT NULL,
  `ins_cadastro` datetime NOT NULL,
  `ins_vencimento` datetime DEFAULT NULL,
  `ins_lote` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `ins_insumo`
--

INSERT INTO `ins_insumo` (`ins_id`, `ins_codigo`, `ins_nome`, `ins_quantidade`, `ins_minimo`, `ins_medida`, `ins_cadastro`, `ins_vencimento`, `ins_lote`) VALUES
(20, 987654321, 'SODA CAUSTICA', 40, 150, 'LT', '2023-10-29 00:00:00', '2024-01-02 00:00:00', '29102023-1'),
(21, 234567890, 'OLEO MINERAL  43421', 3, 200, 'LT', '2023-10-29 00:00:00', '2024-01-01 00:00:00', '29102023-2'),
(42, 345678901, 'teste teste', 120, 200, 'ML', '2023-11-29 00:23:53', '2024-02-27 00:23:53', NULL),
(43, 109876543, 'CADASTRO ATUALIZADO', 150, 90, 'LT', '2023-11-29 00:24:36', '2024-02-27 00:24:36', '124'),
(44, 595287381, 'teste codigo', 129, 12, 'LT', '2023-12-02 23:37:14', '2024-03-01 23:37:14', '124df32'),
(50, 386030718, 'Lauril Sulfato de Sódio', 150, 45, 'LT', '2023-11-29 00:24:00', '2024-02-27 00:24:00', '625972'),
(51, 860662605, 'Hidróxido de Sódio', 859, 258, 'LT', '2023-11-30 00:24:00', '2024-02-28 00:24:00', NULL),
(52, 880777563, 'Ácido Cítrico', 514, 154, 'LT', '2023-12-01 00:24:00', '2024-02-29 00:24:00', NULL),
(53, 976989781, 'Alquil Poliglucosídeo', 872, 262, 'LT', '2023-12-02 00:24:00', '2024-03-01 00:24:00', '692904'),
(54, 136019430, 'Metil Ester Sulfonato', 209, 63, 'LT', '2023-12-03 00:24:00', '2024-03-02 00:24:00', '918545'),
(55, 13654410, 'Tripolifosfato de Sódio', 550, 165, 'LT', '2023-12-04 00:24:00', '2024-03-03 00:24:00', NULL),
(56, 520207789, 'Etanolamina', 17, 5, 'LT', '2023-12-05 00:24:00', '2024-03-04 00:24:00', '912939'),
(57, 498859640, 'Ácido Fosfórico', 692, 208, 'LT', '2023-12-06 00:24:00', '2024-03-05 00:24:00', '156143'),
(58, 827568027, 'Peróxido de Hidrogênio', 748, 224, 'LT', '2023-12-07 00:24:00', '2024-03-06 00:24:00', '274872'),
(59, 958248635, 'Glutaraldeído', 453, 136, 'LT', '2023-12-08 00:24:00', '2024-03-07 00:24:00', '542903'),
(60, 333606969, 'Nitrilotriacetato de Sódio', 852, 256, 'LT', '2023-12-09 00:24:00', '2024-03-08 00:24:00', NULL),
(61, 481730915, 'Butilglicol', 538, 161, 'LT', '2023-12-10 00:24:00', '2024-03-09 00:24:00', NULL),
(62, 334695147, 'EDTA (Ácido Etilenodiamino Tetraacético)', 383, 115, 'LT', '2023-12-11 00:24:00', '2024-03-10 00:24:00', NULL),
(63, 398815378, 'Cloreto de Benzalcônio', 268, 80, 'LT', '2023-12-12 00:24:00', '2024-03-11 00:24:00', '661122'),
(64, 645279833, 'Monoetanolamina', 70, 21, 'LT', '2023-12-13 00:24:00', '2024-03-12 00:24:00', NULL),
(65, 685496925, 'Sulfato de Alumínio', 520, 156, 'LT', '2023-12-14 00:24:00', '2024-03-13 00:24:00', '417616'),
(66, 487655347, 'Ácido Sulfônico Linear', 791, 237, 'LT', '2023-12-15 00:24:00', '2024-01-02 00:00:00', '221017'),
(67, 519443874, 'Hexametafosfato de Sódio', 525, 158, 'LT', '2023-12-16 00:24:00', '2024-03-15 00:24:00', NULL),
(68, 523667935, 'Poliacrilato de Sódio', 904, 271, 'LT', '2023-12-17 00:24:00', '2024-03-16 00:24:00', NULL),
(69, 501026011, 'Ácido Lático', 253, 76, 'LT', '2023-12-18 00:24:00', '2024-03-17 00:24:00', '289511'),
(70, 785759197, 'Polioxietileno Alquil Éter', 412, 124, 'LT', '2023-12-19 00:24:00', '2024-03-18 00:24:00', '896200'),
(71, 952249041, 'Dodecilbenzeno Sulfonato de Sódio', 181, 54, 'LT', '2023-12-20 00:24:00', '2024-03-19 00:24:00', '275212'),
(72, 858693993, 'Ácido Graxo', 328, 98, 'LT', '2023-12-21 00:24:00', '2024-03-20 00:24:00', '247757'),
(73, 740458485, 'Fosfato Trissódico', 224, 67, 'LT', '2023-12-22 00:24:00', '2024-03-21 00:24:00', '711818'),
(74, 278442464, 'Polissorbato 20', 159, 48, 'LT', '2023-12-23 00:24:00', '2024-03-22 00:24:00', '934535'),
(75, 286059397, 'N,N-Dimetilformamida', 681, 204, 'LT', '2023-12-24 00:24:00', '2024-01-02 00:00:00', '730442'),
(76, 502833455, 'Borato de Sódio', 919, 276, 'LT', '2023-12-25 00:24:00', '2024-03-24 00:24:00', '1747'),
(77, 562080078, 'Ácido Cítrico Monoidratado', 564, 169, 'LT', '2023-12-26 00:24:00', '2024-03-25 00:24:00', '631777'),
(78, 425062388, 'Triclosan', 986, 296, 'LT', '2023-12-27 00:24:00', '2024-03-26 00:24:00', '934789'),
(79, 601887429, 'Metassilicato de Sódio', 364, 109, 'LT', '2023-12-28 00:24:00', '2024-03-27 00:24:00', '32381'),
(80, 288490771, 'Citrato de Sódio', 541, 162, 'LT', '2023-12-29 00:24:00', '2024-03-28 00:24:00', '451593'),
(81, 531753058, 'Gluconato de Sódio', 842, 253, 'LT', '2023-12-30 00:24:00', '2024-03-29 00:24:00', '416975'),
(82, 827690297, 'Ácido Oxálico', 249, 75, 'LT', '2023-12-31 00:24:00', '2024-03-30 00:24:00', '290391'),
(83, 216773769, 'Acetato de Etila', 519, 156, 'LT', '2024-01-01 00:24:00', '2024-03-31 00:24:00', '493119'),
(84, 69039821, 'Dodecil Éter Sulfato de Sódio', 552, 166, 'LT', '2024-01-02 00:24:00', '2024-04-01 00:24:00', '422285'),
(85, 385675798, 'Lauril Éter Sulfato de Sódio', 780, 234, 'LT', '2024-01-03 00:24:00', '2024-04-02 00:24:00', '210682'),
(86, 974901761, 'Bissulfato de Sódio', 264, 79, 'LT', '2024-01-04 00:24:00', '2024-04-03 00:24:00', '654595'),
(87, 311091390, 'Glicerina', 796, 239, 'LT', '2024-01-05 00:24:00', '2024-04-04 00:24:00', '928521'),
(88, 489870175, 'Ácido Fórmico', 568, 170, 'LT', '2024-01-06 00:24:00', '2024-04-05 00:24:00', '538978'),
(89, 810262749, 'Ácido Fumárico', 522, 157, 'LT', '2024-01-07 00:24:00', '2024-04-06 00:24:00', '101502'),
(90, 745633504, 'Sulfato de Cobre', 797, 239, 'LT', '2024-01-08 00:24:00', '2024-04-07 00:24:00', '184378'),
(91, 666124665, 'Bicarbonato de Sódio', 791, 237, 'LT', '2024-01-09 00:24:00', '2024-04-08 00:24:00', '201606'),
(92, 281946456, 'Glutarato de Dietilenotriamina', 931, 279, 'LT', '2024-01-10 00:24:00', '2024-04-09 00:24:00', '552432'),
(93, 267832024, 'Alquil Dimetilamina Óxido', 510, 153, 'LT', '2024-01-11 00:24:00', '2024-04-10 00:24:00', '293202'),
(94, 271646999, 'Dióxido de Cloro', 271, 81, 'LT', '2024-01-12 00:24:00', '2024-01-02 00:00:00', '678099'),
(95, 572024992, 'Ácido Cítrico Anidro', 926, 278, 'LT', '2024-01-13 00:24:00', '2024-04-12 00:24:00', '43945'),
(96, 26302346, 'Monoetanolamina (MEA)', 695, 209, 'LT', '2024-01-14 00:24:00', '2024-04-13 00:24:00', '512553'),
(97, 395046277, 'Ácido Sulfúrico', 378, 113, 'LT', '2024-01-15 00:24:00', '2024-04-14 00:24:00', '471615'),
(98, 862174315, 'Sulfato de Magnésio', 842, 253, 'LT', '2024-01-16 00:24:00', '2024-04-15 00:24:00', '400448'),
(99, 942674315, 'Ácido Cítrico Monoidratado', 834, 250, 'LT', '2024-01-17 00:24:00', '2024-04-16 00:24:00', '462964'),
(100, 842753184, 'Peróxido de Benzoíla', 148, 44, 'LT', '2024-01-18 00:24:00', '2024-04-17 00:24:00', '108659'),
(101, 144150927, 'Citrato de Amônio', 927, 278, 'LT', '2024-01-19 00:24:00', '2024-04-18 00:24:00', '719839'),
(102, 25973458, 'Alquil Polietoxilado', 499, 150, 'LT', '2024-01-20 00:24:00', '2024-04-19 00:24:00', '992612'),
(103, 886264226, 'Butilglicol', 373, 112, 'LT', '2024-01-21 00:24:00', '2024-04-20 00:24:00', '14577'),
(104, 349131764, 'Ácido Sulfâmico', 344, 103, 'LT', '2024-01-22 00:24:00', '2024-04-21 00:24:00', '138951'),
(105, 795365944, 'Lauroil Sarcosinato de Sódio', 907, 272, 'LT', '2024-01-23 00:24:00', '2024-04-22 00:24:00', '948531'),
(106, 458374174, 'Borato de Sódio', 975, 293, 'LT', '2024-01-24 00:24:00', '2024-01-02 00:00:00', '170719'),
(107, 12385502, 'Hidróxido de Potássio', 623, 187, 'LT', '2024-01-25 00:24:00', '2024-04-24 00:24:00', '382415'),
(108, 607353089, 'Metassilicato de Sódio', 623, 187, 'LT', '2024-01-26 00:24:00', '2024-04-25 00:24:00', '407451'),
(109, 782603548, 'Acetato de Amônio', 330, 99, 'LT', '2024-01-27 00:24:00', '2024-04-26 00:24:00', '274713'),
(110, 294292839, 'Ácido Peracético', 529, 159, 'LT', '2024-01-28 00:24:00', '2024-04-27 00:24:00', '253387'),
(111, 846661058, 'Fosfato de Cálcio', 654, 196, 'LT', '2024-01-29 00:24:00', '2024-04-28 00:24:00', '351580'),
(112, 102494071, 'Cloreto de Cálcio', 455, 137, 'LT', '2024-01-30 00:24:00', '2024-04-29 00:24:00', '831696'),
(113, 695563858, 'EDTA Dissódico', 218, 65, 'LT', '2024-01-31 00:24:00', '2024-04-30 00:24:00', '665684'),
(114, 926057797, 'Lauril Éter Sulfato de Amônio', 756, 227, 'LT', '2024-02-01 00:24:00', '2024-05-01 00:24:00', '744474'),
(115, 703290115, 'Ácido Fosfórico', 97, 29, 'LT', '2024-02-02 00:24:00', '2024-05-02 00:24:00', '56666'),
(116, 49740575, 'Goma Xantana', 816, 245, 'LT', '2024-02-03 00:24:00', '2024-05-03 00:24:00', '839579'),
(117, 733568116, 'Monoetanolamina', 348, 104, 'LT', '2024-02-04 00:24:00', '2024-05-04 00:24:00', '999574'),
(118, 806941534, 'Ácido Oxálico', 146, 44, 'LT', '2024-02-05 00:24:00', '2024-05-05 00:24:00', '236642'),
(119, 570858459, 'Propilenoglicol', 247, 74, 'LT', '2024-02-06 00:24:00', '2024-01-02 00:00:00', '585564'),
(120, 816033382, 'Hidróxido de Amônio', 994, 298, 'LT', '2024-02-07 00:24:00', '2024-05-07 00:24:00', '461642'),
(121, 989861829, 'Ácido Lático', 364, 109, 'LT', '2024-02-08 00:24:00', '2024-05-08 00:24:00', '824380'),
(122, 301758628, 'Ácido Acético', 590, 177, 'LT', '2024-02-09 00:24:00', '2024-05-09 00:24:00', '337051'),
(123, 253780826, 'Polissorbato 80', 684, 205, 'LT', '2024-02-10 00:24:00', '2024-05-10 00:24:00', '770031'),
(124, 514664897, 'Ácido Nítrico', 150, 291, 'LT', '2024-02-11 00:24:00', '2024-05-11 00:24:00', '660944'),
(125, 1850983, 'EDTA Tetrassódico', 712, 214, 'LT', '2024-02-12 00:24:00', '2024-05-12 00:24:00', '537540'),
(126, 208620991, 'Butilglicol', 152, 46, 'LT', '2024-02-13 00:24:00', '2024-05-13 00:24:00', '490670'),
(127, 645282050, 'Sulfato de Alumínio', 371, 111, 'LT', '2024-02-14 00:24:00', '2024-01-02 00:00:00', '700267'),
(128, 397600423, 'Ácido Glicólico', 150, 205, 'LT', '2024-02-15 00:24:00', '2024-05-15 00:24:00', '604227'),
(129, 499392585, 'Lauril Sulfato de Trietanolamina', 315, 95, 'LT', '2024-02-16 00:24:00', '2024-05-16 00:24:00', '485825'),
(130, 56465560, 'Bissulfato de Sódio', 341, 102, 'LT', '2024-02-17 00:24:00', '2024-05-17 00:24:00', '743997'),
(131, 979341637, 'Fosfato Trissódico', 336, 101, 'LT', '2024-02-18 00:24:00', '2024-05-18 00:24:00', '46252'),
(132, 648176111, 'Hexametafosfato de Sódio', 555, 167, 'LT', '2024-02-19 00:24:00', '2024-05-19 00:24:00', '850652'),
(133, 916807767, 'Pirofosfato de Sódio', 59, 18, 'LT', '2024-02-20 00:24:00', '2024-05-20 00:24:00', '634782'),
(134, 356706323, 'Glicerina', 160, 48, 'LT', '2024-02-21 00:24:00', '2024-05-21 00:24:00', '951445'),
(135, 732098005, 'Ácido Fórmico', 818, 245, 'LT', '2024-02-22 00:24:00', '2024-01-02 00:00:00', '446539'),
(136, 926398643, 'Ácido Fumárico', 72, 22, 'LT', '2024-02-23 00:24:00', '2024-05-23 00:24:00', '701221'),
(137, 984682199, 'Sulfato de Cobre', 150, 227, 'LT', '2024-02-24 00:24:00', '2024-05-24 00:24:00', '460002'),
(138, 473477693, 'Ácido Tartárico', 77, 23, 'LT', '2024-02-25 00:24:00', '2024-05-25 00:24:00', '61692'),
(139, 91705495, 'Citrato de Potássio', 795, 239, 'LT', '2024-02-26 00:24:00', '2024-05-26 00:24:00', '322929'),
(140, 653969987, 'Dióxido de Enxofre', 695, 209, 'LT', '2024-02-27 00:24:00', '2024-05-27 00:24:00', '553147'),
(141, 776609648, 'Metassilicato de Sódio', 150, 258, 'LT', '2024-02-28 00:24:00', '2024-05-28 00:24:00', '764661'),
(142, 892513736, 'Cloreto de Magnésio', 380, 114, 'LT', '2024-02-29 00:24:00', '2024-05-29 00:24:00', '960428'),
(143, 132364150, 'Goma Guar', 730, 219, 'LT', '2024-03-01 00:24:00', '2024-05-30 00:24:00', '280592'),
(144, 104101162, 'Ácido Cítrico Anidro', 747, 224, 'LT', '2024-03-02 00:24:00', '2024-05-31 00:24:00', '228396'),
(145, 249850928, 'PEG (Polietilenoglicol)', 27, 8, 'LT', '2024-03-03 00:24:00', '2024-06-01 00:24:00', '663538'),
(146, 873071489, 'Linalol', 469, 141, 'LT', '2024-03-04 00:24:00', '2024-06-02 00:24:00', '725087'),
(147, 393863284, 'Benzeno Sulfônico de Sódio', 242, 73, 'LT', '2024-03-05 00:24:00', '2024-06-03 00:24:00', '19512'),
(148, 113662428, 'Ácido Láctico', 150, 207, 'LT', '2024-03-06 00:24:00', '2024-06-04 00:24:00', '308463'),
(149, 559636492, 'Ácido Crômico', 905, 272, 'LT', '2024-03-07 00:24:00', '2024-06-05 00:24:00', '227179'),
(150, 180000872, 'Acetato de Cálcio', 110, 33, 'LT', '2024-03-08 00:24:00', '2024-06-06 00:24:00', '661534'),
(151, 856188903, 'Polietileno Glicol', 404, 121, 'LT', '2024-03-09 00:24:00', '2024-06-07 00:24:00', '565974'),
(152, 534244480, 'Ácido Sulfâmico', 202, 61, 'LT', '2024-03-10 00:24:00', '2024-06-08 00:24:00', '135757'),
(153, 221544691, 'Sulfato de Zinco', 495, 149, 'LT', '2024-03-11 00:24:00', '2024-06-09 00:24:00', '5646'),
(154, 16524827, 'Bicarbonato de Potássio', 37, 11, 'LT', '2024-03-12 00:24:00', '2024-06-10 00:24:00', '800655'),
(155, 437464844, 'Ácido Benzóico', 778, 233, 'LT', '2024-03-13 00:24:00', '2024-06-11 00:24:00', '614093'),
(156, 271361975, 'Ácido Fosfórico', 109, 33, 'LT', '2024-03-14 00:24:00', '2024-06-12 00:24:00', '352342'),
(157, 890314775, 'Goma Arábica', 249, 75, 'LT', '2024-03-15 00:24:00', '2024-06-13 00:24:00', '539944'),
(158, 268881092, 'Ácido Glicólico', 351, 105, 'LT', '2024-03-16 00:24:00', '2024-06-14 00:24:00', '999164'),
(159, 8158898, 'Dióxido de Cloro', 946, 284, 'LT', '2024-03-17 00:24:00', '2024-06-15 00:24:00', '778245'),
(160, 528931626, 'Ácido Ortofosfórico', 839, 252, 'LT', '2024-03-18 00:24:00', '2024-06-16 00:24:00', '262682'),
(161, 128515031, 'Lauril Éter Sulfato de Potássio', 288, 86, 'LT', '2024-03-19 00:24:00', '2024-06-17 00:24:00', '827407'),
(162, 593587897, 'Nitrato de Sódio', 846, 254, 'LT', '2024-03-20 00:24:00', '2024-06-18 00:24:00', '490851'),
(163, 215584888, 'Fosfato de Amônio', 419, 126, 'LT', '2024-03-21 00:24:00', '2024-06-19 00:24:00', '604136'),
(164, 38539391, 'Ácido Sulfúrico', 320, 96, 'LT', '2024-03-22 00:24:00', '2024-06-20 00:24:00', '293250'),
(165, 363482790, 'Cloreto de Sódio', 755, 227, 'LT', '2024-03-23 00:24:00', '2024-06-21 00:24:00', '680680'),
(166, 914692944, 'Bórax', 801, 240, 'LT', '2024-03-24 00:24:00', '2024-06-22 00:24:00', '148632'),
(167, 481607525, 'Ácido Cítrico Monoidratado', 759, 228, 'LT', '2024-03-25 00:24:00', '2024-06-23 00:24:00', '74787'),
(168, 637094524, 'Monoetanolamina (MEA)', 669, 201, 'LT', '2024-03-26 00:24:00', '2024-06-24 00:24:00', '720281'),
(169, 239207938, 'Peróxido de Benzoíla', 535, 161, 'LT', '2024-03-27 00:24:00', '2024-06-25 00:24:00', '879415'),
(170, 495694298, 'Citrato de Amônio', 248, 74, 'LT', '2024-03-28 00:24:00', '2024-06-26 00:24:00', '573875'),
(171, 361978506, 'Alquil Polietoxilado', 15, 5, 'LT', '2024-03-29 00:24:00', '2024-06-27 00:24:00', '185035'),
(172, 476582825, 'Butilglicol', 429, 129, 'LT', '2024-03-30 00:24:00', '2024-06-28 00:24:00', '719235'),
(173, 842129436, 'Ácido Sulfâmico', 78, 23, 'LT', '2024-03-31 00:24:00', '2024-06-29 00:24:00', '265601'),
(174, 17818306, 'Lauroil Sarcosinato de Sódio', 856, 257, 'LT', '2024-04-01 00:24:00', '2024-06-30 00:24:00', '242103'),
(175, 521952799, 'Borato de Sódio', 366, 110, 'LT', '2024-04-02 00:24:00', '2024-07-01 00:24:00', '25003'),
(176, 85387997, 'Hidróxido de Potássio', 417, 125, 'LT', '2024-04-03 00:24:00', '2024-07-02 00:24:00', '404399'),
(177, 584096204, 'Metassilicato de Sódio', 42, 156, 'LT', '2024-04-04 00:24:00', '2024-07-03 00:24:00', '575657'),
(178, 776100716, 'Acetato de Amônio', 94, 109, 'LT', '2024-04-05 00:24:00', '2024-07-04 00:24:00', '520417'),
(179, 591836812, 'Ácido Peracético', 59, 124, 'LT', '2024-04-06 00:24:00', '2024-07-05 00:24:00', '628274'),
(180, 314153781, 'Fosfato de Cálcio', 83, 144, 'LT', '2024-04-07 00:24:00', '2024-07-06 00:24:00', '493542'),
(181, 429394310, 'Cloreto de Cálcio', 96, 129, 'LT', '2024-04-08 00:24:00', '2024-07-07 00:24:00', '569411'),
(182, 222307815, 'EDTA Dissódico', 10, 127, 'LT', '2024-04-09 00:24:00', '2024-07-08 00:24:00', '26751'),
(183, 976201827, 'Lauril Éter Sulfato de Amônio', 57, 176, 'LT', '2024-04-10 00:24:00', '2024-07-09 00:24:00', '15444'),
(184, 518197925, 'Ácido Fosfórico', 58, 120, 'LT', '2024-04-11 00:24:00', '2024-07-10 00:24:00', '462782'),
(185, 781155818, 'Goma Xantana', 27, 141, 'LT', '2024-04-12 00:24:00', '2024-07-11 00:24:00', '496238'),
(186, 922886831, 'Monoetanolamina', 18, 163, 'LT', '2024-04-13 00:24:00', '2024-07-12 00:24:00', '631765'),
(187, 268452081, 'Ácido Oxálico', 71, 140, 'LT', '2024-04-14 00:24:00', '2024-07-13 00:24:00', NULL),
(188, 235014331, 'Propilenoglicol', 98, 183, 'LT', '2024-04-15 00:24:00', '2024-07-14 00:24:00', '861025'),
(189, 860571715, 'Hidróxido de Amônio', 30, 109, 'LT', '2024-04-16 00:24:00', '2024-07-15 00:24:00', '251855'),
(190, 406237609, 'Ácido Lático', 26, 179, 'LT', '2024-04-17 00:24:00', '2024-07-16 00:24:00', NULL),
(191, 969273239, 'Ácido Acético', 68, 106, 'LT', '2024-04-18 00:24:00', '2024-07-17 00:24:00', '380854'),
(192, 558953201, 'Polissorbato 80', 21, 103, 'LT', '2024-04-19 00:24:00', '2024-07-18 00:24:00', '644564'),
(193, 981216725, 'Ácido Nítrico', 19, 174, 'LT', '2024-04-20 00:24:00', '2024-07-19 00:24:00', NULL),
(194, 648207262, 'EDTA Tetrassódico', 23, 100, 'LT', '2024-04-21 00:24:00', '2024-07-20 00:24:00', '912703'),
(195, 72333778, 'Butilglicol', 95, 161, 'LT', '2024-04-22 00:24:00', '2024-07-21 00:24:00', '812180'),
(196, 955977743, 'Sulfato de Alumínio', 84, 198, 'LT', '2024-04-23 00:24:00', '2024-07-22 00:24:00', NULL),
(197, 354387054, 'Ácido Glicólico', 24, 157, 'LT', '2024-04-24 00:24:00', '2024-07-23 00:24:00', NULL),
(198, 871799248, 'Lauril Sulfato de Trietanolamina', 93, 108, 'LT', '2024-04-25 00:24:00', '2024-07-24 00:24:00', NULL),
(199, 307674750, 'Bissulfato de Sódio', 86, 164, 'LT', '2024-04-26 00:24:00', '2024-07-25 00:24:00', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` mediumint(8) UNSIGNED NOT NULL,
  `film_id` smallint(5) UNSIGNED NOT NULL,
  `store_id` tinyint(3) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `language`
--

CREATE TABLE `language` (
  `language_id` tinyint(3) UNSIGNED NOT NULL,
  `name` char(20) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `nicer_but_slower_film_list`
--

CREATE TABLE `nicer_but_slower_film_list` (
  `FID` int(11) DEFAULT NULL,
  `title` int(11) DEFAULT NULL,
  `description` int(11) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `actors` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ordem_serviço`
--

CREATE TABLE `ordem_serviço` (
  `id_ordem_serviço` int(11) NOT NULL,
  `solicitante` varchar(45) DEFAULT NULL,
  `data_solicitacao` date DEFAULT NULL,
  `solicitante_solicitante_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `payment`
--

CREATE TABLE `payment` (
  `payment_id` smallint(5) UNSIGNED NOT NULL,
  `customer_id` smallint(5) UNSIGNED NOT NULL,
  `staff_id` tinyint(3) UNSIGNED NOT NULL,
  `rental_id` int(11) DEFAULT NULL,
  `amount` decimal(5,2) NOT NULL,
  `payment_date` datetime NOT NULL,
  `last_update` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos_solitados`
--

CREATE TABLE `produtos_solitados` (
  `Ordem_serviço_id_ordem_serviço` int(11) NOT NULL,
  `Produto_final_idProduto_final` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto_final`
--

CREATE TABLE `produto_final` (
  `idProduto_final` int(11) NOT NULL,
  `nome_produto` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `produto_final`
--

INSERT INTO `produto_final` (`idProduto_final`, `nome_produto`) VALUES
(0, 'BRUNO BUENO SAFADO'),
(1, 'Produto Teste 1'),
(2, 'Produto Teste 2'),
(3, 'produto agora'),
(4, 'safadinho 123 safadão'),
(7, 'maae');

-- --------------------------------------------------------

--
-- Estrutura para tabela `quimico_responsavel`
--

CREATE TABLE `quimico_responsavel` (
  `idQuimico_responsavel` int(11) NOT NULL,
  `crq_quimico_responsavel` varchar(45) DEFAULT NULL,
  `data_admissao` date DEFAULT NULL,
  `data_vigencia` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `receita`
--

CREATE TABLE `receita` (
  `idReceita` int(11) NOT NULL,
  `nome_receita` varchar(45) DEFAULT NULL,
  `descricao_receita` varchar(45) DEFAULT NULL,
  `quiemico_responsavel_id` int(11) DEFAULT NULL,
  `Produto_final_idProduto_final` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `rental`
--

CREATE TABLE `rental` (
  `rental_id` int(11) NOT NULL,
  `rental_date` datetime NOT NULL,
  `inventory_id` mediumint(8) UNSIGNED NOT NULL,
  `customer_id` smallint(5) UNSIGNED NOT NULL,
  `return_date` datetime DEFAULT NULL,
  `staff_id` tinyint(3) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sales_by_film_category`
--

CREATE TABLE `sales_by_film_category` (
  `category` int(11) DEFAULT NULL,
  `total_sales` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sales_by_store`
--

CREATE TABLE `sales_by_store` (
  `store` int(11) DEFAULT NULL,
  `manager` int(11) DEFAULT NULL,
  `total_sales` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `solicitante`
--

CREATE TABLE `solicitante` (
  `solicitante_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `staff`
--

CREATE TABLE `staff` (
  `staff_id` tinyint(3) UNSIGNED NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `address_id` smallint(5) UNSIGNED NOT NULL,
  `picture` blob DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `store_id` tinyint(3) UNSIGNED NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `username` varchar(16) NOT NULL,
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `staff_list`
--

CREATE TABLE `staff_list` (
  `ID` int(11) DEFAULT NULL,
  `name` int(11) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `zip code` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `country` int(11) DEFAULT NULL,
  `SID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `store`
--

CREATE TABLE `store` (
  `store_id` tinyint(3) UNSIGNED NOT NULL,
  `manager_staff_id` tinyint(3) UNSIGNED NOT NULL,
  `address_id` smallint(5) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome_usuario` varchar(255) DEFAULT NULL,
  `email_usuario` varchar(255) DEFAULT NULL,
  `senha_usuario` varchar(255) DEFAULT NULL,
  `tipo_usuario` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome_usuario`, `email_usuario`, `senha_usuario`, `tipo_usuario`) VALUES
(1, 'Teste1', 'adm@teste.com', 'teste123', 'ADM'),
(2, 'Test2', 'ope@teste.com', 'teste123', 'OPE');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `actor`
--
ALTER TABLE `actor`
  ADD PRIMARY KEY (`actor_id`),
  ADD KEY `idx_actor_last_name` (`last_name`);

--
-- Índices de tabela `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `idx_fk_city_id` (`city_id`);

--
-- Índices de tabela `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Índices de tabela `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `idx_fk_country_id` (`country_id`);

--
-- Índices de tabela `com_compra`
--
ALTER TABLE `com_compra`
  ADD PRIMARY KEY (`com_id`),
  ADD KEY `fk_com_compra_for_fornecedor1_idx` (`for_fornecedor_for_id`);

--
-- Índices de tabela `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`country_id`);

--
-- Índices de tabela `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `idx_fk_store_id` (`store_id`),
  ADD KEY `idx_fk_address_id` (`address_id`),
  ADD KEY `idx_last_name` (`last_name`);

--
-- Índices de tabela `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`film_id`),
  ADD KEY `idx_title` (`title`),
  ADD KEY `idx_fk_language_id` (`language_id`),
  ADD KEY `idx_fk_original_language_id` (`original_language_id`);

--
-- Índices de tabela `film_actor`
--
ALTER TABLE `film_actor`
  ADD PRIMARY KEY (`actor_id`,`film_id`),
  ADD KEY `idx_fk_film_id` (`film_id`),
  ADD KEY `fk_film_actor_actor_idx` (`actor_id`);

--
-- Índices de tabela `film_category`
--
ALTER TABLE `film_category`
  ADD PRIMARY KEY (`film_id`,`category_id`),
  ADD KEY `fk_film_category_category_idx` (`category_id`),
  ADD KEY `fk_film_category_film_idx` (`film_id`);

--
-- Índices de tabela `film_text`
--
ALTER TABLE `film_text`
  ADD PRIMARY KEY (`film_id`);
ALTER TABLE `film_text` ADD FULLTEXT KEY `idx_title_description` (`title`,`description`);

--
-- Índices de tabela `fin_fornecedor_insumo`
--
ALTER TABLE `fin_fornecedor_insumo`
  ADD PRIMARY KEY (`fin_id`),
  ADD KEY `fk_ins_Insumo_has_Fornecedor_Fornecedor1_idx` (`id_fornecedor`),
  ADD KEY `fk_ins_Insumo_has_Fornecedor_ins_Insumo1_idx` (`ins_id`),
  ADD KEY `fk_fin_fornecedor_insumo_com_compra1_idx` (`com_compra_com_id`);

--
-- Índices de tabela `for_fornecedor`
--
ALTER TABLE `for_fornecedor`
  ADD PRIMARY KEY (`for_id`);

--
-- Índices de tabela `insumo_receita`
--
ALTER TABLE `insumo_receita`
  ADD PRIMARY KEY (`idInsumo_receita`),
  ADD KEY `fk_insumo_receita_insuo_id_idx` (`insumo_id`),
  ADD KEY `fk_insumo_receita_receita_id_idx` (`receita_id`);

--
-- Índices de tabela `ins_insumo`
--
ALTER TABLE `ins_insumo`
  ADD PRIMARY KEY (`ins_id`);

--
-- Índices de tabela `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `idx_fk_film_id` (`film_id`),
  ADD KEY `idx_store_id_film_id` (`store_id`,`film_id`),
  ADD KEY `fk_inventory_store_idx` (`store_id`);

--
-- Índices de tabela `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`language_id`);

--
-- Índices de tabela `ordem_serviço`
--
ALTER TABLE `ordem_serviço`
  ADD PRIMARY KEY (`id_ordem_serviço`),
  ADD KEY `fk_Ordem_serviço_solicitante1_idx` (`solicitante_solicitante_id`);

--
-- Índices de tabela `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `idx_fk_staff_id` (`staff_id`),
  ADD KEY `idx_fk_customer_id` (`customer_id`),
  ADD KEY `fk_payment_rental_idx` (`rental_id`);

--
-- Índices de tabela `produtos_solitados`
--
ALTER TABLE `produtos_solitados`
  ADD PRIMARY KEY (`Ordem_serviço_id_ordem_serviço`,`Produto_final_idProduto_final`),
  ADD KEY `fk_Ordem_serviço_has_Produto_final_Produto_final1_idx` (`Produto_final_idProduto_final`),
  ADD KEY `fk_Ordem_serviço_has_Produto_final_Ordem_serviço1_idx` (`Ordem_serviço_id_ordem_serviço`);

--
-- Índices de tabela `produto_final`
--
ALTER TABLE `produto_final`
  ADD PRIMARY KEY (`idProduto_final`);

--
-- Índices de tabela `quimico_responsavel`
--
ALTER TABLE `quimico_responsavel`
  ADD PRIMARY KEY (`idQuimico_responsavel`);

--
-- Índices de tabela `receita`
--
ALTER TABLE `receita`
  ADD PRIMARY KEY (`idReceita`),
  ADD KEY `fk_receita_quimico_responsavel_id_idx` (`quiemico_responsavel_id`),
  ADD KEY `fk_Receita_Produto_final1_idx` (`Produto_final_idProduto_final`);

--
-- Índices de tabela `rental`
--
ALTER TABLE `rental`
  ADD PRIMARY KEY (`rental_id`),
  ADD UNIQUE KEY `idx_rental` (`rental_date`,`inventory_id`,`customer_id`),
  ADD KEY `idx_fk_inventory_id` (`inventory_id`),
  ADD KEY `idx_fk_customer_id` (`customer_id`),
  ADD KEY `idx_fk_staff_id` (`staff_id`);

--
-- Índices de tabela `solicitante`
--
ALTER TABLE `solicitante`
  ADD PRIMARY KEY (`solicitante_id`);

--
-- Índices de tabela `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `idx_fk_store_id` (`store_id`),
  ADD KEY `idx_fk_address_id` (`address_id`);

--
-- Índices de tabela `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_id`),
  ADD UNIQUE KEY `idx_unique_manager` (`manager_staff_id`),
  ADD KEY `idx_fk_address_id` (`address_id`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `actor`
--
ALTER TABLE `actor`
  MODIFY `actor_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `address`
--
ALTER TABLE `address`
  MODIFY `address_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `category`
--
ALTER TABLE `category`
  MODIFY `category_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `city`
--
ALTER TABLE `city`
  MODIFY `city_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `country`
--
ALTER TABLE `country`
  MODIFY `country_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `film`
--
ALTER TABLE `film`
  MODIFY `film_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `fin_fornecedor_insumo`
--
ALTER TABLE `fin_fornecedor_insumo`
  MODIFY `fin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `for_fornecedor`
--
ALTER TABLE `for_fornecedor`
  MODIFY `for_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ins_insumo`
--
ALTER TABLE `ins_insumo`
  MODIFY `ins_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202;

--
-- AUTO_INCREMENT de tabela `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `language`
--
ALTER TABLE `language`
  MODIFY `language_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `rental`
--
ALTER TABLE `rental`
  MODIFY `rental_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `store`
--
ALTER TABLE `store`
  MODIFY `store_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_address_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `fk_city_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `com_compra`
--
ALTER TABLE `com_compra`
  ADD CONSTRAINT `fk_com_compra_for_fornecedor1` FOREIGN KEY (`for_fornecedor_for_id`) REFERENCES `for_fornecedor` (`for_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `fk_customer_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_customer_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `film`
--
ALTER TABLE `film`
  ADD CONSTRAINT `fk_film_language` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_film_language_original` FOREIGN KEY (`original_language_id`) REFERENCES `language` (`language_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `film_actor`
--
ALTER TABLE `film_actor`
  ADD CONSTRAINT `fk_film_actor_actor` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`actor_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_film_actor_film` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `film_category`
--
ALTER TABLE `film_category`
  ADD CONSTRAINT `fk_film_category_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_film_category_film` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `fin_fornecedor_insumo`
--
ALTER TABLE `fin_fornecedor_insumo`
  ADD CONSTRAINT `fk_fin_fornecedor_insumo_com_compra1` FOREIGN KEY (`com_compra_com_id`) REFERENCES `com_compra` (`com_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ins_Insumo_has_Fornecedor_Fornecedor1` FOREIGN KEY (`id_fornecedor`) REFERENCES `for_fornecedor` (`for_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ins_Insumo_has_Fornecedor_ins_Insumo1` FOREIGN KEY (`ins_id`) REFERENCES `ins_insumo` (`ins_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `insumo_receita`
--
ALTER TABLE `insumo_receita`
  ADD CONSTRAINT `fk_insumo_receita_insuo_id` FOREIGN KEY (`insumo_id`) REFERENCES `ins_insumo` (`ins_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_insumo_receita_receita_id` FOREIGN KEY (`receita_id`) REFERENCES `receita` (`idReceita`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `fk_inventory_film` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inventory_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `ordem_serviço`
--
ALTER TABLE `ordem_serviço`
  ADD CONSTRAINT `fk_Ordem_serviço_solicitante1` FOREIGN KEY (`solicitante_solicitante_id`) REFERENCES `solicitante` (`solicitante_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_payment_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_payment_rental` FOREIGN KEY (`rental_id`) REFERENCES `rental` (`rental_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_payment_staff` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `produtos_solitados`
--
ALTER TABLE `produtos_solitados`
  ADD CONSTRAINT `fk_Ordem_serviço_has_Produto_final_Ordem_serviço1` FOREIGN KEY (`Ordem_serviço_id_ordem_serviço`) REFERENCES `ordem_serviço` (`id_ordem_serviço`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Ordem_serviço_has_Produto_final_Produto_final1` FOREIGN KEY (`Produto_final_idProduto_final`) REFERENCES `produto_final` (`idProduto_final`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `receita`
--
ALTER TABLE `receita`
  ADD CONSTRAINT `fk_Receita_Produto_final1` FOREIGN KEY (`Produto_final_idProduto_final`) REFERENCES `produto_final` (`idProduto_final`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_receita_quimico_responsavel_id` FOREIGN KEY (`quiemico_responsavel_id`) REFERENCES `quimico_responsavel` (`idQuimico_responsavel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `rental`
--
ALTER TABLE `rental`
  ADD CONSTRAINT `fk_rental_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rental_inventory` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rental_staff` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `fk_staff_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_staff_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `fk_store_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_store_staff` FOREIGN KEY (`manager_staff_id`) REFERENCES `staff` (`staff_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
