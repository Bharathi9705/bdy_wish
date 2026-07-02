<<<<<<< HEAD
# Happy Birthday, Barani 💜

A premium, cinematic 4-page birthday site built with React + TypeScript + Tailwind CSS + Framer Motion.

## Run it locally

You'll need [Node.js](https://nodejs.org) (18+) installed.

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Add the music

This project does **not** include any copyrighted audio. To use your own
birthday BGM:

1. Rename your audio file to exactly `theme.mp3`
2. Put it inside the `public/` folder (next to `PUT_YOUR_AUDIO_HERE.txt`)
3. Restart `npm run dev` if it's already running

If no `theme.mp3` is found, the site quietly falls back to a short
original instrumental melody so it's never silent.

## Build for deployment

```bash
npm run build
```

This outputs a static site to `dist/` that you can host anywhere
(Vercel, Netlify, GitHub Pages, or even just open `dist/index.html`
after a static build — note: for the music/autoplay and routing to work
correctly, serving via a local/static server is recommended over
double-clicking the file directly).

## Structure

```
src/
  components/   Background, TopBar, NavControls, IntroGate
  hooks/        useMusic.ts (audio + fallback synth)
  pages/        Page1Greeting, Page2Friendship, Page3Letter, Page4Finale
  App.tsx       Page routing + transitions
```

All four pages share the same dark-purple aurora background, starfield,
and mouse-following glow so nothing feels disconnected between pages.
=======
# bdy_wish
>>>>>>> 6e0f37acb293b5a51bdd2b43a60053b0fb82244e
