<?php
require_once 'controller.php';
class Graph extends Controller
{
    function fetchVoteCount()
    {
        $this->setStatement("SELECT COUNT(*) AS total_votes, COUNT(CASE WHEN room_id = 1 THEN 1 END) AS white_room, COUNT(CASE WHEN room_id = 2 THEN 1 END) AS black_room FROM tbl_votes");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function fetchRoomVoteCount()
    {
        // SELECT 
        // COUNT(CASE WHEN house_vote_id = 1 AND room_id = 1 THEN 1 END) AS white_room_live_out_faith,
        // COUNT(CASE WHEN house_vote_id = 2 AND room_id = 1 THEN 1 END) AS white_room_financial_stewards,
        // COUNT(CASE WHEN house_vote_id = 3 AND room_id = 1 THEN 1 END) AS white_room_career_and_growth,
        // COUNT(CASE WHEN house_vote_id = 4 AND room_id = 1 THEN 1 END) AS white_room_fun_and_adventure,
        // COUNT(CASE WHEN house_vote_id = 1 AND room_id = 2 THEN 1 END) AS black_room_live_out_faith,
        // COUNT(CASE WHEN house_vote_id = 2 AND room_id = 2 THEN 1 END) AS black_room_financial_stewards,
        // COUNT(CASE WHEN house_vote_id = 3 AND room_id = 2 THEN 1 END) AS black_room_career_and_growth,
        // COUNT(CASE WHEN house_vote_id = 4 AND room_id = 2 THEN 1 END) AS black_room_fun_and_adventure
        // FROM
        // tbl_votes
        $this->setStatement("SELECT 
        'Live Out Faith' AS name,
        COUNT(CASE WHEN house_vote_id = 1 AND room_id = 1 THEN 1 END) AS white_room_value,
        COUNT(CASE WHEN house_vote_id = 1 AND room_id = 2 THEN 1 END) AS black_room_value
        FROM
            tbl_votes
        UNION ALL
        SELECT 
            'Financial Stewards' AS name,
            COUNT(CASE WHEN house_vote_id = 2 AND room_id = 1 THEN 1 END) AS white_room_value,
            COUNT(CASE WHEN house_vote_id = 2 AND room_id = 2 THEN 1 END) AS black_room_value
        FROM
            tbl_votes
        UNION ALL
        SELECT 
            'Career & Growth' AS name,
            COUNT(CASE WHEN house_vote_id = 3 AND room_id = 1 THEN 1 END) AS white_room_value,
            COUNT(CASE WHEN house_vote_id = 3 AND room_id = 2 THEN 1 END) AS black_room_value
        FROM
            tbl_votes
        UNION ALL
        SELECT 
            'Fun & Adventure' AS name,
            COUNT(CASE WHEN house_vote_id = 4 AND room_id = 1 THEN 1 END) AS white_room_value,
            COUNT(CASE WHEN house_vote_id = 4 AND room_id = 2 THEN 1 END) AS black_room_value
        FROM
            tbl_votes");
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
