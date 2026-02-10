import { Building2, Calendar, Megaphone, ShieldCheck, Tag } from "lucide-react";
import { NotificationType } from "../contants";

const NotificationIcon = ({ type, isRead }: { type: NotificationType, isRead: boolean }) => {
  const styles = {
    price_drop: 'bg-green-100 text-green-600',
    appointment: 'bg-blue-100 text-brand-blue',
    promotion: 'bg-purple-100 text-purple-600',
    system: 'bg-gray-100 text-gray-600',
    new_listing: 'bg-orange-100 text-orange-600'
  };

  const icons = {
    price_drop: Tag,
    appointment: Calendar,
    promotion: Megaphone,
    system: ShieldCheck,
    new_listing: Building2
  };

  const Icon = icons[type];

  return (
    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 ${styles[type]} relative`}>
      <Icon className="w-5 h-5 md:w-6 md:h-6" />
      {!isRead && (
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
      )}
    </div>
  );
};

export default NotificationIcon;