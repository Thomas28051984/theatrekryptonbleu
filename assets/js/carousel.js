
        let currentIndex = 0;
        let imagePaths = [];

        // Fonction pour charger les images d'un sous-dossier
        function loadFolder(folderName) {
            fetch(`load_images.php?folder=${folderName}`)
                .then(response => response.json()) // Convertit la réponse en JSON
                .then(data => {
                    imagePaths = data; // Stocke les chemins des images
                    currentIndex = 0;  // Réinitialise l'index
                    showImage(currentIndex); // Affiche la première image
                })
                .catch(error => console.error('Erreur de chargement des images:', error));
        }

        // Fonction pour afficher l'image actuelle
        function showImage(index) {
            if (imagePaths.length > 0) {
                document.getElementById('carousel-image').src = imagePaths[index];
            } else {
                document.getElementById('carousel-image').src = ''; // Aucune image
            }
        }

        // Fonction pour changer d'image
        function changeImage(step) {
            currentIndex += step;
            if (currentIndex >= imagePaths.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = imagePaths.length - 1;
            showImage(currentIndex);
        }
    

