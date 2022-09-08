-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 08, 2022 at 10:51 AM
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
(18, 9, 'yBes3FsVWZFLGAZg3R89yrNxTX91jQccZiBCdEzVyR', '2022-09-08 08:38:52');

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
(1, 'Nick Schneeberger', 'nick.schneeberger@fhgr.ch', ''),
(2, 'Benjamin Hanimann', 'benjamin.hanimann@fhgr.ch', ''),
(9, 'Nick', 'nick@nick.ch', '$2y$10$IU6TAv902//psxCII6H5w.k0b/oW3ZjU0vu7DOa2tJPbCe3LlB.gK'),
(11, 'Nick', 'nick@nick.chsss', '$2y$10$FDeok0EDdnxQmpDY2NWv0OullfHjiZmDUTom4i4/DE6M21yULXEUm'),
(12, 'Nick', 'nick@nick.chsss', '$2y$10$YNUDgsmhbVhjgrwjn8w3Hu1VVgkrhjZcz5xHrTH0ts0saLCZylcBK');

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
(1, 'MH42 ', 'Candle.png', 'Mattenhofstrasse 42, 3007 Bern', 1, 'Wir sind eine zweier WG mit viel Platz auf dem Sofa!', 1, 0, '2022-09-12 22:00:00'),
(2, 'Schöne Wohnung mit Kind', 'Solar.png', 'Sanktgallenstrasse 42, 8000 St. Gallen', 2, 'Wir sind ein junges Paar mit Kind. Wer hier übernachten will muss babysitten.', 2, 0, '2022-09-25 22:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `wg_hat_hashtag`
--

CREATE TABLE `wg_hat_hashtag` (
  `ID` int(11) NOT NULL,
  `wg_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `stadt`
--
ALTER TABLE `stadt`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `wg`
--
ALTER TABLE `wg`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `wg_hat_hashtag`
--
ALTER TABLE `wg_hat_hashtag`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
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
