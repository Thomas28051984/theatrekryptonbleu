<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(['message' => 'Événement supprimé avec succès']);
    } else {
        echo json_encode(['message' => 'Erreur lors de la suppression']);
    }
}
?>