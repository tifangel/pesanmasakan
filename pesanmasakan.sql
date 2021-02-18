-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: pesanmasakan
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_warung` int DEFAULT NULL,
  `nama` varchar(255) NOT NULL,
  `harga` int DEFAULT NULL,
  `desc_menu` varchar(255) DEFAULT NULL,
  `hari` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_warung` (`id_warung`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`id_warung`) REFERENCES `warung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,1,'ayam goreng',15000,'lalapan ayam goreng dengan nasi, sayur, dan sambal','senin'),(2,1,'bebek goreng',15000,'lalapan bebek goreng dengan nasi, sayur, dan sambal','selasa'),(3,1,'lele goreng',12000,'lalapan lele goreng dengan nasi, sayur, dan sambal','rabu'),(4,1,'mujaer goreng',18000,'lalapan ikan mujaer goreng dengan nasi, sayur, dan sambal','kamis'),(5,1,'tahu & tempe goreng',10000,'lalapan tahu dan tempe goreng dengan nasi, sayur, dan sambal','jumat'),(6,2,'telor dadar padang',12500,'Telor Dadar Padang dengan sayur singkong, sayur nangka, sambal ijo dan kuah padang','senin'),(7,2,'rendang',20000,'Rendang dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','selasa'),(8,2,'Ayam Goreng Laos',20000,'Ayam goreng laos dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','rabu'),(9,2,'Rendang Limpa dan Hati Sapi',20000,'Rendang Limpa dan Hati Sapi Khas Padang dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','kamis'),(10,2,'Ayam Balado',18000,'Ayam Balado dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','jumat'),(11,2,'Paru dan Gulai Usus',18000,'Paru goreng dan Gulai Usus dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','sabtu'),(12,2,'Ikan Goreng Kembung',18000,'Ikan goreng kembung dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','minggu'),(13,3,'Sio Bak',40000,'Babi panggang asin dengan nasi','senin'),(14,3,'Tite',40000,'Kaki babi masak kecap dengan nasi','selasa'),(15,3,'Sio Kee',35000,'Ayam kampung panggang dengan nasi','selasa'),(16,3,'Tom Yam Mie',35000,'Mie Tom Yam dengan bumbu khas Gang Kapak','rabu'),(17,3,'Siomay',35000,'Siomay dengan bumbu kacang','kamis'),(18,3,'Nasi Goreng Hong Kong',40000,'Nasi goreng hongkong khas Gang Kapak','jumat'),(19,3,'Cap Cai Seafood',45000,'Cap cai seafood dengan nasi','sabtu'),(20,3,'Bakmi Goreng',30000,'Bakmi goreng dengan toping ayam dan telor','minggu'),(21,3,'Kwetiau Goreng',30000,'Kwetiau goreng dengan toping ayam dan telor','minggu'),(22,3,'Bihun Goreng',30000,'Bihun goreng dengan toping ayam dan telor','minggu'),(23,3,'Kwetiau Siram',45000,'Kwetiau Siram dengan seafood dan kuah kental khas Gang Kapak','minggu'),(24,3,'Sop Asparagus Kepiting Jagung',60000,'Sop Asparagus Kepiting Jagung dengan nasi','jumat'),(25,3,'Suikiao Kuah',50000,'Suikiao Kuah khas Gang Kapak','jumat'),(26,3,'Kolokee',40000,'Ayam goreng krispi dengan potongan sayuran dimasak saos asam manis','senin'),(27,3,'Ayam Kanton',40000,'Ayam panggang jemur kering dengan krupuk dan bubuk ngohiang','senin'),(28,3,'Udang Dollar',40000,'Ham Udang dilapisi dengan roti di goreng kering','rabu'),(29,3,'Cumi Saos Sichuan',45000,'Cumi masak saos sichuan rasa asem pedas','kamis'),(30,4,'Sop Ayam',15000,'Sop Ayam dengan nasi','senin'),(31,4,'Ayam bumbu rujak',20000,'Ayam bumbu rujak dengan nasi','selasa'),(32,4,'Nasi Pecel',15000,'Nasi, sayur-sayuran dengan bumbu kacang, bakwan, tahu tempe','rabu'),(33,4,'Nasi Jagung',15000,'Nasi jagung dengan sayur nangka, ikan asin, bakwan, dan sambal','kamis'),(34,4,'Nasi Ayam Kare',17000,'Nasi, ayam, tahu, telor dengan kuah bumbu kare','jumat'),(35,4,'Gulai Kambing',35000,'Gulai Daging Kambing','sabtu');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pembeli`
--

DROP TABLE IF EXISTS `pembeli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pembeli` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `telp` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pembeli`
--

LOCK TABLES `pembeli` WRITE;
/*!40000 ALTER TABLE `pembeli` DISABLE KEYS */;
INSERT INTO `pembeli` VALUES (1,'Tifany','081234567890'),(2,'Anindya','081345123789'),(3,'Raras','082890234652'),(4,'Jundu','085234678306'),(5,'Iqbal','082098634716');
/*!40000 ALTER TABLE `pembeli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksi`
--

DROP TABLE IF EXISTS `transaksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaksi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_pembeli` int DEFAULT NULL,
  `tgl_transaksi` date DEFAULT NULL,
  `total` int DEFAULT NULL,
  `alamat_tujuan` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pembeli` (`id_pembeli`),
  CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksi`
--

LOCK TABLES `transaksi` WRITE;
/*!40000 ALTER TABLE `transaksi` DISABLE KEYS */;
INSERT INTO `transaksi` VALUES (1,1,'2021-02-24',75000,'Jl Ijen Nirwana no 12'),(2,2,'2021-02-26',17000,'Jl Dieng Kawi no 76'),(3,3,'2021-02-25',40000,'Jl Raya Langsep no 32');
/*!40000 ALTER TABLE `transaksi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksi_menu`
--

DROP TABLE IF EXISTS `transaksi_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaksi_menu` (
  `id_transaksi` int DEFAULT NULL,
  `id_menu` int DEFAULT NULL,
  `jumlah_porsi` int DEFAULT NULL,
  KEY `id_transaksi` (`id_transaksi`),
  KEY `id_menu` (`id_menu`),
  CONSTRAINT `transaksi_menu_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id`),
  CONSTRAINT `transaksi_menu_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksi_menu`
--

LOCK TABLES `transaksi_menu` WRITE;
/*!40000 ALTER TABLE `transaksi_menu` DISABLE KEYS */;
INSERT INTO `transaksi_menu` VALUES (1,28,1),(1,16,1),(2,34,1),(3,9,2);
/*!40000 ALTER TABLE `transaksi_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warung`
--

DROP TABLE IF EXISTS `warung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `kategori` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warung`
--

LOCK TABLES `warung` WRITE;
/*!40000 ALTER TABLE `warung` DISABLE KEYS */;
INSERT INTO `warung` VALUES (1,'Lalapan Lahap','Jl pertenakan no 45','chicken & duck'),(2,'Warung Padang Pak Lontong','Jl lampunyala no 2','masakan padang'),(3,'Gang Kapak Chinese Food','Jl sipitputih no 25','masakan cina'),(4,'Warung Mamasuka','Jl malasmasak no 6','masakan rumah');
/*!40000 ALTER TABLE `warung` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-10  4:02:09
