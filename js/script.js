/**
 * script.js
 *
 * File ini menangani banner slider, validasi formulir, dan smooth scrolling.
 */

// --- Smooth Scrolling (Scrolling Halus) ---
const smoothScroll = () => {
    const navLinks = document.querySelectorAll('nav a'); // Pilih semua tautan navigasi

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Hentikan perilaku default tautan (langsung lompat)

            const targetId = link.getAttribute('href'); // Ambil target ID dari atribut href
            const targetElement = document.querySelector(targetId); // Pilih elemen target

            if (targetElement) {
                const targetOffsetTop = targetElement.offsetTop; // Dapatkan posisi target dari atas

                window.scrollTo({
                    top: targetOffsetTop,
                    behavior: 'smooth', // Aktifkan smooth scrolling
                });
            }
        });
    });
};

// --- Banner Slider ---
const bannerSlider = () => {
    const bannerElement = document.querySelector('.banner');
    const slider = document.querySelector('.banner-slider'); // Dapatkan elemen slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0; // Slide saat ini
    let slideInterval; // Interval untuk auto slide
    const transitionDuration = 3000; // Durasi transisi (dalam milidetik)

    // Inisialisasi: Sembunyikan semua slide kecuali yang pertama
    slides.forEach((slide, index) => {
        slide.style.opacity = 0; // Awalnya sembunyikan semua slide
        if (index === 0) {
            slide.style.opacity = 1; // Tampilkan slide pertama
            slide.classList.add('active'); // Tambahkan kelas aktif ke slide pertama
        } else {
            slide.classList.remove('active'); // Pastikan slide lain tidak memiliki kelas aktif
        }
        slide.style.transition = ''; // Hapus properti transisi opacity
    });

    // Fungsi untuk menampilkan slide tertentu
    const showSlide = () => {
        slides.forEach((slide) => {
            slide.style.opacity = 0; // Sembunyikan semua slide
            slide.classList.remove('active'); // Hapus kelas aktif dari semua slide
        });
        slides[currentSlide].style.opacity = 1; // Tampilkan slide saat ini
        slides[currentSlide].classList.add('active'); // Tambahkan kelas aktif ke slide saat ini
        // Tidak perlu mengubah transform di sini jika hanya ingin menampilkan langsung
    };

    // Fungsi untuk menampilkan slide berikutnya
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length; // Hitung slide berikutnya (kembali ke awal jika sudah di akhir)
        showSlide(); // Tampilkan slide berikutnya
    };

    // Fungsi untuk memulai auto slide
    const startSlider = () => {
        slideInterval = setInterval(nextSlide, transitionDuration); // Atur interval untuk memanggil nextSlide setiap beberapa detik
    };

    // Fungsi untuk menghentikan auto slide
    const stopSlider = () => {
        clearInterval(slideInterval); // Hentikan interval
    };

    // Fungsi inisialisasi slider
    const init = () => {
        startSlider(); // Mulai auto slide

        // Tambahkan event listener untuk pause saat mouse masuk ke banner
        if (bannerElement) {
            bannerElement.addEventListener('mouseenter', stopSlider); // Stop saat mouse masuk
            bannerElement.addEventListener('mouseleave', startSlider); // Mulai lagi saat mouse keluar
        }
    };

    init(); // Jalankan inisialisasi
};

// --- Form Validation (Validasi Form) ---
const formValidation = () => {
    const formElement = document.getElementById('contact-form');
    const nameInput = document.getElementById('nama'); // Sesuaikan dengan ID di HTML
    const emailInput = document.getElementById('email');
    const destinationSelect = document.getElementById('minat'); // Sesuaikan dengan ID di HTML
    const errorElements = document.querySelectorAll('.error-message'); // Semua elemen pesan error

    // Fungsi untuk memvalidasi form
    const validateForm = () => {
        let isValid = true; // Asumsikan form valid

        // Validasi Nama
        if (!nameInput || nameInput.value.trim() === '') {
            errorElements[0].textContent = 'Silakan masukkan nama Anda.';
            isValid = false;
        } else {
            errorElements[0].textContent = ''; // Kosongkan pesan error jika valid
        }

        // Validasi Email
        if (!emailInput || emailInput.value.trim() === '') {
            errorElements[1].textContent = 'Silakan masukkan alamat email Anda.';
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            errorElements[1].textContent = 'Silakan masukkan alamat email yang valid.';
            isValid = false;
        } else {
            errorElements[1].textContent = ''; // Kosongkan pesan error jika valid
        }

        // Validasi Tujuan
        if (!destinationSelect || destinationSelect.value === '') { // Periksa jika nilainya kosong
            errorElements[2].textContent = 'Silakan pilih tujuan.';
            isValid = false;
        } else {
            errorElements[2].textContent = ''; // Kosongkan pesan error jika valid
        }

        return isValid; // Kembalikan status validitas form
    };

    // Fungsi untuk validasi format email
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk validasi email
        return emailRegex.test(email); // Kembalikan true jika email valid, false jika tidak
    };

    // Fungsi untuk handle submit form
    const handleSubmit = (event) => {
        event.preventDefault(); // Hentikan submit default

        if (validateForm()) {
            alert('Formulir berhasil dikirim!'); // Tampilkan pesan sukses
            if (formElement) {
                formElement.reset(); // Reset form
            }
        }
    };

    // Fungsi inisialisasi form validation
    const init = () => {
        if (formElement) {
            formElement.addEventListener('submit', handleSubmit); // Tambahkan event listener untuk submit
        }
    };

    init(); // Jalankan inisialisasi
};

// --- Initialization (Inisialisasi) ---
document.addEventListener('DOMContentLoaded', () => {
    smoothScroll(); // Aktifkan smooth scrolling
    bannerSlider(); // Aktifkan banner slider
    formValidation(); // Aktifkan validasi form
});
