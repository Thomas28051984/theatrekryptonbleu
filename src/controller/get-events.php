<?php
include 'db.php';
header('Content-Type: application/json');

$stmt = $pdo->query(
    "SELECT id, title, 
            CONCAT(start_date, 'T', start_time) AS start, 
            CONCAT(end_date, 'T', end_time) AS end
     FROM events"
);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
