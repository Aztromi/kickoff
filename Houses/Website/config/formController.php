<?php
require_once 'controller.php';
class Form extends Controller
{
    function fetchEmployee()
    {
        $this->setStatement("SELECT user_id, CONCAT(first_name, ' ', last_name) AS full_name FROM tbl_users");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function filterEmployee($room_id)
    {
        $this->setStatement("SELECT
        tbl_users.user_id,
        CONCAT(tbl_users.first_name, ' ', tbl_users.last_name) AS full_name,
        tbl_votes.room_id
    FROM
        tbl_users
    LEFT JOIN
        tbl_votes ON tbl_votes.user_vote_id = tbl_users.user_id
        AND tbl_votes.room_id = :room_id
    WHERE
        tbl_votes.room_id <> :room_id OR tbl_votes.room_id IS NULL");
        $this->statement->execute([':room_id' => $room_id]);
        return $this->statement->fetchAll();
    }

    function insertVote($roomID, $userID, $house)
    {
        $this->setStatement("INSERT INTO tbl_votes(`room_id`, `house_vote_id`, `user_vote_id`) 
         VALUES (:roomID,:house,:userID)");
        $this->statement->execute([':roomID' => $roomID, ':userID' => $userID, ':house' => $house]);
        return $this->connection->lastInsertId();
    }
}
