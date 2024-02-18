<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require "../config/formController.php";
$form = new Form();
if (isset($_GET['fetch_voter_names'])) {
  if(isset($_GET['room_id'])) {
    $room_id = $_GET['room_id'];
    $room_type = $_GET['room_type'];
    echo json_encode($form->filterEmployee($room_id, $room_type));
  }
}
