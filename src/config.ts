/**
 * Single place for the details you'll swap before launch.
 */
export const site = {
  name: 'Čakule iz Kužine',
  bookingUrl: 'https://www.takeachef.com/en-hr/chef/tin-lu-i',
  // Contact form address. The form composes a mailto; nothing is stored.
  contactEmail: 'tin.lucic172@gmail.com',
  // Used for canonical URLs, sitemap and social cards. Update if the domain changes.
  url: 'https://cakule-iz-kuzine.vercel.app',
  serviceArea: 'Istria, Croatia',
  year: 2026,
  // Palette 1–4. See src/styles/palettes.css and docs/superpowers/specs/2026-10-27-private-chef-site-design.md.
  palette: '3',
};

export const routes = {
  home: { hr: '/', en: '/en/' },
  gallery: { hr: '/galerija/', en: '/en/gallery/' },
};
