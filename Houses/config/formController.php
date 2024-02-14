<?php
require_once 'controller.php';
class Form extends Controller
{
    function fetchEmployee()
    {
        $this->setStatement("SELECT * FROM tbl_users");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function insertWhiteRoomVote($houseVoteId, $userVoteId)
    {
        $this->setStatement("INSERT INTO tbl_votes(`room_id`, `house_vote_id`, `user_vote_id`) 
         VALUES (1,:houseVoteId,:userVoteId)");
        $this->statement->execute([':houseVoteId' => $houseVoteId, ':userVoteId' => $userVoteId]);
        return $this->connection->lastInsertId();
    }

    function insertBlackRoomVote($houseVoteId, $userVoteId)
    {
        $this->setStatement("INSERT INTO tbl_votes(`room_id`, `house_vote_id`, `user_vote_id`) 
         VALUES (2,:houseVoteId,:userVoteId)");
        $this->statement->execute([':houseVoteId' => $houseVoteId, ':userVoteId' => $userVoteId]);
        return $this->connection->lastInsertId();
    }
}
