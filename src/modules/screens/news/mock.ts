import { ArticleData } from './type';

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: 'market' | 'legal' | 'lifestyle' | 'project';
  location?: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  isFeatured?: boolean;
  relatedProject?: {
    id: string;
    name: string;
  };
}

// --- Mock Data ---
export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Dự báo thị trường BĐS TP.HCM Quý 4/2024: Dòng tiền thông minh chảy về đâu?',
    summary:
      'Phân tích chi tiết các chỉ số vĩ mô và sự dịch chuyển của dòng vốn đầu tư. Tại sao khu Đông vẫn là "vùng trũng" thu hút dòng tiền dù mặt bằng giá đã thiết lập mức mới?',
    category: 'market',
    location: 'TP. Thủ Đức',
    author: 'Lê Hoàng Châu',
    date: '15/10/2023',
    readTime: '8 phút đọc',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Luật Đất đai (sửa đổi) 2024: 5 thay đổi cốt lõi ảnh hưởng trực tiếp đến người mua nhà',
    summary: 'Giải mã những tác động của khung pháp lý mới đối với quyền sở hữu, cấp sổ hồng và định giá đất.',
    category: 'legal',
    author: 'Ban Pháp chế Aetheria',
    date: '12/10/2023',
    readTime: '12 phút đọc',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2912&auto=format&fit=crop',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Review thực tế: The Global City sau 1 năm mở bán',
    summary: 'Đánh giá tiến độ thi công, chất lượng bàn giao và tiềm năng khai thác thương mại của khu Soho.',
    category: 'project',
    location: 'An Phú',
    author: 'Team Review',
    date: '10/10/2023',
    readTime: '6 phút đọc',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940&auto=format&fit=crop',
    relatedProject: { id: 'global-city', name: 'The Global City' },
  },
  {
    id: '4',
    title: 'Xu hướng Second Home 2024: Khi "sức khỏe" là thước đo giá trị mới',
    summary: 'Sự lên ngôi của BĐS Wellness tại các thủ phủ du lịch như Hồ Tràm, Phan Thiết.',
    category: 'lifestyle',
    location: 'Hồ Tràm',
    author: 'Nguyễn Thanh',
    date: '08/10/2023',
    readTime: '5 phút đọc',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2874&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Giá chung cư Hà Nội tiếp tục lập đỉnh: Bong bóng hay giá trị thực?',
    summary: 'So sánh tương quan giá và thu nhập, nguồn cung khan hiếm đẩy giá sơ cấp lên cao kỷ lục.',
    category: 'market',
    location: 'Hà Nội',
    author: 'Phạm Minh',
    date: '05/10/2023',
    readTime: '7 phút đọc',
    image:
      'https://images.unsplash.com/photo-1576375801517-45814f908aa4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '6',
    title: 'Kinh nghiệm xương máu khi vay ngân hàng mua nhà thời điểm lãi suất thả nổi',
    summary: 'Bài toán tài chính an toàn và cách đàm phán biên độ lãi suất sau ưu đãi.',
    category: 'legal',
    author: 'Chuyên gia Tài chính',
    date: '01/10/2023',
    readTime: '10 phút đọc',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2911&auto=format&fit=crop',
  },
];

export const ARTICLE: ArticleData = {
  id: '1',
  title: 'Dự báo thị trường BĐS TP.HCM Quý 4/2024: Dòng tiền thông minh chảy về đâu?',
  subtitle:
    'Phân tích chi tiết các chỉ số vĩ mô và sự dịch chuyển của dòng vốn đầu tư. Tại sao khu Đông vẫn là "vùng trũng" thu hút dòng tiền dù mặt bằng giá đã thiết lập mức mới?',
  category: 'Phân tích thị trường',
  location: 'TP. Thủ Đức',
  author: {
    name: 'Lê Hoàng Châu',
    role: 'Biên tập viên Cao cấp',
    avatar: 'https://i.pravatar.cc/150?u=editors',
  },
  publishedAt: '15/10/2023',
  readTime: '8 phút đọc',
  heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop',
  // In a real app, this would be HTML or Markdown
  content: [
    {
      type: 'intro',
      text: 'Mặc dù trải qua giai đoạn trầm lắng kéo dài, thị trường bất động sản TP.HCM đang ghi nhận những tín hiệu hồi phục tích cực về cuối năm. Dữ liệu từ Aetheria cho thấy lượng tìm kiếm tại khu vực TP. Thủ Đức đã tăng 15% so với quý trước.',
    },
    {
      type: 'h2',
      text: '1. Sự trỗi dậy của hạ tầng khu Đông',
    },
    {
      type: 'paragraph',
      text: 'Không thể phủ nhận vai trò của hạ tầng giao thông trong việc định hình lại bản đồ giá bất động sản. Với việc tuyến Metro số 1 Bến Thành - Suối Tiên chuẩn bị vận hành thương mại và Vành đai 3 đang đẩy nhanh tiến độ, khu Đông (đặc biệt là Quận 9 cũ và Thủ Thiêm) đang trở thành điểm đến của dòng vốn dài hạn.',
    },
    {
      type: 'quote',
      text: 'Nhà đầu tư hiện nay không còn tâm lý lướt sóng. Họ chấp nhận mức giá cao hơn nhưng đòi hỏi pháp lý sạch và tiến độ hạ tầng rõ ràng.',
      author: 'TS. Nguyễn Văn Khôi - Chuyên gia kinh tế',
    },
    {
      type: 'h2',
      text: '2. Phân khúc căn hộ hạng sang: Nguồn cung khan hiếm',
    },
    {
      type: 'paragraph',
      text: 'Tại khu vực Thủ Thiêm, giá sơ cấp đã chạm ngưỡng 7.000 - 10.000 USD/m2. Tuy nhiên, tỷ lệ hấp thụ vẫn ở mức khả quan (trên 70% giỏ hàng mở bán). Điều này cho thấy tầng lớp thượng lưu Việt Nam vẫn có nhu cầu rất lớn đối với các sản phẩm bất động sản định danh (Branded Residences).',
    },
    {
      type: 'callout',
      title: 'Dữ liệu thị trường T10/2023',
      text: 'Giá trung bình căn hộ hạng sang tại TP. Thủ Đức: 120 Triệu/m². Tăng 5.2% so với cùng kỳ năm ngoái.',
    },
    {
      type: 'h2',
      text: '3. Lời khuyên cho nhà đầu tư cá nhân',
    },
    {
      type: 'paragraph',
      text: 'Trong bối cảnh lãi suất huy động giảm sâu, bất động sản vẫn là kênh trú ẩn an toàn. Tuy nhiên, đòn bẩy tài chính cần được kiểm soát chặt chẽ. Tỷ lệ vay an toàn khuyến nghị là dưới 40% giá trị tài sản.',
    },
  ],
  relatedListingsCount: 1240,
};
