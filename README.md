# Jira Avatar Initials Generator

This small static project generates circular avatar images from initials (e.g. "KF") and allows downloading them as PNGs. 

## Quick start

1. Open `Screens/Index.html`.
2. Type initials in the input (default is `KF`).
3. Use the color picker (it starts with a random color on load).
4. Click "Download Avatar" to save a PNG named like `avatar-KF.png`.

## Development notes 

- Font: I'm using Altmann Grotesk via a free CDN (see the `<link>` in `Screens/Index.html`). The downloaded PNG also tries to use the same font, but if the font is not available the canvas will fallback to `sans-serif`.

- Avatar sizing: the visible avatar uses a 120×120px circle (see `#avatar` in `StyleSheet.css`). The exported PNG is 200×200px so it has good resolution for avatars.

- Text sizing and alignment: the canvas text is centered using `textAlign = "center"` and `textBaseline = "middle"` with a small vertical offset applied in the canvas draw code to better match Jira's visual centering.

- Color contrast: text color is chosen by a luminance calculation in `MyScript.js` to ensure readable text (black on light backgrounds, white on dark backgrounds).

- Random color on load: The color picker gets a randomly generated hex color on page load and `updateAvatar()` is called immediately so the visible avatar matches the color picker.
