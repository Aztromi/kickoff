<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require "../config/formController.php";
$formController = new Form();
if (isset($_POST['vote'])) {
  $roomID = $_POST['roomID'];
  $userID = $_POST['userID'];
  $house = $_POST['house'];
  $result = $formController->insertVote($roomID, $userID, $house);
  if ($result) {
    echo "success";
  } else {
    echo "error";
  }
}