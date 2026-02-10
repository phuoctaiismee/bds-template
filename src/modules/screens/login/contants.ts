import { Globe2, Home, Star, Tag, Zap } from "lucide-react";

export const FEATURES = [
  {
    title: "Tiếp cận nguồn hàng độc quyền",
    desc: "Hơn 500+ Bất động sản hạng sang không công khai trên thị trường.",
    icon: Star,
    color: "bg-yellow-400"
  },
  {
    title: "Định giá AI chuẩn xác",
    desc: "Công nghệ Aetheria Valuator™ giúp bạn ra quyết định đầu tư thông minh.",
    icon: Zap,
    color: "bg-blue-400"
  },
  {
    title: "Cộng đồng tinh hoa",
    desc: "Kết nối với mạng lưới chủ nhà, nhà đầu tư và chuyên gia hàng đầu.",
    icon: Globe2,
    color: "bg-green-400"
  }
];

export const ROLES = [
  { 
    id: 'buyer', 
    icon: Home, 
    title: 'Người Mua / Thuê', 
    desc: 'Tìm tổ ấm & cơ hội đầu tư',
    color: 'from-blue-500 to-cyan-400'
  },
  { 
    id: 'seller', 
    icon: Tag, 
    title: 'Chủ Nhà / Bán', 
    desc: 'Đăng tin & quản lý tài sản',
    color: 'from-emerald-500 to-teal-400'
  }
  // Removed Agent Role
];

export type AuthStep = 'entry' | 'phone' | 'otp' | 'role' | 'success';
