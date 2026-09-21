# Cinematic Love Story Website

A premium, cinematic, highly interactive romantic website built with Next.js, Three.js, and modern web technologies.

## Live site (GitHub Pages)

After you enable Pages (one-time), the site will be at:

**https://subashsekar.github.io/cinematic_version/**

### Enable GitHub Pages (required once)

1. Open [Repository Settings → Pages](https://github.com/subashsekar/cinematic_version/settings/pages)
2. Under **Build and deployment → Source**, choose **Deploy from a branch**
3. Branch: **`gh-pages`** / folder: **`/ (root)`** → Save
4. Wait 1–2 minutes, then open:
   **https://subashsekar.github.io/cinematic_version/**

Every push to `main` rebuilds and updates the site automatically.

## Features

- **Immersive 3D Experiences**: Built with Three.js, React Three Fiber, and @react-three/drei
- **Smooth Animations**: Powered by GSAP, GSAP ScrollTrigger, and Framer Motion
- **Cinematic Visuals**: Glassmorphism, glowing effects, and elegant typography
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Audio Integration**: Optional background music with mute toggle

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **React 18**
- **Three.js** + **React Three Fiber**
- **@react-three/drei**
- **GSAP** + **ScrollTrigger**
- **Lenis** (Smooth Scrolling)
- **Framer Motion**
- **Tailwind CSS**
- **Lucide React** (Icons)

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. Navigate to the project directory:
```bash
cd cinematic_version2
```

2. Install dependencies (using legacy peer deps for compatibility):
```bash
npm install --legacy-peer-deps
```

3. Run the development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Project Structure

```
cinematic_version2/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Main page with all sections
│   │   └── globals.css         # Global styles and Tailwind
│   ├── components/
│   │   ├── navigation/         # Navigation bar
│   │   ├── intro/              # Loading/Intro experience
│   │   ├── hero/               # Hero section with 3D scene
│   │   ├── story/              # Story section with photo album
│   │   ├── memories/           # Memories section with Polaroid cards
│   │   ├── timeline/           # Timeline section with glowing path
│   │   ├── gallery/            # Gallery section with 3D room
│   │   ├── reasons/            # Reasons section with heart
│   │   ├── message/            # Letter message section
│   │   └── final/              # Final cinematic scene
│   ├── data/
│   │   └── story.ts            # All relationship content data
│   ├── providers/
│   │   ├── SmoothScrollProvider.tsx
│   │   ├── AudioProvider.tsx
│   │   └── MouseInteractionProvider.tsx
│   └── types/
│       └── three.d.ts
├── public/
│   ├── images/                 # Add your photos here
│   └── audio/                  # Add background music here
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Customization

### Changing Relationship Content

Edit `src/data/story.ts` to customize all text, photos, and content.

### Adding Your Photos

1. Place your images in `public/images/`
2. Update paths in `src/data/story.ts`

### Changing Background Music

1. Place your MP3 file in `public/audio/background-music.mp3`
2. The music will automatically be available in the Music Toggle button

### Updating Colors & Theme

Edit `tailwind.config.ts` to change the color scheme.

## Responsive Design

The website automatically adapts to different screen sizes.

## Sections

1. **Intro** - Cinematic loading with particle heart formation
2. **Hero** - Immersive 3D lake scene with glowing heart
3. **Our Story** - Rotating 3D photo album with milestones
4. **Memories** - Interactive 3D Polaroid cards
5. **Timeline** - Glowing path through 3D landscape
6. **Gallery** - Immersive 3D room with floating photos
7. **Why I Love You** - Glass cards floating around glowing heart
8. **Special Message** - Glass case with unfolding letter
9. **Final** - Cinematic night sky with silhouettes

## Build for Production

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this code for your own projects.
