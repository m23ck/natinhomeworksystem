-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2020 at 01:49 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nhs_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `id` int(11) NOT NULL,
  `roadmap_id` int(11) DEFAULT NULL,
  `vak_id` varchar(255) NOT NULL,
  `assignment_naam` varchar(255) NOT NULL,
  `omschrijving` text NOT NULL,
  `start_datum` date DEFAULT NULL,
  `inlever_datum` date DEFAULT NULL,
  `punten` int(255) NOT NULL,
  `herkansingspunten` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`id`, `roadmap_id`, `vak_id`, `assignment_naam`, `omschrijving`, `start_datum`, `inlever_datum`, `punten`, `herkansingspunten`) VALUES
(1, 2, '2', 'Helloworld', 'Creeer een Helloworld command-line programma met Java', '2020-09-03', '2020-09-04', 20, 15),
(2, 3, '2', 'Stelling van Pythagoras Leren', 'Maak alle opgegeven sommen en zorg ervoor dat je de stelling van pythagoras kent', '2020-09-04', '2020-09-07', 19, 14),
(3, 2, '1', 'Linux Server opzetten', 'Zet een linux server met CentOS op', '2020-09-08', '2020-09-09', 30, 20),
(4, 2, '3', 'How to Use Your Toolset ', 'Get used to the use of your personally chosen toolset and craft amazing works with it.', '2020-10-07', '2020-10-22', 10, 8),
(6, NULL, '4', 'PHP Helloworld', 'maak een helloworld app met php', '2020-10-13', '2020-10-14', 10, 8),
(7, 2, '4', 'test ', 'maak een helloworld app met php', '2020-10-14', '2020-10-29', 10, 8);

-- --------------------------------------------------------

--
-- Table structure for table `assignment_submission`
--

