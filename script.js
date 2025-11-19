// --- 1. DATA STATIS DAFTAR RESEP ---
const RESEP_MASAKAN = {
    "Nasi Goreng Kampung": {
        "bahan": [
            "1 piring nasi putih",
            "2 siung bawang merah",
            "1 siung bawang putih",
            "1 butir telur",
            "Cabai rawit sesuai selera",
            "Garam, kecap manis, minyak goreng"
        ],
        "langkah": [
            "Haluskan bawang merah, bawang putih, dan cabai.",
            "Panaskan minyak, tumis bumbu halus hingga harum.",
            "Masukkan telur, orak-arik hingga matang.",
            "Masukkan nasi, aduk rata.",
            "Tambahkan kecap manis dan garam, aduk hingga bumbu merata dan nasi panas.",
            "Sajikan hangat."
        ]
    },
    "Sayur Asem Sederhana": {
        "bahan": [
            "1 ikat kacang panjang",
            "1 buah labu siam",
            "1 bungkus bumbu sayur asem instan",
            "2 liter air",
            "Asam Jawa dan gula merah secukupnya"
        ],
        "langkah": [
            "Didihkan air di panci.",
            "Masukkan bumbu instan dan asam jawa.",
            "Masukkan sayuran yang keras (misalnya labu siam), masak hingga agak empuk.",
            "Masukkan sayuran lain (kacang panjang), masak hingga matang.",
            "Tambahkan gula merah dan koreksi rasa.",
            "Sajikan."
        ]
    },
    "Ayam Goreng Tepung": {
        "bahan": [
            "500g ayam potong",
            "Tepung terigu dan tepung bumbu instan",
            "Garam, merica",
            "Minyak goreng"
        ],
        "langkah": [
            "Campur ayam dengan garam dan merica, diamkan 15 menit.",
            "Siapkan adonan basah dan adonan kering dari tepung.",
            "Gulingkan ayam ke adonan kering, celupkan ke adonan basah, lalu gulingkan lagi ke adonan kering sambil dicubit-cubit.",
            "Goreng ayam dalam minyak panas hingga berwarna kuning keemasan.",
            "Angkat dan tiriskan."
        ]
    }
};

// --- 2. DOM ELEMENTS ---
const recipeListDiv = document.getElementById('recipeList');
const searchInput = document.getElementById('searchInput');
const recipeDetailDiv = document.getElementById('recipeDetail');
const backButton = document.getElementById('backButton');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');

// --- 3. FUNGSI UTAMA ---

/**
 * Menampilkan daftar resep di halaman.
 * @param {Object} resepUntukDitampilkan - Objek resep yang akan dirender.
 */
function renderRecipeCards(resepUntukDitampilkan) {
    recipeListDiv.innerHTML = ''; // Kosongkan daftar yang lama
    
    // Jika tidak ada resep yang cocok
    if (Object.keys(resepUntukDitampilkan).length === 0) {
        recipeListDiv.innerHTML = '<p>Maaf, resep yang Anda cari tidak ditemukan.</p>';
        return;
    }

    // Buat kartu untuk setiap resep
    for (const namaResep in resepUntukDitampilkan) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `<h3>${namaResep}</h3><p>Klik untuk melihat detail</p>`;
        
        // Tambahkan event listener untuk menampilkan detail
        card.addEventListener('click', () => showRecipeDetail(namaResep));
        
        recipeListDiv.appendChild(card);
    }
}

/**
 * Menampilkan detail resep tertentu.
 * @param {string} namaResep - Nama resep yang akan ditampilkan.
 */
function showRecipeDetail(namaResep) {
    const resep = RESEP_MASAKAN[namaResep];
    
    document.getElementById('detailTitle').textContent = namaResep;
    
    // Tampilkan Bahan
    const ulBahan = document.getElementById('detailBahan');
    ulBahan.innerHTML = '';
    resep.bahan.forEach(bahan => {
        const li = document.createElement('li');
        li.textContent = bahan;
        ulBahan.appendChild(li);
    });
    
    // Tampilkan Langkah-langkah
    const olLangkah = document.getElementById('detailLangkah');
    olLangkah.innerHTML = '';
    resep.langkah.forEach(langkah => {
        const li = document.createElement('li');
        li.textContent = langkah;
        olLangkah.appendChild(li);
    });

    // Pindah Tampilan
    recipeListDiv.classList.add('hidden');
    searchInput.classList.add('hidden');
    recipeDetailDiv.classList.remove('hidden');
}

/**
 * Kembali ke tampilan daftar resep.
 */
function goBackToRecipeList() {
    recipeDetailDiv.classList.add('hidden');
    recipeListDiv.classList.remove('hidden');
    searchInput.classList.remove('hidden');
}

/**
 * Melakukan pencarian berdasarkan input teks.
 */
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredRecipes = {};

    for (const namaResep in RESEP_MASAKAN) {
        // Cek apakah nama resep mengandung kata kunci pencarian
        if (namaResep.toLowerCase().includes(searchTerm)) {
            filteredRecipes[namaResep] = RESEP_MASAKAN[namaResep];
        }
    }

    renderRecipeCards(filteredRecipes);
}

// --- 4. FUNGSI MUSIK ---

function toggleMusic() {
    if (backgroundMusic.paused) {
        // Play() harus dipanggil dari interaksi pengguna (click event) agar diizinkan browser
        backgroundMusic.play().then(() => {
            musicToggle.textContent = '⏸️ Jeda Musik';
        }).catch(error => {
            // Tangani error jika pemutaran gagal (misalnya, auto-play diblokir)
            console.error("Gagal memutar musik:", error);
            alert("Gagal memutar musik. Pastikan browser Anda mengizinkan auto-play atau coba klik tombol lagi.");
        });
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = '▶️ Putar Musik';
    }
}


// --- 5. INITIALIZATION & EVENT LISTENERS ---

// 1. Render semua resep saat pertama kali dimuat
renderRecipeCards(RESEP_MASAKAN);

// 2. Tambahkan event listener untuk pencarian
searchInput.addEventListener('input', handleSearch);

// 3. Tambahkan event listener untuk tombol kembali
backButton.addEventListener('click', goBackToRecipeList);

// 4. Tambahkan event listener untuk tombol musik
musicToggle.addEventListener('click', toggleMusic);
