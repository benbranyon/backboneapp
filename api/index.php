<?php 

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/brews', 'getBrews');
$app->get('/brews/:id', 'getBrew');

$app->run();

function getBrews()
{
}

function getBrew($id)
{
}

?>