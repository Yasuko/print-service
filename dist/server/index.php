<?php


ini_set( 'display_errors', 1 );

require './bootstrap.php';
require './PrintApplication.php';
require './Config.php';

$app = new PrintApplication(true);
$app->run();


?>



