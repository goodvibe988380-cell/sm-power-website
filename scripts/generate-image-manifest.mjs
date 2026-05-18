import { readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';

const root = process.cwd();
const publicDir = join(root, 'public');
const outputFile = join(root, 'src', 'data', 'imageManifest.ts');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function titleFromFile(fileName) {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function categoryFromRelativePath(relativePath, fallback) {
  const parts = relativePath.split(sep);
  if (parts.length > 1) {
    return titleFromFile(parts[0]);
  }
  return inferCategory(parts[0], fallback);
}

function inferCategory(fileName, fallback) {
  const name = fileName.toLowerCase();

  if (name.includes('solar')) return 'Solar';
  if (name.includes('transformer')) return 'Transformer';
  if (name.includes('panel') || name.includes('meter') || name.includes('db')) return 'Panels';
  if (name.includes('plumbing') || name.includes('pipe') || name.includes('sink') || name.includes('bathroom')) return 'Plumbing';
  if (name.includes('maintenance') || name.includes('amc') || name.includes('service')) return 'Maintenance';
  if (/(^|[-_\s])(lt|ht)([-_\s]|$)/.test(name) || name.includes('approval')) return 'LT/HT';
  if (
    name.includes('lighting') ||
    name.includes('electrical') ||
    name.includes('wiring') ||
    name.includes('chandelier') ||
    name.includes('facade')
  ) {
    return 'Wiring';
  }

  return fallback;
}

function scanImages(relativeFolder, fallbackCategory) {
  const absoluteFolder = join(publicDir, relativeFolder);

  try {
    statSync(absoluteFolder);
  } catch {
    return [];
  }

  const images = [];

  function walk(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const absolutePath = join(folder, entry.name);

      if (entry.isDirectory()) {
        walk(absolutePath);
        continue;
      }

      if (!imageExtensions.has(extname(entry.name).toLowerCase())) {
        continue;
      }

      const relativePath = relative(absoluteFolder, absolutePath);
      const publicPath = `/${relative(publicDir, absolutePath).split(sep).join('/')}`;

      images.push({
        title: titleFromFile(entry.name),
        category: categoryFromRelativePath(relativePath, fallbackCategory),
        src: publicPath,
      });
    }
  }

  walk(absoluteFolder);
  return images.sort((a, b) => a.src.localeCompare(b.src));
}

const manifest = {
  completedProjects: scanImages('projects/completed', 'Completed'),
  ongoingProjects: scanImages('projects/ongoing', 'Ongoing'),
  galleryImages: scanImages('gallery', 'Gallery'),
};

mkdirSync(join(root, 'src', 'data'), { recursive: true });

writeFileSync(
  outputFile,
  `export type GeneratedImage = {
  title: string;
  category: string;
  src: string;
};

export const completedProjectImages: GeneratedImage[] = ${JSON.stringify(manifest.completedProjects, null, 2)};

export const ongoingProjectImages: GeneratedImage[] = ${JSON.stringify(manifest.ongoingProjects, null, 2)};

export const galleryImages: GeneratedImage[] = ${JSON.stringify(manifest.galleryImages, null, 2)};
`,
  'utf8'
);

console.log(
  `Generated image manifest: ${manifest.completedProjects.length} completed, ${manifest.ongoingProjects.length} ongoing, ${manifest.galleryImages.length} gallery`
);
