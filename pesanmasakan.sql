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
-- Table structure for table `hari_menu`
--

DROP TABLE IF EXISTS `hari_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hari_menu` (
  `id_menu` int NOT NULL,
  `hari` varchar(10) NOT NULL,
  `porsi` int DEFAULT NULL,
  PRIMARY KEY (`id_menu`,`hari`),
  CONSTRAINT `hari_menu_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hari_menu`
--

LOCK TABLES `hari_menu` WRITE;
/*!40000 ALTER TABLE `hari_menu` DISABLE KEYS */;
INSERT INTO `hari_menu` VALUES (1,'jumat',21),(1,'senin',21),(2,'selasa',22),(3,'rabu',23),(4,'kamis',24),(4,'senin',24),(5,'jumat',25),(6,'sabtu',26),(7,'senin',27),(8,'sabtu',28),(8,'selasa',28),(9,'rabu',29),(9,'sabtu',29),(10,'kamis',30),(10,'rabu',30),(11,'jumat',31),(12,'kamis',32),(12,'sabtu',32),(13,'minggu',33),(14,'senin',34),(15,'jumat',35),(15,'selasa',35),(16,'rabu',36),(17,'kamis',37),(18,'jumat',38),(18,'senin',38),(19,'minggu',39),(19,'sabtu',39),(19,'selasa',39),(20,'rabu',40),(21,'kamis',41),(22,'jumat',42),(23,'kamis',43),(23,'sabtu',43),(24,'minggu',44),(24,'selasa',44),(25,'minggu',45),(26,'sabtu',26),(27,'rabu',27),(28,'minggu',28),(28,'senin',28),(29,'kamis',29),(30,'jumat',30),(31,'rabu',31),(31,'sabtu',31),(32,'jumat',32),(32,'selasa',32),(33,'selasa',33),(34,'jumat',34),(35,'senin',35);
/*!40000 ALTER TABLE `hari_menu` ENABLE KEYS */;
UNLOCK TABLES;

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
  `pic` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_warung` (`id_warung`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`id_warung`) REFERENCES `warung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,1,'ayam goreng',15000,'lalapan ayam goreng dengan nasi, sayur, dan sambal','/menu/1-ayam-goreng.jpg'),(2,1,'bebek goreng',15000,'lalapan bebek goreng dengan nasi, sayur, dan sambal','/menu/1-bebek-goreng.jpg'),(3,1,'lele goreng',12000,'lalapan lele goreng dengan nasi, sayur, dan sambal','/menu/1-lele-goreng.jpg'),(4,1,'mujaer goreng',18000,'lalapan ikan mujaer goreng dengan nasi, sayur, dan sambal','/menu/1-mujaer-goreng.jpg'),(5,1,'tahu & tempe goreng',10000,'lalapan tahu dan tempe goreng dengan nasi, sayur, dan sambal','/menu/1-tahu-tempe-goreng.jpg'),(6,2,'telor dadar padang',12500,'Telor Dadar Padang dengan sayur singkong, sayur nangka, sambal ijo dan kuah padang','/menu/2-telor-dadar-padang.jpg'),(7,2,'rendang',20000,'Rendang dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','/menu/2-rendang.jpg'),(8,2,'Ayam Goreng Laos',20000,'Ayam goreng laos dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','/menu/2-ayam-goreng-laos.jpg'),(9,2,'Rendang Limpa dan Hati Sapi',20000,'Rendang Limpa dan Hati Sapi Khas Padang dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','/menu/2-rendang-limpa-hati-sapi.jpg'),(10,2,'Ayam Balado',18000,'Ayam Balado dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','/menu/2-ayam-balado.jpg'),(11,2,'Paru dan Gulai Usus',18000,'Paru goreng dan Gulai Usus dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','/menu/2-paru-gulai-usus.jpg'),(12,2,'Ikan Goreng Kembung',18000,'Ikan goreng kembung dengan nasi, sayur singkong, sayur nangka, sambal ijo dan kuah padang','/menu/2-ikan-goreng-kembung.jpg'),(13,3,'Sio Bak',40000,'Babi panggang asin dengan nasi','/menu/3-sio-bak.jpg'),(14,3,'Tite',40000,'Kaki babi masak kecap dengan nasi','/menu/3-tite.jpg'),(15,3,'Sio Kee',35000,'Ayam kampung panggang dengan nasi','/menu/3-sio-kee.jpg'),(16,3,'Tom Yam Mie',35000,'Mie Tom Yam dengan bumbu khas Gang Kapak','/menu/3-tom-yam-mie.jpg'),(17,3,'Siomay',35000,'Siomay dengan bumbu kacang','/menu/3-siomay.jpg'),(18,3,'Nasi Goreng Hong Kong',40000,'Nasi goreng hongkong khas Gang Kapak','/menu/3-nasi-goreng-hong-kong.jpg'),(19,3,'Cap Cai Seafood',45000,'Cap cai seafood dengan nasi','/menu/3-cap-cai-seafood.jpg'),(20,3,'Bakmi Goreng',30000,'Bakmi goreng dengan toping ayam dan telor','/menu/3-bakmi-goreng.jpg'),(21,3,'Kwetiau Goreng',30000,'Kwetiau goreng dengan toping ayam dan telor','/menu/3-kwetiau-goreng.jpg'),(22,3,'Bihun Goreng',30000,'Bihun goreng dengan toping ayam dan telor','/menu/3-bihun-goreng.jpg'),(23,3,'Kwetiau Siram',45000,'Kwetiau Siram dengan seafood dan kuah kental khas Gang Kapak','/menu/3-kwetiau-siram.jpg'),(24,3,'Sop Asparagus Kepiting Jagung',60000,'Sop Asparagus Kepiting Jagung dengan nasi','/menu/3-sop-asparagus-kepiting-jagung.jpg'),(25,3,'Suikiao Kuah',50000,'Suikiao Kuah khas Gang Kapak','/menu/3-suikiao-kuah.jpg'),(26,3,'Kolokee',40000,'Ayam goreng krispi dengan potongan sayuran dimasak saos asam manis','/menu/3-kolokee.jpg'),(27,3,'Ayam Kanton',40000,'Ayam panggang jemur kering dengan krupuk dan bubuk ngohiang','/menu/3-ayam-kanton.jpg'),(28,3,'Udang Dollar',40000,'Ham Udang dilapisi dengan roti di goreng kering','/menu/3-udang-dolar.jpg'),(29,3,'Cumi Saos Sichuan',45000,'Cumi masak saos sichuan rasa asem pedas','/menu/3-cumi-saos-sichuan.jpg'),(30,4,'Sop Ayam',15000,'Sop Ayam dengan nasi','/menu/4-sop-ayam.jpg'),(31,4,'Ayam bumbu rujak',20000,'Ayam bumbu rujak dengan nasi','/menu/4-ayam-bumbu-rujak.jpg'),(32,4,'Nasi Pecel',15000,'Nasi, sayur-sayuran dengan bumbu kacang, bakwan, tahu tempe','/menu/4-nasi-pecel.jpg'),(33,4,'Nasi Jagung',15000,'Nasi jagung dengan sayur nangka, ikan asin, bakwan, dan sambal','/menu/4-nasi-jagung.jpg'),(34,4,'Nasi Ayam Kare',17000,'Nasi, ayam, tahu, telor dengan kuah bumbu kare','/menu/4-nasi-ayam-kare.jpg'),(35,4,'Gulai Kambing',35000,'Gulai Daging Kambing','/menu/4-gulai-kambing.jpg');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksi`
--

DROP TABLE IF EXISTS `transaksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaksi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tgl_transaksi` date DEFAULT NULL,
  `total` int DEFAULT NULL,
  `alamat_tujuan` varchar(255) DEFAULT NULL,
  `longitude` double(10,6) DEFAULT NULL,
  `latitude` double(10,6) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `id_warung` int DEFAULT NULL,
  `username_pembeli` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_warung` (`id_warung`),
  KEY `username_pembeli` (`username_pembeli`),
  CONSTRAINT `fk_id_warung` FOREIGN KEY (`id_warung`) REFERENCES `warung` (`id`),
  CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`username_pembeli`) REFERENCES `user_pembeli` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksi`
--

LOCK TABLES `transaksi` WRITE;
/*!40000 ALTER TABLE `transaksi` DISABLE KEYS */;
INSERT INTO `transaksi` VALUES (1,'2021-02-24',75000,'Jl Ijen Nirwana no 12',-6.464019,107.179779,1,3,'indy'),(2,'2021-02-26',17000,'Jl Dieng Kawi no 76',-6.931036,107.596800,0,4,'raras'),(3,'2021-02-25',40000,'Jl Raya Langsep no 32',-7.383062,108.534895,2,2,'raras'),(8,'2021-04-02',45000,'Jl Ijen Nirwana no 12',-6.464019,107.179779,0,4,'indy'),(9,'2021-04-03',135000,'Jl Ijen Nirwana no 12',-6.464019,107.179779,0,1,'raras'),(10,'2021-05-03',100000,'Jl Ijen Nirwana no 12',-6.464019,107.179779,0,1,'indy');
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
  `status` int DEFAULT NULL,
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
INSERT INTO `transaksi_menu` VALUES (1,28,1,1),(1,16,1,1),(2,34,1,0),(3,9,2,2),(8,32,1,0),(8,33,2,0),(9,1,4,0),(9,2,5,0),(10,5,10,1);
/*!40000 ALTER TABLE `transaksi_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_pembeli`
--

DROP TABLE IF EXISTS `user_pembeli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_pembeli` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `nama` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_pembeli`
--

