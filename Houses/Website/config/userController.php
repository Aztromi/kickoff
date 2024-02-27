<?php
require_once 'controller.php';
class User extends Controller
{
  function loginUser ($username, $password) {
    $this->setStatement("SELECT * FROM tbl_user_access WHERE username = :user AND password = :pass");
    try{
      $this->statement->execute([':user' => $username, ':pass' => $password]);
      $result = $this->statement->fetch();
      if ($result){
        return $result;
      }else{
        return "Incorrect username or password";
      }
    } catch (PDOException $e){
      return $e->getMessage();
    }
  }
  function checkUser($firstName, $lastName){
    $this->setStatement("SELECT COUNT(*) AS employee_count FROM tbl_users WHERE first_name = :firstName AND last_name = :lastName");
    $this->statement->execute([':firstName' => $firstName, ':lastName' => $lastName]);
    return $this->statement->fetch();
  }
  function insertUser($first_name, $last_name){
    $this->setStatement("INSERT INTO tbl_users (first_name, last_name) VALUES (:firstName, :lastName)");
    return $this->statement->execute([':firstName' => $first_name, ':lastName' => $last_name]);
  }
}