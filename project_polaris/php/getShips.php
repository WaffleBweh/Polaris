<?php
require_once 'basics_bdd.php';

$id = $_SERVER['REMOTE_ADDR'];

echo json_encode(getAllFieldsCondition("ship", "WHERE id != '" . $id . "'"));
?>