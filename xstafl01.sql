-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 01, 2020 at 04:37 AM
-- Server version: 5.6.40
-- PHP Version: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `xstafl01`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE IF NOT EXISTS `doctor` (
  `doctor_id` int(10) unsigned NOT NULL,
  `expertise` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `expertise`) VALUES
(44, '0'),
(68, '0'),
(69, '0');

-- --------------------------------------------------------

--
-- Table structure for table `insurance_worker`
--

CREATE TABLE IF NOT EXISTS `insurance_worker` (
  `insurance_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`insurance_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `insurance_worker`
--

INSERT INTO `insurance_worker` (`insurance_id`) VALUES
(41),
(42),
(43);

-- --------------------------------------------------------

--
-- Table structure for table `pacient`
--

CREATE TABLE IF NOT EXISTS `pacient` (
  `pacient_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`pacient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pacient`
--

INSERT INTO `pacient` (`pacient_id`) VALUES
(34),
(36),
(37),
(38),
(39);

-- --------------------------------------------------------

--
-- Table structure for table `record`
--

CREATE TABLE IF NOT EXISTS `record` (
  `record_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pacient_id` int(10) unsigned NOT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `status` int(10) unsigned NOT NULL DEFAULT '0',
  `record_info` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`record_id`),
  KEY `FK_record_pacient` (`pacient_id`),
  KEY `FK_record_doctor` (`doctor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=53 ;

--
-- Dumping data for table `record`
--

INSERT INTO `record` (`record_id`, `pacient_id`, `doctor_id`, `title`, `date_created`, `status`, `record_info`) VALUES
(46, 34, 44, 'Diabetus', '2020-12-01', 0, 'Velký příjem cukru.'),
(47, 39, 68, 'Tržná rána na ruce', '2020-12-01', 0, 'Tržná rána na ruce způsobená ostrým předmětem.'),
(48, 34, 69, 'Mozková disfunkce', '2020-12-01', 0, 'Po 12 hodinách neustálého učení přišel pacient o veškerou snahu se hýbat'),
(49, 36, 44, 'Sluch', '2020-12-01', 0, 'Pacient přestává slyšet na levé ucho.'),
(50, 37, 44, 'Kyčelní kloub', '2020-12-01', 0, 'Pacient trpí bolestí kyčelního kloubu.'),
(51, 38, 68, 'Krvácející oko', '2020-12-01', 0, 'Pacient krvácí do oko při vyšším atmosférickém tlaku.'),
(52, 34, 69, 'Zlomenina', '2020-12-01', 0, 'Zlomená noha. Přidělána sádra s návrhem na nákup berlí.');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE IF NOT EXISTS `ticket` (
  `ticket_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `record_id` int(10) unsigned DEFAULT NULL,
  `doctor_id` int(10) unsigned DEFAULT NULL,
  `examiner_id` int(10) unsigned DEFAULT NULL,
  `status` int(10) unsigned NOT NULL DEFAULT '0',
  `type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ticket_info` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `insurance_comment` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `examination_date` date DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `FK_ticket_doctor` (`doctor_id`),
  KEY `FK_ticket_doctor_2` (`examiner_id`),
  KEY `FK_ticket_record` (`record_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=41 ;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`ticket_id`, `record_id`, `doctor_id`, `examiner_id`, `status`, `type`, `ticket_info`, `insurance_comment`, `examination_date`) VALUES
(38, 52, 69, 68, 4, 'Konzultace o berlích', 'Výběr berlí a konzultace o správném zacházení s nimi.', '', '2021-01-03'),
(39, 46, 44, 44, 0, 'Nákup inzulinu', 'Návrh a nákup inzulinu', '', '2020-12-14'),
(40, 49, 44, 44, 3, 'Zakoupení naslouchátka', 'Nákup naslouchátka pro zhoršení sluchu.', '', '2020-12-02');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `surname` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `address` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` int(11) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=70 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `login`, `password`, `email`, `name`, `surname`, `sex`, `phone`, `birth`, `address`, `role`) VALUES
(34, 'user1', '81dc9bdb52d04dc20036dbd8313ed055', 'oami@glyctistr.cz', 'Josef', 'Rákosník', 'Ano', '777123405', '2010-01-02', '95 Forest Street', 2),
(36, 'user2', '81dc9bdb52d04dc20036dbd8313ed055', 'panajuliagraciele@buyfrombull.com', 'Roman', 'Šebrle', 'M', '454636436', '1900-01-01', '7156 Center Lane', 2),
(37, 'user3', '81dc9bdb52d04dc20036dbd8313ed055', 'ranmolhasina0@egenes.ga', 'Michal', 'David', 'M', '453543414', '1900-01-01', '9638 Annadale St.', 2),
(38, 'user4', '81dc9bdb52d04dc20036dbd8313ed055', '2wiz4417@smartmobility2016.shop', 'David', 'Zapletal', 'M', '786412364', '1900-01-01', '7477 Piper Avenue', 2),
(39, 'user5', '81dc9bdb52d04dc20036dbd8313ed055', 'msult@teamtriton.net', 'Martin', 'Novák', 'M', '123458687', '1900-01-01', '47 W. Shore St.', 2),
(40, 'admin', '21232f297a57a5a743894a0e4a801fc3', '8abhilashm@blogla.com', 'Vojtěch', 'Novotný', 'M', '456871234', '1900-01-01', 'Beltsville, MD 20705', 0),
(41, 'insurance', '81dc9bdb52d04dc20036dbd8313ed055', 'xnet@oldmadein.com', 'Štěpán', 'Picard', 'M', '123467878', '1900-01-01', 'West New York, NJ 07093', 3),
(42, 'insurance1', '81dc9bdb52d04dc20036dbd8313ed055', 'jklaifi.yasserv@socialcloud99.live', 'Vladislav', 'Howard', 'M', '646413214', '1900-01-01', 'Eastlake, OH 44095', 3),
(43, 'insurance2', '81dc9bdb52d04dc20036dbd8313ed055', 'hmohamed-l@aviro.com', 'Karel', 'Armstrong', 'M', '645213375', '1900-01-01', 'Hope Mills, NC 28348', 3),
(44, 'doktor1', '81dc9bdb52d04dc20036dbd8313ed055', 'fnetworkmar@custmon.net', 'Daniel', 'Zatloukal', 'M', '412378784', '1900-01-01', 'North Tonawanda, NY 14120', 1),
(68, 'doktor2', '81dc9bdb52d04dc20036dbd8313ed055', 'fnetwork@custmon.net', 'Jan', 'Linek', 'M', '412312345', '1900-01-01', 'East Tonawanda, NY 14120', 1),
(69, 'doktor3', '81dc9bdb52d04dc20036dbd8313ed055', 'workmar@custmon.net', 'Marek', 'Kratochvíl', 'M', '268378784', '1900-01-01', 'South Tonawanda, NY 14120', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `FK_doctor_user` FOREIGN KEY (`doctor_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `insurance_worker`
--
ALTER TABLE `insurance_worker`
  ADD CONSTRAINT `FK_insurance_worker_user` FOREIGN KEY (`insurance_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `pacient`
--
ALTER TABLE `pacient`
  ADD CONSTRAINT `FK_pacient_user` FOREIGN KEY (`pacient_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `FK_record_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_record_pacient` FOREIGN KEY (`pacient_id`) REFERENCES `pacient` (`pacient_id`) ON DELETE CASCADE;

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `FK_ticket_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_ticket_doctor_2` FOREIGN KEY (`examiner_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_ticket_record` FOREIGN KEY (`record_id`) REFERENCES `record` (`record_id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
