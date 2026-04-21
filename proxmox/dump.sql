-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: minierp_db
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Joan Garcia','joan@email.com','600111222','2026-04-18 09:39:33'),(2,'Maria Soler','maria@email.com','611222333','2026-04-18 09:39:33'),(3,'Pere Pons','ppons@email.com','622333444','2026-04-18 09:39:33');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Pomes de Girona','Alimentació',2.50,50,1,'2026-04-18 09:39:08'),(2,'Llet Sencera 1L','Alimentació',1.20,100,1,'2026-04-18 09:39:08'),(3,'Ratolí Wireless','Tecnologia',15.99,4,1,'2026-04-18 09:39:08'),(4,'Teclat Mecànic','Tecnologia',45.00,12,1,'2026-04-18 09:39:08'),(5,'Monitor 24 polzades','Tecnologia',120.50,8,1,'2026-04-18 09:39:08'),(6,'Formatge de Cabra','Alimentació',8.40,20,1,'2026-04-18 09:39:08'),(7,'Oli d\'Oliva Verge','Alimentació',9.50,15,1,'2026-04-18 09:39:08'),(8,'Auriculars Bluetooth','Tecnologia',29.90,2,1,'2026-04-18 09:39:08'),(9,'Cafè en gra 500g','Alimentació',6.75,40,1,'2026-04-18 09:39:08'),(10,'Portàtil i5 16GB','Tecnologia',750.00,5,1,'2026-04-18 09:39:08'),(11,'Arròs Extra 1kg','Alimentació',1.95,200,1,'2026-04-18 09:39:08'),(12,'Pasta Macarrons','Alimentació',1.15,150,1,'2026-04-18 09:39:08'),(13,'Disc Dur SSD 1TB','Tecnologia',85.00,25,1,'2026-04-18 09:39:08'),(14,'Targeta SD 64GB','Tecnologia',12.00,60,1,'2026-04-18 09:39:08'),(15,'Vi Negre DO Empordà','Alimentació',12.30,18,1,'2026-04-18 09:39:08'),(16,'Detergent Roba 3L','Llar',7.50,30,1,'2026-04-18 09:39:08'),(17,'Sucre Blanc 1kg','Alimentació',0.95,80,1,'2026-04-18 09:39:08'),(18,'Cable HDMI 2m','Tecnologia',5.50,100,1,'2026-04-18 09:39:08'),(19,'Cargador USB-C','Tecnologia',14.20,3,1,'2026-04-18 09:39:08'),(20,'Paquet Folis A4','Papereria',4.50,45,1,'2026-04-18 09:39:08'),(21,'Bolígraf Blau (Pack 10)','Papereria',3.20,70,1,'2026-04-18 09:39:08'),(22,'Sabó de Mans','Higiene',2.15,25,1,'2026-04-18 09:39:08'),(23,'Xampú Anticaspa','Higiene',4.50,12,1,'2026-04-18 09:39:08'),(24,'Piles AA (Pack 4)','Tecnologia',5.90,55,1,'2026-04-18 09:39:08'),(25,'Llum d\'escriptori LED','Llar',19.99,7,1,'2026-04-18 09:39:08');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_items`
--

DROP TABLE IF EXISTS `sale_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sale_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `line_total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sale_id` (`sale_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sale_items_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`),
  CONSTRAINT `sale_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_items`
--

LOCK TABLES `sale_items` WRITE;
/*!40000 ALTER TABLE `sale_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `sale_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `sale_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_method` varchar(50) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-21 12:49:12
