    /* =====================================================
    🔹 THEME TOGGLER (Light / Dark Mode)
    ===================================================== */
    const toggleBtn = document.getElementById("toggleTheme");
    const icon = document.getElementById("themeIcon");

    // Set mode default (light)
    document.body.classList.add("light-mode");

    // Event klik untuk toggle tema
    toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");

    // Ganti ikon sesuai mode aktif
    if (document.body.classList.contains("light-mode")) {
        icon.src = "dark mode.svg";
        icon.alt = "Light Mode";
    } else {
        icon.src = "light mode.svg";
        icon.alt = "Dark Mode";
    }
    });

    /* =====================================================
    🔹 IMAGE FADE SLIDESHOW (Anime ↔ Foto Real Life)
    ===================================================== */
    document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "gambar/anime new 1.png",
        "gambar/gambar nyata 1.png"
    ];

    let currentImageIndex = 0;
    const imageElement = document.getElementById("aboutImage");

    if (!imageElement) return;

    setInterval(() => {
        // Fade-out
        imageElement.classList.add("opacity-0");

        setTimeout(() => {
        // Ganti gambar
        currentImageIndex = (currentImageIndex + 1) % images.length;
        imageElement.src = images[currentImageIndex];

        // Fade-in
        imageElement.classList.remove("opacity-0");
        }, 300); // durasi transisi fade (ms)
    }, 5000); // jeda pergantian gambar (ms)
    });

    /* =====================================================
    🔹 TYPEWRITER EFFECT (About Me Title)
    ===================================================== */
    document.addEventListener("DOMContentLoaded", function() {
    const texts = ["About Me", "Who Am I?", "Know Me More"];
    const typingText = document.getElementById("typing-text");

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 120;
    const deletingSpeed = 100;
    const delayBetween = 1500;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex--);
        } else {
        typingText.textContent = currentText.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentText.length) {
        // selesai ngetik → jeda → mulai hapus
        isDeleting = true;
        setTimeout(type, delayBetween);
        } else if (isDeleting && charIndex === 0) {
        // selesai hapus → ganti teks
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 400);
        } else {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
        }
    }

    type();
    });

    // 🌬 Smooth Scroll Effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
        });
    });
    });
