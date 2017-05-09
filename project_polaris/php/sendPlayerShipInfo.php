<?php
require_once 'basics_bdd.php';

// Get our variables from post
$id = $_SERVER['REMOTE_ADDR'];
$name = filter_input(INPUT_POST, 'shipName', FILTER_SANITIZE_SPECIAL_CHARS);
$x = filter_input(INPUT_POST, 'x', FILTER_SANITIZE_SPECIAL_CHARS);
$y = filter_input(INPUT_POST, 'y', FILTER_SANITIZE_SPECIAL_CHARS);
$angle = filter_input(INPUT_POST, 'angle', FILTER_SANITIZE_SPECIAL_CHARS);

// Connect to db
$dbc = connection();
$dbc->quote("ship");

// requete (Insert if not exist, update if exsists)
$req = "INSERT INTO ship (id, name, x, y, angle) VALUES(:id, :name, :x, :y, :angle) ON DUPLICATE KEY UPDATE name=:name, x=:x, y=:y, angle=:angle";

// Prepare request
$requPrep = $dbc->prepare($req);

// Bind every variables
$requPrep->bindParam(':id', $id, PDO::PARAM_STR);
$requPrep->bindParam(':name', $name, PDO::PARAM_STR);
$requPrep->bindParam(':x', $x, PDO::PARAM_STR);
$requPrep->bindParam(':y', $y, PDO::PARAM_BOOL);
$requPrep->bindParam(':angle', $angle, PDO::PARAM_STR);

// Execute the request
$requPrep->execute();
$requPrep->closeCursor();
?>