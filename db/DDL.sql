CREATE TABLE `products` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `code` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `type` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `amount` int(11) NOT NULL,
 `price` float(10.2) NOT NULL,
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 `destination` enum('1','0') COLLATE utf8_unicode_ci NOT NULL DEFAULT '1',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;