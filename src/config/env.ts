// Private
export const YAAH = {
  API_URL: process.env['YAAH_API_URL']!,
};

export const MAP_STYLE_URL = process.env['NEXT_PUBLIC_MAP_STYLE_URL']!;

export const ABLY = {
  KEY: process.env['NEXT_PUBLIC_ABLY_KEY']!,
};

export const TEKIFY = {
  APP_ID: process.env['NEXT_PUBLIC_TEKNIFY_APP_ID']!,
};

export const DEVTOOL = {
  ENABLED: process.env['DEVTOOL_ENABLED'] === 'true',
};
