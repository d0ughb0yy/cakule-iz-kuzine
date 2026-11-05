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
  srcset?: string;
};

const imageMap = images as Record<string, ImageEntry>;

/** Candidate display widths for responsive images (CSS px). */
const SRC_SET_WIDTHS = [320, 480, 640, 800, 1024, 1280, 1600, 1920];

const WIDTH_PARAM = /w=\d+&h=\d+/;

/**
 * Build a `srcset` from an image's existing width variants. Only remote
 * (Unsplash) images have query-controlled crops; local files ship a single
 * resolution and get no srcset. Heights scale to keep the crop's aspect.
 */
function srcsetFor(entry: ImageEntry): string | undefined {
  if (!/^https?:/.test(entry.src)) return undefined;

  const fullW = parseWidthParam(entry.full);
  const maxW = fullW || entry.width;
  const aspect = entry.height / entry.width;

  const widths = SRC_SET_WIDTHS.filter((w) => w <= maxW);
  widths.push(entry.width);
  widths.push(maxW);

  const unique = [...new Set(widths)].sort((a, b) => a - b);

  return unique
    .map((w) => {
      const h = Math.round(w * aspect);
      return `${entry.src.replace(WIDTH_PARAM, `w=${w}&h=${h}`)} ${w}w`;
    })
    .join(', ');
}

/** Read the `w=` value out of a URL like Unsplash serves. */
function parseWidthParam(url: string): number {
  const match = url.match(/w=(\d+)/);
  return match ? Number(match[1]) : 0;
}

export function getContent(lang: Lang): SiteContent {
  return lang === 'hr' ? hr : en;
}

export function getImage(key: string): ImageEntry {
  const image = imageMap[key];
  return { ...image, srcset: srcsetFor(image) };
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
      srcset: srcsetFor(image),
    };
  });
}
