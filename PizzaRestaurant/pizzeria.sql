-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 02 Gru 2020, 00:14
-- Wersja serwera: 10.4.13-MariaDB
-- Wersja PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `pizzeria`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(20) COLLATE utf8_polish_ci NOT NULL,
  `skladniki` varchar(150) COLLATE utf8_polish_ci NOT NULL,
  `cena` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `menu`
--

INSERT INTO `menu` (`id`, `nazwa`, `skladniki`, `cena`) VALUES
(1, 'Margherita', 'ser, oregano, sos pomidorowy ', 15),
(2, 'Farmerska', 'ser, kurczak, pieczarki, rukola, sos pomidorowy', 20),
(3, 'Pepperoni', 'Pepperoni, mozzarella,  ziołowy sos pomidorowy', 18.5),
(4, 'Hawajska', 'Szynka, ananas, ser mozzarella, ziołowy sos pomidorowy', 20.5),
(5, 'Classica', 'Sos pomidorowy, Mozzarella, Szynka, Pieczarki', 17.2),
(6, 'Americana', 'Sos pomidorowy, Mozzarella, Pieczarki, Pomidory koktajlowe', 22.5),
(7, 'Europejska', 'Sos pomidorowy, Mozzarella, Szynka, Wołowina, Pieczarki', 22.99),
(8, 'Texas', 'Sos BBQ, Mozzarella, Kurczak, Kukurydza, Cebula czerwona', 25.5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienia`
--

CREATE TABLE `zamowienia` (
  `id` int(11) NOT NULL,
  `imie` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `nazwisko` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `adres` varchar(80) COLLATE utf8_polish_ci NOT NULL,
  `tel` int(9) NOT NULL,
  `mail` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `zamowienie` varchar(150) COLLATE utf8_polish_ci NOT NULL,
  `koszt` float NOT NULL,
  `czas` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `zamowienia`
--

INSERT INTO `zamowienia` (`id`, `imie`, `nazwisko`, `adres`, `tel`, `mail`, `zamowienie`, `koszt`, `czas`) VALUES
(2, 'Karol', 'Karolak', 'Wigolta 51/2', 345235498, 'karolakXD@wp.pl', 'Margherita, Texas, ', 40.5, '2020-11-27 12:23:01');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
