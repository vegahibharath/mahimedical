/*
SQLyog Community Edition- MySQL GUI v6.07
Host - 5.0.67-community-nt : Database - bank
*********************************************************************
Server version : 5.0.67-community-nt
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `bank`;

USE `bank`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `acntnum` */

DROP TABLE IF EXISTS `acntnum`;

CREATE TABLE `acntnum` (
  `a_no` varchar(50) NOT NULL,
  `card_num` varchar(255) default NULL,
  `cvv` varchar(255) default NULL,
  `bank_name` varchar(255) default NULL,
  `user_name` varchar(255) default NULL,
  `nick_name` varchar(255) default NULL,
  `address` varchar(255) default NULL,
  `transaction_limit` text,
  `cash_limit` text,
  `exp_date` text,
  `credit_taken` int(11) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `acntnum` */

insert  into `acntnum`(`a_no`,`card_num`,`cvv`,`bank_name`,`user_name`,`nick_name`,`address`,`transaction_limit`,`cash_limit`,`exp_date`,`credit_taken`) values ('Requested','Requested','Requested','san@gmail.com','sai','hhj','ts','5555','55','Assign',0),('Requested','Requested','Requested',NULL,'Rahul Sharma','sru','Hyderabad','70009','8990','Assign',0);

/*Table structure for table `acntnumreq` */

DROP TABLE IF EXISTS `acntnumreq`;

CREATE TABLE `acntnumreq` (
  `id` int(11) NOT NULL auto_increment,
  `bank_name` varchar(255) default NULL,
  `user_name` varchar(255) default NULL,
  `nick_name` varchar(255) default NULL,
  `address` varchar(255) default NULL,
  `a_no` varchar(255) default NULL,
  `card_num` varchar(255) default NULL,
  `cvv` varchar(255) default NULL,
  `transaction_limit` text,
  `cash_limit` text,
  `exp_date` varchar(255) default NULL,
  `req_date` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `acntnumreq` */

insert  into `acntnumreq`(`id`,`bank_name`,`user_name`,`nick_name`,`address`,`a_no`,`card_num`,`cvv`,`transaction_limit`,`cash_limit`,`exp_date`,`req_date`) values (2,'san@gmail.com','sai','hhj','ts','Requested','Requested','Requested','5555','55','Assign','04/12/2024   11:19:53'),(3,NULL,'Rahul Sharma','sru','Hyderabad','Requested','Requested','Requested','70009','8990','Assign','28/01/2026   14:56:08');

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(15) NOT NULL auto_increment,
  `username` varchar(255) character set latin1 collate latin1_general_ci NOT NULL,
  `password` varchar(255) character set latin1 collate latin1_general_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `admin` */

insert  into `admin`(`id`,`username`,`password`) values (1,'admin','admin');

/*Table structure for table `bankmanager` */

DROP TABLE IF EXISTS `bankmanager`;

CREATE TABLE `bankmanager` (
  `id` int(50) NOT NULL auto_increment,
  `username` varchar(255) default NULL,
  `password` varchar(255) default NULL,
  `bank` varchar(255) default NULL,
  `branch` varchar(255) default NULL,
  `email` varchar(255) NOT NULL,
  `status` varchar(50) default NULL,
  `profile` varchar(300) default NULL,
  PRIMARY KEY  (`id`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `bankmanager` */

insert  into `bankmanager`(`id`,`username`,`password`,`bank`,`branch`,`email`,`status`,`profile`) values (5,'ss','ss','sbi','hyd','ss@gmail.com','Authorized','img2.jpg'),(6,'Amit Kumar','amit123','SBI','Hyderabad','amit@sbi.com','Authorized','manager1.jpg');

/*Table structure for table `kyc` */

DROP TABLE IF EXISTS `kyc`;

CREATE TABLE `kyc` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(50) default NULL,
  `previous_hash` varchar(64) default NULL,
  `aadharnum` varchar(50) default NULL,
  `encrypted_data` text,
  `current_hash` varchar(64) default NULL,
  `timestamp` timestamp NOT NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `kyc` */

insert  into `kyc`(`id`,`username`,`previous_hash`,`aadharnum`,`encrypted_data`,`current_hash`,`timestamp`) values (4,'sai','0','123412341234','CKbvjdlhiSuT47HcPh8qzALIJf2RNsGkdq+0lpkp06IIsu+KnCmJYtK76J1hWXaVW/tyr/4=','1fzB/UOxJphF7/Ap1oo1QKqRpyENeR4YbCiaZ4qiZKM=','2024-12-02 17:59:53');

/*Table structure for table `loanprocess` */

DROP TABLE IF EXISTS `loanprocess`;

CREATE TABLE `loanprocess` (
  `id` int(50) NOT NULL auto_increment,
  `username` varchar(100) default NULL,
  `loan_type` varchar(100) default NULL,
  `bank_name` varchar(100) default NULL,
  `kyc_id` int(50) default NULL,
  `status` varchar(50) default 'Pending',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `loan_type` (`loan_type`,`bank_name`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Data for the table `loanprocess` */

insert  into `loanprocess`(`id`,`username`,`loan_type`,`bank_name`,`kyc_id`,`status`) values (5,'sai','Personal_loan','SBI',4,'Pending'),(6,'sai','Personal_loan','AXIS',4,'Pending'),(7,'sai','Personal_loan','bank of baroda',4,'Pending'),(8,'sai','Personal_loan','union bank',4,'Pending');

/*Table structure for table `loans` */

DROP TABLE IF EXISTS `loans`;

CREATE TABLE `loans` (
  `id` int(11) NOT NULL auto_increment,
  `loan_type` varchar(50) default NULL,
  `bank_name` varchar(100) default NULL,
  `loan_amount` decimal(15,2) default NULL,
  `loan_period` varchar(50) default NULL,
  `rate_of_interest` decimal(5,2) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

/*Data for the table `loans` */

insert  into `loans`(`id`,`loan_type`,`bank_name`,`loan_amount`,`loan_period`,`rate_of_interest`) values (1,'personal_loan','SBI','1000000.00','60','1.80'),(2,'personal_loan','AXIS','2500000.00','48','2.00'),(3,'personal_loan','bank of baroda','1000000.00','36','1.85'),(4,'personal_loan','union bank','2500000.00','60','1.50'),(5,'personal_loan','kotak','1800000.00','36','1.20'),(6,'personal_loan','icici','3000000.00','60','1.10'),(7,'Business Loan','SBI','1500000.00','60','1.80'),(8,'Business Loan','AXIS','1250000.00','80','1.00'),(9,'Gold Loan','AXIS','2000000.00','60','1.50'),(10,'Vehicle Loan','union bank','3000000.00','80','1.00'),(11,'Unsecured Loan','kotak','1500000.00','60','1.50'),(12,'Home Loan','icici','3000000.00','60','0.80'),(13,'Loan Against Property','icici','5000000.00','80','0.90');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(15) NOT NULL auto_increment,
  `fullname` varchar(50) default NULL,
  `password` varchar(255) default NULL,
  `email` varchar(255) NOT NULL,
  `phone` bigint(15) default NULL,
  `dob` varchar(255) default NULL,
  `address` varchar(255) default NULL,
  `aadharnum` bigint(50) default NULL,
  `status` varchar(300) default NULL,
  `profile` varchar(300) default NULL,
  PRIMARY KEY  (`email`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `user` */

insert  into `user`(`id`,`fullname`,`password`,`email`,`phone`,`dob`,`address`,`aadharnum`,`status`,`profile`) values (4,'Rahul Sharma','rahul123','rahul@gmail.com',9876543210,'1999-05-15','Hyderabad',456789123456,'Authorized','default.jpg'),(3,'sai','sai','san@gmail.com',9874563210,'2000-01-01','ts',123412341234,'Authorized','img2.jpg');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
