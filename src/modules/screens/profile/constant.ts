// --- MOCK DATA ---

export const INVESTMENT_SUMMARY = {
  watchlistValue: '128.5 Tỷ',
  marketTrend: '+5.2%',
  potentialGain: '2.1 Tỷ',
  opportunities: 3
};

export const MY_ASSETS = [
  {
    id: 'a1',
    title: 'Biệt thự Riviera Cove Quận 9',
    status: 'selling', 
    price: '42 Tỷ',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2971&auto=format&fit=crop'
  },
  {
    id: 'a2',
    title: 'Căn hộ 2PN The Estella',
    status: 'rented',
    price: '28 Tr/tháng',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop'
  }
];

export const SCHEDULE = [
  {
    id: 1,
    title: 'Xem nhà The Global City',
    time: '09:00 - 10:30',
    date: 'Hôm nay',
    agent: 'Trần Hoàng Nam',
    location: 'Sales Gallery',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Ký hợp đồng cọc Metropole',
    time: '14:00',
    date: 'Ngày mai',
    agent: 'Sarah Nguyễn',
    location: 'Văn phòng Aetheria',
    status: 'confirmed'
  }
];

export const SAVED_LISTINGS = [
  {
    id: '1',
    title: 'Biệt thự đơn lập Thảo Điền',
    location: 'Thảo Điền, TP. Thủ Đức',
    price: '168 Tỷ',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2971&auto=format&fit=crop',
    status: 'active', 
    trend: 'neutral'
  },
  {
    id: '2',
    title: 'Penthouse The Metropole',
    location: 'Thủ Thiêm, TP. Thủ Đức',
    price: '65 Tỷ',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2953&auto=format&fit=crop',
    status: 'active',
    trend: 'down'
  }
];

export const MARKET_PULSE = [
  { area: 'Thảo Điền', price: '180 Tr/m²', change: '+2.4%', status: 'up' },
  { area: 'Thủ Thiêm', price: '250 Tr/m²', change: '+5.1%', status: 'up' },
  { area: 'Quận 9 (Cũ)', price: '65 Tr/m²', change: '-0.5%', status: 'down' },
];