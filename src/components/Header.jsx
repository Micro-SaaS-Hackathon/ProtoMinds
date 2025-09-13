import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  Upload,
  ScanLine,
  User,
  CreditCard,
  Shield,
  Building2,
  LogOut,
} from "lucide-react";

const Header = ({
  user,
  darkMode,
  setDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  onNewTest,
  onOCRScan,
  onLogout,
  searchPlaceholder = "Test, tələbə və ya sinif axtar...",
  showQuickActions = true,
  notifications = [],
  customActions = [],
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleUserMenuClick = (action) => {
    setUserMenuOpen(false);
    if (action) action();
  };

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-10 pr-4 py-2 text-white bg-gray-100 dark:bg-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          {showQuickActions && (
            <>
              <button
                onClick={onNewTest}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">
                  <Link to="/dashboard/upload">Yeni Test</Link>
                </span>
              </button>

              <button
                onClick={onOCRScan}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:shadow-lg transition-all"
              >
                <ScanLine className="w-4 h-4" />
                <span className="text-sm font-medium">OCR Scan</span>
              </button>
            </>
          )}

          {/* Custom Actions */}
          {customActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={
                action.className ||
                "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              }
            >
              {action.icon}
            </button>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
              <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>

            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 py-2">
                <div className="px-4 py-3 border-b dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                  {user?.company && (
                    <div className="flex items-center mt-2">
                      <Building2 className="w-3 h-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {user.company}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleUserMenuClick(onProfile)}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Profil
                  </span>
                </button>

                <button
                  onClick={() => handleUserMenuClick(onSubscription)}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Abunəlik
                  </span>
                </button>

                <button
                  onClick={() => handleUserMenuClick(onSecurity)}
                  className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                >
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Təhlükəsizlik
                  </span>
                </button>

                <div className="border-t dark:border-gray-700 mt-2 pt-2">
                  <button
                    onClick={() => handleUserMenuClick(onLogout)}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Çıxış</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
