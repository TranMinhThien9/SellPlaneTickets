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
  `status` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `num_of_fc_seats` int(50) NOT NULL,
  `num_of_eco_seats` int(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;
-- ----------------------------
INSERT INTO `airports` VALUES ('1', 'Hoạt Động','50','200');
INSERT INTO `airports` VALUES ('2', 'Đang Bảo Trì', '60','300');
INSERT INTO `airports` VALUES ('3', 'Hoạt Động', '55','200');
INSERT INTO `airports` VALUES ('4', 'Đang Bay', '50','300');







-- ----------------------------
-- Table structure for flights
-- ----------------------------
DROP TABLE IF EXISTS `flights`;
CREATE TABLE `flights`  (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `departure_time` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `arrival_time` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `duration` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `capacity` int(10) NOT NULL,
  `first_class_price` int(100) NOT NULL,
  `eco_class_price` int(100) NOT NULL,
  `plane_id` int(50) COLLATE utf8_unicode_ci NOT NULL,
  `departure_airport_id` int(50) COLLATE utf8_unicode_ci NOT NULL,
  `arrival_airport_id` int(50) COLLATE utf8_unicode_ci NOT NULL,
  
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_flights_planes`(`plane_id`) USING BTREE,
  INDEX `fk_flights_airports`(`departure_airport_id`) USING BTREE,  
  INDEX `fk_flights_airports`(`arrival_airport_id`) USING BTREE,
  CONSTRAINT `fk_flights_planes` FOREIGN KEY (`plane_id`) REFERENCES `planes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_flights_airports` FOREIGN KEY (`departure_airport_id`) REFERENCES `airports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_flights_airports` FOREIGN KEY (`arrival_airport_id`) REFERENCES `airports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `transit_time` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
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
INSERT INTO `user` VALUES ('002e7e4f-325c-4f71-b98f-f4ac8ed704a0', 'Hoàng Văn Long', 'hvlong', '$2a$08$vhnHz/9bCgKNewPIRF9ofuLZMRxh8Ks1qgL19.vqd1SWbItjnj..O', 'hvlong@gmail.com', NULL, 1, 'VAvWiWue8z65zJTYNkI6U696sdod3nlNxKIwgjcD6317YKmeUMiuN5q4EyVUbzVr3UcaUZD5VuP2TSK4');
-- INSERT INTO `user` VALUES ('61a66363-e6bd-40dd-8588-e58bc92ebe4a', 'Âu Dương Phong', 'auphong', '$2a$08$1GSbXW43U4gH.4h3zsqD5uNuri/yuI/948Pv1QpQ48ChJT7qH6O7C', 'auphong009@gmail.com', NULL, 1, 'wm19zMdOWq9zJFoaaBiUT9kuPBt44stBiJn8bhwlEvNGKdDUn64nUuWDhMq01ld5NnW9NlRiPkpZcLJw');
-- INSERT INTO `user` VALUES ('fd5bd7a4-52c3-474d-a482-74e01b318311', 'Dương Văn Khang', 'dvkhangnt', '$2a$08$P6qDJNQC1RvBdFDZ3ERDN.l2LHOcRRwXxWygF9bSUjDAxS1YT7EWi', 'dvkhangnt@gmail.comm', '0347347185', 1, 'WDFMc0jE43xkGVWWFAIb11hERAmeDVuL9vNXYxLIUlMbYg0Lq7k3rVAhnnU94GlNOtRuX2FFLwASYz31');


SET FOREIGN_KEY_CHECKS = 1;
