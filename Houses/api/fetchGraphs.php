<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require "../config/graphController.php";
$graph = new Graph();
if (isset($_GET['employee_vote_count'])) {
  echo json_encode($graph->fetchVoteCount());
}
if (isset($_GET['room_vote_count'])) {
  echo json_encode($graph->fetchRoomVoteCount());
}
if (isset($_GET['white_room_vote_count'])) {
  echo json_encode($graph->fetchWhiteRoomVoteCount());
}
if (isset($_GET['black_room_vote_count'])) {
  echo json_encode($graph->fetchBlackRoomVoteCount());
}
