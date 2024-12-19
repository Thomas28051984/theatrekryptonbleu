<?php
$folder = 'assets/image/' . $_GET['folder']; // Récupère le dossier depuis l'URL

// Vérifie si le dossier existe
if (is_dir($folder)) {
    // Récupère les fichiers d'image (jpg, png, etc.)
    $files = glob($folder . '/*.{jpg,jpeg,png,gif}', GLOB_BRACE);
    
    // Convertit les chemins de fichiers en format JSON
    echo json_encode($files);
} else {
    echo json_encode([]); // Retourne un tableau vide si le dossier n'existe pas
}
?>
