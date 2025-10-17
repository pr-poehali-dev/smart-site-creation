import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

interface GlassSidebarProps {
  menuItems: MenuItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

const GlassSidebar = ({
  menuItems,
  activeItem,
  onItemClick,
  userName = 'Alex Morgan',
  userRole = 'Designer',
  userAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
}: GlassSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'h-full p-6 transition-all duration-300 ease-in-out',
        'bg-white/10 backdrop-blur-[20px] border-r border-white/8',
        'flex flex-col relative',
        isCollapsed ? 'w-20' : 'w-[280px]'
      )}
    >
      <div className="text-center mb-10">
        <Icon name="Laptop" size={36} className="text-white opacity-90 mx-auto" />
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id} className="relative">
              <button
                onClick={() => onItemClick(item.id)}
                className={cn(
                  'w-full flex items-center px-4 py-3 rounded-2xl',
                  'text-white font-medium text-sm tracking-wide',
                  'transition-all duration-200',
                  'hover:bg-white/20',
                  activeItem === item.id && 'bg-white/25'
                )}
              >
                {activeItem === item.id && (
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r" />
                )}
                <Icon name={item.icon} size={20} className="min-w-[22px] text-center" />
                {!isCollapsed && <span className="ml-3.5">{item.label}</span>}
                {!isCollapsed && item.badge && (
                  <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={cn(
          'mt-auto p-4 bg-white/12 rounded-2xl border border-white/8',
          'flex items-center',
          isCollapsed && 'justify-center'
        )}
      >
        <div className="w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
          <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
        {!isCollapsed && (
          <div className="ml-3 overflow-hidden">
            <h3 className="text-white text-sm font-medium truncate">{userName}</h3>
            <p className="text-white/80 text-xs truncate">{userRole}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
      >
        <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={14} />
      </button>
    </aside>
  );
};

export default GlassSidebar;
