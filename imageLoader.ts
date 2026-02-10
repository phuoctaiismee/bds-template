const MAX_IMAGE_WIDTH = 3840;

const normalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

export default function cloudflareLoader({
  src,
  width,
  quality = 80,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  width = Math.min(width, MAX_IMAGE_WIDTH);

  if (src.startsWith('/_next')) {
    return `${src}?w=${width}&q=${quality}`;
  }

  if (!src.includes('tn-cdn.net') || src.startsWith('/') || src.includes('/cdn-cgi/') || src.endsWith('.avif')) {
    return src;
  }

  const origin = src.split('/').slice(0, 3).join('/');
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  params.push('format=webp');
  const paramsString = params.join(',');
  return `${origin}/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
