<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? null;
    $startDate = $_POST['startDate'] ?? null;
    $endDate = $_POST['endDate'] ?? null;
    $startTime = $_POST['startTime'] ?? null;
    $endTime = $_POST['endTime'] ?? null;

    if ($title && $startDate && $endDate && $startTime && $endTime) {
        try {
            $stmt = $pdo->prepare(
                "INSERT INTO events (title, start_date, end_date, start_time, end_time)
                 VALUES (?, ?, ?, ?, ?)"
            );
            $stmt->execute([$title, $startDate, $endDate, $startTime, $endTime]);
            echo json_encode(['success' => true, 'message' => 'Événement ajouté avec succès']);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Erreur SQL : ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Champs manquants']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Requête non valide']);
}
