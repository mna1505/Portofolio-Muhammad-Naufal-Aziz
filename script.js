/* =====================================================
🔹 GLOBAL INIT
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initImageSlideshow();
  initTypewriter();
  initSmoothScroll();
  initMusicPlayer();
});

/* =====================================================
🔹 THEME TOGGLER (Light / Dark Mode)
===================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById("toggleTheme");
  const icon = document.getElementById("themeIcon");

  if (!toggleBtn || !icon) return;

  document.body.classList.add("light-mode");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("light-mode")) {
      icon.src = "dark mode.svg";
      icon.alt = "Light Mode";
    } else {
      icon.src = "light mode.svg";
      icon.alt = "Dark Mode";
    }
  });
}

/* =====================================================
🔹 IMAGE FADE SLIDESHOW
===================================================== */
function initImageSlideshow() {
  const imageElement = document.getElementById("aboutImage");
  if (!imageElement) return;

  const images = [
    "gambar/anime new 1.png",
    "gambar/gambar nyata 1.png"
  ];

  let index = 0;

  setInterval(() => {
    imageElement.classList.add("opacity-0");

    setTimeout(() => {
      index = (index + 1) % images.length;
      imageElement.src = images[index];
      imageElement.classList.remove("opacity-0");
    }, 300);
  }, 5000);
}

/* =====================================================
🔹 TYPEWRITER EFFECT
===================================================== */
function initTypewriter() {
  const typingText = document.getElementById("typing-text");
  if (!typingText) return;

  const texts = ["About Me", "Who Am I?", "Know Me More"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = texts[textIndex];

    typingText.textContent = isDeleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? 100 : 120);
    }
  }

  type();
}

/* =====================================================
🔹 SMOOTH SCROLL
===================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute("href"))
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* =====================================================
🔹 MUSIC PLAYER + WAVE
===================================================== */
function initMusicPlayer() {
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const playIcon = document.getElementById("playIcon");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const wave = document.querySelector(".wave");
  const waveBars = document.querySelectorAll(".wave span");
  const cover = document.getElementById("cover");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");

  if (!audio || !playBtn || !playIcon) return;

  /* ================= ICON SVG ================= */
  const ICON_PLAY = `<path d="M8 5v14l11-7z" />`;
  const ICON_PAUSE = `
    <path d="M6 5h4v14H6z" />
    <path d="M14 5h4v14h-4z" />
  `;

  /* ================= PLAYLIST ================= */
  const songs = [
    {
      title: "Autumn Mood",
      artist: "Lo-fi Chill",
      src: "lagu/autumn_mods.mp3",
      cover: "https://i.ytimg.com/vi/Q9niH21_mac/hqdefault.jpg"
    },
    {
      title: "Remember Summer Days",
      artist: "Anri",
      src: "lagu/remember_summer.mp3",
      cover: "https://i.ytimg.com/vi/yHKb38-nl3U/hq720.jpg"
    }
  ];

  let currentSong = 0;
  let waveInterval = null;

  /* ================= FUNCTIONS ================= */
  function loadSong(index) {
    audio.src = songs[index].src;
    cover.src = songs[index].cover;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
  }

  function randomizeWave() {
    waveBars.forEach(bar => {
      bar.style.animationDuration = `${(Math.random() * 0.6 + 0.4).toFixed(2)}s`;
      bar.style.animationDelay = `${(Math.random() * 0.4).toFixed(2)}s`;
      bar.style.height = `${Math.floor(Math.random() * 18) + 8}px`;
    });
  }

  function startWave() {
    wave.classList.remove("paused");
    randomizeWave();
    waveInterval = setInterval(randomizeWave, 700);
  }

  function stopWave() {
    wave.classList.add("paused");
    clearInterval(waveInterval);
  }

  function setPlayState(isPlaying) {
    playIcon.innerHTML = isPlaying ? ICON_PAUSE : ICON_PLAY;
  }

  /* ================= INIT ================= */
  loadSong(currentSong);
  stopWave();
  setPlayState(false);

  /* ================= EVENTS ================= */
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      startWave();
      setPlayState(true);
    } else {
      audio.pause();
      stopWave();
      setPlayState(false);
    }
  });

  nextBtn?.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    startWave();
    setPlayState(true);
  });

  prevBtn?.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    startWave();
    setPlayState(true);
  });

  audio.addEventListener("ended", () => {
    nextBtn?.click();
  });

  audio.addEventListener("pause", () => {
    setPlayState(false);
    stopWave();
  });

  audio.addEventListener("play", () => {
    setPlayState(true);
    startWave();
  });
}


/* =====================================================
🔹 LOAD PAGE (AJAX)
===================================================== */
function loadPage(page) {
  fetch(page)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
    });
}
