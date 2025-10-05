    const nav = document.getElementById("navFond");
    const images = document.querySelectorAll(".grid-photos img");
    const chosenImage = [];
    let sliderInterval;

    // Vérifie si des images ont été sauvegardées
    const savedImages = JSON.parse(localStorage.getItem("chosenImage")) || [];

    if (savedImages.length > 0) {
        savedImages.forEach(id => {
            const img = document.getElementById(id);
            if (img) {
                img.classList.add("selected");
                chosenImage.push(id);
            }
        });

        // Affiche le fond ou relance le slider
        if (chosenImage.length === 1) {
            const currentImg = document.getElementById(chosenImage[0]);
            nav.style.backgroundImage = `url(${currentImg.src})`;
            nav.style.backgroundSize = "cover";
            nav.style.backgroundPosition = "center";
        } else if (chosenImage.length > 1 && !sliderInterval) {
            startSlider();
        }
    }

    images.forEach(img => {
    img.addEventListener("click", () => {
        const id = img.id;

        // Si déjà sélectionnée → on la désélectionne
        if (chosenImage.includes(id)) {
            img.classList.remove("selected");
            const index = chosenImage.indexOf(id);
            if (index > -1) {
                chosenImage.splice(index, 1);
            }
        } else {
            // Sinon → on la sélectionne
            img.classList.add("selected");
            chosenImage.push(id);
        }

        console.log(chosenImage);

        // Mise à jour de l'image de fond
        if (chosenImage.length === 1) {
            const currentImg = document.getElementById(chosenImage[0]);
            nav.style.backgroundImage = `url(${currentImg.src})`;
            nav.style.backgroundSize = "cover";
            nav.style.backgroundPosition = "center";
        }

        // Démarre le slider si au moins 2 images sont sélectionnées
        if (chosenImage.length > 1 && !sliderInterval) {
            startSlider();
        }

        // Stoppe le slider si plus assez d'images
        if (chosenImage.length < 2 && sliderInterval) {
            clearInterval(sliderInterval);
            sliderInterval = null;
        }

        // Sauvegarde dans localStorage
        if (chosenImage.length > 0) {
            localStorage.setItem("chosenImage", JSON.stringify(chosenImage));
        } else {
            localStorage.removeItem("chosenImage");
        }
    });
});

    function startSlider() {
        let index = 0;
        sliderInterval = setInterval(() => {
            const currentId = chosenImage[index];
            const currentImg = document.getElementById(currentId);
            nav.style.backgroundImage = `url(${currentImg.src})`;
            nav.style.backgroundSize = "cover";
            nav.style.backgroundPosition = "center";
            index = (index + 1) % chosenImage.length;
        }, 3000); // Change toutes les 3 secondes
    };



