const songs = [
  { title: "Song 1", file: "song1.mp3", cover: "images/cover1.jpg", artist: "Artist 1" },
  { title: "Saiyaara", file: "song2.mp3", cover: "images/cover2.jpg", artist: "Anmol" },
  { title: "Song 3", file: "song3.mp3", cover: "images/cover3.jpg", artist: "Artist 3" }
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

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = `songs/${song.file}`;
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
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}
nextBtn.addEventListener("click", nextSong);

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

// Auto play next song
audio.addEventListener("ended", nextSong);

// Initialize
loadSong(songs[songIndex]);



