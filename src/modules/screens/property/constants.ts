import { Car, GraduationCap, MapPin, ShoppingBag, Stethoscope } from 'lucide-react';

export const SALE_PROPERTY_DATA = {
  id: '1',
  type: 'sale',
  title: 'Biệt thự đơn lập khu Compound Thảo Điền, view sông trực diện, hồ bơi riêng',
  address: 'Nguyễn Văn Hưởng, Phường Thảo Điền, TP. Thủ Đức',
  price: 168,
  priceUnit: 'Tỷ',
  area: 450,
  pricePerUnit: '373 Triệu/m²',
  bedrooms: 5,
  bathrooms: 6,
  floors: '1 Trệt, 2 Lầu, Áp mái',
  direction: 'Đông Nam',
  legal: 'Sổ hồng riêng',
  postedTime: '2 giờ trước',
  highlights: [
    'Vị trí độc tôn: Mặt tiền sông Sài Gòn.',
    'Khu Compound khép kín, an ninh 24/7.',
    'Nội thất nhập khẩu Ý trị giá 12 Tỷ.',
    'Pháp lý sạch, công chứng ngay.',
  ],
  description: `Cần bán gấp biệt thự đơn lập tại khu Compound cao cấp nhất Thảo Điền.\n\n- Vị trí kim cương: Mặt tiền sông Sài Gòn, công viên bờ sông thoáng mát.\n- Kết cấu: 1 Trệt, 2 Lầu, Áp mái. Thiết kế theo phong cách Indochine sang trọng.\n- Tiện ích riêng: Hồ bơi nước mặn 40m², sân vườn rộng rãi BBQ.\n- Nội thất: Bàn giao full nội thất nhập khẩu Ý, hệ thống Smarthome toàn nhà.\n- Pháp lý: Sổ hồng chính chủ, hoàn công đầy đủ, sang tên ngay trong ngày.\n\nGiá bán: 168 Tỷ (Còn thương lượng cho khách thanh toán nhanh).`,
  amenities: {
    internal: ['Hồ bơi riêng', 'Sân vườn', 'Garage 2 xe', 'Phòng xông hơi', 'Hầm rượu', 'Smarthome'],
    external: ['Công viên bờ sông', 'Bến du thuyền', 'Clubhouse', 'Gym/Yoga', 'Khu vui chơi trẻ em'],
  },
  nearby: [
    { name: 'Trường Quốc tế BIS', distance: '500m', time: '2 phút', icon: GraduationCap },
    { name: 'Metro An Phú', distance: '1.2km', time: '5 phút', icon: Car },
    { name: 'Vincom Mega Mall', distance: '1.5km', time: '6 phút', icon: ShoppingBag },
    { name: 'BV Quốc tế Mỹ (AIH)', distance: '2.0km', time: '8 phút', icon: Stethoscope },
  ],
  images: [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2971&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2953&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2971&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2953&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2971&auto=format&fit=crop',
  ],
  agent: {
    id: 'nam-tran',
    name: 'Trần Hoàng Nam',
    role: 'Chuyên gia tư vấn',
    agency: 'Aetheria Private Office',
    phone: '0909 888 999',
    avatar: 'https://i.pravatar.cc/150?u=1',
    verified: true,
    rating: 4.9,
  },
};

export const RENT_PROPERTY_DATA = {
  id: 'r1',
  type: 'rent',
  title: 'Căn hộ 3PN Empire City - Linden, View sông trực diện, Full nội thất cao cấp',
  address: 'Khu đô thị mới Thủ Thiêm, TP. Thủ Đức',
  price: 45,
  priceUnit: 'Triệu/tháng',
  area: 127,
  pricePerUnit: 'Bao phí quản lý', // Note replaces price/m2
  bedrooms: 3,
  bathrooms: 2,
  floors: 'Tầng cao (15+)',
  direction: 'Tây Nam',
  legal: 'Hợp đồng thuê',
  postedTime: '30 phút trước',
  // Rental Specifics
  deposit: '2 tháng',
  leaseTerm: 'Tối thiểu 1 năm',
  moveInDate: 'Ở ngay',
  petPolicy: 'Được nuôi thú cưng',
  furnitureStatus: 'Full nội thất',
  fees: {
    management: 'Đã bao gồm',
    parking_car: '2.200.000đ/tháng',
    parking_bike: '200.000đ/tháng',
    internet: 'Chưa bao gồm',
  },
  highlights: [
    'View trực diện sông Sài Gòn & Quận 1, không bị chắn.',
    'Nội thất thiết kế riêng, mới 100%, chưa qua sử dụng.',
    'Đã bao gồm phí quản lý (3.5 triệu/tháng).',
    'Chủ nhà dễ tính, hỗ trợ đăng ký tạm trú cho người nước ngoài.',
  ],
  description: `Cho thuê căn hộ 3 phòng ngủ tại Empire City, phân khu Linden Residences.
  
- Diện tích: 127m2, thiết kế 3PN + 2WC, phòng khách rộng rãi có ban công lớn.
- Tầm nhìn: View trực diện sông Sài Gòn và trung tâm Quận 1, ngắm pháo hoa tại gia.
- Nội thất: Đầy đủ nội thất cao cấp (Sofa da thật, Giường nệm King size, Bếp Bosch, Tủ lạnh Side-by-side...). Chỉ cần xách vali vào ở.
- Tiện ích đặc quyền: Hồ bơi olympic 50m, Gym chuẩn quốc tế, rạp chiếu phim ngoài trời, khu BBQ.
- Vị trí: Kết nối Quận 1 chỉ 5 phút qua hầm Thủ Thiêm.

Giá thuê: 45 Triệu/tháng (Đã bao gồm phí quản lý).
Cọc 2 tháng, thanh toán hàng tháng. Ưu tiên hợp đồng dài hạn (1 năm trở lên).`,
  amenities: {
    internal: ['Hồ bơi 50m', 'Gym & Yoga', 'Rạp chiếu phim', 'Khu BBQ', 'Sân chơi trẻ em', 'Lounge'],
    external: ['Công viên bờ sông', 'Siêu thị Emart', 'Trường quốc tế', 'Quảng trường trung tâm'],
  },
  nearby: [
    { name: 'Hầm Thủ Thiêm', distance: '500m', time: '2 phút', icon: Car },
    { name: 'Phố đi bộ Nguyễn Huệ', distance: '2.5km', time: '7 phút', icon: MapPin },
    { name: 'Trường Quốc tế Úc', distance: '3.0km', time: '10 phút', icon: GraduationCap },
  ],
  images: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2880&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2880&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2880&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2880&auto=format&fit=crop',
  ],
  agent: {
    id: 'sarah-nguyen',
    name: 'Sarah Nguyễn',
    role: 'Chuyên viên cho thuê',
    agency: 'Empire City Leasing',
    phone: '0901 234 567',
    avatar: 'https://i.pravatar.cc/150?u=5',
    verified: true,
    rating: 5.0,
  },
};
