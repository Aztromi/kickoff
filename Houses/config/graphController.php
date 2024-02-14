<?php
require_once 'controller.php';
class Graph extends Controller
{
    function fetchWhiteRoomVoteCount()
    {
        $this->setStatement("SELECT b.room_name,count(*) as vote_count FROM tbl_votes a
        LEFT JOIN tbl_rooms b ON a.room_id = b.room_id
        WHERE b.room_id = 1;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    
    function fetchBlackRoomVoteCount()
    {
        $this->setStatement("SELECT b.room_name,count(*) as vote_count FROM tbl_votes a
        LEFT JOIN tbl_rooms b ON a.room_id = b.room_id
        WHERE b.room_id = 2;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function fetchWhiteRoomLiveOutFaithVoteCount()
    {
        $this->setStatement("SELECT b.house_name,c.room_name,count(*) as vote_count FROM tbl_votes a 
        LEFT JOIN tbl_houses b ON a.house_vote_id = b.house_id 
        LEFT JOIN tbl_rooms c ON a.room_id = c.room_id 
        WHERE b.house_id = 1 && c.room_id = 1;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function fetchBlackRoomLiveOutFaithVoteCount()
    {
        $this->setStatement("SELECT b.house_name,c.room_name,count(*) as vote_count FROM tbl_votes a 
        LEFT JOIN tbl_houses b ON a.house_vote_id = b.house_id 
        LEFT JOIN tbl_rooms c ON a.room_id = c.room_id 
        WHERE b.house_id = 1 && c.room_id = 2;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function fetchWhiteRoomFinancialStewardsVoteCount()
    {
        $this->setStatement("SELECT b.house_name,c.room_name,count(*) as vote_count FROM tbl_votes a 
        LEFT JOIN tbl_houses b ON a.house_vote_id = b.house_id 
        LEFT JOIN tbl_rooms c ON a.room_id = c.room_id 
        WHERE b.house_id = 2 && c.room_id = 1;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function fetchBlackRoomFinancialStewardsVoteCount()
    {
        $this->setStatement("SELECT b.house_name,c.room_name,count(*) as vote_count FROM tbl_votes a 
        LEFT JOIN tbl_houses b ON a.house_vote_id = b.house_id 
        LEFT JOIN tbl_rooms c ON a.room_id = c.room_id 
        WHERE b.house_id = 2 && c.room_id = 2;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function fetchWhiteRoomCareerAndGrowthVoteCount()
    {
        $this->setStatement("SELECT b.house_name,c.room_name,count(*) as vote_count FROM tbl_votes a 
        LEFT JOIN tbl_houses b ON a.house_vote_id = b.house_id 
        LEFT JOIN tbl_rooms c ON a.room_id = c.room_id 
        WHERE b.house_id = 3 && c.room_id = 1;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function fetchBlackRoomCareerAndGrowthVoteCount()
    {
        $this->setStatement("SELECT b.house_name,c.room_name,count(*) as vote_count FROM tbl_votes a 
        LEFT JOIN tbl_houses b ON a.house_vote_id = b.house_id 
        LEFT JOIN tbl_rooms c ON a.room_id = c.room_id 
        WHERE b.house_id = 3 && c.room_id = 2;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function fetchWhiteRoomFunAndAdventuresVoteCount()
    {
        $this->setStatement("SELECT b.house_name,c.room_name,count(*) as vote_count FROM tbl_votes a 
        LEFT JOIN tbl_houses b ON a.house_vote_id = b.house_id 
        LEFT JOIN tbl_rooms c ON a.room_id = c.room_id 
        WHERE b.house_id = 4 && c.room_id = 1;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function fetchBlackRoomFunAndAdventuresVoteCount()
    {
        $this->setStatement("SELECT b.house_name,c.room_name,count(*) as vote_count FROM tbl_votes a 
        LEFT JOIN tbl_houses b ON a.house_vote_id = b.house_id 
        LEFT JOIN tbl_rooms c ON a.room_id = c.room_id 
        WHERE b.house_id = 4 && c.room_id = 2;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
}