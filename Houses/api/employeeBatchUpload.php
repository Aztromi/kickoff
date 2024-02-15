<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require "../config/userController.php";
$user = new User();
if (isset($_POST['insert_data'])) {
  $employees = json_decode($_POST['employeeData']);
  $count = count($employees);
  $cnt = 0;
  $success = true;
  for ($i = 0; $i < $count; $i++) {
    $first_name = $employees[$i]->first_name;
    $last_name = $employees[$i]->last_name;
    $employee_exists = $user->checkUser($first_name, $last_name);
    if ($employee_exists->employee_count < 1) {
      $result = $user->insertUser($first_name, $last_name);
      if (!$result) {
        $success = false;
      }
    }
  }
  // for ($i = 0; $i < $count; $i++) {
  //   $first_name = $employees[$i]->first_name;
  //   $last_name = $employees[$i]->last_name;
  //   $result = $user->insertUser($first_name, $last_name);
  // }
  if ($success) {
    echo "Success";
  } else {
    echo "Some or all insertions failed";
  }
}
