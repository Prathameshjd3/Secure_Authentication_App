-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `email_verifications`
--

DROP TABLE IF EXISTS `email_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_verifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `used` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_verifications`
--

LOCK TABLES `email_verifications` WRITE;
/*!40000 ALTER TABLE `email_verifications` DISABLE KEYS */;
INSERT INTO `email_verifications` VALUES (1,3,'04788872ca827f2fa2b8946c886c5b43aa69c629a46b7c700096b4734a625c21','2026-03-29 22:55:50',NULL,'2026-03-29 23:00:50',0),(2,4,'108912f24b5073794c543c243430662ffbfe6191b6afdb43f67e94a9b3be581f','2026-03-29 22:58:27','2026-03-29 22:58:46','2026-03-29 23:03:28',1);
/*!40000 ALTER TABLE `email_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp_verifications`
--

DROP TABLE IF EXISTS `otp_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp_verifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `otp` varchar(6) NOT NULL,
  `type` enum('email','sms') NOT NULL,
  `expires_at` datetime NOT NULL,
  `verified_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `used` tinyint(1) DEFAULT '0',
  `attempt_count` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp_verifications`
--

LOCK TABLES `otp_verifications` WRITE;
/*!40000 ALTER TABLE `otp_verifications` DISABLE KEYS */;
INSERT INTO `otp_verifications` VALUES (1,4,'511592','sms','2026-04-01 01:05:40','2026-04-01 01:00:59','2026-04-01 01:00:40',1,0),(2,4,'301205','sms','2026-04-01 23:38:33',NULL,'2026-04-01 23:33:32',0,0),(3,4,'309050','email','2026-04-01 23:50:29',NULL,'2026-04-01 23:45:28',0,0),(4,4,'913498','email','2026-04-01 23:50:29',NULL,'2026-04-01 23:45:28',0,0),(5,4,'729067','email','2026-04-01 23:50:32',NULL,'2026-04-01 23:45:31',0,0),(6,4,'553377','sms','2026-04-02 00:44:22',NULL,'2026-04-02 00:39:21',0,0),(7,4,'653751','sms','2026-04-02 01:25:54','2026-04-02 01:22:03','2026-04-02 01:20:53',1,0),(8,4,'447467','sms','2026-04-02 01:28:06','2026-04-02 01:23:16','2026-04-02 01:23:06',1,0),(9,4,'972632','sms','2026-04-02 01:47:06',NULL,'2026-04-02 01:42:05',0,0),(10,4,'294374','sms','2026-04-02 01:47:06','2026-04-02 01:42:18','2026-04-02 01:42:05',1,0),(11,4,'963663','sms','2026-04-07 00:45:25','2026-04-07 00:42:05','2026-04-07 00:40:25',1,0);
/*!40000 ALTER TABLE `otp_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
INSERT INTO `password_resets` VALUES (1,4,'ce7c38de67798486f89d308ab08f3b991ba41512b3bd31b7e841cee6a7ab3404','2026-03-29 23:09:00','2026-03-29 23:09:48','2026-03-29 23:14:00',1),(2,4,'6f1669924867deb27283a0f850291560e68d0a29eb16e1051f187dc7b0276748','2026-03-31 20:47:48','2026-03-31 20:48:12','2026-03-31 20:52:49',1);
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `revoked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_sessions`
--

DROP TABLE IF EXISTS `user_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `login_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `logout_datetime` datetime DEFAULT NULL,
  `session_active` tinyint(1) DEFAULT '1',
  `user_auth_type` varchar(50) DEFAULT NULL,
  `user_role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sessions`
--

LOCK TABLES `user_sessions` WRITE;
/*!40000 ALTER TABLE `user_sessions` DISABLE KEYS */;
INSERT INTO `user_sessions` VALUES (1,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzUwNzQwNjQsImV4cCI6MTc3NTA3NDk2NH0.DjqyZu34L5vDTE6z5gWSGaH4EPV4WojQOJATeprM5pc',NULL,'2026-04-02 01:37:44',NULL,1,'normal',NULL),(2,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzUwNzQyMzUsImV4cCI6MTc3NTA3NTEzNX0.3an3J7H_5eu0lDp9qRik1sXc9fALk1hgQxfLOVFmRLM',NULL,'2026-04-02 01:40:35',NULL,1,'normal',NULL),(3,4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTA3NDMzOCwiZXhwIjoxNzc1MDc1MjM4fQ.O7N-knmGS7bISqPIpqnb21A-vQRLcp-yD9ECrKmd50M',NULL,'2026-04-02 01:42:18',NULL,1,'mfa',NULL),(4,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzUwNzQ0MjMsImV4cCI6MTc3NTA3NTMyM30.VtY-FX-cp9J5kRbPfKsRTcWe1nCLk1i4ASgRM4doWU8',NULL,'2026-04-02 01:43:43',NULL,1,'normal',NULL),(5,4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTIzNDkxOSwiZXhwIjoxNzc1MjM1ODE5fQ.Pc6QncqUABSRutGnUUdtI-pWsThr-Q0OiMlyKRQ_16A',NULL,'2026-04-03 22:18:39',NULL,1,'google  oAuth',NULL),(6,4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTIzNTIxNSwiZXhwIjoxNzc1MjM2MTE1fQ.F_qloQiSNcIwOT60NJzlG_lBICw_xNJts5Cw0Tz6PQ0',NULL,'2026-04-03 22:23:35',NULL,1,'google  oAuth',NULL),(7,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTI0MTM5MiwiZXhwIjoxNzc1MjQyMjkyfQ.GQqlWgQTt3IUXwGIFDYzg2JE8QyCLVqq8rC0g7jSSmY',NULL,'2026-04-04 00:06:32',NULL,1,'google_oauth',NULL),(8,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTI0MTUzNSwiZXhwIjoxNzc1MjQyNDM1fQ.opM950GVpaFP2nEjUE4Xd-590cPqmMITn85EwIpNGkg',NULL,'2026-04-04 00:08:55',NULL,1,'google_oauth',NULL),(9,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTI0MTY1MywiZXhwIjoxNzc1MjQyNTUzfQ.sMr1XypaXJUmtmbHPj0KUy5YooW1BReB__iXSCU9BxY',NULL,'2026-04-04 00:10:53',NULL,1,'google_oauth',NULL),(10,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzUyNDMxODYsImV4cCI6MTc3NTI0NDA4Nn0.CfeRI4b38u_9snEiX2dl2NGGO61l8LJyPMT8QhTgFp4',NULL,'2026-04-04 00:36:26',NULL,1,'normal',NULL),(11,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTI0NDAzNSwiZXhwIjoxNzc1MjQ0OTM1fQ.YksuyXDLQAuyBheU_jua1_l-lgizde6aOORbkp66eSQ',NULL,'2026-04-04 00:50:35',NULL,1,'google_oauth',NULL),(12,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzUyNDQ0MjQsImV4cCI6MTc3NTI0NTMyNH0.bmHaMeN-QC1ax4DMhJXCU_wPHrnqT8xwwwKG366Kuo8',NULL,'2026-04-04 00:57:04',NULL,1,'normal',NULL),(13,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTI0NDczNiwiZXhwIjoxNzc1MjQ1NjM2fQ.LNxMaNTZiFWT5ToA5HVfL7sZJQ6kpjThtD63NSzwuoE',NULL,'2026-04-04 01:02:16',NULL,1,'google_oauth',NULL),(14,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzUyNDQ3NzgsImV4cCI6MTc3NTI0NTY3OH0.i9dyuwcsWt1fNIsNr7dHpR2VxWVghXQvWdDxZiqCe_8',NULL,'2026-04-04 01:02:58',NULL,1,'normal',NULL),(15,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTI0NTA1NSwiZXhwIjoxNzc1MjQ1OTU1fQ.5Qgb2Zzs2Dmfx4b6-yFan08QFyqojJevIT8veoL6jdA',NULL,'2026-04-04 01:07:35',NULL,1,'google_oauth',NULL),(16,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTI0NTA2NiwiZXhwIjoxNzc1MjQ1OTY2fQ.fIRwqycIZatrNxVn8biRc1tK7G_4E1bzT-2oTn4iGGc',NULL,'2026-04-04 01:07:46',NULL,1,'google_oauth',NULL),(17,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTI0NTEyMywiZXhwIjoxNzc1MjQ2MDIzfQ.MdJKuPtFtdVlWvEuRVHA739tjcDuc2bfgILq1MARVRM',NULL,'2026-04-04 01:08:43',NULL,1,'google_oauth',NULL),(18,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTI0NTM0NSwiZXhwIjoxNzc1MjQ2MjQ1fQ.2XxFRNFRpE-VY6aJaz2irkwRsx32fWIjs4BdR2W0t28',NULL,'2026-04-04 01:12:25',NULL,1,'google_oauth',NULL),(19,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzUyNDU4MjUsImV4cCI6MTc3NTI0NjcyNX0.0rohVAbksxf76VnG86nI2mdn0aCfC4nDH4hYNtrOJ78',NULL,'2026-04-04 01:20:25',NULL,1,'normal',NULL),(20,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzUyNDY3OTcsImV4cCI6MTc3NTI0NzY5N30.-TzQ19YtPLr0C5CY1GGopN0HSKnDH5DBVFFblmlG0I0',NULL,'2026-04-04 01:36:37',NULL,1,'normal',NULL),(21,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTI0ODEwOCwiZXhwIjoxNzc1MjQ5MDA4fQ.VHLDYNQH1mhWvz1j4MbrFBe6fnwIcXM7M2u_ZsrQctg',NULL,'2026-04-04 01:58:28',NULL,1,'google_oauth',NULL),(22,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzUyNDgyMzIsImV4cCI6MTc3NTI0OTEzMn0.psBy97xBugV9ewmlr8AfipKd65AT2rkOsysHMw7D8iw',NULL,'2026-04-04 02:00:32',NULL,1,'normal',NULL),(23,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTI0ODMxNCwiZXhwIjoxNzc1MjQ5MjE0fQ.buwNxdysnC6yw8UVE8Kzipz_AFubUSEmgMq519gPdrA',NULL,'2026-04-04 02:01:54',NULL,1,'google_oauth',NULL),(24,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTUwMDAyNCwiZXhwIjoxNzc1NTAwOTI0fQ.5sHo0A4hHOGOTZwJLN62m5-sjw23PhOrtkloV2cnjMs',NULL,'2026-04-06 23:57:04',NULL,1,'google_oauth',NULL),(25,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTUwMDE5NiwiZXhwIjoxNzc1NTAxMDk2fQ.1ohu7CTGVchy0wH6liTooAZzrt7gjqUgl10H_GvBqS8',NULL,'2026-04-06 23:59:56',NULL,1,'google_oauth',NULL),(26,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzU1MDA0NDQsImV4cCI6MTc3NTUwMTM0NH0.3-PLbCS0qmZuVoyIYJu9idLoKrqlylBqzCfcvebg_0E',NULL,'2026-04-07 00:04:04',NULL,1,'normal',NULL),(27,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzU1MDA1NjksImV4cCI6MTc3NTUwMTQ2OX0.AbbFYYMI5HDNPIYGCXNB3oWph0910aWS7xG-bsnaezk',NULL,'2026-04-07 00:06:09',NULL,1,'normal',NULL),(28,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTUwMDgwNywiZXhwIjoxNzc1NTAxNzA3fQ.BMwz29RHheKB9_X0zMyIP5Gy_b4Ko_8OKOpmvDSndUg',NULL,'2026-04-07 00:10:07',NULL,1,'google_oauth',NULL),(29,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzU1MDE4NjgsImV4cCI6MTc3NTUwMjc2OH0.fEgiParPiQ5XjF5BxanexRlv5sBlIPSvXHY9zkNisvM',NULL,'2026-04-07 00:27:48','2026-04-07 00:38:03',0,'normal',NULL),(30,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTUwMjQ5MSwiZXhwIjoxNzc1NTAzMzkxfQ.l5hwHpvv8sUHOgi6327C-FIQBbSuEEQ_P0mnQjoU4ws',NULL,'2026-04-07 00:38:11','2026-04-07 00:38:16',0,'google_oauth',NULL),(31,4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTUwMjcyNSwiZXhwIjoxNzc1NTAzNjI1fQ.tSYIjWe1Cg2J70QBUFK2nswhgwhIcktEVAnQgyfav30',NULL,'2026-04-07 00:42:05','2026-04-07 00:42:46',0,'mfa',NULL),(32,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzU1MDI4MjIsImV4cCI6MTc3NTUwMzcyMn0.gJzkGpR-J90j_Ei-kqzCc0OyBfZU8KP0Jqd1Mu7tAN0',NULL,'2026-04-07 00:43:42',NULL,1,'normal',NULL),(33,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzU1MDMyMzgsImV4cCI6MTc3NTUwNDEzOH0.kKEhbbesbNvC-V0aMBD5QdLzEa6iUMjE_0VO1W1kt30',NULL,'2026-04-07 00:50:38',NULL,1,'normal',NULL),(34,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzU1MDMzODEsImV4cCI6MTc3NTUwNDI4MX0.xybsUE7sLtIy_hrAL2YzyRanzCoMtEoyduKlyjYO-pE',NULL,'2026-04-07 00:53:01','2026-04-07 00:53:20',0,'normal',NULL),(35,4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTUwMzQ0OSwiZXhwIjoxNzc1NTA0MzQ5fQ.2tno8uJtRceQoYuN8v-QbsAbVn-KoBhLBhrD6_hwQMw',NULL,'2026-04-07 00:54:09','2026-04-07 00:54:52',0,'google_oauth',NULL),(36,4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTUwMzUwOCwiZXhwIjoxNzc1NTA0NDA4fQ.8fLCdqvNwV48-E8o0M2IL1x1vHccc8SAqLlqPhduZ9g',NULL,'2026-04-07 00:55:08',NULL,1,'google_oauth',NULL),(37,4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTUwMzU5NiwiZXhwIjoxNzc1NTA0NDk2fQ.hSXuaMdyIi3fMfFco2HsFcvyCwz8mwUedD0GvDGVZz4',NULL,'2026-04-07 00:56:36','2026-04-07 00:56:53',0,'google_oauth',NULL),(38,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzU1MDM2NTAsImV4cCI6MTc3NTUwNDU1MH0.MN7dmLB7kr9kHUiUkqP6uiG4_03G9jlcEWkkIT2v3vY',NULL,'2026-04-07 00:57:30','2026-04-07 00:57:32',0,'normal',NULL),(39,4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTUwMzk0NiwiZXhwIjoxNzc1NTA0ODQ2fQ.ohAhJv-XUfBFWc3ymLZ5z_FrkJ7Go_PuYbR9TvhV06g',NULL,'2026-04-07 01:02:26',NULL,1,'google_oauth',NULL),(40,4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJwcmF0aGFtZXNoamQzQGdtYWlsLmNvbSIsImlhdCI6MTc3NTUwMzk5MywiZXhwIjoxNzc1NTA0ODkzfQ.FiH83_ukFzOyfEf2FZXRfoJXctSZ4T_oPd5X6GPkzeY',NULL,'2026-04-07 01:03:13','2026-04-07 01:03:16',0,'google_oauth',NULL);
/*!40000 ALTER TABLE `user_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_image` text,
  `role_id` int DEFAULT NULL,
  `mfa_enabled` varchar(1) DEFAULT 'Y',
  `is_active` tinyint(1) DEFAULT '0',
  `is_verified` tinyint(1) DEFAULT '0',
  `is_locked` tinyint(1) DEFAULT '0',
  `is_deleted` int DEFAULT '0',
  `failed_login_count` int DEFAULT '0',
  `lock_until` datetime DEFAULT NULL,
  `last_login_datetime` datetime DEFAULT NULL,
  `last_logout_datetime` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `auth_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin@gmail.com','1234567891','$2b$10$DqPFOeGQKS83mEwmdywu0emL3DW6VmWCi51RVN0TVtI0UD2hmCO/O',NULL,NULL,'N',0,1,0,0,1,NULL,'2026-04-07 00:57:30','2026-04-07 00:57:32','2026-03-20 01:15:02','2026-03-20 01:15:02',NULL,NULL),(2,'Prathamesh','prathamesh45','prathameshjd33@gmail.com','7039751033','$2b$10$/YZCSP1K2750.YLT2iYTDuYUxCY6N17JJFr7EtwjyLiBCNf0jKUry',NULL,NULL,'Y',0,1,0,0,0,NULL,NULL,NULL,'2026-03-20 01:17:37','2026-03-20 01:17:37',NULL,NULL),(3,'Pallavi Ganagurde','palvi26','pallavi111it@gmail.com','9834784683','$2b$10$9YH1oJ6PuTTSZ6LUO6/NfuN7tsLvcx1YZV5XGiG7jpPkFGm1DBVHG',NULL,NULL,'Y',0,0,0,0,0,NULL,NULL,NULL,'2026-03-29 22:55:50',NULL,NULL,NULL),(4,'prathamesh Dhanawade','pattu45','prathameshjd3@gmail.com','7039751033','$2b$10$02MFzzG5NpgJ0EVLYKu8HuXmDo9iawav6RJQWNVJN0w0FWZPLWjvS',NULL,NULL,'Y',0,1,0,0,2,'2026-04-02 00:39:00','2026-04-07 01:03:13','2026-04-07 01:03:16','2026-03-29 22:58:27','2026-03-31 20:48:12',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-10  0:27:43
