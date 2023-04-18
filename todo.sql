-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2023 at 08:55 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `todos`
--

CREATE TABLE `todos` (
  `id` varchar(36) NOT NULL,
  `title` varchar(150) NOT NULL,
  `deadline` datetime NOT NULL,
  `completed` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `title`, `deadline`, `completed`) VALUES
('2e901d10-2343-42ba-a146-c252c9509cbe', 'Zadanie 1', '2023-04-18 20:53:47', 0),
('6a95fd8b-3d71-4fe5-84eb-da8b40d3eefc', 'Zadanie 2', '2023-04-18 20:53:50', 0),
('6397bdb9-a20b-40d7-b3a3-6c80e729dc0b', 'Zadanie 3', '2023-04-18 20:53:53', 0),
('8068239c-4bc3-4188-a8ea-2359a0da2c7d', 'Zadanie 4', '2023-04-18 20:53:57', 0),
('4632600f-f0ef-459b-b6ee-f0d785683a2a', 'Zadanie 5', '2023-04-18 20:54:00', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
