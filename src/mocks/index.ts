interface User {
  name: string;
  phone: string;
  role: string; // 'buyer' | 'seller' - Removed 'agent'
  avatar: string;
  email?: string;
  joinDate: string;
}
export const mockUser: User = {
  name: 'Người dùng Aetheria',
  phone: '+84 123 456 789',
  role: 'Chủ nhà',
  avatar: `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 100)}`,
  email: 'user@example.com',
  joinDate: `Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`,
};
