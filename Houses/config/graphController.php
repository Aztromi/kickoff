<?php
require_once 'controller.php';
class Graph extends Controller
{
    function fetchVoteCount()
    {
        $this->setStatement("SELECT
        *,
        (SELECT COUNT(*) FROM tbl_users) AS total_employees
        FROM
        (SELECT
            COUNT(*) AS total_votes,
            COUNT(CASE WHEN room_id = 1 THEN 1 END) AS white_room,
            COUNT(CASE WHEN room_id = 2 THEN 1 END) AS black_room 
        FROM tbl_votes) AS votes_summary");
        $this->statement->execute();
        return $this->statement->fetch();
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

    function fetchWhiteRoomVoteCount()
    {
        $this->setStatement("SELECT 
        'Live Out Faith' AS name,
        COUNT(CASE WHEN house_vote_id = 1 AND room_id = 1 THEN 1 END) AS value
        FROM
            tbl_votes
        UNION ALL
        SELECT 
            'Financial Stewards' AS name,
            COUNT(CASE WHEN house_vote_id = 2 AND room_id = 1 THEN 1 END) AS value
        FROM
            tbl_votes
        UNION ALL
        SELECT 
            'Career & Growth' AS name,
            COUNT(CASE WHEN house_vote_id = 3 AND room_id = 1 THEN 1 END) AS value
        FROM
            tbl_votes
        UNION ALL
        SELECT 
            'Fun & Adventure' AS name,
            COUNT(CASE WHEN house_vote_id = 4 AND room_id = 1 THEN 1 END) AS value
        FROM
            tbl_votes");
            $this->statement->execute();
            return $this->statement->fetchAll();
    }
    
    function fetchBlackRoomVoteCount()
    {
        $this->setStatement("SELECT 
        'Live Out Faith' AS name,
        COUNT(CASE WHEN house_vote_id = 1 AND room_id = 2 THEN 1 END) AS value
        FROM
            tbl_votes
        UNION ALL
        SELECT 
            'Financial Stewards' AS name,
            COUNT(CASE WHEN house_vote_id = 2 AND room_id = 2 THEN 1 END) AS value
        FROM
            tbl_votes
        UNION ALL
        SELECT 
            'Career & Growth' AS name,
            COUNT(CASE WHEN house_vote_id = 3 AND room_id = 2 THEN 1 END) AS value
        FROM
            tbl_votes
        UNION ALL
        SELECT 
            'Fun & Adventure' AS name,
            COUNT(CASE WHEN house_vote_id = 4 AND room_id = 2 THEN 1 END) AS value
        FROM
            tbl_votes");
            $this->statement->execute();
            return $this->statement->fetchAll();
    }

}
