# 🎉 Drashti's Special Birthday Surprise Website

A handcrafted, interactive birthday experience created specifically for **Drashti**.

Structure:
```text
index.html
style.css
script.js

images/
    photo1.jpg
    photo2.jpg
    photo3.jpg
    photo4.jpg

audio/
    birthday.mp3
```

---

## 📸 The Four Real Photos

The website uses the four personal photographs present in your `images/` directory:
- `images/photo1.jpg` — Memory 01: "A memory worth keeping. ❤️"
- `images/photo2.jpg` — Memory 02: "One of those moments."
- `images/photo3.jpg` — Memory 03: "A moment to remember."
- `images/photo4.jpg` — Memory 04: "One I'll always remember. ❤️"

All four images are loaded in their original form without cropping or destructive edits, with full-screen zoom and lightbox navigation on click or tap.

---

## ✍️ Customizing Captions

To change any caption, open `script.js` and edit the `memories` configuration array at line 14:

```javascript
const memories = [
  {
    image: 'images/photo1.jpg',
    caption: 'A memory worth keeping. ❤️'
  },
  {
    image: 'images/photo2.jpg',
    caption: 'One of those moments.'
  },
  {
    image: 'images/photo3.jpg',
    caption: 'A moment to remember.'
  },
  {
    image: 'images/photo4.jpg',
    caption: "One I'll always remember. ❤️"
  }
];
```

---

## 🎵 Optional Birthday Music

- An audio file can be added at `audio/birthday.mp3`.
- Music does not autoplay; it begins only after clicking **"🎉 START YOUR BIRTHDAY"** or toggling the sound button in the top right.
- If no MP3 is added, the included `audio/birthday.wav` serves as a built-in fallback with zero console errors.

---

## 🚀 Live Website & Sharing

- **Live URL (GitHub Pages):** [https://yadavharsh555.github.io/simple-birthday-surprise/](https://yadavharsh555.github.io/simple-birthday-surprise/)
- **GitHub Repository:** [https://github.com/yadavharsh555/simple-birthday-surprise](https://github.com/yadavharsh555/simple-birthday-surprise)
- **Locally:** Open `http://localhost:8080` in your web browser or double-click `index.html`.
- **Sharing on WhatsApp:** You can now copy and send the live link `https://yadavharsh555.github.io/simple-birthday-surprise/` directly to Drashti!
