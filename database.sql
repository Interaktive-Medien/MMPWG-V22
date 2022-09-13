-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 13, 2022 at 05:26 PM
-- Server version: 10.3.31-MariaDB-0+deb10u1
-- PHP Version: 7.0.33-57+0~20211119.61+debian10~1.gbp5d8ba5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `376009_17_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `hashtag`
--

CREATE TABLE `hashtag` (
  `ID` int(11) NOT NULL,
  `hashtag` varchar(42) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hashtag`
--

INSERT INTO `hashtag` (`ID`, `hashtag`) VALUES
(1, 'chur'),
(2, 'bern'),
(3, 'zürich'),
(4, 'relax'),
(5, 'work'),
(6, 'studierende'),
(7, 'landleben'),
(8, 'bigcitylife'),
(9, 'penthouse'),
(10, 'altbau'),
(11, 'cheminee'),
(12, 'spieleabende');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL,
  `token` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`ID`, `user_ID`, `token`, `timestamp`) VALUES
(66, 16, 'Lj932WXLVIyxadRWA4FRMryIGHNTr5iAOh2Ym464Yp', '2022-09-13 15:07:25'),
(67, 26, 'vEqM5E8AMs9fJrbCLzeAiFBVdybLpJhW5E0VlGs5uI', '2022-09-13 15:20:04');

-- --------------------------------------------------------

--
-- Table structure for table `stadt`
--

