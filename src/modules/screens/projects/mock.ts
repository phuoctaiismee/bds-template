export interface Project {
  id: string;
  name: string;
  developer: string;
  location: string;
  district: string;
  priceFrom: string;
  priceUnit: string;
  scale: string;
  type: 'apartment' | 'urban' | 'resort';
  status: 'booking' | 'construction' | 'handover'; // Trạng thái triển khai
  legal: 'ownership' | 'contract' | 'waiting'; // Pháp lý
  image: string;
  totalUnits?: number;
}

// types/index.ts
export interface TimelineEvent {
  year: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export interface InventoryItem {
  id: string;
  title: string;
  price: string;
  specs: string;
  image: string;
}

export interface ProjectDetail {
  id: string;
  name: string;
  developer: string;
  location: string;
  scale: string;
  type: string;
  totalUnits: string;
  handover: string;
  legalStatus: string;
  priceRange: string;
  status: string;
  description: string;
  features: string[];
  legalTimeline: TimelineEvent[];
  images: string[];
  inventory: InventoryItem[];
  expert: {
    name: string;
    role: string;
    avatar: string;
    phone: string;
  };
}

export const PROJECT_DETAIL: ProjectDetail = {
  id: 'global-city',
  name: 'The Global City',
  developer: 'Masterise Homes',
  location: 'Đỗ Xuân Hợp, Phường An Phú, TP. Thủ Đức',
  scale: '117.4 Ha',
  type: 'Khu đô thị phức hợp',
  totalUnits: '1,800 Nhà phố & 10,000 Căn hộ',
  handover: 'Q4/2026 (Dự kiến)',
  legalStatus: 'Sổ hồng sở hữu lâu dài',
  priceRange: 'Từ 350 Triệu/m²',
  status: 'Đang mở bán',
  description: `The Global City là khu đô thị phức hợp chuẩn quốc tế đầu tiên tại Việt Nam được thiết kế bởi Foster + Partners.

Dự án sở hữu vị trí kim cương với 3 mặt tiền đường lớn (cao tốc Long Thành - Dầu Giây, Đỗ Xuân Hợp, đường Liên Phường), tâm điểm kết nối của TP. Thủ Đức.

Đây không chỉ là nơi an cư mà còn là "Downtown" mới của TP.HCM với hệ thống tiện ích đẳng cấp: Kênh đào nhạc nước dài 2km, Trung tâm thương mại hạng A rộng 123.000m², Bệnh viện quốc tế, Trường học quốc tế...`,
  features: [
    'Kênh đào nhạc nước 2km',
    'TTTM Hạng A 123.000m²',
    'Công viên ven sông',
    'Bến du thuyền',
    'Trường học Quốc tế',
    'Bệnh viện Quốc tế',
  ],
  legalTimeline: [
    { year: '2021', title: 'Phê duyệt quy hoạch 1/500', status: 'completed' },
    { year: '2022', title: 'Giấy phép xây dựng hạ tầng', status: 'completed' },
    { year: '2023', title: 'Ký HĐMB phân khu Soho', status: 'completed' },
    { year: '2024', title: 'Đang thi công phần thân Cao tầng', status: 'in-progress' },
    { year: '2026', title: 'Dự kiến bàn giao toàn khu', status: 'pending' },
  ],
  images: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940&auto=format&fit=crop', // Hero
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2896&auto=format&fit=crop',
  ],
  inventory: [
    {
      id: 'p1',
      title: 'Shophouse Soho 95m² mặt tiền nhạc nước',
      price: '42.5 Tỷ',
      specs: '5 Tầng • Đã hoàn thiện',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2970&auto=format&fit=crop',
    },
    {
      id: 'p2',
      title: 'Căn hộ Canal Walk 2PN view sông',
      price: '12.8 Tỷ',
      specs: '86m² • 2PN • 2WC',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2970&auto=format&fit=crop',
    },
    {
      id: 'p3',
      title: 'Dinh thự Rivus Elie Saab 500m²',
      price: '180 Tỷ',
      specs: 'View sông Đồng Nai',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2970&auto=format&fit=crop',
    },
  ],
  expert: {
    name: 'Nguyễn Văn An',
    role: 'Giám đốc dự án',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    phone: '0909 123 456',
  },
};

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  // Giả lập call API hoặc DB
  return PROJECT_DETAIL;
}

// --- Mock Data ---
export const PROJECTS: Project[] = [
  {
    id: 'global-city',
    name: 'The Global City',
    developer: 'Masterise Homes',
    location: 'An Phú, TP. Thủ Đức',
    district: 'Thu Duc',
    priceFrom: '380',
    priceUnit: 'Triệu/m²',
    scale: '117.4 Ha',
    type: 'urban',
    status: 'construction',
    legal: 'ownership',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940&auto=format&fit=crop',
    totalUnits: 12000,
  },
  {
    id: 'empire-city',
    name: 'Empire City',
    developer: 'Keppel Land',
    location: 'Thủ Thiêm, TP. Thủ Đức',
    district: 'Thu Duc',
    priceFrom: '180',
    priceUnit: 'Triệu/m²',
    scale: '14.5 Ha',
    type: 'apartment',
    status: 'handover',
    legal: 'contract',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop',
    totalUnits: 3700,
  },
  {
    id: 'metropole',
    name: 'The Metropole Thủ Thiêm',
    developer: 'SonKim Land',
    location: 'Thủ Thiêm, TP. Thủ Đức',
    district: 'Thu Duc',
    priceFrom: '220',
    priceUnit: 'Triệu/m²',
    scale: '7.6 Ha',
    type: 'apartment',
    status: 'construction',
    legal: 'contract',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2896&auto=format&fit=crop',
    totalUnits: 1500,
  },
  {
    id: 'izumi',
    name: 'Izumi City',
    developer: 'Nam Long Group',
    location: 'Long Hưng, Biên Hòa',
    district: 'Dong Nai',
    priceFrom: '6',
    priceUnit: 'Tỷ/căn',
    scale: '170 Ha',
    type: 'urban',
    status: 'booking',
    legal: 'waiting',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2971&auto=format&fit=crop',
    totalUnits: 4000,
  },
  {
    id: 'grand-marina',
    name: 'Grand Marina Saigon',
    developer: 'Masterise Homes',
    location: 'Bason, Quận 1',
    district: 'District 1',
    priceFrom: '18',
    priceUnit: 'Tỷ/căn',
    scale: '10 Ha',
    type: 'apartment',
    status: 'construction',
    legal: 'ownership',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2953&auto=format&fit=crop',
  },
  {
    id: 'sycamore',
    name: 'Sycamore',
    developer: 'CapitaLand',
    location: 'Thành phố mới Bình Dương',
    district: 'Binh Duong',
    priceFrom: '8.5',
    priceUnit: 'Tỷ/căn',
    scale: '18.9 Ha',
    type: 'urban',
    status: 'booking',
    legal: 'ownership',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2970&auto=format&fit=crop',
  },
];
