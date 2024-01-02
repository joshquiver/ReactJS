-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2024 at 09:47 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventsreserve`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `Name` varchar(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(11) NOT NULL,
  `contact_no` varchar(11) NOT NULL,
  `position` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `Name`, `username`, `password`, `contact_no`, `position`) VALUES
(1, 'joshua', 'joshua@gmai', '123', '09786543456', 'client'),
(2, 'joshua', 'josh@gmail.com', '@123Joshh', '09867777897', 'admin'),
(5, 'Clark', 'clark', '123', '09857647875', 'client');

-- --------------------------------------------------------

--
-- Table structure for table `customers_order`
--

CREATE TABLE `customers_order` (
  `Customer_ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Contact_no` varchar(13) NOT NULL,
  `Venue` varchar(50) NOT NULL,
  `Menu` varchar(100) NOT NULL,
  `Event` varchar(50) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `Total_Orders` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers_order`
--

INSERT INTO `customers_order` (`Customer_ID`, `Name`, `Email`, `Contact_no`, `Venue`, `Menu`, `Event`, `Date`, `Time`, `Total_Orders`) VALUES
(1, 'Joshua', 'joshua@gmail.com', '09876534128', 'Cottage 1', 'Long Life Bilao, Mushroom pizza', 'Birthday', '0000-00-00', '08:00:00', 100000),
(3, 'Justine', 'justin@gmail.com', '09876534567', 'Cottage 4', 'Chessy Mushroom', 'wedding', '2023-12-07', '18:30:00', 0),
(7, 'jsalon', 'joshua@gmail.com', '0977856675', 'Cottage', 'Pancit Long Life', 'birthday', '2023-12-30', '13:00:00', 0),
(8, 'josh', 'joshua@gmail.com', '09876534567', 'Cottage 4', 'Long Life Bilao', 'birthday', '2023-12-20', '02:03:00', 0),
(9, 'Justinnn', 'joshua@gmail.com', '09876534567', 'Cottage 4', 'Chessy Mushroom, Spicy Buffalo Wings, Chicken Cordon Bleu, Long Life Bilao, Pancit Long Life, Canton', 'reunion', '2023-12-16', '10:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `customers_reservation`
--

CREATE TABLE `customers_reservation` (
  `Customer_ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Contact_No` int(12) NOT NULL,
  `Venue` varchar(50) NOT NULL,
  `Menu` text NOT NULL,
  `Event` varchar(50) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `Total_Orders` float NOT NULL,
  `Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers_reservation`
--

INSERT INTO `customers_reservation` (`Customer_ID`, `Name`, `Contact_No`, `Venue`, `Menu`, `Event`, `Date`, `Time`, `Total_Orders`, `Status`) VALUES
(3, 'Clark', 9737492, 'Function Room VVIP', '[{\"food\":\"Chessy Mushroom\",\"quantity\":1},{\"food\":\"Spicy Buffalo Wings\",\"quantity\":1},{\"food\":\"Chicke', 'Reunion', '2023-12-30', '14:00:00', 109349, 'Cancelled'),
(4, 'Clark', 9737492, 'Function Room Class C', '[{\"food\":\"Chessy Mushroom\",\"quantity\":1},{\"food\":\"Spicy Buffalo Wings\",\"quantity\":1},{\"food\":\"Chicken Cordon Bleu\",\"quantity\":1},{\"food\":\"Long Life Bilao\",\"quantity\":1}]', 'Reunion', '2023-12-30', '14:00:00', 10349, 'Completed'),
(5, 'Zixuan', 2147483647, 'Function Room Class C', '[{\"food\":\"Chessy Mushroom\",\"quantity\":2},{\"food\":\"Spicy Buffalo Wings\",\"quantity\":2},{\"food\":\"Chicken Cordon Bleu\",\"quantity\":2},{\"food\":\"Long Life Bilao\",\"quantity\":0}]', 'Wedding', '2023-01-10', '08:00:00', 15700, 'Cancelled'),
(6, 'Zixuan', 2147483647, 'Function Room Class A', '[{\"food\":\"Chessy Mushroom\",\"quantity\":2},{\"food\":\"Spicy Buffalo Wings\",\"quantity\":2},{\"food\":\"Chicken Cordon Bleu\",\"quantity\":3},{\"food\":\"Long Life Bilao\",\"quantity\":0}]', 'Wedding', '2023-01-10', '08:00:00', 15425, 'Reserved'),
(7, 'Yanli', 2147483647, 'Function Room VVIP', '[{\"food\":\"Chessy Mushroom\",\"quantity\":2},{\"food\":\"Spicy Buffalo Wings\",\"quantity\":2},{\"food\":\"Chicken Cordon Bleu\",\"quantity\":3},{\"food\":\"Long Life Bilao\",\"quantity\":0}]', 'Wedding', '2023-01-10', '08:00:00', 114925, 'Cancelled'),
(8, 'Yanli', 2147483647, 'Function Room VVIP', 'Chessy Mushroom, Spicy Buffalo Wings, Chicken Cordon Bleu, Long Life Bilao, Pancit Long Life', 'Wedding', '2023-01-10', '08:00:00', 116924, 'Reserved');

-- --------------------------------------------------------

--
-- Table structure for table `partyplatters`
--

CREATE TABLE `partyplatters` (
  `Product_ID` int(11) NOT NULL,
  `Food` varchar(50) NOT NULL,
  `Price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partyplatters`
--

INSERT INTO `partyplatters` (`Product_ID`, `Food`, `Price`) VALUES
(3, 'Chessy Mushroom', 6900),
(4, 'Spicy Buffalo Wings', 225),
(5, 'Chicken Cordon Bleu', 225),
(8, 'Long Life Bilao', 1999),
(9, 'Pancit Long Life', 1999);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `Room_ID` int(11) NOT NULL,
  `Room_Name` varchar(50) NOT NULL,
  `Price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`Room_ID`, `Room_Name`, `Price`) VALUES
(1, 'Function Room VIP', 1250),
(2, 'Function Room VVIP', 100000),
(3, 'Function Room Class A', 500),
(12, 'Function Room Class B', 1500),
(16, 'Function Room Class C', 1000),
(17, 'Function Room Class D', 350);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `customers_order`
--
ALTER TABLE `customers_order`
  ADD PRIMARY KEY (`Customer_ID`);

--
-- Indexes for table `customers_reservation`
--
ALTER TABLE `customers_reservation`
  ADD PRIMARY KEY (`Customer_ID`);

--
-- Indexes for table `partyplatters`
--
ALTER TABLE `partyplatters`
  ADD PRIMARY KEY (`Product_ID`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`Room_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customers_order`
--
ALTER TABLE `customers_order`
  MODIFY `Customer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `customers_reservation`
--
ALTER TABLE `customers_reservation`
  MODIFY `Customer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `partyplatters`
--
ALTER TABLE `partyplatters`
  MODIFY `Product_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `Room_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
