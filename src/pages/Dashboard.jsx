import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  Menu,
  X,
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
  Search,
  Sun,
  Moon,
  HelpCircle,
  BarChart3,
  ClipboardCheck,
  FileDown,
  ScanLine,
  CreditCard,
  Shield,
  Star,
  Plus,
  Link2,
  UserCog,
  Building2,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Eye,
  AlertTriangle,
  Info,
  Activity,
} from "lucide-react";

import Header from "../components/Header";

// Son Fəaliyyətlər Komponenti
const RecentActivitiesComponent = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "success":
        return CheckCircle;
      case "warning":
        return AlertTriangle;
      case "error":
        return AlertCircle;
      case "info":
        return Info;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400";
      case "error":
        return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
      case "info":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Son Fəaliyyətlər
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center">
          Hamısını Gör
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-3">
        {activities.length > 0 ? (
          activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const colorClass = getActivityColor(activity.type);

            return (
              <div
                key={activity.id}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer group"
              >
                <div
                  className={`p-2 rounded-lg ${colorClass
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}`}
                >
                  <Icon
                    className={`w-4 h-4 ${colorClass
                      .split(" ")
                      .slice(2)
                      .join(" ")}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.text}
                  </p>
                  {activity.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                  {activity.actionable && (
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Heç bir fəaliyyət yoxdur
            </p>
          </div>
        )}
      </div>

      {activities.length > 5 && (
        <button className="w-full mt-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Daha çox göstər ({activities.length - 5} daha)
        </button>
      )}
    </div>
  );
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [expandedMenu, setExpandedMenu] = useState("tests");

  // Demo user data
  const user = {
    name: "Aysel Məmmədova",
    email: "aysel@example.com",
    role: "teacher",
    avatar: null,
    plan: "premium",
    company: "Bakı Modern Təhsil Mərkəzi",
  };

  // Menu items with submenus
  const menuItems = [
    {
      id: "dashboard",
      icon: Home,
      label: "Ana Panel",
      path: "/dashboard",
      submenu: null,
    },
    {
      id: "tests",
      icon: FileText,
      label: "Testlər",
      badge: "5",
      submenu: [
        {
          id: "upload-test",
          icon: Upload,
          label: "Test Yüklə",
          path: "/dashboard/tests/upload",
          badge: null,
        },
        {
          id: "review-grade",
          icon: ClipboardCheck,
          label: "Yoxla & Qiymətləndir",
          path: "/dashboard/tests/review",
          badge: "3",
        },
      ],
    },
    {
      id: "students",
      icon: Users,
      label: "Tələbələr",
      path: "/dashboard/students",
      badge: "124",
      submenu: null,
    },
    {
      id: "analytics",
      icon: BarChart3,
      label: "Analitika",
      path: "/dashboard/analytics",
      submenu: null,
    },
    {
      id: "reports",
      icon: FileDown,
      label: "Hesabatlar / Export",
      path: "/dashboard/reports",
      submenu: null,
    },
    {
      id: "ocr-calibrate",
      icon: ScanLine,
      label: "OCR Kalibrasiya",
      path: "/dashboard/ocr-calibrate",
      badge: "BETA",
      submenu: null,
    },
    {
      id: "notifications",
      icon: Bell,
      label: "Bildirişlər",
      path: "/dashboard/notifications",
      badge: "7",
      submenu: null,
    },
    {
      id: "settings",
      icon: Settings,
      label: "Tənzimləmələr",
      submenu: [
        {
          id: "account",
          icon: User,
          label: "Hesab",
          path: "/dashboard/settings/account",
        },
        {
          id: "billing",
          icon: CreditCard,
          label: "Ödəniş",
          path: "/dashboard/settings/billing",
          badge: "PRO",
        },
        {
          id: "integrations",
          icon: Link2,
          label: "İnteqrasiyalar",
          path: "/dashboard/settings/integrations",
        },
        {
          id: "roles",
          icon: UserCog,
          label: "Rollar",
          path: "/dashboard/settings/roles",
        },
      ],
    },
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      type: "success",
      text: "11-A sinfi riyaziyyat testi tamamlandı",
      description: "32 tələbə iştirak etdi",
      time: "5 dəq əvvəl",
      actionable: true,
    },
    {
      id: 2,
      type: "warning",
      text: "3 test yoxlanma gözləyir",
      description: "Son müddət: Bugün 18:00",
      time: "1 saat əvvəl",
      actionable: true,
    },
    {
      id: 3,
      type: "info",
      text: "OCR kalibrasiya tamamlandı",
      description: "Dəqiqlik: 98.5%",
      time: "2 saat əvvəl",
      actionable: false,
    },
    {
      id: 4,
      type: "success",
      text: "Yeni tələbə qeydiyyatı",
      description: "Elvin Hüseynov - 10-B sinfi",
      time: "3 saat əvvəl",
      actionable: true,
    },
    {
      id: 5,
      type: "error",
      text: "Export xətası",
      description: "Excel fayl yaradıla bilmədi",
      time: "4 saat əvvəl",
      actionable: true,
    },
  ];

  // Dashboard stats data
  const dashboardStats = [
    {
      id: "total-tests",
      title: "Ümumi Test",
      value: 248,
      change: "+12% bu ay",
      changeType: "positive",
      icon: FileText,
      color: "blue",
      link: "/dashboard/tests",
      buttonText: "Bütün Testlər",
    },
    {
      id: "total-students",
      title: "Tələbə Sayı",
      value: 124,
      change: "+5 yeni",
      changeType: "positive",
      icon: Users,
      color: "green",
      link: "/dashboard/students",
      buttonText: "Bütün Tələbələr",
    },
    {
      id: "pending-review",
      title: "Gözləyən",
      value: 3,
      change: "Yoxlanma gözləyir",
      changeType: "warning",
      icon: ClipboardCheck,
      color: "yellow",
      link: "/dashboard/tests/review",
      buttonText: "Bütün Gözləyənlər",
    },
    {
      id: "ocr-accuracy",
      title: "OCR Dəqiqlik",
      value: "98.5%",
      change: "Son kalibrasiya",
      changeType: "info",
      icon: ScanLine,
      color: "purple",
      link: "/dashboard/ocr-calibrate",
      buttonText: "OCR Parametrləri",
    },
  ];

  const handleMenuClick = (item) => {
    if (item.submenu) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
    } else {
      setActiveMenu(item.id);
      console.log("Navigate to:", item.path);
    }
  };

  const handleSubmenuClick = (parentId, subItem) => {
    setActiveMenu(`${parentId}-${subItem.id}`);
    console.log("Navigate to:", subItem.path);
  };

  const handleStatCardClick = (stat) => {
    console.log("Navigate to:", stat.link);
    // Actual navigation logic here
  };

  const getStatColorClasses = (color) => {
    const colors = {
      blue: "border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      green:
        "border-green-500 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      yellow:
        "border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
      purple:
        "border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-20"
        } ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full bg-white dark:bg-gray-800 shadow-xl flex flex-col">
          {/* Logo Section */}
          <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <Camera className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <span className="font-bold text-white text-lg">
                  Yoxla.az
                </span>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-lg hover:bg-white/20 hidden lg:block"
            >
              <ChevronRight
                className={`w-5 h-5 text-white transition-transform ${
                  sidebarOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* User Info */}
          {sidebarOpen && (
            <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 border-b dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.company}
                  </p>
                  <div className="flex items-center mt-1">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                      Premium Plan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeMenu === item.id || activeMenu.startsWith(`${item.id}-`);
              const isExpanded = expandedMenu === item.id;

              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                      isActive && !item.submenu
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        className={`w-5 h-5 ${
                          isActive && !item.submenu
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      />
                      {sidebarOpen && (
                        <span className="text-sm font-medium">
                          <Link to={item.path}>
                           {item.label}
                          </Link>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && sidebarOpen && (
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            item.badge === "BETA"
                              ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                              : item.badge === "PRO"
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                              : isActive && !item.submenu
                              ? "bg-white/20 text-white"
                              : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.submenu && sidebarOpen && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </button>

                  {/* Submenu */}
                  {item.submenu && isExpanded && sidebarOpen && (
                    <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-1">
                      {item.submenu.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive =
                          activeMenu === `${item.id}-${subItem.id}`;

                        return (
                          <button
                            key={subItem.id}
                            onClick={() => handleSubmenuClick(item.id, subItem)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                              isSubActive
                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <SubIcon className="w-4 h-4" />
                              <span className="text-sm">{subItem.label}</span>
                            </div>
                            {subItem.badge && (
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                                  subItem.badge === "PRO"
                                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                                    : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                }`}
                              >
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
          <div className="px-3 py-4 border-t dark:border-gray-700 space-y-1">
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
              <HelpCircle className="w-5 h-5" />
              {sidebarOpen && (
                <span className="text-sm font-medium">Kömək Mərkəzi</span>
              )}
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all">
              <LogOut className="w-5 h-5" />
              {sidebarOpen && (
                <span className="text-sm font-medium">Çıxış</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "lg:ml-72" : "lg:ml-20"
        }`}
      >
        {/* Top Navigation Bar */}
        <Header
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onNewTest={() => console.log("New test")}
          onOCRScan={() => console.log("OCR scan")}
          onLogout={() => console.log("Logout")}
          onProfile={() => console.log("Profile")}
          onSubscription={() => console.log("Subscription")}
          onSecurity={() => console.log("Security")}
          onSearch={(value) => console.log("Search:", value)}
          searchPlaceholder="Axtar..."
          showQuickActions={true}
          notifications={[1, 2, 3]} // or empty array
          customActions={[
            {
            //   icon: <SomeIcon className="w-5 h-5" />,
              onClick: () => console.log("Custom action"),
              className: "p-2 rounded-lg hover:bg-gray-100",
            },
          ]}
        />
        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-4 h-4" />
            <span>Ana Panel</span>
          </div>

          {/* Dashboard Stats with Clickable Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat) => {
              const Icon = stat.icon;
              const colorClasses = getStatColorClasses(stat.color);

              return (
                <div
                  key={stat.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 ${
                    colorClasses.split(" ")[0]
                  } group hover:shadow-xl transition-all cursor-pointer`}
                  onClick={() => handleStatCardClick(stat)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <Link to={stat.link}>{stat.title}</Link>
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {stat.value}
                      </p>
                      <p
                        className={`text-xs mt-2 flex items-center ${
                          stat.changeType === "positive"
                            ? "text-green-600"
                            : stat.changeType === "warning"
                            ? "text-yellow-600"
                            : stat.changeType === "info"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {stat.changeType === "positive" && (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        )}
                        {stat.changeType === "warning" && (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {stat.changeType === "info" && (
                          <Info className="w-3 h-3 mr-1" />
                        )}
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-xl ${colorClasses
                        .split(" ")
                        .slice(1, 3)
                        .join(" ")}`}
                    >
                      <Icon
                        className={`w-6 h-6 ${colorClasses
                          .split(" ")
                          .slice(3)
                          .join(" ")}`}
                      />
                    </div>
                  </div>

                  {/* View All Button */}
                  <button
                    className="w-full mt-3 pt-3 border-t dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between group-hover:text-blue-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatCardClick(stat);
                    }}
                  >
                    <Link to={stat.link}>{stat.buttonText}</Link>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Recent Activities Component */}
          <RecentActivitiesComponent activities={recentActivities} />
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
