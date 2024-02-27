<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require "../config/userController.php";
$user = new User();
if (isset($_POST['insert_data'])) {
  $employees = json_decode($_POST['employeeData']);
  $first_name = $employees->first_name;
  $last_name = $employees->last_name;
  $employee_exists = $user->checkUser($first_name, $last_name);
  if ($employee_exists->employee_count < 1) {
    $result = $user->insertUser($first_name, $last_name);
    if($result){
      echo "Success";
    }
  }
  else {
    echo "Employee already exists";
  }
}
