import React from 'react';
import { Home, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="p-6 bg-white min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-lg w-full text-center bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        {/* Header */}
        <div className="flex justify-end mb-4">
          <Link to="/dashboard" className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm shadow-sm hover:shadow-md transition-all">
            <Home className="w-4 h-4 mr-2 text-gray-700 dark:text-gray-200" />
            Dashboard
          </Link>
        </div>

        {/* Error Icon */}
        <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Səhifə Tapılmadı</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Üzr istəyirik, axtardığınız səhifə mövcud deyil və ya silinmişdir.
        </p>

        {/* Action Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:scale-105 transition-transform"
        >
          <Home className="w-4 h-4 mr-2" />
          Dashboard-a qayıt
        </Link>
      </div>
    </div>
  );
}
