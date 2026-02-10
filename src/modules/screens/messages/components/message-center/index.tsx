import {
    Building2,
    CheckCheck,
    ChevronLeft,
    Image as ImageIcon,
    MoreVertical,
    Paperclip,
    Phone,
    Search,
    Send,
    Video,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// --- Types ---
interface User {
  name: string;
  avatar: string;
  role: string;
  online: boolean;
}

interface Context {
  image: string;
  title: string;
  price: string;
}

interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  time: string;
  unread: number;
  context: Context;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

// --- Mock Data ---
const CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    user: {
      name: 'Trần Hoàng Nam',
      avatar: 'https://i.pravatar.cc/150?u=1',
      role: 'Chuyên gia tư vấn',
      online: true,
    },
    lastMessage: 'Dạ, căn biệt thự này bên em vẫn còn ạ. Anh muốn xem nhà lúc nào?',
    time: '10:30',
    unread: 2,
    context: {
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=200&auto=format&fit=crop',
      title: 'Biệt thự đơn lập Thảo Điền, view sông trực diện',
      price: '168 Tỷ',
    },
  },
  {
    id: '2',
    user: {
      name: 'Sarah Nguyễn',
      avatar: 'https://i.pravatar.cc/150?u=5',
      role: 'Môi giới',
      online: false,
    },
    lastMessage: 'Em đã gửi hồ sơ pháp lý qua email cho anh rồi nhé.',
    time: 'Hôm qua',
    unread: 0,
    context: {
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=200&auto=format&fit=crop',
      title: 'Căn hộ Empire City 3PN',
      price: '45 Triệu/tháng',
    },
  },
  {
    id: '3',
    user: {
      name: 'Nguyễn Văn An',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      role: 'Giám đốc dự án',
      online: true,
    },
    lastMessage: 'Chào anh, The Global City đang có chính sách mới rất tốt.',
    time: '2 ngày trước',
    unread: 0,
    context: {
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=200&auto=format&fit=crop',
      title: 'The Global City',
      price: 'Từ 350 Tr/m²',
    },
  },
];

const MOCK_MESSAGES: Message[] = [
  { id: 1, text: 'Chào Nam, mình quan tâm căn biệt thự Thảo Điền.', sender: 'me', time: '10:00' },
  { id: 2, text: 'Căn này pháp lý thế nào em?', sender: 'me', time: '10:01' },
  {
    id: 3,
    text: 'Dạ chào anh Minh. Căn này sổ hồng riêng chính chủ, hoàn công đầy đủ ạ.',
    sender: 'other',
    time: '10:05',
  },
  { id: 4, text: 'Anh có thể xem sổ trước được không?', sender: 'me', time: '10:06' },
  { id: 5, text: 'Dạ được ạ, để em gửi qua Zalo hoặc mình gặp trực tiếp xem nhé.', sender: 'other', time: '10:07' },
  { id: 6, text: 'Dạ, căn biệt thự này bên em vẫn còn ạ. Anh muốn xem nhà lúc nào?', sender: 'other', time: '10:30' },
];

// --- Sub Components (Defined Outside) ---

