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
--   `date_of_birth` date CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `permission` int(50) NOT NULL,
--   `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
 --  `refresh_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
-- INSERT INTO `admin` VALUES ('7e37ea96-2e84-4bcf-94b1-f79015d53117', 'ADMIN', 'admin', '$2a$08$6fSgE6B0yDHXFYhopTafgOT6DXZaZJfRClCvomBTXdJDhb8tvrTim', 'auphong009@gmail.com', 'uPi1YxYxpCKjmbXbgakrT1GgBVWOX4itCLMCFzRkx3rPtR2c3IDFkJQWKWcvnxUufKP7NHYEAKwLfwz2');

-- ----------------------------
-- Table structure for conference
-- ----------------------------
-- DROP TABLE IF EXISTS `conference`;
-- CREATE TABLE `conference`  (
--   `id` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
--   `venue_id` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
--   `name` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
--   `short_desc` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
--   `long_desc` varchar(5000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
--   `image_link` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
--   `time_start` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
--   `time_end` timestamp(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
--   `status` int(1) NOT NULL,
--   PRIMARY KEY (`id`) USING BTREE,
--   INDEX `fk_conference_venus`(`venue_id`) USING BTREE,
--   CONSTRAINT `fk_conference_venus` FOREIGN KEY (`venue_id`) REFERENCES `venue` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
-- ) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for user
-- ----------------------------
-- DROP TABLE IF EXISTS `user`;
-- CREATE TABLE `user`  (
--   `id` char(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
--   `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
--   `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
--   `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
--   `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
--   `phone_number` char(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
--   `is_active` int(1) NOT NULL,
--   `refresh_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
--   PRIMARY KEY (`id`) USING BTREE
-- ) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
-- INSERT INTO `user` VALUES ('002e7e4f-325c-4f71-b98f-f4ac8ed704a0', 'Hoàng Văn Long', 'hvlong', '$2a$08$vhnHz/9bCgKNewPIRF9ofuLZMRxh8Ks1qgL19.vqd1SWbItjnj..O', 'hvlong@gmail.com', NULL, 1, 'VAvWiWue8z65zJTYNkI6U696sdod3nlNxKIwgjcD6317YKmeUMiuN5q4EyVUbzVr3UcaUZD5VuP2TSK4');
-- INSERT INTO `user` VALUES ('61a66363-e6bd-40dd-8588-e58bc92ebe4a', 'Âu Dương Phong', 'auphong', '$2a$08$1GSbXW43U4gH.4h3zsqD5uNuri/yuI/948Pv1QpQ48ChJT7qH6O7C', 'auphong009@gmail.com', NULL, 1, 'wm19zMdOWq9zJFoaaBiUT9kuPBt44stBiJn8bhwlEvNGKdDUn64nUuWDhMq01ld5NnW9NlRiPkpZcLJw');
-- INSERT INTO `user` VALUES ('fd5bd7a4-52c3-474d-a482-74e01b318311', 'Dương Văn Khang', 'dvkhangnt', '$2a$08$P6qDJNQC1RvBdFDZ3ERDN.l2LHOcRRwXxWygF9bSUjDAxS1YT7EWi', 'dvkhangnt@gmail.comm', '0347347185', 1, 'WDFMc0jE43xkGVWWFAIb11hERAmeDVuL9vNXYxLIUlMbYg0Lq7k3rVAhnnU94GlNOtRuX2FFLwASYz31');


SET FOREIGN_KEY_CHECKS = 1;
