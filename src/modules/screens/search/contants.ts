
export interface Listing {
  id: string;
  tier: 'diamond' | 'gold' | 'silver' | 'standard'; // Monetization tiers
  title: string;
  location: string;
  district: string;
  price: number; // in Billion VND (sale) or Million VND (rent)
  priceDisplay: string;
  pricePerUnit: string; // /m2 or /month
  area: number;
  beds: number;
  baths: number;
  direction?: string;
  images: string[];
  type: 'sale' | 'rent';
  propertyType: string;
  postedTime: string;
  legal?: string; // Sale specific
  isVerified: boolean;
  tags?: string[];
  agent: {
    name: string;
    avatar: string;
    agency?: string;
  };
  // Rent Specific
  deposit?: string;
  furniture?: 'full' | 'basic' | 'none';
  furnitureDisplay?: string;
  moveIn?: string; // "Ở ngay", "Tháng 12/2024"
  petsAllowed?: boolean;
}

// --- Mock Data (Enriched for Rent) ---

export const LISTINGS: (Listing | { type: 'ad'; id: string })[] = [
  {
    id: 'r1',
    tier: 'diamond',
    title: 'Căn hộ 2PN Masteri Thảo Điền, Full nội thất cao cấp, View sông',
    location: 'Xa lộ Hà Nội, Thảo Điền, TP. Thủ Đức',
    district: 'Thảo Điền',
    price: 25,
    priceDisplay: '25 Triệu/tháng',
    pricePerUnit: 'Bao phí quản lý',
    area: 72,
    beds: 2,
    baths: 2,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2880&auto=format&fit=crop'
    ],
    type: 'rent',
    propertyType: 'Căn hộ',
    postedTime: '30 phút trước',
    deposit: 'Cọc 2 tháng',
    furniture: 'full',
    furnitureDisplay: 'Full nội thất',
    moveIn: 'Ở ngay',
    isVerified: true,
    tags: ['Giá tốt', 'Cho nuôi thú cưng'],
    agent: { name: 'Ngọc Lan', avatar: 'https://i.pravatar.cc/150?u=22', agency: 'Masterise Agent' }
  },
  {
    id: '1',
    tier: 'diamond', 
    title: 'Biệt thự đơn lập Thảo Điền, view sông trực diện, hồ bơi riêng đẳng cấp',
    location: 'Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức',
    district: 'Thảo Điền',
    price: 168,
    priceDisplay: '168 Tỷ',
    pricePerUnit: '380 Tr/m²',
    area: 450,
    beds: 5,
    baths: 6,
    direction: 'Đông Nam',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2971&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2970&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2953&auto=format&fit=crop'
    ],
    type: 'sale',
    propertyType: 'Biệt thự',
    postedTime: 'Vừa xong',
    legal: 'Sổ hồng riêng',
    isVerified: true,
    tags: ['Độc quyền', 'Giảm 5 Tỷ'],
    agent: { name: 'Hoàng Nam', avatar: 'https://i.pravatar.cc/150?u=1', agency: 'Aetheria Premium' }
  },
  {
    id: 'r2',
    tier: 'gold',
    title: 'Studio Sunwah Pearl, Nhà mới 100%, Tầng cao thoáng mát',
    location: '90 Nguyễn Hữu Cảnh, Bình Thạnh',
    district: 'Bình Thạnh',
    price: 16,
    priceDisplay: '16 Triệu/tháng',
    pricePerUnit: 'Hợp đồng 1 năm',
    area: 52,
    beds: 1,
    baths: 1,
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=2942&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512918760532-3ed64bc8066e?q=80&w=2940&auto=format&fit=crop'
    ],
    type: 'rent',
    propertyType: 'Căn hộ',
    postedTime: '2 giờ trước',
    deposit: 'Cọc 1 tháng',
    furniture: 'basic',
    furnitureDisplay: 'Nội thất cơ bản',
    moveIn: '15/12/2024',
    isVerified: true,
    tags: ['Free Wifi', 'Gym Free'],
    agent: { name: 'Minh Khôi', avatar: 'https://i.pravatar.cc/150?u=33' }
  },
  {
    type: 'ad', 
    id: 'ad-1'
  },
  {
    id: '2',
    tier: 'gold',
    title: 'Penthouse The Metropole Thủ Thiêm, nội thất Ý nhập khẩu',
    location: 'Khu đô thị mới Thủ Thiêm, TP. Thủ Đức',
    district: 'Thủ Thiêm',
    price: 65,
    priceDisplay: '65 Tỷ',
    pricePerUnit: '250 Tr/m²',
    area: 260,
    beds: 4,
    baths: 4,
    direction: 'Tây Bắc',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2953&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2940&auto=format&fit=crop'
    ],
    type: 'sale',
    propertyType: 'Căn hộ',
    postedTime: '2 giờ trước',
    legal: 'HĐMB',
    isVerified: true,
    tags: ['View Bitexco'],
    agent: { name: 'Sarah Nguyễn', avatar: 'https://i.pravatar.cc/150?u=5', agency: 'ERA Vietnam' }
  },
  {
    id: 'r3',
    tier: 'silver',
    title: 'Nhà phố nguyên căn Cityland Park Hills, Kinh doanh hoặc ở',
    location: 'Phan Văn Trị, Gò Vấp',
    district: 'Gò Vấp',
    price: 45,
    priceDisplay: '45 Triệu/tháng',
    pricePerUnit: 'Cọc 3 tháng',
    area: 100,
    beds: 4,
    baths: 5,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2940&auto=format&fit=crop'
    ],
    type: 'rent',
    propertyType: 'Nhà phố',
    postedTime: '5 giờ trước',
    deposit: 'Cọc 3 tháng',
    furniture: 'none',
    furnitureDisplay: 'Không nội thất',
    moveIn: 'Ở ngay',
    isVerified: true,
    tags: ['Văn phòng', 'Kinh doanh'],
    agent: { name: 'Tuấn Anh', avatar: 'https://i.pravatar.cc/150?u=44' }
  }
];