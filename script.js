const songs = [
  { title: "Aarambh hai prachand", file: "song1.mp3", cover: "images/cover1.jpg", artist: "Piyush Mishra" },
  { title: "Saiyaara", file: "song2.mp3", cover: "images/cover2.jpg", artist: "Anyone" },
  { title: "Jeena Isi Ka Naam", file: "song3.mp3", cover: "images/cover3.jpg", artist: "Kishore Kumar" }
];

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const volumeSlider = document.getElementById("volume");

let songIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = `songs/${song.file}`;
  highlightActiveSong();
}

// Play song
function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
  isPlaying = true;
}

// Pause song
function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
  isPlaying = false;
}

// Toggle play/pause
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}
prevBtn.addEventListener("click", prevSong);

// Next song
function nextSong() {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songs[songIndex]);
  playSong();
}
nextBtn.addEventListener("click", nextSong);

// Shuffle
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? "#ffeb3b" : "#fff";
});

// Repeat
repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.style.color = isRepeat ? "#ffeb3b" : "#fff";
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

// Seek on progress click
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

// Format time mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Auto play next song or repeat
audio.addEventListener("ended", () => {
  if (isRepeat) {
    playSong();
  } else {
    nextSong();
  }
});

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Playlist rendering
function renderPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

// Highlight active song
function highlightActiveSong() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((item, idx) => {
    item.classList.toggle("active", idx === songIndex);
  });
}

// Initialize
renderPlaylist();
loadSong(songs[songIndex]);







