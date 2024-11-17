-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dbname
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

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
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'66%',37,'66%.png'),(2,'66_',21,'66_.png'),(3,'Anjanette Devendorf',24,'Anjanette Devendorf.jpg'),(4,'Arden Fingal',23,'Arden Fingal.jpg'),(5,'Augustine Lucko',31,'Augustine Lucko.jpg'),(6,'Alita Willmer',31,'Alita Willmer.jpg'),(7,'Agustin Ortizortiz',33,'Agustin Ortizortiz.jpg'),(8,'AjAx',21,'AjAx.png'),(9,'Augustine Tuero',35,'Augustine Tuero.jpg'),(10,'Avalon Gilbert Carpin',39,'Avalon Gilbert Carpin.jpg'),(11,'Barabara Kieltyka',29,'Barabara Kieltyka.jpg'),(12,'Birgit Squibbs',37,'Birgit Squibbs.jpg'),(13,'Bo Dembek',39,'Bo Dembek.jpg'),(14,'Britteny Abalos',21,'Britteny Abalos.jpg'),(15,'Brittney Mcclaren',25,'Brittney Mcclaren.jpg'),(16,'Bruce Alsager',30,'Bruce Alsager.jpg'),(17,'Bryda Avalon',23,'Bryda Avalon.jpg'),(18,'Caitlyn Novar',35,'Caitlyn Novar.jpg'),(19,'Camilila Keyzer',39,'Camilila Keyzer.jpg'),(20,'Carmon Dziadzio',38,'Carmon Dziadzio.jpg'),(21,'Carolyne Sjodin',28,'Carolyne Sjodin.jpg'),(22,'Carson Rupolo',34,'Carson Rupolo.jpg'),(23,'Cassy Es',40,'Cassy Es.jpg'),(24,'Chanel Emshwiller',24,'Chanel Emshwiller.jpg'),(25,'Christian Schamel',31,'Christian Schamel.jpg'),(26,'Coral Gysel',30,'Coral Gysel.jpg'),(27,'Dean Semanco',27,'Dean Semanco.jpg'),(28,'Deann Baltasar',35,'Deann Baltasar.jpg'),(29,'Dong Cansler',20,'Dong Cansler.jpg'),(30,'Dillon Ponder',33,'Dillon Ponder.jpg'),(31,'Eda Testone',36,'Eda Testone.jpg'),(32,'Edyth Cernohous',39,'Edyth Cernohous.jpg'),(33,'Elias Bellack',33,'Elias Bellack.jpg'),(34,'Eliza Crandall',35,'Eliza Crandall.jpg'),(35,'Emmanuel Dahmen',23,'Emmanuel Dahmen.jpg'),(36,'Erin Buzick',38,'Erin Buzick.jpg'),(37,'Erwin Mosch',32,'Erwin Mosch.jpg'),(38,'Flora Cisneros',35,'Flora Cisneros.jpg'),(39,'Ezekiel Jaskiewicz',21,'Ezekiel Jaskiewicz.jpg'),(40,'Garrett Zier',27,'Garrett Zier.jpg'),(41,'Genaro Adolphsen',26,'Genaro Adolphsen.jpg'),(42,'Genny Miyata',31,'Genny Miyata.jpg'),(43,'Georgianna Cabal',40,'Georgianna Cabal.jpg'),(44,'Holly Dienger',36,'Holly Dienger.jpg'),(45,'Janita Lestina',32,'Janita Lestina.jpg'),(46,'Josef Towey',29,'Josef Towey.jpg'),(47,'Judie Calisti',22,'Judie Calisti.jpg'),(48,'Julie Kilps',31,'Julie Kilps.jpg'),(49,'Kareem Prink',35,'Kareem Prink.jpg'),(50,'Krystal Delahaye',22,'Krystal Delahaye.jpg'),(51,'Lamar Ruys',21,'Lamar Ruys.jpg'),(52,'Lamar1',31,'Lamar1.jpg'),(53,'Lamar2',31,'Lamar2.jpg'),(54,'Laticia Steder',39,'Laticia Steder.jpg'),(55,'Laurie Goldberger',24,'Laurie Goldberger.jpg'),(56,'Laurinda Bjur',20,'Laurinda Bjur.jpg'),(57,'Leonora Lawal',35,'Leonora Lawal.jpg'),(58,'Lettie Barquera',40,'Lettie Barquera.jpg'),(59,'Letty Gillfillan',29,'Letty Gillfillan.jpg'),(60,'Lilia Rutten',36,'Lilia Rutten.jpg'),(61,'Lorenzo Sprengel',34,'Lorenzo Sprengel.jpg'),(62,'Lorinda Brandal',26,'Lorinda Brandal.jpg'),(63,'Lucila Fern',37,'Lucila Fern.jpg'),(64,'Mallie Lagro',26,'Mallie Lagro.jpg'),(65,'Mari Serratt',34,'Mari Serratt.jpg'),(66,'Manuela Welsby',40,'Manuela Welsby.jpg'),(67,'Mariano Stramel',34,'Mariano Stramel.jpg'),(68,'Markita Abdula',21,'Markita Abdula.jpg'),(69,'Marquitta Cumbaa',29,'Marquitta Cumbaa.jpg'),(70,'Matt Rosten',21,'Matt Rosten.jpg'),(71,'Melina Koloski',37,'Melina Koloski.jpg'),(72,'Monte Venezio',38,'Monte Venezio.jpg'),(73,'Natisha Bac',39,'Natisha Bac.jpg'),(74,'Nicholas Hermandez',37,'Nicholas Hermandez.jpg'),(75,'Nicholas Lauer',28,'Nicholas Lauer.jpg'),(76,'Norberto Domzalski',33,'Norberto Domzalski.jpg'),(77,'Penny Bartick',22,'Penny Bartick.jpg'),(78,'Perry Strebler',30,'Perry Strebler.jpg'),(79,'profile',32,'profile.jpg'),(80,'Reuben Clews',36,'Reuben Clews.jpg'),(81,'Rodolfo Gimbel',36,'Rodolfo Gimbel.jpg'),(82,'Ronnie Bihun',24,'Ronnie Bihun.jpg'),(83,'Roxanna Landau',38,'Roxanna Landau.jpg'),(84,'Rudolf Huskin',32,'Rudolf Huskin.jpg'),(85,'Samual Dozer',27,'Samual Dozer.jpg'),(86,'Samual Uphold',24,'Samual Uphold.jpg'),(87,'Serina Frewin',33,'Serina Frewin.jpg'),(88,'Shayne Pascoal',25,'Shayne Pascoal.jpg'),(89,'Sherly Kines',35,'Sherly Kines.jpg'),(90,'Steffanie Donahay',30,'Steffanie Donahay.jpg'),(91,'Stephan Kegel',29,'Stephan Kegel.jpg'),(92,'Susana Levenduski',28,'Susana Levenduski.jpg'),(93,'Suzann Castens',28,'Suzann Castens.jpg'),(94,'Taneka Holveck',29,'Taneka Holveck.jpg'),(95,'Teena Dudzik',27,'Teena Dudzik.jpg'),(96,'Therese Shocklee',30,'Therese Shocklee.jpg'),(97,'Towanda Schnurer',32,'Towanda Schnurer.jpg'),(98,'Tracy Descoteau',40,'Tracy Descoteau.jpg'),(99,'Twanda Klis',40,'Twanda Klis.jpg'),(100,'Winford Emmer',20,'Winford Emmer.jpg');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-14  5:54:01
