var log = console.log;
const initialsInput = document.getElementById("initialsInput");
initialsInput.value = "KF";

// Dark mode functionality
function initTheme() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    darkModeToggle.textContent = "☀️";
  }

  darkModeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    darkModeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
}

initTheme();

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const colorPicker = document.getElementById("colorPicker");
colorPicker.value = generateRandomColor();
const avatar = document.getElementById("avatar");

// Initialize the avatar with the random color when page loads
updateAvatar();

function getLuminance(hex) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;
  const lum =
    0.2126 * (r / 255) ** 2.2 +
    0.7152 * (g / 255) ** 2.2 +
    0.0722 * (b / 255) ** 2.2;
  return lum;
}

function updateAvatar() {
  const initials = initialsInput.value.trim().toUpperCase() || "KF";
  const bgColor = colorPicker.value;
  avatar.textContent = initials;
  avatar.style.backgroundColor = bgColor;

  const lum = getLuminance(bgColor);
  avatar.style.color = lum > 0.5 ? "black" : "white";
}

initialsInput.addEventListener("input", updateAvatar);
colorPicker.addEventListener("input", updateAvatar);

function downloadAvatar() {
  const canvas = document.createElement("canvas");
  const size = 200; 
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Draw background as circle
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
  ctx.fillStyle = colorPicker.value;
  ctx.fill();

  // Draw text
  const initials = initialsInput.value.trim().toUpperCase() || "KF";
  ctx.font = "500 100px 'Altmann Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = getLuminance(colorPicker.value) > 0.5 ? "black" : "white";
  ctx.fillText(initials, size/2, size/2 + 5); // Small y-offset for better vertical centering

  // Create download link
  const link = document.createElement("a");
  link.download = `avatar-${initials}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

document
  .getElementById("downloadBtn")
  .addEventListener("click", downloadAvatar);
