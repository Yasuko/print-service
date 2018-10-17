# ``@`%` に対する特権


# ``@`localhost` に対する特権

GRANT USAGE ON *.* TO ''@'localhost';


# `pma`@`localhost` に対する特権

GRANT USAGE ON *.* TO 'pma'@'localhost';

GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON `phpmyadmin`.* TO 'pma'@'localhost';


# `reserve`@`localhost` に対する特権

GRANT ALL PRIVILEGES ON *.* TO 'reserve'@'localhost' IDENTIFIED BY PASSWORD '*AB4B421F634D9F785020CF1383FB825B5C962E0D' WITH GRANT OPTION;


# `root`@`127.0.0.1` に対する特権

GRANT ALL PRIVILEGES ON *.* TO 'root'@'127.0.0.1' WITH GRANT OPTION;


# `root`@`::1` に対する特権

GRANT ALL PRIVILEGES ON *.* TO 'root'@'::1' WITH GRANT OPTION;


# `root`@`localhost` に対する特権

GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;

GRANT PROXY ON ''@'%' TO 'root'@'localhost' WITH GRANT OPTION;