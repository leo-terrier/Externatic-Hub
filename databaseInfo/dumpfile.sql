--FYI : command =  mysqldump -u leoterrier -p externatic

--single-transaction  > /Users/leoterrier/Dev/wild/externatic/Externatic-Hub/databaseInfo.dumpfile.sql

-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: localhost    Database: externatic
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `backoffice_notifications`
--

DROP TABLE IF EXISTS `backoffice_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backoffice_notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  `offer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_backoffie_notifications` (`user_id`),
  CONSTRAINT `fk_user_id_backoffie_notifications` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backoffice_notifications`
--

LOCK TABLES `backoffice_notifications` WRITE;
/*!40000 ALTER TABLE `backoffice_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `backoffice_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultants`
--

DROP TABLE IF EXISTS `consultants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telephone` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultants`
--

LOCK TABLES `consultants` WRITE;
/*!40000 ALTER TABLE `consultants` DISABLE KEYS */;
INSERT INTO `consultants` VALUES (1,'Terrier','Leo','leoterrier22@gmail.com','0751212693');
/*!40000 ALTER TABLE `consultants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entreprise_contacts`
--

DROP TABLE IF EXISTS `entreprise_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entreprise_contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `job_title` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `entreprise_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entreprise_id_idx` (`entreprise_id`),
  CONSTRAINT `fk_contact_entreprise_id` FOREIGN KEY (`entreprise_id`) REFERENCES `entreprises` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entreprise_contacts`
--

LOCK TABLES `entreprise_contacts` WRITE;
/*!40000 ALTER TABLE `entreprise_contacts` DISABLE KEYS */;
INSERT INTO `entreprise_contacts` VALUES (1,'Jean','Dufort','DRH','jean.dufort@immoinfo.fr','0637483728',1),(2,'Hughes','Richard','Talent manager','hughes.richard@euro-agro.fr','01829302',2),(12,'John','Jane','jonhjane@carrefour.fr','CTO','',39),(13,'John','Jane','jonhjane@carrefour.fr','CTO','',39),(14,'Yves','Roland','yve@roland.fr','RH','0485049302',40),(15,'Steve','Ayo','steve@ayo.fr','DRH','0394039403',40),(16,'dsdsqds','dsqdqsd','dqsdsqdq','dqsdsqd','dqsdsqdsqdqs',40),(17,'fdsfds','fsdfdsf','fdsfdsfdsf','fdsfdsfd','fdsfsdfds',40),(18,'fdsfds','fsdfdsf','fdsfdsfdsf','fdsfdsfd','fdsfsdfds',40),(19,'fdsfds','fsdfdsf','fdsfdsfdsf','fdsfdsfd','fdsfsdfds',40),(20,'fdsfds','fsdfdsf','fdsfdsfdsf','fdsfdsfd','fdsfsdfds',40),(21,'fdsfds','fsdfdsf','fdsfdsfdsf','fdsfdsfd','fdsfsdfds',40),(22,'fdsfds','fsdfdsf','fdsfdsfdsf','fdsfdsfd','fdsfsdfds',40),(23,'fdsfds','fsdfdsf','fdsfdsfdsf','fdsfdsfd','fdsfsdfds',40),(24,'fdsfds','fsdfdsf','fdsfdsfdsf','fdsfdsfd','fdsfsdfds',40),(25,'HELO ','HELO ','HELO ','fdsfdsfHELO d','HELO ',40),(26,'HELO ','HELO ','HELO ','fdsfdsfHELO d','HELO ',40),(27,'Hugues','Lancien','hugues.lancien@hello.fr','DRH','06374839',40),(28,'','','','','',39);
/*!40000 ALTER TABLE `entreprise_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entreprises`
--

DROP TABLE IF EXISTS `entreprises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entreprises` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `size` varchar(45) NOT NULL,
  `industry` varchar(45) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entreprises`
--

LOCK TABLES `entreprises` WRITE;
/*!40000 ALTER TABLE `entreprises` DISABLE KEYS */;
INSERT INTO `entreprises` VALUES (1,'Créée en 2018, Brickmeup a pour vocation de révolutionner le marché de l\'investissement locatif avec une approche responsable et financière. Son accompagnement clé en main permet aux particuliers d\'investir sans que cela ne leur demande ni du temps, ni de l\'expertise. Fini les tâches chronophages, il est maintenant possible d\'investir depuis son canapé.\n\nBrickmeup a imaginé une solution clé en main complète pour accompagner ses clients sur chacune des phases de leur projet : élaboration d’une stratégie de constitution de patrimoine, chasse du bien, rénovation et ameublement et gestion locative. Ce suivi sur le long terme permet d’optimiser les investissements de leur client. La vision financière unique de Brickmeup garantit des opérations rentables et sécurisées grâce à une étude en détail de chaque business plan.\n\nLa grande ambition de la start up réside dans le développement d\'une plateforme qui permet aux investisseurs de créer, gérer et optimiser leur patrimoine immobilier en toute simplicité, grâce à l\'intelligence artificielle de Brickmeup.','> 2000 employés','tech','Brickmeup'),(2,'Grossiste dans l’alimentaire, implanté partout l’Europe.','> 2000 employés','Food et Boisson','Euro-Agro'),(39,'En soixante ans, le groupe Carrefour est devenu un des leaders de la distribution dans le monde.\n\nUn réseau de plus de 5 000 magasins exploités en propre ou en franchise en France au plus près de nos clients (plus de 12 000 dans le monde), un site e-commerce et des services connectés pour répondre à tous les modes de consommation et des collaborateurs mobilisés pour rendre accessible, partout, une alimentation de qualité à un prix abordable… Tels sont les atouts de Carrefour pour réussir la transition alimentaire pour tous et devenir un des leaders du digital retail.\n\nIl existe plus de 300 métiers faisant appel à des savoir-faire différents qui œuvrent au quotidien chez Carrefour pour répondre à nos enjeux Business, Digitaux, RSE, et tant d’autres !','> 2000 employés','Distribution','Carrefour'),(40,'AVENCORE est un cabinet de conseil international spécialisé dans l’industrie, qui déploie chez ses clients des solutions créatives, innovantes et efficaces pour atteindre l’excellence opérationnelle et répondre aux enjeux stratégiques. L\'entreprise intervient aussi bien pour des grands groupes internationaux que des ETI, et ce dans tous les secteurs industriels : aéronautique, spatial, énergie, transports, biens de grande consommation, industries de process, santé, automobile…\n\nAVENCORE intervient auprès de ses clients sur des problématiques de Direction Générale, tant sur des sujets stratégiques qu\'opérationnels. Pour chacune de ses missions, AVENCORE déploie une approche holistique impliquant les équipes Achats, Ingénierie, Marketing, Production, Qualité, Services et Après-Vente, Supply Chain...\n\nCe qu\'ils recherchent\nAVENCORE recherche des talents issus des grandes écoles d\'ingénieurs jeunes diplômé(e)s, ou plus expérimenté(e)s, issus du conseil ou de l\'industrie.\n\nIls ont en commun l\'envie :\n\nde travailler sur des projets variés et motivants intellectuellement, autour de problèmes concrets liés à des produits ou systèmes industriels complexes\nd\'être au cœur de l\'action chez les clients et de mesurer les impacts de leur travail\nde développer des compétences non techniques : animation, communication, synthèse, relation client...\nd\'exprimer leur esprit entrepreneur pour contribuer à la croissance d\'une entreprise en pleine évolution, agile et dynamique\nCapables de prendre de la hauteur sur les projets, ils savent rentrer dans le détail lorsque c\'est nécessaire. Ils sont dotés d\'une excellente communication écrite comme orale, et savent faire preuve de leadership pour créer les bonnes dynamiques autant avec les équipes des clients qu\'en interne.\n\nBon à savoir\nPas de backoffice chez AVENCORE ! En stage comme en CDI, AVENCORE recrute des consultants qui interviennent chez le client dès leur arrivée.\n\nUn programme de mentorat, et une formation sur mesure pour booster ses compétences méthodologiques, soft skills et développer sa culture industrielle\n\nDes évènements conviviaux organisés régulièrement\n\nUn environnement de travail agréable, au cœur de Paris sur les Champs-Elysées\n\nUn package salarial très attractif et une prime d\'intéressement\n\nMutuelle et prévoyance Alan prises en charge à 100%\n\nPolitique de télétravail flexible','entre 50 et 200 employés','Conseil / audit','AVENCORE'),(41,'AVENCORE est un cabinet de conseil international spécialisé dans l’industrie, qui déploie chez ses clients des solutions créatives, innovantes et efficaces pour atteindre l’excellence opérationnelle et répondre aux enjeux stratégiques. L\'entreprise intervient aussi bien pour des grands groupes internationaux que des ETI, et ce dans tous les secteurs industriels : aéronautique, spatial, énergie, transports, biens de grande consommation, industries de process, santé, automobile…\n\nAVENCORE intervient auprès de ses clients sur des problématiques de Direction Générale, tant sur des sujets stratégiques qu\'opérationnels. Pour chacune de ses missions, AVENCORE déploie une approche holistique impliquant les équipes Achats, Ingénierie, Marketing, Production, Qualité, Services et Après-Vente, Supply Chain...\n\nCe qu\'ils recherchent\nAVENCORE recherche des talents issus des grandes écoles d\'ingénieurs jeunes diplômé(e)s, ou plus expérimenté(e)s, issus du conseil ou de l\'industrie.\n\nIls ont en commun l\'envie :\n\nde travailler sur des projets variés et motivants intellectuellement, autour de problèmes concrets liés à des produits ou systèmes industriels complexes\nd\'être au cœur de l\'action chez les clients et de mesurer les impacts de leur travail\nde développer des compétences non techniques : animation, communication, synthèse, relation client...\nd\'exprimer leur esprit entrepreneur pour contribuer à la croissance d\'une entreprise en pleine évolution, agile et dynamique\nCapables de prendre de la hauteur sur les projets, ils savent rentrer dans le détail lorsque c\'est nécessaire. Ils sont dotés d\'une excellente communication écrite comme orale, et savent faire preuve de leadership pour créer les bonnes dynamiques autant avec les équipes des clients qu\'en interne.\n\nBon à savoir\nPas de backoffice chez AVENCORE ! En stage comme en CDI, AVENCORE recrute des consultants qui interviennent chez le client dès leur arrivée.\n\nUn programme de mentorat, et une formation sur mesure pour booster ses compétences méthodologiques, soft skills et développer sa culture industrielle\n\nDes évènements conviviaux organisés régulièrement\n\nUn environnement de travail agréable, au cœur de Paris sur les Champs-Elysées\n\nUn package salarial très attractif et une prime d\'intéressement\n\nMutuelle et prévoyance Alan prises en charge à 100%\n\nPolitique de télétravail flexible','entre 50 et 200 employés','Conseil / audit','AVENCORYY');
/*!40000 ALTER TABLE `entreprises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_offers`
--

DROP TABLE IF EXISTS `favorite_offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_offers` (
  `user_id` int NOT NULL,
  `offer_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`offer_id`),
  KEY `fk_offre_id` (`offer_id`),
  CONSTRAINT `fk_offre_id` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`),
  CONSTRAINT `fk_user_id_fav_offers` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_offers`
--

LOCK TABLES `favorite_offers` WRITE;
/*!40000 ALTER TABLE `favorite_offers` DISABLE KEYS */;
INSERT INTO `favorite_offers` VALUES (2,2);
/*!40000 ALTER TABLE `favorite_offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_interviews`
--

DROP TABLE IF EXISTS `job_interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_interviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `proposition_id` int NOT NULL,
  `is_visio` tinyint NOT NULL,
  `date` date NOT NULL,
  `location` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_interviews` (`user_id`),
  KEY `fk_proposition_id_interviews_idx` (`proposition_id`),
  CONSTRAINT `fk_proposition_id_interviews` FOREIGN KEY (`proposition_id`) REFERENCES `propositions` (`id`),
  CONSTRAINT `fk_user_id_interviews` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_interviews`
--

LOCK TABLES `job_interviews` WRITE;
/*!40000 ALTER TABLE `job_interviews` DISABLE KEYS */;
INSERT INTO `job_interviews` VALUES (1,1,1,1,'2023-02-27',NULL);
/*!40000 ALTER TABLE `job_interviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_threads`
--

DROP TABLE IF EXISTS `message_threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_threads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(45) NOT NULL,
  `user_id` int NOT NULL,
  `consultant_id` int NOT NULL,
  `proposition_id` int DEFAULT NULL,
  `origin` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_threads` (`user_id`),
  KEY `fk_consultant_id_threads` (`consultant_id`),
  KEY `fk_proposition_id_threads_idx` (`proposition_id`),
  CONSTRAINT `fk_consultant_id_threads` FOREIGN KEY (`consultant_id`) REFERENCES `consultants` (`id`),
  CONSTRAINT `fk_proposition_id_threads` FOREIGN KEY (`proposition_id`) REFERENCES `propositions` (`id`),
  CONSTRAINT `fk_user_id_threads` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_threads`
--

LOCK TABLES `message_threads` WRITE;
/*!40000 ALTER TABLE `message_threads` DISABLE KEYS */;
INSERT INTO `message_threads` VALUES (1,'candidature devOps',1,1,2,'');
/*!40000 ALTER TABLE `message_threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message_thread_id` int NOT NULL,
  `user_id` int NOT NULL,
  `consultant_id` int NOT NULL,
  `content` text NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `origin` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_message_thread` (`message_thread_id`),
  CONSTRAINT `fk_message_thread` FOREIGN KEY (`message_thread_id`) REFERENCES `message_threads` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,1,1,1,'J\'aimerais beaucoup travailler chez vous bla bla bla bla','2022-12-21 10:32:42','user');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consultant_id` int NOT NULL,
  `entreprise_id` int NOT NULL,
  `title` text NOT NULL,
  `city` varchar(45) NOT NULL,
  `stack` varchar(200) DEFAULT 'N/A',
  `max_compensation` int DEFAULT '0',
  `min_compensation` int DEFAULT '0',
  `remote_days` varchar(45) DEFAULT 'N/A',
  `education` varchar(45) DEFAULT 'N/A',
  `status` varchar(45) DEFAULT 'active',
  `job_field` varchar(45) NOT NULL,
  `zipcode` varchar(5) DEFAULT NULL,
  `content` text,
  `entreprise_contact_id` int NOT NULL,
  `date` date DEFAULT (curdate()),
  `geopoints` point NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_consultant_id` (`consultant_id`),
  KEY `fk_entreprise_id` (`entreprise_id`),
  KEY `fk_entreprise_contact_id_idx` (`entreprise_contact_id`),
  SPATIAL KEY `geopoints` (`geopoints`),
  CONSTRAINT `fk_consultant_id` FOREIGN KEY (`consultant_id`) REFERENCES `consultants` (`id`),
  CONSTRAINT `fk_entreprise_contact_id` FOREIGN KEY (`entreprise_contact_id`) REFERENCES `entreprise_contacts` (`id`),
  CONSTRAINT `fk_entreprise_id` FOREIGN KEY (`entreprise_id`) REFERENCES `entreprises` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (1,1,1,'Developer Frontend junior (React, Vue, SCSS)','Marseille','React, Vue, SCSS',40000,35000,'3','N/A','active','Dev Frontend','13000','Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem ',1,'2022-12-25',_binary '\0\0\0\0\0\0\0\nܺ��z@$\�F\�E@'),(2,1,2,'Lead DevOps au sein d\'une ESN spécialisé dans l\'immobilier (Kubernetees, AWS)','Bordeaux','Kubernetees, AWS',85000,85000,'N/A','N/A','active','DevOps / Infra',NULL,'Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem ',2,'2022-12-25',_binary '\0\0\0\0\0\0\0�\�\�~��\�j���<kF@'),(4,1,1,'Chef de projet web Microsoft Azure','Nice','Azure',65000,55000,'0','N/A','unfilled','other',NULL,'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',1,'2022-12-25',_binary '\0\0\0\0\0\0\0�T�u=@A;\�\�\�E@'),(15,1,1,'Intégrateur HTML CSS','Lyon','HTML CSS',30000,20000,'N/A','N/A','filled','',NULL,'Offre pour l\'intégration web',1,'2022-12-25',_binary '\0\0\0\0\0\0\0�n.��W@n\�8)\�\�F@'),(18,1,39,'Architect applicatif mobile','Paris','Jenkins, fastlane, Gradle, Sonar, cloud GCP, Terraform,  Ansible, macOS, Linux, réseau, sécurité, patterns µServices, API management, shell, scripting',79000,76000,'3','N/A','active','Dev Fullstack',NULL,'Face aux défis de notre époque, Carrefour a pour ambition de rendre le meilleur accessible à tous et d\'être le chef de file d\'une distribution responsable.\n\nCela signifie de nombreux projets et occasions d\'innover au quotidien pour nos équipes : permettre à 80 millions de foyers dans le monde d\'accéder à une alimentation, des produits et services de qualité ; travailler à la réduction des impacts de notre activité sur l\'environnement ; devenir une digital retail company ; renforcer l\'inclusion des personnes en situation de handicap...\n\nNous nous épanouissons en équipe :\n\nMétiers du commerce, métiers d\'expertise, entrepreneurs unissent leurs compétences et leurs efforts pour construire ensemble une chaîne de valeur au service des consommateurs. Au plus près de nos clients ou en coulisses, chacun a un rôle à jouer mais peut compter sur les autres pour réussir.\n\nNous veillons à ce que chacun puisse aller loin :\n\nNous sommes convaincus que la réussite ne dépend pas d\'où l\'on vient, mais de la possibilité d\'accéder à la même ligne de départ. C\'est pourquoi l\'envie et le mérite sont les seuls pré-requis pour nous rejoindre, accéder à une formation, changer de métier, être promu ou créer son entreprise.',12,'2022-12-25',_binary '\0\0\0\0\0\0\0\�z+�Y\�@��e�mH@'),(20,1,40,'Product manager','Boulogne-Billancourt','N/A',0,0,'N/A','N/A','active','Project / Product Management',NULL,'As a Product Manager you’ll work closely with the Product Designer and Engineers to build products that are valuable and usable to its users, that are able to support a viable business and that are technically feasible.\n\nResponsibilities and Duties\n• Know and understand Metron’s target users and their goals ;\n• Know and understand Metron’s competitive landscape ;\n• Build close relationships with your product’s stakeholders and be recognized as the “go-to person” in the area ;\n• Gather quantitative and qualitative feedback on how the product is being used and the experience users are having ;\n• Research and refine valueability pain points and their current alternatives ;\n• Collaborate with the Product Designer to research and refine usability pain points and their current alternatives ;\n• Take informed decisions on which pain points the team should concentrate its efforts ;\n• Collaborate with the Product Designer and Engineers to design feasible solutions that solve the pain points that we choose to tackle ;\n• Collaborate with the Product Designer and Engineers to find creative ways to deliver the designed solutions incrementaly ;\n• Plan and oversee in collaboration with the Tech Lead the delivery of the desired solutions ;\n• Collaborate with the Marketing department to rollout the solutions delivered ;\n• Gather quantitative and qualitative feedback on the impact of the delivered solutions.',27,'2023-01-02',_binary '\0\0\0\0\0\0\0\�C\�#W\�@\�M\�!{kH@'),(21,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(22,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(23,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(24,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(25,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(26,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(27,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(28,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(29,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(30,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(31,1,1,'Developer Frontend junior (React, Vue, SCSS)','Marseille','React, Vue, SCSS',40000,35000,'3','N/A','active','Dev Frontend','13000','Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem ',1,'2022-12-25',_binary '\0\0\0\0\0\0\0\nܺ��z@$\�F\�E@'),(32,1,2,'Lead DevOps au sein d\'une ESN spécialisé dans l\'immobilier (Kubernetees, AWS)','Bordeaux','Kubernetees, AWS',85000,85000,'N/A','N/A','active','DevOps / Infra',NULL,'Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem Il s\'agit d\'une bien belle offre lorem ',2,'2022-12-25',_binary '\0\0\0\0\0\0\0�\�\�~��\�j���<kF@'),(33,1,1,'Chef de projet web Microsoft Azure','Nice','Azure',65000,55000,'0','N/A','unfilled','other',NULL,'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',1,'2022-12-25',_binary '\0\0\0\0\0\0\0�T�u=@A;\�\�\�E@'),(34,1,1,'Intégrateur HTML CSS','Lyon','HTML CSS',30000,20000,'N/A','N/A','filled','',NULL,'Offre pour l\'intégration web',1,'2022-12-25',_binary '\0\0\0\0\0\0\0�n.��W@n\�8)\�\�F@'),(35,1,39,'Architect applicatif mobile','Paris','Jenkins, fastlane, Gradle, Sonar, cloud GCP, Terraform,  Ansible, macOS, Linux, réseau, sécurité, patterns µServices, API management, shell, scripting',79000,76000,'3','N/A','active','Dev Fullstack',NULL,'Face aux défis de notre époque, Carrefour a pour ambition de rendre le meilleur accessible à tous et d\'être le chef de file d\'une distribution responsable.\n\nCela signifie de nombreux projets et occasions d\'innover au quotidien pour nos équipes : permettre à 80 millions de foyers dans le monde d\'accéder à une alimentation, des produits et services de qualité ; travailler à la réduction des impacts de notre activité sur l\'environnement ; devenir une digital retail company ; renforcer l\'inclusion des personnes en situation de handicap...\n\nNous nous épanouissons en équipe :\n\nMétiers du commerce, métiers d\'expertise, entrepreneurs unissent leurs compétences et leurs efforts pour construire ensemble une chaîne de valeur au service des consommateurs. Au plus près de nos clients ou en coulisses, chacun a un rôle à jouer mais peut compter sur les autres pour réussir.\n\nNous veillons à ce que chacun puisse aller loin :\n\nNous sommes convaincus que la réussite ne dépend pas d\'où l\'on vient, mais de la possibilité d\'accéder à la même ligne de départ. C\'est pourquoi l\'envie et le mérite sont les seuls pré-requis pour nous rejoindre, accéder à une formation, changer de métier, être promu ou créer son entreprise.',12,'2022-12-25',_binary '\0\0\0\0\0\0\0\�z+�Y\�@��e�mH@'),(36,1,40,'Product manager','Boulogne-Billancourt','N/A',0,0,'N/A','N/A','active','Project / Product Management',NULL,'As a Product Manager you’ll work closely with the Product Designer and Engineers to build products that are valuable and usable to its users, that are able to support a viable business and that are technically feasible.\n\nResponsibilities and Duties\n• Know and understand Metron’s target users and their goals ;\n• Know and understand Metron’s competitive landscape ;\n• Build close relationships with your product’s stakeholders and be recognized as the “go-to person” in the area ;\n• Gather quantitative and qualitative feedback on how the product is being used and the experience users are having ;\n• Research and refine valueability pain points and their current alternatives ;\n• Collaborate with the Product Designer to research and refine usability pain points and their current alternatives ;\n• Take informed decisions on which pain points the team should concentrate its efforts ;\n• Collaborate with the Product Designer and Engineers to design feasible solutions that solve the pain points that we choose to tackle ;\n• Collaborate with the Product Designer and Engineers to find creative ways to deliver the designed solutions incrementaly ;\n• Plan and oversee in collaboration with the Tech Lead the delivery of the desired solutions ;\n• Collaborate with the Marketing department to rollout the solutions delivered ;\n• Gather quantitative and qualitative feedback on the impact of the delivered solutions.',27,'2023-01-02',_binary '\0\0\0\0\0\0\0\�C\�#W\�@\�M\�!{kH@'),(37,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(38,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(39,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(40,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(41,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(42,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(43,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(44,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(45,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(46,1,40,'Ingénieur IA','Rennes','Python',0,0,'5','N/A','active','Data Science',NULL,'Les missions principales sont :\n\nDévelopper et intégrer des algorithmes\nRapporter les avancées au responsable de pôle de compétence\nLes missions additionnelles sont :\n\nParticipation aux réunions avant-projets / Chiffrage\nTranscription des besoins clients dans une spécification technique\nProposition de développement de solutions basées sur les savoirs faire de l’entreprise en vu de les commercialiser\nCe poste est rattaché au pôle de compétence sur l’intelligence artificielle. L’ingénieur sera amené à collaborer quotidiennement avec des équipes ayant un spectre de compétences large :\n\nEn interne, avec les ingénieurs des pôles de compétences modélisation physique et développement logiciel,\nEn externe, avec les clients de l’entreprise (réunion d’avant projet, réunion d’avancement, démonstrations, …).\nLe poste est en télétravail à 100%. Des déplacements ponctuels et occasionnels chez les clients sont à prévoir.',14,'2023-01-02',_binary '\0\0\0\0\0\0\0p��\r=\���dw��H@'),(62,1,39,'test',' Loudéac','Python',130000,110000,'1','N/A','active','Sécurité',NULL,'contenu de l\'offre',28,'2023-01-07',_binary '\0\0\0\0\0\0\0\�=�#�K�|%�H@'),(63,1,39,'MANAGER ORGA ET SYSTEMES',' Massy','SQL, SAC, BigQuery',0,0,'2','N/A','active','Data Analysis',NULL,'Vous êtes le responsable des développements Reporting et Data au sein de la DSI CACI/CPI, vous aurez en charge la réalisation de l\'ensemble des dashboards et reporting nécessaire au pilotage de l\'activité de l\'entité CACI/CPI.\n\nA ce titre, vous serez amené à :\n\nBI & Reporting\n\nAssister aux ateliers métiers pour identifier le besoin en dashboard / reporting\nRéaliser les spécifications techniques du reporting\nIdentifier les données nécessaires dans le modèle de données\nRéaliser la modélisation d\'un datamart si besoin et créer ce datamart dans BigQuery\nRéaliser le développement de reporting avec des outils SAC / BIgQuery à partir des données provenant de SAP ou d\'autres systèmes tiers\nRédiger la documentation des datamarts et des dashboards dans Confluence\nReporter l\'avancement des développements à sa hiérarchie\nLivrables : Livraison de Dashboard, Livraison de scripts de datamart dans Bigquery, Livraison de reporting, Documentation dans Confluence\nAutres activités\n\nProjet : pilotage de petits projets techniques (intégration avec des nouveaux partenaires, mise en place de système de monitoring, …)\nRun : supervision de flux et de la production des différents systèmes\nDévelopper le pôle Data au sein de la Direction SI\nInformations Complémentaires :\nContrat : CDI Temps Plein\n\nStatut : Cadre Niveau 7\n\nLieu : Massy\n\nDisponibilité : Immédiate\n\nAvantages : rémunération selon profil + variables + intéressement, participation ; Carte Pass Carrefour (12%) ; 2 jours de Télétravail possible après 6 mois d\'ancienneté ; Vous aurez accès aux infrastructures du campus de Massy et à ses nombreux avantages comme la conciergerie, la salle de sport, la restauration (choix multiples), parking…\n\nChez Carrefour, nous avons à cœur de ne passer à côté d\'aucun talent et sommes fiers de compter des équipes représentatives de la société dans son ensemble. Nous encourageons ainsi tous types de profils à postuler à cette offre et garantissons un processus de recrutement dénué de toutes formes de discriminations.\n\nProfil recherché\nProfil :\nDiplômé d\'un Bac + 5 type Master et/ou Ecole d\'ingénieur spécialisés en informatique, réseaux et télécommunication. Vous justifiez d\'une expérience de 5 ans sur un poste similaire. Vous parlez anglais couramment. Vous maîtrisez SQL et avez des connaissances SAC, BigQuery et autres outils de BI. Vous avez une utilisation courante de JIRA et Confluence. Vous êtes reconnu pour votre esprit d\'initiative et votre dynamisme. Votre curiosité vous pousse donc à postuler !\n\nCarrefour\nCARREFOUR\n\n',12,'2023-01-07',_binary '\0\0\0\0\0\0\0�\�\�\�+@���i�]H@');
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propositions`
--

DROP TABLE IF EXISTS `propositions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propositions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `offer_id` int NOT NULL,
  `specific_cv` varchar(45) DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  `proposition_initiative` varchar(45) DEFAULT NULL,
  `date` date DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  KEY `fk_user_id_proposition` (`user_id`),
  KEY `fk_offre_id_proposition` (`offer_id`),
  CONSTRAINT `fk_offre_id_proposition` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`),
  CONSTRAINT `fk_user_id_proposition` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propositions`
--

LOCK TABLES `propositions` WRITE;
/*!40000 ALTER TABLE `propositions` DISABLE KEYS */;
INSERT INTO `propositions` VALUES (1,1,1,'','rejected','entreprise','2022-12-25'),(2,2,2,'','pending','entreprise','2022-12-25'),(3,2,2,NULL,'accepted','user','2022-12-25'),(4,2,1,NULL,'pending','entreprise','2022-12-25'),(5,3,4,NULL,'rejected','user','2022-12-25'),(6,3,15,NULL,'accepted','entreprise','2022-12-25');
/*!40000 ALTER TABLE `propositions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_preferences`
--

DROP TABLE IF EXISTS `search_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_preferences` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `city` varchar(45) NOT NULL,
  `stack` varchar(200) DEFAULT 'N/A',
  `job_field` varchar(45) DEFAULT 'N/A',
  `compensation` int DEFAULT '0',
  `entreprise_size` varchar(45) DEFAULT 'N/A',
  `industry` varchar(45) DEFAULT 'N/A',
  `remote_days` varchar(45) DEFAULT 'N/A',
  `education` varchar(45) DEFAULT 'N/A',
  `zipcode` varchar(5) DEFAULT 'N/A',
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_preferences`
--

LOCK TABLES `search_preferences` WRITE;
/*!40000 ALTER TABLE `search_preferences` DISABLE KEYS */;
INSERT INTO `search_preferences` VALUES (1,1,'Bordeaux','Kubernetees','DevOps / Infra',70000,'N/A','N/A','N/A','N/A','33000'),(2,2,'Marseilles	','React, JS, Vue','Dev Frontend',45000,'N/A','N/A','3','N/A','13000'),(3,3,'Rouen','MySql','Dev Backend',90000,'N/A','N/A','1','N/A','N/A');
/*!40000 ALTER TABLE `search_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_notifications`
--

DROP TABLE IF EXISTS `user_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  `offer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_user_notifications` (`user_id`),
  KEY `fk_offer_id` (`offer_id`),
  CONSTRAINT `fk_offer_id` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`),
  CONSTRAINT `fk_user_id_user_notifications` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_notifications`
--

LOCK TABLES `user_notifications` WRITE;
/*!40000 ALTER TABLE `user_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telephone` varchar(45) NOT NULL,
  `favcontactmethod` varchar(45) NOT NULL,
  `cv` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `zipcode` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'McQueen','Steve','leoterrier22+x@gmail.com','0751212693','email',NULL,'Bordeaux',1,'33000'),(2,'Henry','Luc','leoterrier22+x1@gmail.com','0751212693','email',NULL,'Marseilles',1,'13000'),(3,'Loner','Jean','jean.loner@gmail.com','04930403','email',NULL,'Lyon',0,'69001');
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

-- Dump completed on 2023-01-19 13:37:06
