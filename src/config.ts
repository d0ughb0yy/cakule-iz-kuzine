/**
 * Single place for the details you'll swap before launch.
 */
export const site = {
  name: 'Čakula iz Kužine',
  // Replace with the real profile URL.
  bookingUrl: 'https://www.takeachef.com/',
  // Used for canonical URLs, sitemap and social cards. Update if the domain changes.
  url: 'https://cakule-iz-kuzine.vercel.app',
  serviceArea: 'Istria, Croatia',
  year: 2026,
  // Leave empty to hide the Instagram link in the footer.
  instagramUrl: '',
  // Palette 1–4. See src/styles/palettes.css and docs/superpowers/specs/2026-10-27-private-chef-site-design.md.
  palette: '3',
};

export const routes = {
  home: { hr: '/', en: '/en/' },
  gallery: { hr: '/galerija/', en: '/en/gallery/' },
};