LOCK TABLES `user_pembeli` WRITE;
/*!40000 ALTER TABLE `user_pembeli` DISABLE KEYS */;
INSERT INTO `user_pembeli` VALUES ('indy','pass','anindya@mail.com','081353513','anindya'),('raras','1234','raras@mail.com','081565379','raras');
/*!40000 ALTER TABLE `user_pembeli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_penjual`
--

DROP TABLE IF EXISTS `user_penjual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_penjual` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `id_warung` int DEFAULT NULL,
  `nama` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  KEY `id_warung` (`id_warung`),
  CONSTRAINT `user_penjual_ibfk_1` FOREIGN KEY (`id_warung`) REFERENCES `warung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_penjual`
--

LOCK TABLES `user_penjual` WRITE;
/*!40000 ALTER TABLE `user_penjual` DISABLE KEYS */;
INSERT INTO `user_penjual` VALUES ('jundu','password','jundu.lalapan@mail.com','081234568',1,'jundullah'),('tiffany','4321','tiffany.mamasuka@mail.com','0887654321',4,'tiffany');
/*!40000 ALTER TABLE `user_penjual` ENABLE KEYS */;
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
  `pic` varchar(300) DEFAULT NULL,
  `longitude` double(10,6) DEFAULT NULL,
  `latitude` double(10,6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warung`
--

LOCK TABLES `warung` WRITE;
/*!40000 ALTER TABLE `warung` DISABLE KEYS */;
INSERT INTO `warung` VALUES (1,'Lalapan Lahap','Jl pertenakan no 45','chicken & duck','/warung/lalapan-lahap.jpg',-6.917431,107.657066),(2,'Warung Padang Pak Lontong','Jl lampunyala no 2','masakan padang','/warung/warung-padang-pak-lontong.jpg',-7.077877,107.735901),(3,'Gang Kapak Chinese Food','Jl sipitputih no 25','masakan cina','/warung/gang-kapak-chinese-food.jpg',-7.372021,108.559485),(4,'Warung Mamasuka','Jl malasmasak no 6','masakan rumah','/warung/warung-mamasuka.jpg',-6.464019,107.179779);
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

-- Dump completed on 2021-04-06 11:32:38
