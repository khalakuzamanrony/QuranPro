// // Get the surah number from URL parameters
// const urlParams = new URLSearchParams(window.location.search);
// const surahNumber = urlParams.get('surah');

// // Function to fetch surah details
// function fetchSurahDetails(surahNumber) {
//     fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
//         .then(response => response.json())
//         .then(surahData => {
//             const surah = surahData.data;
//             document.getElementById('surah-name').textContent = `${surah.englishName} (${surah.name})`;
            
//             // Loop through each ayah and get the tafsir & arabic text
//             surah.ayahs.forEach(ayah => {
//                 fetchAyahDetails(surah.number, ayah.number);
//             });
//         })
//         .catch(error => console.error('Error fetching surah:', error));
// }

// // Function to fetch ayah details with Bangla tafsir and Arabic text
// function fetchAyahDetails(surahNumber, ayahNumber) {
//     fetch(`https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/editions/quran-simple,bn.bengali,en.asad`)
//         .then(response => response.json())
//         .then(ayahData => {
//             const editions = ayahData.data;

//             const arabicText = editions.find(edition => edition.edition.identifier === 'quran-simple').text;
//             const banglaText = editions.find(edition => edition.edition.identifier === 'bn.bengali').text;

//             // Insert the ayah details into the table
//             insertAyahIntoTable(ayahNumber, banglaText, arabicText);
//         })
//         .catch(error => console.error('Error fetching ayah details:', error));
// }

// // Function to insert ayah data into the table
// function insertAyahIntoTable(ayahNumber, banglaTafsir, arabicText) {
//     const tableBody = document.querySelector('#ayah-table tbody');

//     const row = document.createElement('tr');

//     const indexCell = document.createElement('td');
//     indexCell.textContent = ayahNumber;

//     const banglaCell = document.createElement('td');
//     banglaCell.textContent = banglaTafsir;

//     const arabicCell = document.createElement('td');
//     arabicCell.textContent = arabicText;

//     row.appendChild(indexCell);
//     row.appendChild(banglaCell);
//     row.appendChild(arabicCell);

//     tableBody.appendChild(row);
// }

// // Start by fetching the surah details
// fetchSurahDetails(surahNumber);


// Define the base API URL
const BASE_API_URL = 'https://api.alquran.cloud/v1';

// Get the surah number from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const surahNumber = urlParams.get('surah');

// Get elements from the DOM
const loader = document.getElementById('loader');
const tableBody = document.querySelector('#ayah-table tbody');

// Function to fetch surah and ayat details
function fetchSurahDetailsAndAyats(surahNumber) {
    // Fetch Arabic and Bangla Tafsir separately
    const arabicUrl = `${BASE_API_URL}/surah/${surahNumber}/quran-simple`;
    const banglaUrl = `${BASE_API_URL}/surah/${surahNumber}/bn.bengali`;

    // Show the loader before fetching
    loader.style.display = 'block';

    // Fetch both Arabic and Bangla editions in parallel
    Promise.all([fetch(arabicUrl), fetch(banglaUrl)])
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(data => {
            const surahInfo = data[0].data; // Arabic surah details
            const ayatsArabic = data[0].data.ayahs; // Arabic ayats
            const ayatsBangla = data[1].data.ayahs; // Bangla Tafsir

            // Set the surah name in the header
            document.getElementById('surah-name').textContent = `${surahInfo.number}. ${surahInfo.englishName} (${surahInfo.name}) - (${surahInfo.numberOfAyahs})`;

            // Insert each ayat's details into the table
            for (let i = 0; i < ayatsArabic.length; i++) {
                const ayahNumber = ayatsArabic[i].numberInSurah;
                const arabicText = ayatsArabic[i].text;
                const banglaTafsir = ayatsBangla[i].text;

                insertAyahIntoTable(ayahNumber, banglaTafsir, arabicText);
            }

            // Hide the loader after data is fetched
            loader.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching surah details:', error);
            loader.style.display = 'none'; // Hide the loader in case of an error
        });
}

// Function to insert ayah data into the table
function insertAyahIntoTable(ayahNumber, banglaTafsir, arabicText) {
    const row = document.createElement('tr');

    const indexCell = document.createElement('td');
    indexCell.textContent = ayahNumber;

    const banglaCell = document.createElement('td');
    banglaCell.textContent = banglaTafsir;

    const arabicCell = document.createElement('td');
    arabicCell.textContent = arabicText;

    row.appendChild(indexCell);
    row.appendChild(banglaCell);
    row.appendChild(arabicCell);

    tableBody.appendChild(row);
}

// Start by fetching surah and ayat details when the page loads
fetchSurahDetailsAndAyats(surahNumber);
