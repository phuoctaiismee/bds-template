import { Building2, Globe2, Home, MapPin, ShieldCheck, Trees, Users } from 'lucide-react';

// --- Types ---
export interface FilterState {
  type: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;
  beds: number | string;
  baths: number | string;
  direction: string[];
  legal: string[];
  amenities: string[];
}

// --- Constants ---
export const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2971&auto=format&fit=crop',
    title: 'Sống trọn chất riêng',
    subtitle: 'Tại những tuyệt tác kiến trúc bên bờ biển',
    price: 'From $2.5M',
    location: 'Da Nang, Vietnam',
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop',
    title: 'Không gian đẳng cấp',
    subtitle: 'Biệt thự nghỉ dưỡng 5 sao ngay tại gia',
    price: 'From 45 Tỷ',
    location: 'Thao Dien, HCMC',
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2953&auto=format&fit=crop',
    title: 'Tầm nhìn thượng lưu',
    subtitle: 'Penthouse giữa tầng mây tại trung tâm Sài Gòn',
    price: 'From 80 Tỷ',
    location: 'District 1, HCMC',
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2969&auto=format&fit=crop',
    title: 'Hòa mình cùng thiên nhiên',
    subtitle: 'Biệt thự sân vườn sinh thái biệt lập',
    price: 'From 22 Tỷ',
    location: 'Ecopark, Hung Yen',
  },
];

export const PROPERTY_TYPES = [
  { id: 'apartment', label: 'Căn hộ chung cư', icon: Building2 },
  { id: 'house', label: 'Nhà phố / Biệt thự', icon: Home },
  { id: 'villa', label: 'Biệt thự nghỉ dưỡng', icon: Trees },
  { id: 'land', label: 'Đất nền dự án', icon: MapPin },
];

export const INITIAL_FILTERS: FilterState = {
  type: 'apartment',
  minPrice: '',
  maxPrice: '',
  minArea: '',
  maxArea: '',
  beds: 'any',
  baths: 'any',
  direction: [],
  legal: [],
  amenities: [],
};


export const DIRECTIONS = ['Đông', 'Tây', 'Nam', 'Bắc', 'Đông Nam', 'Đông Bắc', 'Tây Nam', 'Tây Bắc'];
export const LEGAL_TYPES = ['Sổ hồng riêng', 'HĐMB', 'Đang chờ sổ'];

export const AMENITIES = [
  'View sông',
  'Penthouse',
  'Hồ bơi riêng',
  'Gần Metro',
  'Sân vườn',
  'Smart Home',
  'Pet friendly',
  'Gym/Spa',
  'Bãi đỗ xe hơi',
  'An ninh 24/7',
];

export const STATS_DATA = [
  { label: 'Bất động sản', value: '1,250+', icon: Building2 },
  { label: 'Đối tác chiến lược', value: '50+', icon: ShieldCheck },
  { label: 'Chuyên gia', value: '500+', icon: Users },
  { label: 'Tỉnh thành', value: '15+', icon: Globe2 },
];

export const SUGGESTIONS = {
  recent: ['The Global City', 'Vinhomes Grand Park', 'Penthouse Thảo Điền'],
  trending: ['Empire City', 'Thủ Thiêm Zeit River', 'Grand Marina Saigon', 'Aqua City'],
  districts: ['Quận 1', 'Quận 2 (TP. Thủ Đức)', 'Quận 7', 'Bình Thạnh'],
};

export const POPULAR_TAGS = ['Penthouse View Sông', 'Biệt thự Thảo Điền', 'Shophouse Global City', 'Căn hộ Thủ Thiêm'];