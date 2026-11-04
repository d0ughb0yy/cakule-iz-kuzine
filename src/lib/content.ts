import hr from '../data/site/hr.json';
import en from '../data/site/en.json';
import images from '../data/images.json';
import gallery from '../data/gallery.json';
import { routes } from '../config';

export type Lang = 'hr' | 'en';
export type SiteContent = typeof hr;
export type CurrentPage = keyof typeof routes;

type ImageEntry = {
  src: string;
  full: string;
  width: number;
  height: number;
  alt: { hr: string; en: string };
};

const imageMap = images as Record<string, ImageEntry>;

export function getContent(lang: Lang): SiteContent {
  return lang === 'hr' ? hr : en;
}

export function getImage(key: string): ImageEntry {
  return imageMap[key];
}

export function getGallery(lang: Lang) {
  return gallery.items.map((item) => {
    const image = imageMap[item.image];

    if (!image) {
      throw new Error(`Unknown image key in gallery.json: ${item.image}`);
    }

    return {
      imageKey: item.image,
      src: image.src,
      full: image.full,
      width: image.width,
      height: image.height,
      alt: image.alt[lang],
      caption: item.caption[lang],
    };
  });
}