CREATE TABLE `stadt` (
  `ID` int(11) NOT NULL,
  `stadt` varchar(42) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stadt`
--

INSERT INTO `stadt` (`ID`, `stadt`) VALUES
(1, 'Bern'),
(2, 'Chur'),
(3, 'Zürich');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `name`, `email`, `password`) VALUES
(16, 'Nick', 'nick@nick.ch', '$2y$10$/E8Lc0FoICrSlKl.cBRgUOvAR.mJpwI3CN93QUiA.m9wCAc1uM8j.'),
(18, 'Eva', 'eva.angehrn@gmail.com', '$2y$10$Qrtxsn2fv2LbiC/R5oUEq.BOy3SFxpMMM1xWepjd5gi2lDuxGtLE6'),
(19, 'Nick Schneeberger', 'hallo@nickschnee.ch', '$2y$10$jrZgpHNx0GF0fBq7ALbEmeVE0TAEdgNY6zJuwm4yd7i01RD6Fp0yy'),
(20, 'Blub', 'blub@blub.ch', '$2y$10$V8BNTbmfaz.4B2Y8MYWjDOftzDUhJAEMv/sqqWZ3YS5BwHUnj7Jxa'),
(21, 'Nick', 'nick@nick.chhhh', '$2y$10$WImyUTxRx2qx.KBZy8u5kuQ3TQ3VXS7SVBUdye2/Cro6VOemcCZeS'),
(23, 'Eva Öpfuschmatz', 'eva@?pfuschmatz.ch', '$2y$10$09pR6A8/qGiMCekoYucDke1FJL6ZCrY3HzLhsBTwk09GtsqD44LWa'),
(24, 'Samuel', 'samuel@codecrush.ch', '$2y$10$S02/dbn7KaSdfPFNgRRw0es.TaQCVKqZ5UNI2zAfJWEQg2bgI9FC.'),
(26, 'Nick', 'nickjonas@schneeberger.ch', '$2y$10$mzCD8fNdH20QaUgkiFb3zOPuYr7.Sk.W0C4JxofoABTJXIEnKxYha');

-- --------------------------------------------------------

--
-- Table structure for table `wg`
--

CREATE TABLE `wg` (
  `ID` int(11) NOT NULL,
  `titel` varchar(100) NOT NULL,
  `bild` varchar(100) NOT NULL,
  `adresse` varchar(200) NOT NULL,
  `stadt` int(11) NOT NULL,
  `beschreibung` text NOT NULL,
  `user` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wg`
--

INSERT INTO `wg` (`ID`, `titel`, `bild`, `adresse`, `stadt`, `beschreibung`, `user`, `status`, `timestamp`) VALUES
(27, 'Hallo', 'https://thishousedoesnotexist.org/assets/houses/1389612.png?_1662424062', 'Meine WG', 1, ' \r\nThis stunning modern home is located in Santorini, Greece, and offers breathtaking views of the sunrise over downtown. The exterior is designed with exposed timber, glass, and rocks, and features a steaming hot spring outside. The house is perfect for relaxing and enjoying the incredible natural scenery. Designed by THDNE AI. ', 18, 1, '2022-09-12 16:16:11'),
(28, 'Nick WG', 'https://thishousedoesnotexist.org/assets/houses/5064608.png?_1662424507', 'Nickstrasse 44, 3000 Bern', 1, '  This stunning house is designed to make the most of its stunning location with sunset views. The house is built with a mix of wood, glass, and stone, and features an exposed wood interior and a glass-enclosed staircase. Designed by THDNE AI. ', 19, 1, '2022-09-12 16:24:04'),
(35, 'Schöne WG', 'https://thishousedoesnotexist.org/assets/houses/6751012.png?_1662432575', 'Strassengässchen 12', 1, ' This house is designed with an exterior of exposed wood and curved bamboo. Rocks from the nearby river are used to accent the front of the house. Designed by THDNE AI. ', 16, 0, '2022-09-13 09:05:17'),
(36, 'WG zur Rebleuten', 'https://thishousedoesnotexist.org/assets/houses/6234368.png?_1662432515', 'Kupfergasse', 2, ' Das ist unsere WG im modernen Baustil aus den 90ern. Bemerkenswert ist vor allem unser gute Heizwert, da es im Innenraum kaum Durchzug gibt und somit mit dem Standard Minergie+ viele Kosten gespart werden können. Wir mögen alle Privatsphäre, daher sind wir mitten im Dschungel von Chur - mit wunderbarer Aussicht auf den Machu Picchu.', 24, 1, '2022-09-13 12:09:12'),
(37, 'Villa Bümpliz', 'https://thishousedoesnotexist.org/assets/houses/8096236.png?_1662432758', 'Bümplizstrasse 23, 3007 Bern', 2, 'This is a new house in Bümpliz, Bern that is made mostly of wood and stone. It is designed with an exposed wood exterior and bamboo rocks.', 26, 0, '2022-09-13 15:11:35');

-- --------------------------------------------------------

--
-- Table structure for table `wg_hat_hashtag`
--

CREATE TABLE `wg_hat_hashtag` (
  `ID` int(11) NOT NULL,
  `wg_id` int(11) NOT NULL,
  `hashtag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wg_hat_hashtag`
--

INSERT INTO `wg_hat_hashtag` (`ID`, `wg_id`, `hashtag_id`) VALUES
(21, 23, 1),
(33, 23, 2),
(34, 27, 1),
(35, 27, 2),
(36, 28, 2),
(49, 0, 1),
(50, 0, 2),
(51, 0, 1),
(52, 0, 2),
(67, 35, 1),
(68, 35, 2),
(69, 36, 1),
(77, 37, 2),
(78, 37, 8),
(79, 37, 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hashtag`
--
ALTER TABLE `hashtag`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `stadt`
--
ALTER TABLE `stadt`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `wg`
--
ALTER TABLE `wg`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `stadt` (`stadt`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `wg_hat_hashtag`
--
ALTER TABLE `wg_hat_hashtag`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hashtag`
--
ALTER TABLE `hashtag`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
--
-- AUTO_INCREMENT for table `stadt`
--
ALTER TABLE `stadt`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `wg`
--
ALTER TABLE `wg`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `wg_hat_hashtag`
--
ALTER TABLE `wg_hat_hashtag`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `wg`
--
ALTER TABLE `wg`
  ADD CONSTRAINT `wg_ibfk_1` FOREIGN KEY (`stadt`) REFERENCES `stadt` (`ID`),
  ADD CONSTRAINT `wg_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
