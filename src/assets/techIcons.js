// Clean SVG icons for all tech stack items and badges
export const techIcons = {
  react: {
    name: 'React',
    color: '#61DAFB',
    bg: '#20232a',
    svg: `<svg viewBox="0 0 115.3 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="57.65" cy="50" rx="16.5" ry="50" fill="none" stroke="#61DAFB" stroke-width="4.5" transform="rotate(30 57.65 50)"/><ellipse cx="57.65" cy="50" rx="16.5" ry="50" fill="none" stroke="#61DAFB" stroke-width="4.5" transform="rotate(90 57.65 50)"/><ellipse cx="57.65" cy="50" rx="16.5" ry="50" fill="none" stroke="#61DAFB" stroke-width="4.5" transform="rotate(150 57.65 50)"/><circle cx="57.65" cy="50" r="9" fill="#61DAFB"/></svg>`
  },
  javascript: {
    name: 'JavaScript',
    color: '#F7DF1E',
    bg: '#000000',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="12" fill="#F7DF1E"/><path d="M28 72 C32 75 38 76 43 73 C46 71 47 67 47 59 L47 30 L36 30 L36 58 C36 62 34 64 30 63 Z M57 66 C61 72 68 76 77 73 C84 70 87 64 87 57 C87 47 78 44 71 40 C65 37 63 34 63 30 C63 26 66 23 72 23 C76 23 81 25 84 28 L89 19 C84 16 79 14 72 14 C60 14 53 21 53 31 C53 41 62 44 69 48 C75 51 77 55 77 58 C77 63 72 65 67 65 C61 65 56 61 52 56 Z" fill="#000000"/></svg>`
  },
  html5: {
    name: 'HTML5',
    color: '#E34F26',
    bg: '#1a1a1a',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M12 8 L20 88 L50 96 L80 88 L88 8 Z" fill="#E34F26"/><path d="M50 14 L50 90 L74 83 L81 14 Z" fill="#EF652A"/><path d="M50 32 L30 32 L31 43 L50 43 Z M50 54 L32 54 L34 66 L50 71 L50 60 L42 58 L41 54 Z" fill="#EBEBEB"/><path d="M50 32 L70 32 L69 43 L50 43 Z M50 54 L68 54 L66 71 L50 75 Z" fill="#FFFFFF"/></svg>`
  },
  css3: {
    name: 'CSS3',
    color: '#1572B6',
    bg: '#1a1a1a',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M12 8 L20 88 L50 96 L80 88 L88 8 Z" fill="#1572B6"/><path d="M50 14 L50 90 L74 83 L81 14 Z" fill="#33A9DC"/><path d="M50 32 L28 32 L29 44 L50 44 Z M50 54 L30 54 L32 66 L50 71 L50 60 L42 58 L41 54 Z" fill="#EBEBEB"/><path d="M50 32 L72 32 L71 44 L50 44 Z M50 54 L70 54 L68 71 L50 75 Z" fill="#FFFFFF"/></svg>`
  },
  tailwind: {
    name: 'Tailwind CSS',
    color: '#38BDF8',
    bg: '#0f172a',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M25 45 C30 35 40 33 46 38 C49 41 52 44 55 47 C61 53 67 58 80 55 C88 53 95 47 98 40 C93 50 83 52 77 47 C74 44 71 41 68 38 C62 32 56 27 43 30 C35 32 28 38 25 45 Z M2 70 C7 60 17 58 23 63 C26 66 29 69 32 72 C38 78 44 83 57 80 C65 78 72 72 75 65 C70 75 60 77 54 72 C51 69 48 66 45 63 C39 57 33 52 20 55 C12 57 5 63 2 70 Z" fill="#38BDF8"/></svg>`
  },
  bootstrap: {
    name: 'Bootstrap',
    color: '#7952B3',
    bg: '#1b122c',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#7952B3"/><text x="50" y="70" font-family="'Poppins', sans-serif" font-weight="900" font-size="62" fill="#FFFFFF" text-anchor="middle">B</text></svg>`
  },
  nodejs: {
    name: 'Node.js',
    color: '#339933',
    bg: '#111e13',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#3F873F" d="M66.958.825a6.07 6.07 0 0 0-6.035 0L11.103 29.76c-1.895 1.072-2.96 3.095-2.96 5.24v57.988c0 2.143 1.183 4.167 2.958 5.24l49.82 28.934a6.07 6.07 0 0 0 6.036 0l49.82-28.935c1.894-1.072 2.958-3.096 2.958-5.24V35c0-2.144-1.183-4.167-2.958-5.24z"/><path fill="#52A044" d="M116.897 29.76 66.841.825A8.161 8.161 0 0 0 65.302.23L9.21 96.798a6.251 6.251 0 0 0 1.657 1.43l50.057 28.934c1.42.833 3.076 1.072 4.615.595l52.66-96.925a3.702 3.702 0 0 0-1.302-1.072z"/><path fill="#6ABF4B" d="M116.898 98.225c1.42-.833 2.485-2.262 2.958-3.81L65.066.108c-1.42-.238-2.959-.119-4.26.715L11.104 29.639l53.606 98.355c.71-.12 1.54-.358 2.25-.715z"/></svg>`
  },
  express: {
    name: 'Express',
    color: '#FFFFFF',
    bg: '#181818',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="16" fill="#181818"/><text x="50" y="65" font-family="'Poppins', sans-serif" font-weight="800" font-size="44" fill="#FFFFFF" text-anchor="middle">ex</text></svg>`
  },
  mongodb: {
    name: 'MongoDB',
    color: '#47A248',
    bg: '#0e1f10',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 4 C48 10 30 38 30 60 C30 78 40 92 50 96 C60 92 70 78 70 60 C70 38 52 10 50 4 Z" fill="#47A248"/><path d="M50 4 L50 96 C50 96 68 78 68 60 C68 38 51 10 50 4 Z" fill="#4EA94B"/><path d="M50 96 L50 68 L53 68 C53 82 50 96 50 96 Z" fill="#FFFFFF" opacity="0.6"/></svg>`
  },
  supabase: {
    name: 'Supabase',
    color: '#3ECF8E',
    bg: '#0f241c',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M56 8 L18 55 L48 55 L44 92 L82 45 L52 45 Z" fill="#3ECF8E"/></svg>`
  },
  mysql: {
    name: 'MySQL',
    color: '#00758F',
    bg: '#0f222b',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="16" fill="#00758F"/><text x="50" y="46" font-family="'Poppins', sans-serif" font-weight="900" font-size="28" fill="#F29111" text-anchor="middle">MY</text><text x="50" y="74" font-family="'Poppins', sans-serif" font-weight="900" font-size="26" fill="#FFFFFF" text-anchor="middle">SQL</text></svg>`
  },
  git: {
    name: 'Git',
    color: '#F05032',
    bg: '#25120e',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(45 50 50)"><rect x="18" y="18" width="64" height="64" rx="12" fill="#F05032"/><circle cx="36" cy="50" r="7" fill="#FFFFFF"/><circle cx="64" cy="36" r="7" fill="#FFFFFF"/><circle cx="64" cy="64" r="7" fill="#FFFFFF"/><path d="M36 50 L64 36 M36 50 L64 64" stroke="#FFFFFF" stroke-width="5"/></g></svg>`
  },
  github: {
    name: 'GitHub',
    color: '#181717',
    bg: '#ffffff',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 C27.9 10 10 27.9 10 50 C10 67.7 21.5 82.7 37.4 88 C39.4 88.4 40.1 87.1 40.1 86.1 C40.1 85.2 40.1 82.7 40.1 79.5 C29 81.9 26.6 76.6 26.6 76.6 C24.8 72 22.2 70.8 22.2 70.8 C18.6 68.3 22.5 68.4 22.5 68.4 C26.5 68.7 28.6 72.5 28.6 72.5 C32.1 78.5 37.9 76.8 40.2 75.7 C40.5 73.1 41.5 71.4 42.6 70.4 C33.7 69.4 24.4 66 24.4 50.8 C24.4 46.5 25.9 43 28.4 40.2 C28 39.2 26.7 35.1 28.8 29.8 C28.8 29.8 32.1 28.7 39.6 33.8 C42.7 32.9 46.1 32.5 49.5 32.5 C52.9 32.5 56.3 32.9 59.4 33.8 C66.9 28.7 70.2 29.8 70.2 29.8 C72.3 35.1 71 39.2 70.6 40.2 C73.1 43 74.6 46.5 74.6 50.8 C74.6 66 65.2 69.4 56.3 70.4 C57.6 71.5 58.7 73.7 58.7 77.2 C58.7 82.3 58.7 85.5 58.7 86.1 C58.7 87.1 59.4 88.4 61.5 88 C77.5 82.6 89 67.7 89 50 C89 27.9 71.1 10 50 10 Z" fill="#181717"/></svg>`
  }
};

// Function to convert SVG to data URL for Canvas textures
export const getSvgDataUrl = (svgString) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};
