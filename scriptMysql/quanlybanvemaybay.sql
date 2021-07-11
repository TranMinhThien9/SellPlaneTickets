/*
 Navicat Premium Data Transfer

 Source Server         : QuanLyBanVeMayBay
 Source Server Type    : MySQL
 Source Server Version : 100414
 Source Host           : localhost:3306
 Source Schema         : quanlybanvemaybay

 Target Server Type    : MySQL
 Target Server Version : 100414
 File Encoding         : 65001

 Date: 22/01/2021 16:35:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `identity_card` int(25) NOT NULL,
  `phone_number` int(20) NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sex` char(6) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `permission` int(50) NOT NULL,
 --  `refresh_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;
-- ----------------------------



-- ----------------------------
-- Table structure for airports
-- ----------------------------
DROP TABLE IF EXISTS `airports`;
CREATE TABLE `airports`  (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;
-- ----------------------------
INSERT INTO `airports` VALUES ('1', 'Tân Sơn Nhất', 'Trường Sơn, Phường 2, Tân Bình, Thành phố Hồ Chí Minh');
INSERT INTO `airports` VALUES ('2', 'Nội Bài', 'Phú Minh, Sóc Sơn, Hà Nội');
INSERT INTO `airports` VALUES ('3', 'Đà Nẵng', 'Nguyễn Văn Linh, Hòa Thuận Tây, Hải Châu, Đà Nẵng');
INSERT INTO `airports` VALUES ('4', 'Cần Thơ', '179B Lê Hồng Phong, Long Hoà, Bình Thủy, Cần Thơ');




-- ----------------------------
-- Table structure for planes
-- ----------------------------
DROP TABLE IF EXISTS `planes`;
CREATE TABLE `planes`  (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `num_of_fc_seats` int(50) NOT NULL,
  `num_of_eco_seats` int(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;
-- ----------------------------
INSERT INTO `planes` VALUES ('1', 'Hoạt Động','50','200');
INSERT INTO `planes` VALUES ('2', 'Đang Bảo Trì', '60','300');
INSERT INTO `planes` VALUES ('3', 'Hoạt Động', '55','200');
INSERT INTO `planes` VALUES ('4', 'Đang Bay', '50','300');







-- ----------------------------
-- Table structure for flights
-- ----------------------------
DROP TABLE IF EXISTS `flights`;
CREATE TABLE `flights`  (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `departure_time` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `arrival_time` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `duration` time NOT NULL,
  `capacity` int(10) NOT NULL,
  `first_class_price` int(100) NOT NULL,
  `eco_class_price` int(100) NOT NULL,
  `plane_id` int(50) COLLATE utf8_unicode_ci NOT NULL,
  `departure_airport_id` int(50) COLLATE utf8_unicode_ci NOT NULL,
  `arrival_airport_id` int(50) COLLATE utf8_unicode_ci NOT NULL,
  
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_flights_planes`(`plane_id`) USING BTREE,
  INDEX `fk_flights_airports1`(`departure_airport_id`) USING BTREE,  
  INDEX `fk_flights_airports2`(`arrival_airport_id`) USING BTREE,
  CONSTRAINT `fk_flights_planes` FOREIGN KEY (`plane_id`) REFERENCES `planes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_flights_airports1` FOREIGN KEY (`departure_airport_id`) REFERENCES `airports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_flights_airports2` FOREIGN KEY (`arrival_airport_id`) REFERENCES `airports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;
-- ----------------------------



-- ----------------------------
-- Table structure for tickets
-- ----------------------------
DROP TABLE IF EXISTS `tickets`;
CREATE TABLE `tickets`  (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `seat_code` int(10) NOT NULL,
  `flight_id` int(50) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(50) COLLATE utf8_unicode_ci NOT NULL,
  
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_tickets_flights`(`flight_id`) USING BTREE,
  INDEX `fk_tickets_users`(`user_id`) USING BTREE,  
  CONSTRAINT `fk_tickets_flights` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;
-- ----------------------------


-- ----------------------------
-- Table structure for detail_transits
-- ----------------------------
DROP TABLE IF EXISTS `detail_transits`;
CREATE TABLE `detail_transits`  (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `transit_time` time NOT NULL,
  `flight_id` int(50) COLLATE utf8_unicode_ci NOT NULL,
  `airport_id` int(50) COLLATE utf8_unicode_ci NOT NULL,
  
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_detail_transits_flights`(`flight_id`) USING BTREE,
  INDEX `fk_detail_transits_airports`(`airport_id`) USING BTREE,  
  CONSTRAINT `fk_detail_transits_flights` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detail_transits_airports` FOREIGN KEY (`airport_id`) REFERENCES `airports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;
-- ----------------------------

-- ----------------------------
-- Records of user
-- ----------------------------

INSERT INTO `flights` VALUES ('1', '2021-01-01 00:00:01', '2021-01-01 03:00:01','00:00:01', '250','5000000','3000000', '1', '1', '2' );
INSERT INTO `flights` VALUES ('2', '2021-01-02 00:00:01', '2021-01-02 05:00:01','00:00:01', '350','4000000','2000000', '2', '3', '1' );
INSERT INTO `flights` VALUES ('3', '2021-05-04 02:00:01', '2021-05-04 07:00:01','00:00:01', '450','6000000','4000000', '3', '1', '4' );
INSERT INTO `flights` VALUES ('4', '2021-03-03 07:00:01', '2021-03-03 09:00:01','00:00:01', '150','2000000','1000000', '2', '3', '4' );

INSERT INTO `tickets` VALUES ('1', '19','1','1');
INSERT INTO `tickets` VALUES ('2', '32', '2','2');
INSERT INTO `tickets` VALUES ('3', '46', '3','3');
INSERT INTO `tickets` VALUES ('4', '2', '4','4');

INSERT INTO `detail_transits` VALUES ('1', '00:00:01','1','1');
INSERT INTO `detail_transits` VALUES ('2', '00:00:01', '2','3');
INSERT INTO `detail_transits` VALUES ('3', '00:00:01', '3','3');
INSERT INTO `detail_transits` VALUES ('4', '00:00:01', '4','2');

SET FOREIGN_KEY_CHECKS = 1;
