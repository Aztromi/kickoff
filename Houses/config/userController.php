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
}