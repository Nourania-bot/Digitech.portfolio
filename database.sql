-- ============================================================
-- Digitech Madagascar — Base de données MySQL 8
-- ============================================================
CREATE DATABASE IF NOT EXISTS digitech_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE digitech_db;

CREATE TABLE IF NOT EXISTS admins (
  id_admin      INT PRIMARY KEY AUTO_INCREMENT,
  email_admin   VARCHAR(150) NOT NULL UNIQUE,
  pwd_hash      VARCHAR(255) NOT NULL,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id_service    INT PRIMARY KEY AUTO_INCREMENT,
  icon_service  VARCHAR(10) NOT NULL DEFAULT '💡',
  titre_service VARCHAR(100) NOT NULL,
  desc_service  TEXT NOT NULL,
  tag_service   VARCHAR(200),
  id_admin      INT NOT NULL,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_admin) REFERENCES admins(id_admin) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projects (
  id_project    INT PRIMARY KEY AUTO_INCREMENT,
  categorie     VARCHAR(50) NOT NULL DEFAULT 'Web',
  nom_project   VARCHAR(100) NOT NULL,
  desc_courte   TEXT NOT NULL,
  desc_complete TEXT NOT NULL,
  emoji_project VARCHAR(10) DEFAULT '🚀',
  tags_project  JSON,
  id_admin      INT NOT NULL,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_admin) REFERENCES admins(id_admin) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contacts (
  id_contact    INT PRIMARY KEY AUTO_INCREMENT,
  nom_contact   VARCHAR(100) NOT NULL,
  email_contact VARCHAR(150) NOT NULL,
  sujet_contact VARCHAR(200) NOT NULL,
  msg_contact   TEXT NOT NULL,
  lu_contact    TINYINT(1) DEFAULT 0,
  date_envoi    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin par defaut — mot de passe: Admin@2025
INSERT IGNORE INTO admins (email_admin, pwd_hash) VALUES
('admin@digitech.mg','$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHi2');

INSERT IGNORE INTO services (icon_service, titre_service, desc_service, tag_service, id_admin) VALUES
('💻','Développement Web','Création de sites et applications web modernes, responsive et performants.','React / Node.js / Laravel',1),
('📱','Application Mobile','Développement d''applications mobiles iOS et Android avec UX optimale.','React Native / Flutter',1),
('🎨','UI/UX Design','Conception d''interfaces intuitives et esthétiques.','Figma / Adobe XD',1),
('🤖','Intelligence Artificielle','Intégration de solutions IA pour automatiser vos processus.','Python / TensorFlow',1),
('🛒','E-Commerce','Boutiques en ligne performantes avec gestion paiements et stocks.','WooCommerce / Stripe',1),
('☁️','Cloud & DevOps','Déploiement cloud avec pipelines CI/CD robustes.','AWS / Docker / GitHub Actions',1);

INSERT IGNORE INTO projects (categorie, nom_project, desc_courte, desc_complete, emoji_project, tags_project, id_admin) VALUES
('Web','DigoExpress','Application de livraison rapide connectant clients et livreurs.','Plateforme complète de livraison à la demande avec géolocalisation temps réel.','🚀','["React","Node.js","MySQL","Socket.io"]',1),
('Mobile','MadaPay','Solution de paiement mobile sécurisée.','Application de paiement compatible opérateurs locaux malgaches.','💳','["React Native","Express","MySQL"]',1),
('Web','EduTrack','Plateforme de gestion scolaire complète.','Gestion notes, absences, emplois du temps et communication parents.','📚','["React","Laravel","MySQL"]',1),
('IA','AgriBot','Assistant IA pour agriculteurs malgaches.','Chatbot intelligent basé sur météo et données de sol locales.','🌱','["Python","TensorFlow","React","Node.js"]',1);
