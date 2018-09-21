
CREATE TABLE `print_data` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT 'Epri',
  `template` text COLLATE utf8_bin NOT NULL DEFAULT '',
  `size` varchar(10) COLLATE utf8_bin NOT NULL DEFAULT 'a4',
  `direction` varchar(10) COLLATE utf8_bin NOT NULL DEFAULT 'vertical',
  `created` bigint(12) NOT NULL DEFAULT '111111111111',
  `updated` bigint(12) NOT NULL DEFAULT '111111111111',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



CREATE TABLE `print_text` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `print_id` int(6) NOT NULL DEFAULT '0',
  `text` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '文字',
  `size` float NOT NULL DEFAULT '15',
  `x` float NOT NULL DEFAULT '100',
  `y` float NOT NULL DEFAULT '100',
  `font` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT 'MS Mincho',
  `desine` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT '0',
  `length` int(4) NOT NULL DEFAULT '20',
  `label` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT 'text',
  `tag` varchar(10) COLLATE utf8_bin NOT NULL DEFAULT 'input',
  `created` bigint(12) NOT NULL DEFAULT '111111111111',
  `updated` bigint(12) NOT NULL DEFAULT '111111111111',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `sheet_spec` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(10) COLLATE utf8_bin NOT NULL DEFAULT 'a4',
  `width` float(6) NOT NULL DEFAULT '210.0',
  `height` float(6) NOT NULL DEFAULT '297.0',
  `created` bigint(12) NOT NULL DEFAULT '111111111111',
  `updated` bigint(12) NOT NULL DEFAULT '111111111111',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



COMMIT;

