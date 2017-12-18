
CREATE TABLE `print_data` (
  `id` int(6) NOT NULL DEFAULT '0',
  `title` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT 'Epri',
  `template` text COLLATE utf8_bin NOT NULL DEFAULT '',
  `create` bigint(12) NOT NULL DEFAULT '111111111111',
  `update` bigint(12) NOT NULL DEFAULT '111111111111'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



CREATE TABLE `print_text` (
  `id` int(10) NOT NULL DEFAULT '0',
  `print_id` int(6) NOT NULL DEFAULT '0',
  `text` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '文字',
  `size` float NOT NULL DEFAULT '15',
  `x` float NOT NULL DEFAULT '100',
  `y` float NOT NULL DEFAULT '100',
  `font` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT 'MS Mincho',
  `desine` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT '0',
  `length` int(4) NOT NULL DEFAULT '20',
  `create` bigint(12) NOT NULL DEFAULT '111111111111',
  `update` bigint(12) NOT NULL DEFAULT '111111111111'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


COMMIT;

