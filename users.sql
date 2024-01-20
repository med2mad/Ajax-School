-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 20 jan. 2024 à 00:13
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `test`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`_id`, `name`, `age`, `photo`, `createdAt`, `updatedAt`) VALUES
(1, 'aa', 22, 'user.jpg', '2024-01-12 23:12:51', '2024-01-14 18:06:48'),
(5, 'a', 22, '', '2024-01-12 23:41:27', '2024-01-12 23:41:27'),
(8, 'retrgsgdfgs', 64, 'a cute asian.jpg1705175264531', '2024-01-13 12:25:11', '2024-01-13 12:25:11'),
(10, '55555', 55, 'A cute gothic girl with a sign that says my queue time is too high., Mysterious.jpeg1705178304014', '2024-01-13 19:47:01', '2024-01-13 20:38:24'),
(11, 'abcdef', 99, 'a cute asian.jpeg1705175286214', '2024-01-13 19:48:06', '2024-01-13 19:48:06'),
(15, '123123123', 54, '', '2024-01-13 19:50:29', '2024-01-13 19:50:29'),
(20, '3tretreteert', 56, '', '2024-01-14 18:06:26', '2024-01-14 18:06:26'),
(21, '45646456', 54, '3333333.jpg1705255598914', '2024-01-14 18:06:38', '2024-01-14 18:06:38'),
(22, 'retrgtsgdfgs', 64, 'a%20cute%20asian.jpg1705175264531', '2024-01-14 18:06:42', '2024-01-14 18:06:42'),
(23, '5', 55, 'user.jpg', '2024-01-14 18:28:08', '2024-01-14 18:28:08'),
(25, 'retrgsgdfgs', 64, 'a%20cute%20asian.jpg1705175264531', '2024-01-14 18:53:35', '2024-01-14 18:53:35'),
(26, 'abcdef', 99, 'a%20cute%20asian.jpeg1705175286214', '2024-01-14 19:09:02', '2024-01-14 19:09:02'),
(27, '123123123', 54, 'user.jpg', '2024-01-14 19:09:04', '2024-01-14 19:09:04'),
(29, '3tretreteert', 56, 'user.jpg', '2024-01-14 19:09:07', '2024-01-14 19:09:07'),
(30, '45646456', 54, '3333333.jpg1705255598914', '2024-01-15 00:39:21', '2024-01-15 00:39:21'),
(31, 'zzzzzzzzzzzz', 87, 'SETO tumblr_inline_osu1qdxMjs1sku8xc_500.png1705286684437', '2024-01-15 02:44:44', '2024-01-15 02:44:44'),
(33, 'query name', 100, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(34, 'new name', 66, '', '2024-01-16 16:52:02', '2024-01-16 16:52:02'),
(35, 'new name', 66, '', '2024-01-16 16:52:19', '2024-01-16 16:52:19'),
(38, 'abdjlil', 35, '', '2024-01-16 17:09:05', '2024-01-16 17:09:05'),
(40, 'billy', 45, '', '2024-01-16 17:42:44', '2024-01-17 00:30:52');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
