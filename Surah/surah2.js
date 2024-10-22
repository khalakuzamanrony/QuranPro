document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const ayahContainer = document.getElementById('ayah-container');

    // Replace with actual Surah ID
    const surahId = '1'; // For example, Surah Al-Fatiha

    // Define the base API URL
    const baseUrl = `https://api.alquran.cloud/v1/surah/${surahId}/editions/quran-simple,bn.bengali`;

    loader.style.display = 'block'; // Show loader

    fetch(baseUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const ayahs = data.data[0].ayahs; // Adjust according to your API response structure
            ayahContainer.innerHTML = ''; // Clear any existing content

            ayahs.forEach(ayah => {
                const ayahElement = document.createElement('div');
                ayahElement.classList.add('ayah');

                // Create the ayah number
                const ayahNumber = document.createElement('div');
                ayahNumber.classList.add('ayah-number');
                ayahNumber.textContent = ayah.number; // Adjust according to your data structure

                // Create the content section
                const content = document.createElement('div');
                content.classList.add('ayah-content');

                // Arabic text
                const arabicText = document.createElement('div');
                arabicText.classList.add('ayah-arabic');
                arabicText.textContent = ayah.text; // Adjust according to your data structure

                // Bangla tafsir
                const banglaTafsir = document.createElement('div');
                banglaTafsir.classList.add('ayah-bangla');
                banglaTafsir.textContent = ayah.tafsir; // Adjust according to your data structure

                // Append elements
                content.appendChild(arabicText);
                content.appendChild(banglaTafsir);
                ayahElement.appendChild(ayahNumber);
                ayahElement.appendChild(content);
                ayahContainer.appendChild(ayahElement);
            });

            loader.style.display = 'none'; // Hide loader
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            loader.style.display = 'none'; // Hide loader
        });
});
