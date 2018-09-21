<?php

/**
 *FrameWorkLoad
*/

define("PHOTODIR", dirname(__FILE__)."/web/img/up/");
define("THAMDIR", dirname(__FILE__)."/web/img/small/");

require 'app/core/ClassLoader.php';

$loader = new ClassLoader();
$loader->registerDir(dirname(__FILE__).'/app/core');
$loader->registerDir(dirname(__FILE__).'/model');
$loader->registerDir(dirname(__FILE__).'/form');
$loader->registerDir(dirname(__FILE__).'/lib');

$loader->register();

/**
 * TwigLoad
 */

require_once dirname(__FILE__).'/app/lib/Twig/Autoloader.php';
Twig_Autoloader::register();
?>