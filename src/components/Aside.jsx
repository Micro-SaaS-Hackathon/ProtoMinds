// components/Sidebar.jsx
import React, { useState } from 'react';
import { 
  Camera,
  Home,
  Upload,
  FileText,
  Users,
  Settings,
  Bell,
  LogOut,
  User,
  ChevronDown,
  ChevronRight,
  BarChart3,
  ClipboardCheck,
  FileDown,
  ScanLine,
  CreditCard,
  Link2,
  UserCog,
  HelpCircle,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({
  user,
  sidebarOpen = true,
  setSidebarOpen,
  mobileMenuOpen = false,
  activeMenu = 'dashboard',
  setActiveMenu,
  onNavigate,
  onLogout,
  customMenuItems = [],
  showUserInfo = true,
  showBottomSection = true,
  compactMode = false
}) => {
  const [expandedMenu, setExpandedMenu] = useState('');

  // Default menu items - can be overridden by customMenuItems prop
  const defaultMenuItems = [
    { 
      id: 'dashboard', 
      icon: Home, 
      label: 'Ana Panel', 
      path: '/dashboard',
      submenu: null 
    },
    { 
      id: 'tests', 
      icon: FileText, 
      label: 'Testlər',
      badge: '5',
      submenu: [
        { 
          id: 'upload-test', 
          icon: Upload, 
          label: 'Test Yüklə', 
          path: '/dashboard/tests/upload',
          badge: null 
        },
        { 
          id: 'review-grade', 
          icon: ClipboardCheck, 
          label: 'Yoxla & Qiymətləndir', 
          path: '/dashboard/tests/review',
          badge: '3' 
        }
      ]
    },
    { 
      id: 'students', 
      icon: Users, 
      label: 'Tələbələr', 
      path: '/dashboard/students',
      badge: '124',
      submenu: null 
    },
    { 
      id: 'analytics', 
      icon: BarChart3, 
      label: 'Analitika', 
      path: '/dashboard/analytics',
      submenu: null 
    },
    { 
      id: 'reports', 
      icon: FileDown, 
      label: 'Hesabatlar / Export', 
      path: '/dashboard/reports',
      submenu: null 
    },
    { 
      id: 'ocr-calibrate', 
      icon: ScanLine, 
      label: 'OCR Kalibrasiya', 
      path: '/dashboard/ocr-calibrate',
      badge: 'BETA',
      submenu: null 
    },
    { 
      id: 'notifications', 
      icon: Bell, 
      label: 'Bildirişlər', 
      path: '/dashboard/notifications',
      badge: '7',
      submenu: null 
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Tənzimləmələr',
      submenu: [
        { 
          id: 'account', 
          icon: User, 
          label: 'Hesab', 
          path: '/dashboard/settings/account' 
        },
        { 
          id: 'billing', 
          icon: CreditCard, 
          label: 'Ödəniş', 
          path: '/dashboard/settings/billing',
          badge: 'PRO' 
        },
        { 
          id: 'integrations', 
          icon: Link2, 
          label: 'İnteqrasiyalar', 
          path: '/dashboard/settings/integrations' 
        },
        { 
          id: 'roles', 
          icon: UserCog, 
          label: 'Rollar', 
          path: '/dashboard/settings/roles' 
        }
      ]
    }
  ];

  const menuItems = customMenuItems.length > 0 ? customMenuItems : defaultMenuItems;

  const handleMenuClick = (item) => {
    if (item.submenu) {
      setExpandedMenu(expandedMenu === item.id ? '' : item.id);
    } else {
      setActiveMenu(item.id);
      if (onNavigate) {
        onNavigate(item.path);
      }
    }
  };

  const handleSubmenuClick = (parentId, subItem) => {
    setActiveMenu(`${parentId}-${subItem.id}`);
    if (onNavigate) {
      onNavigate(subItem.path);
    }
  };

  const handleHelpClick = () => {
    if (onNavigate) {
      onNavigate('/help');
    }
  };

  const getBadgeClasses = (badge, isActive) => {
    if (badge === 'BETA') {
      return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300';
    }
    if (badge === 'PRO') {
      return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
    }
    if (isActive) {
      return 'bg-white/20 text-white';
    }
    return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300';
  };

  const sidebarWidth = compactMode ? 'w-16' : (sidebarOpen ? 'w-72' : 'w-20');

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 transition-all duration-300 ${sidebarWidth} ${
      mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="h-full bg-white dark:bg-gray-800 shadow-xl flex flex-col">
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <Camera className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && !compactMode && (
              <span className="font-bold text-white text-lg">Yoxla.az</span>
            )}
          </div>
          {!compactMode && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-lg hover:bg-white/20 hidden lg:block"
            >
              <ChevronRight className={`w-5 h-5 text-white transition-transform ${
                sidebarOpen ? 'rotate-180' : ''
              }`} />
            </button>
          )}
        </div>

        {/* User Info */}
        {showUserInfo && sidebarOpen && !compactMode && user && (
          <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 border-b dark:border-gray-700">
            <div className="flex items-center space-x-3">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full shadow-lg"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg">
                  {user.name?.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{user.company}</p>
                {user.plan === 'premium' && (
                  <div className="flex items-center mt-1">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">Premium Plan</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id || activeMenu.startsWith(`${item.id}-`);
            const isExpanded = expandedMenu === item.id;

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                    isActive && !item.submenu
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${
                      isActive && !item.submenu ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                    }`} />
                    {sidebarOpen && !compactMode && (
                      <Link to={item.path}><span className="text-sm font-medium">{item.path}</span></Link>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && sidebarOpen && !compactMode && (
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        getBadgeClasses(item.badge, isActive && !item.submenu)
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.submenu && sidebarOpen && !compactMode && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                </button>

                {/* Submenu */}
                {item.submenu && isExpanded && sidebarOpen && !compactMode && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-1">
                    {item.submenu.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeMenu === `${item.id}-${subItem.id}`;

                      return (
                        <button
                          key={subItem.id}
                          onClick={() => handleSubmenuClick(item.id, subItem)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                            isSubActive
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <SubIcon className="w-4 h-4" />
                            <Link to={subItem.path}>
                              <span className="text-sm">{subItem.label}</span>
                            </Link>
                          </div>
                          {subItem.badge && (
                            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                              getBadgeClasses(subItem.badge, false)
                            }`}>
                              {subItem.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        {showBottomSection && (
          <div className="px-3 py-4 border-t dark:border-gray-700 space-y-1">
            <button 
              onClick={handleHelpClick}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <HelpCircle className="w-5 h-5" />
              {sidebarOpen && !compactMode && <span className="text-sm font-medium">Kömək Mərkəzi</span>}
            </button>
            <button 
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all"
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && !compactMode && <span className="text-sm font-medium">Çıxış</span>}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;