# 🌌 Abilash B | Cinematic 3D Developer Portfolio

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![EmailJS](https://img.shields.io/badge/EmailJS-F15A24?style=for-the-badge&logo=mailgun&logoColor=white)](https://www.emailjs.com/)

<p align="center">
  <b>A cinematic, high-performance cosmic developer portfolio engineered with WebGL, Three.js, and modern React.</b>
</p>

[Live Demo](https://github.com/Abilash1803/Dev-portfolio) • [Report Bug](https://github.com/Abilash1803/Dev-portfolio/issues) • [Request Feature](https://github.com/Abilash1803/Dev-portfolio/issues)

</div>

---

## 🌠 Cinematic Highlights & Visual Engineering

### 1. 🌐 Multilingual Cinematic Preloader
- Atmospheric intro sequence displaying global welcoming greetings across multiple native scripts:
  - `English` • `தமிழ் (வணக்கம்)` • `മലയാളം (നമസ്കാരം)` • `हिन्दी (नमस्ते)` • `Français (Bonjour)` • `తెలుగు (నമస్కారం)` • `Welcome`
- Engineered with anamorphic horizontal lens beams, subtle 35mm optical depth dissolves, and a precision timeline progress laser.

### 2. 🕳️ Hero Accretion Vortex & Planetary Orbits
- Ultra-smooth cosmic event horizon background with ambient space particle stars.
- Multi-tier planetary orbit system revolving in counter-rotation around the hero space with high-contrast tech icons and tooltip illumination.

### 3. 🃏 3D Perspective Flip Cards (Overview)
- Full-stack developer service cards engineered with true CSS 3D transforms (`rotateY(180deg)`), smooth perspective handling, and glassmorphic backface visibility.

### 4. ⚡ Holographic Neural Tech Matrix
- Replaced conventional 3D canvas overhead with a responsive **Holographic Tech Matrix**:
  - Interactive category filtering (`All Stacks`, `Frontend Core`, `Backend & APIs`, `Databases & Cloud`, `DevOps & Tools`).
  - Sci-fi corner brackets, brand-colored glowing aura, and high-contrast SVG badges.
  - **Full-Stack Neural Linking**: Hovering over any technology (e.g. *React*) dynamically illuminates all connected tools (e.g. *JavaScript*, *Tailwind*, *HTML5*) with real-time active pulse badges.

### 5. 🛡️ Performance & Security Vault
- Interactive hardware security padlock with an animated spring-loaded shackle and high-speed encryption badge.

### 6. 🌍 Interactive 3D Plexus Earth Globe
- High-performance WebGL geodesic sphere powered by `@react-three/fiber` and Three.js typed buffer geometries.
- Features:
  - 956 precise surface and oceanic coordinate nodes with continental landmass clustering.
  - Dark cosmic depth core sphere preventing additive white blowout and creating authentic spherical volume.
  - **Interactive Cursor Raycast & Hover Glow**: Real-time cursor tracking illuminates nearby nodes and line segments into radiant white (`#ffffff`) with an active beacon pulse flare.

### 7. 💼 Production Projects Showcase
- Features live production platforms including:
  - **Chakrika Sarees**: Full e-commerce suite with customer storefront, admin dashboard, Razorpay payments, and Cloudflare CDN delivery.
  - **JMRH Journal**: Peer-reviewed open-access scholarly publication portal.
- Cards feature 3D tilt interaction, live deployment links, and direct GitHub repository shortcuts.

### 8. 📬 Minimalist Cosmic Contact Terminal
- Streamlined glassmorphic contact form powered by **EmailJS** for instant real-time message delivery directly to your inbox.

---

## 🛠️ Architecture & Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework & Build** | React 18, Vite 8, Node.js |
| **3D & Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Styling & Theme** | Tailwind CSS v4, PostCSS, Custom Cosmic CSS Gradients |
| **Animation & Physics** | Framer Motion, React Tilt |
| **Icons & Media** | Lucide React, Custom Handcrafted SVGs, WebM |
| **Messaging** | EmailJS Browser SDK |
| **Code Quality** | Oxlint, ESLint |

---

## 📂 Project Organization

```text
myportfolio/
├── public/
│   ├── assets/              # Compressed WebP assets & badges
│   ├── projects/            # High-resolution project showcase artwork
│   ├── blackhole.webm       # Cinematic hero background loop
│   ├── security.webm        # Vault background animation
│   └── favicon.svg          # Portfolio browser icon
├── src/
│   ├── assets/              # Clean inline SVGs & tech icon metadata
│   │   └── techIcons.js
│   ├── canvas/              # WebGL Three.js Canvases
│   │   ├── BlackHole.jsx    # Cosmic canvas background
│   │   ├── EarthCanvas.jsx  # Interactive 3D Plexus Earth Globe
│   │   └── StarsCanvas.jsx  # Spherical celestial starfield
│   ├── components/          # Reusable UI & Layout Components
│   │   ├── Footer.jsx
│   │   ├── HeroOrbitGrid.jsx
│   │   ├── Navbar.jsx
│   │   ├── Preloader.jsx
│   │   ├── SocialIcons.jsx
│   │   └── TiltCard.jsx
│   ├── data/                # Dynamic Isolated Data Store
│   │   ├── experiences.js   # Work experience timeline data
│   │   ├── globeNetwork.json# 3D geodesic coordinates and network lines
│   │   ├── projects.js      # Production projects portfolio data
│   │   └── tech.js          # Services & capability classifications
│   ├── sections/            # Portfolio Page Sections
│   │   ├── Contact.jsx      # Minimalist contact form + 3D Earth
│   │   ├── Experience.jsx   # Interactive vertical career timeline
│   │   ├── Hero.jsx         # Headline, orbits, and bio
│   │   ├── Overview.jsx     # 3D Flip capability cards
│   │   ├── Projects.jsx     # Production showcase grid
│   │   ├── Security.jsx     # Performance & encryption vault
│   │   └── Tech.jsx         # Holographic neural tech matrix
│   ├── App.jsx              # Application Root
│   ├── index.css            # Tailwind CSS v4 directives & custom themes
│   └── main.jsx             # React Virtual DOM Entry
├── .env.example             # Environment variable template
├── .gitignore               # Comprehensive Git exclusion rules
├── package.json             # NPM dependencies & scripts
├── vite.config.js           # Vite configuration
└── README.md                # Cinematic project documentation
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`, `pnpm`, or `yarn`

### 1. Clone the repository
```bash
git clone https://github.com/Abilash1803/Dev-portfolio.git
cd Dev-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Copy the sample environment file:
```bash
cp .env.example .env
```
Open `.env` and provide your EmailJS keys:
```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```
*(If placeholders remain, the contact form automatically executes in fallback simulation mode for hassle-free local testing).*

### 4. Launch development server
```bash
npm run dev
```
Navigate to `http://localhost:5173/` to view the live portfolio.

### 5. Build for production
```bash
npm run build
npm run preview
```

---

## 🚢 Production Deployment

### Vercel (Recommended)
1. Push your repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/).
3. Framework Preset: **Vite**.
4. Configure your Environment Variables in the project dashboard (`VITE_EMAILJS_*`).
5. Click **Deploy**.

### Netlify
1. Connect your GitHub repository to [Netlify](https://www.netlify.com/).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Configure environment variables under **Site settings > Environment variables**.
5. Click **Deploy site**.

---

## 👨‍💻 Author & Connect

**Abilash B** — *Full Stack Developer*

- **GitHub**: [@Abilash1803](https://github.com/Abilash1803)
- **LinkedIn**: [Abilash B](https://linkedin.com)
- **Email**: [abilashbhojan1803@gmail.com](mailto:abilashbhojan1803@gmail.com)

---

<div align="center">
  <sub>Engineered with precision, passion, and cosmic energy. © 2026 Abilash B. All rights reserved.</sub>
</div>