CREATE TABLE `assignment_submission` (
  `id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment_submission`
--

INSERT INTO `assignment_submission` (`id`, `assignment_id`, `student_id`, `status`) VALUES
(2, 3, 11, 'approved'),
(3, 2, 11, 'approved'),
(4, 3, 11, 'submitted');

-- --------------------------------------------------------

--
-- Table structure for table `docent_richting`
--

CREATE TABLE `docent_richting` (
  `id` int(11) NOT NULL,
  `docent_id` int(11) NOT NULL,
  `richting_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `docent_vak`
--

CREATE TABLE `docent_vak` (
  `id` int(11) NOT NULL,
  `docent_id` int(11) NOT NULL,
  `vak_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `gebruiker`
--

CREATE TABLE `gebruiker` (
  `id` int(11) NOT NULL,
  `gebruiker_type_id` int(11) NOT NULL,
  `naam` varchar(255) NOT NULL,
  `voornaam` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cohort` int(11) DEFAULT NULL,
  `telefoon` int(11) DEFAULT NULL,
  `adres` varchar(255) DEFAULT NULL,
  `wachtwoord` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gebruiker`
--

INSERT INTO `gebruiker` (`id`, `gebruiker_type_id`, `naam`, `voornaam`, `email`, `cohort`, `telefoon`, `adres`, `wachtwoord`, `status`) VALUES
(2, 1, 'Mack', 'Andojo', 'andojomack@gmail.com', 2016, 7254402, 'Mahadew Missierweg 43', '$2b$10$ZfTF0q7Sqt4DHin/.TQQ6OjiWUa7ml//RolkM7I2V6JGCjTuaViR2', ''),
(3, 2, 'Raghosing', 'Sardha', 'rs@gmail.com', NULL, 8564321, 'RS Straat 43', '$2b$10$ziYuAMAszXxLE665UETOPOEzMTn88FunVmfnPEIh1Ddii/GEyOyla', ''),
(4, 2, 'Tdlohreg', 'Mayra', 'tmayra@gmail.com', NULL, 79765421, 'mayraStraat 43', '$2b$10$OZR6jLhnPRRIifHnLuyhaOEmz2nHeUARs66OYZwzV3uBrxc5Ocbyi', ''),
(8, 1, 'Monorath', 'Raman', 'ramanmono@yahoo.com', NULL, 8954326, 'monorathweg 11', '$2b$10$JeSTIDvKV3OZsC4e7qq5CeH3wbNUadxR2p1ZaXFbuWe.hqxW8/0Be', ''),
(10, 3, 'Latchmansing', 'Kenson', 'klsing@gmail.com', 2016, 8954326, 'singweg 3', '$2b$10$Uf6bBquL.O5.BIx.f8N43eitK9DtHozXRfKnE/odSGiMDo03IOYMK', 'new'),
(11, 3, 'Samadhan', 'Shaniel', 'esaniello@gmail.com', 2016, 8786854, 'lalaweg 1', '$2b$10$oMj53GYhe6ZnSvuSrRG2xurVEgCX2QTACItDAunz/jet4GkQHbCVi', 'new'),
(13, 2, 'Hammen', 'Joann', 'hamj@gmail.com', NULL, 8582853, 'hammenstraat 5', '$2b$10$c4PkAdIkz8A9Xh5JNERj6eQvdoZuqAYEAuLTBM0YoGMQF9iGEaFCy', 'new'),
(14, 1, 'peralta', 'Jake', 'jp@gmail.com', NULL, 8987845, 'perastraat 7', '$2b$10$AysVOXwVerazmiLDQNYVFugqldaUkcCm.fFlpPqdHH3WiRymUg6qS', 'new'),
(15, 3, 'Uiterlo', 'Lesley', 'lulu@gmail.com', 2017, 8855231, 'anniestraat 6', '$2b$10$rpT7HBXBXbbO7jIqzl2ZMeC5NcIhsutAic/fTGgdlx.GG73FP49Zi', 'new'),
(16, 3, 'Mack', 'Tafarel', 'tmack', 2020, 8587845, 'itstraat 20', '$2b$10$EHHdDBik/9hTgCA7dz0LLuvkCxTgg8RbOqFcqBsDaz3fZAJjbEt1W', 'new');

-- --------------------------------------------------------

--
-- Table structure for table `jaar_klas`
--

CREATE TABLE `jaar_klas` (
  `id` int(11) NOT NULL,
  `klas_id` int(11) NOT NULL,
  `richting_id` int(11) NOT NULL,
  `jaar` int(11) NOT NULL,
  `klassendocent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jaar_klas`
--

INSERT INTO `jaar_klas` (`id`, `klas_id`, `richting_id`, `jaar`, `klassendocent_id`) VALUES
(1, 6, 1, 2019, 3),
(2, 8, 2, 2017, 4),
(3, 9, 3, 2018, 3),
(4, 10, 3, 2018, 4),
(5, 11, 1, 2020, 13),
(6, 12, 1, 2020, 3);

-- --------------------------------------------------------

--
-- Table structure for table `klas`
--

CREATE TABLE `klas` (
  `id` int(11) NOT NULL,
  `klas_naam` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `klas`
--

INSERT INTO `klas` (`id`, `klas_naam`) VALUES
(2, '4.06.21'),
(3, '3.06.21'),
(4, '1.23'),
(5, '2.26'),
(6, '3.06.11'),
(7, '1.06.10'),
(8, '2.06.23'),
(9, '1.01.2'),
(10, '1.03.5'),
(11, '4.13.01'),
(12, '4.16.02');

-- --------------------------------------------------------

--
-- Table structure for table `klas_roadmaps`
--

CREATE TABLE `klas_roadmaps` (
  `id` int(11) NOT NULL,
  `roadmap_id` int(11) DEFAULT NULL,
  `jaar_klas_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `klas_roadmaps`
--

INSERT INTO `klas_roadmaps` (`id`, `roadmap_id`, `jaar_klas_id`) VALUES
(1, 3, 3),
(5, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `resultaat`
--

CREATE TABLE `resultaat` (
  `id` int(11) NOT NULL,
  `assignment_submission_id` int(11) NOT NULL,
  `punten` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `resultaat`
--

INSERT INTO `resultaat` (`id`, `assignment_submission_id`, `punten`) VALUES
(5, 2, 30),
(7, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `richting`
--

CREATE TABLE `richting` (
  `id` int(11) NOT NULL,
  `richting_naam` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `richting`
--

INSERT INTO `richting` (`id`, `richting_naam`) VALUES
(1, 'Informatie-en Communicatie Technologie'),
(2, 'Audio-visuele Productie'),
(3, 'Proces Techniek'),
(5, 'Mijnbouw');

-- --------------------------------------------------------

--
-- Table structure for table `roadmap`
--

CREATE TABLE `roadmap` (
  `id` int(11) NOT NULL,
  `roadmap_naam` varchar(255) NOT NULL,
  `start_datum` date DEFAULT NULL,
  `eind_datum` date DEFAULT NULL,
  `docent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roadmap`
--

INSERT INTO `roadmap` (`id`, `roadmap_naam`, `start_datum`, `eind_datum`, `docent_id`) VALUES
(2, 'ITE Basics', '2020-09-03', '2020-09-08', 3),
(3, 'Wiskunde Inleiding', '2020-09-03', '2020-09-15', 4),
(4, 'Introductie Programmeren', '2020-10-13', '2020-10-20', NULL),
(6, 'Introductie Programmeren', '2020-10-13', '2020-10-22', 13),
(7, 'Introductie Programmeren', '2020-10-13', '2020-10-30', 3);

-- --------------------------------------------------------

--
-- Table structure for table `student_klas`
--

CREATE TABLE `student_klas` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `jaar_klas_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_klas`
--

INSERT INTO `student_klas` (`id`, `student_id`, `jaar_klas_id`) VALUES
(1, 11, 3);

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `type_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`type_id`, `type`) VALUES
(1, 'admin'),
(2, 'docent'),
(3, 'student');

-- --------------------------------------------------------

--
-- Table structure for table `vak`
--

CREATE TABLE `vak` (
  `id` int(11) NOT NULL,
  `vak_naam` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vak`
--

INSERT INTO `vak` (`id`, `vak_naam`) VALUES
(1, 'Engels'),
(2, 'Wiskunde'),
(3, 'IT Essentials'),
(4, 'Programmeren'),
(5, 'IT Recht');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roadmap_id` (`roadmap_id`);

--
-- Indexes for table `assignment_submission`
--
ALTER TABLE `assignment_submission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignment_id` (`assignment_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `docent_richting`
--
ALTER TABLE `docent_richting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `docent_id` (`docent_id`),
  ADD KEY `richting_id` (`richting_id`);

--
-- Indexes for table `docent_vak`
--
ALTER TABLE `docent_vak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `docent_id` (`docent_id`),
  ADD KEY `vak_id` (`vak_id`);

--
-- Indexes for table `gebruiker`
--
ALTER TABLE `gebruiker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gebruiker_type_id` (`gebruiker_type_id`);

--
-- Indexes for table `jaar_klas`
--
ALTER TABLE `jaar_klas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `klas_id` (`klas_id`),
  ADD KEY `richting_id` (`richting_id`),
  ADD KEY `klassendocent_id` (`klassendocent_id`);

--
-- Indexes for table `klas`
--
ALTER TABLE `klas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `klas_roadmaps`
--
ALTER TABLE `klas_roadmaps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roadmap_id` (`roadmap_id`),
  ADD KEY `jaar_klas_id` (`jaar_klas_id`);

--
-- Indexes for table `resultaat`
--
ALTER TABLE `resultaat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignment_submission_id` (`assignment_submission_id`);

--
-- Indexes for table `richting`
--
ALTER TABLE `richting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roadmap`
--
ALTER TABLE `roadmap`
  ADD PRIMARY KEY (`id`),
  ADD KEY `docent_id` (`docent_id`);

--
-- Indexes for table `student_klas`
--
ALTER TABLE `student_klas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `jaar_klas_id` (`jaar_klas_id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `vak`
--
ALTER TABLE `vak`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignment`
--
ALTER TABLE `assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `assignment_submission`
--
ALTER TABLE `assignment_submission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `docent_richting`
--
ALTER TABLE `docent_richting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `docent_vak`
--
ALTER TABLE `docent_vak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gebruiker`
--
ALTER TABLE `gebruiker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `jaar_klas`
--
ALTER TABLE `jaar_klas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `klas`
--
ALTER TABLE `klas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `klas_roadmaps`
--
ALTER TABLE `klas_roadmaps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `resultaat`
--
ALTER TABLE `resultaat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `richting`
--
ALTER TABLE `richting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roadmap`
--
ALTER TABLE `roadmap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `student_klas`
--
ALTER TABLE `student_klas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vak`
--
ALTER TABLE `vak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignment`
--
ALTER TABLE `assignment`
  ADD CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmap` (`id`);

--
-- Constraints for table `assignment_submission`
--
ALTER TABLE `assignment_submission`
  ADD CONSTRAINT `assignment_submission_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`id`),
  ADD CONSTRAINT `assignment_submission_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `gebruiker` (`id`);

--
-- Constraints for table `docent_richting`
--
ALTER TABLE `docent_richting`
  ADD CONSTRAINT `docent_richting_ibfk_1` FOREIGN KEY (`docent_id`) REFERENCES `gebruiker` (`id`),
  ADD CONSTRAINT `docent_richting_ibfk_2` FOREIGN KEY (`richting_id`) REFERENCES `richting` (`id`);

--
-- Constraints for table `docent_vak`
--
ALTER TABLE `docent_vak`
  ADD CONSTRAINT `docent_vak_ibfk_1` FOREIGN KEY (`docent_id`) REFERENCES `gebruiker` (`id`),
  ADD CONSTRAINT `docent_vak_ibfk_2` FOREIGN KEY (`vak_id`) REFERENCES `vak` (`id`);

--
-- Constraints for table `gebruiker`
--
ALTER TABLE `gebruiker`
  ADD CONSTRAINT `gebruiker_ibfk_1` FOREIGN KEY (`gebruiker_type_id`) REFERENCES `type` (`type_id`);

--
-- Constraints for table `jaar_klas`
--
ALTER TABLE `jaar_klas`
  ADD CONSTRAINT `jaar_klas_ibfk_1` FOREIGN KEY (`klas_id`) REFERENCES `klas` (`id`),
  ADD CONSTRAINT `jaar_klas_ibfk_2` FOREIGN KEY (`richting_id`) REFERENCES `richting` (`id`),
  ADD CONSTRAINT `jaar_klas_ibfk_3` FOREIGN KEY (`klassendocent_id`) REFERENCES `gebruiker` (`id`);

--
-- Constraints for table `klas_roadmaps`
--
ALTER TABLE `klas_roadmaps`
  ADD CONSTRAINT `klas_roadmaps_ibfk_1` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmap` (`id`),
  ADD CONSTRAINT `klas_roadmaps_ibfk_2` FOREIGN KEY (`jaar_klas_id`) REFERENCES `jaar_klas` (`id`);

--
-- Constraints for table `resultaat`
--
ALTER TABLE `resultaat`
  ADD CONSTRAINT `resultaat_ibfk_1` FOREIGN KEY (`assignment_submission_id`) REFERENCES `assignment_submission` (`id`);

--
-- Constraints for table `roadmap`
--
ALTER TABLE `roadmap`
  ADD CONSTRAINT `roadmap_ibfk_1` FOREIGN KEY (`docent_id`) REFERENCES `gebruiker` (`id`);

--
-- Constraints for table `student_klas`
--
ALTER TABLE `student_klas`
  ADD CONSTRAINT `student_klas_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `gebruiker` (`id`),
  ADD CONSTRAINT `student_klas_ibfk_2` FOREIGN KEY (`jaar_klas_id`) REFERENCES `jaar_klas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
