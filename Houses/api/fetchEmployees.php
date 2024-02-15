<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require "../config/formController.php";
$form = new Form();
if (isset($_GET['fetch_employees'])) {
  echo json_encode($form->fetchEmployee());
}
