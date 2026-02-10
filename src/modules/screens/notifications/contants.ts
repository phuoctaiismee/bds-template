export type NotificationType = 'price_drop' | 'appointment' | 'system' | 'promotion' | 'new_listing';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  desc: string;
  time: string;
  isRead: boolean;
  image?: string;
  link?: string;
  actionLabel?: string;
}

// --- Mock Data ---
export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Nhắc lịch xem nhà: The Global City',
    desc: 'Bạn có lịch hẹn tham quan nhà mẫu vào lúc 09:00 sáng mai với chuyên viên Trần Hoàng Nam.',
    time: '1 giờ trước',
    isRead: false,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=200&auto=format&fit=crop',
    actionLabel: 'Chi tiết lịch hẹn',
    link: '/profile?tab=schedule',
  },
  {
    id: '2',
    type: 'price_drop',
    title: 'Căn hộ bạn quan tâm vừa giảm giá!',
    desc: 'Căn hộ 2PN tại Masteri Thảo Điền vừa cập nhật giá mới: 5.2 Tỷ (Giảm 100 triệu).',
    time: '3 giờ trước',
    isRead: false,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=200&auto=format&fit=crop',
    actionLabel: 'Xem ngay',
    link: '/property/1',
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Ưu đãi độc quyền tháng 11',
    desc: 'Tặng gói nội thất trị giá 200 triệu khi đặt cọc thành công dự án Sycamore Bình Dương.',
    time: '1 ngày trước',
    isRead: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=200&auto=format&fit=crop',
    link: '/project/sycamore',
  },
  {
    id: '4',
    type: 'system',
    title: 'Tài khoản đã được xác thực',
    desc: 'Chúc mừng! Hồ sơ của bạn đã được xác minh. Bạn có thể sử dụng đầy đủ tính năng trên Aetheria.',
    time: '2 ngày trước',
    isRead: true,
  },
  {
    id: '5',
    type: 'new_listing',
    title: 'Dự án mới tại khu vực quan tâm',
    desc: 'Eaton Park vừa ra mắt bảng hàng mới. Có 5 căn hộ phù hợp với tiêu chí tìm kiếm của bạn.',
    time: '3 ngày trước',
    isRead: true,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=200&auto=format&fit=crop',
    link: '/projects',
  },
];
