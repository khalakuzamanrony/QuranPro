document.addEventListener("DOMContentLoaded", () => {
    fetch('https://api.alquran.cloud/v1/surah')
        .then(response => response.json())
        .then(data => {
            const surahList = data.data;
            const container = document.querySelector('.container');

            surahList.forEach(surah => {
                const card = document.createElement('div');
                card.classList.add('card');

                // const img = document.createElement('img');
                // img.src = `https://example.com/surah-cover-${surah.number}.jpg`; // Placeholder image

                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');

                const surahName = document.createElement('h3');
                surahName.textContent = `${surah.englishName} (${surah.name})`;

                const ayatCount = document.createElement('p');
                ayatCount.textContent = `Ayats: ${surah.numberOfAyahs}`;

                const surahMeaning = document.createElement('p');
                surahMeaning.textContent = `Meaning: ${surah.englishNameTranslation}`;

                cardContent.appendChild(surahName);
                cardContent.appendChild(ayatCount);
                cardContent.appendChild(surahMeaning);

                //card.appendChild(img);
                card.appendChild(cardContent);

                container.appendChild(card);

                card.addEventListener('click', () => {
                    window.location.href = `surah.html?surah=${surah.number}`;
                });
            });
        })
        .catch(error => console.error('Error fetching surahs:', error));
});
