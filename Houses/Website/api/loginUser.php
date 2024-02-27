<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require "../config/userController.php";
$user = new User();
if (isset($_POST['login'])){
  session_start();
  $username = $_POST['username'];
  $password = md5($_POST['password']);
  $result = $user->loginUser($username, $password);
  $result = json_encode($result);
  echo($result);
}
?>