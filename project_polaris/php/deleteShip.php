<?php
require_once 'basics_bdd.php';

// Delete the current ship
$id = $_SERVER['REMOTE_ADDR'];
deleteFieldById($id, "ship");

?>