const Sidebar = ({
  selectedChatId,
  onSelectChat,
}: {
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
}) => (
  <div
    className={`flex h-full flex-col border-r border-gray-200 bg-white ${
      selectedChatId ? 'hidden md:flex' : 'flex'
    } w-full md:w-80 lg:w-96`}
  >
    {/* Header */}
    <div className='border-b border-gray-100 p-4'>
      <h2 className='text-brand-primary mb-4 text-xl font-extrabold md:hidden'>Tin nhắn</h2>
      <div className='relative'>
        <Search className='absolute top-2.5 left-3 h-4 w-4 text-gray-400' />
        <input
          type='text'
          placeholder='Tìm kiếm cuộc trò chuyện...'
          className='focus:border-primary w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm transition-colors focus:outline-none'
        />
      </div>
    </div>

    {/* List */}
    <div className='flex-1 overflow-y-auto'>
      {CONVERSATIONS.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={`flex cursor-pointer gap-3 border-b border-gray-50 p-4 transition-colors hover:bg-gray-50 ${
            selectedChatId === chat.id ? 'bg-blue-50/60' : ''
          }`}
        >
          <div className='relative shrink-0'>
            <img
              src={chat.user.avatar}
              alt={chat.user.name}
              className='h-12 w-12 rounded-full border border-gray-200 object-cover'
            />
            {chat.user.online && (
              <div className='absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500'></div>
            )}
          </div>
          <div className='min-w-0 flex-1'>
            <div className='mb-1 flex items-start justify-between'>
              <h4 className={`truncate text-sm font-bold ${chat.unread > 0 ? 'text-brand-primary' : 'text-gray-700'}`}>
                {chat.user.name}
              </h4>
              <span className='text-[10px] whitespace-nowrap text-gray-400'>{chat.time}</span>
            </div>
            <p className={`truncate text-xs ${chat.unread > 0 ? 'text-brand-primary font-bold' : 'text-gray-500'}`}>
              {chat.lastMessage}
            </p>
            {/* Context Badge */}
            <div className='mt-1.5 flex w-fit items-center gap-1 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-400'>
              <Building2 className='h-3 w-3' />
              <span className='max-w-30 truncate'>{chat.context.title}</span>
            </div>
          </div>
          {chat.unread > 0 && (
            <div className='flex flex-col justify-center'>
              <div className='bg-primary flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white'>
                {chat.unread}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ChatWindow = ({
  selectedChatId,
  selectedConversation,
  messages,
  inputText,
  setInputText,
  onSendMessage,
  onBack,
  messagesEndRef,
}: {
  selectedChatId: string | null;
  selectedConversation: Conversation | undefined;
  messages: Message[];
  inputText: string;
  setInputText: (text: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onBack: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) => {
  if (!selectedConversation) {
    return (
      <div className='hidden flex-1 flex-col items-center justify-center bg-gray-50 p-8 text-center md:flex'>
        <div className='mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm'>
          <Send className='ml-1 h-10 w-10 text-gray-300' />
        </div>
        <h3 className='text-lg font-bold text-gray-600'>Chọn một cuộc trò chuyện</h3>
        <p className='mt-2 max-w-xs text-sm text-gray-400'>
          Kết nối trực tiếp với chuyên gia và chủ nhà để nhận thông tin nhanh nhất.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex h-full w-full flex-col bg-[#f8fafc] ${!selectedChatId ? 'hidden md:flex' : 'flex'}`}>
      {/* Chat Header */}
      <div className='z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm'>
        <div className='flex items-center gap-3'>
          <button onClick={onBack} className='-ml-2 p-2 text-gray-600 md:hidden'>
            <ChevronLeft className='h-6 w-6' />
          </button>
          <div className='relative'>
            <img src={selectedConversation.user.avatar} className='h-10 w-10 rounded-full object-cover' />
            {selectedConversation.user.online && (
              <div className='absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500'></div>
            )}
          </div>
          <div>
            <h3 className='text-brand-primary text-sm font-bold'>{selectedConversation.user.name}</h3>
            <p className='text-primary text-xs font-medium'>{selectedConversation.user.role}</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <button className='hover:text-primary rounded-full p-2 text-gray-400 transition-colors hover:bg-blue-50'>
            <Phone className='h-5 w-5' />
          </button>
          <button className='hover:text-primary rounded-full p-2 text-gray-400 transition-colors hover:bg-blue-50'>
            <Video className='h-5 w-5' />
          </button>
          <button className='hover:text-brand-primary rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100'>
            <MoreVertical className='h-5 w-5' />
          </button>
        </div>
      </div>

      {/* Property Context Bar */}
      <div className='flex items-center gap-3 border-b border-blue-100 bg-blue-50/50 p-3'>
        <img
          src={selectedConversation.context.image}
          className='h-12 w-12 rounded-lg border border-white object-cover shadow-sm'
        />
        <div className='min-w-0 flex-1'>
          <p className='mb-0.5 text-xs font-bold text-gray-500 uppercase'>Đang quan tâm</p>
          <h4 className='text-brand-primary truncate text-sm font-bold'>{selectedConversation.context.title}</h4>
          <p className='text-primary text-xs font-bold'>{selectedConversation.context.price}</p>
        </div>
        <button className='text-brand-primary rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold whitespace-nowrap hover:bg-gray-50'>
          Xem chi tiết
        </button>
      </div>

      {/* Messages Area */}
      <div className='flex-1 space-y-6 overflow-y-auto p-4 md:p-6'>
        <div className='text-center'>
          <span className='rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold text-gray-400'>Hôm nay</span>
        </div>

        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              {!isMe && (
                <img src={selectedConversation.user.avatar} className='mr-2 mb-1 h-8 w-8 self-end rounded-full' />
              )}
              <div className={`max-w-[75%] md:max-w-[60%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-primary rounded-br-none text-white'
                      : 'rounded-bl-none border border-gray-100 bg-white text-gray-700'
                  }`}
                >
                  {msg.text}
                </div>
                <div className='mt-1 flex items-center gap-1 px-1'>
                  <span className='text-[10px] text-gray-400'>{msg.time}</span>
                  {isMe && <CheckCheck className='text-primary h-3 w-3' />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='border-t border-gray-200 bg-white p-3 md:p-4'>
        <form
          onSubmit={onSendMessage}
          className='focus-within:border-primary focus-within:ring-brand-blue/20 flex items-end gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2 transition-all focus-within:ring-1'
        >
          <button
            type='button'
            className='hover:text-primary rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-200'
          >
            <Paperclip className='h-5 w-5' />
          </button>
          <button
            type='button'
            className='hover:text-primary hidden rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-200 md:block'
          >
            <ImageIcon className='h-5 w-5' />
          </button>
          <input
            type='text'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Nhập tin nhắn...'
            className='max-h-32 flex-1 overflow-y-auto border-none bg-transparent py-2.5 text-sm outline-none focus:ring-0 md:text-base'
          />
          <button
            type='submit'
            disabled={!inputText.trim()}
            className='bg-primary rounded-xl p-2.5 text-white shadow-md transition-all hover:bg-blue-700 disabled:opacity-50 disabled:shadow-none'
          >
            <Send className='h-5 w-5' />
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Main Component ---

export const MessageCenter: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = CONVERSATIONS.find((c) => c.id === selectedChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChatId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className='flex h-full overflow-hidden bg-white'>
      <Sidebar selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
      <ChatWindow
        selectedChatId={selectedChatId}
        selectedConversation={selectedConversation}
        messages={messages}
        inputText={inputText}
        setInputText={setInputText}
        onSendMessage={handleSendMessage}
        onBack={() => setSelectedChatId(null)}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
};
