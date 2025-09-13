import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Edit3,
  Trash2,
  MoreVertical,
  Mail,
  Phone,
  UserPlus,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Home,
  Award,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  FileText,
  GraduationCap,
  Star,
  Grid,
  List,
  Send,
  MessageSquare,
  Activity,
  Link
} from 'lucide-react';

const AllStudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('list'); // list or grid
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const navigate = useNavigate();
  // Demo student data
  const allStudents = [
    {
      id: 1,
      name: 'Elvin Hüseynov',
      email: 'elvin@example.com',
      phone: '+994 50 123 45 67',
      class: '11-A',
      studentId: 'STU2024001',
      status: 'active',
      joinDate: '2023-09-01',
      totalTests: 45,
      completedTests: 42,
      avgScore: 78,
      lastActive: '2 saat əvvəl',
      performance: 'improving',
      profileImage: null
    },
    {
      id: 2,
      name: 'Leyla Əliyeva',
      email: 'leyla@example.com',
      phone: '+994 51 234 56 78',
      class: '10-B',
      studentId: 'STU2024002',
      status: 'active',
      joinDate: '2023-09-01',
      totalTests: 38,
      completedTests: 38,
      avgScore: 92,
      lastActive: '5 dəq əvvəl',
      performance: 'excellent',
      profileImage: null
    },
    {
      id: 3,
      name: 'Murad Məmmədov',
      email: 'murad@example.com',
      phone: '+994 55 345 67 89',
      class: '11-A',
      studentId: 'STU2024003',
      status: 'inactive',
      joinDate: '2023-09-15',
      totalTests: 45,
      completedTests: 30,
      avgScore: 65,
      lastActive: '3 gün əvvəl',
      performance: 'declining',
      profileImage: null
    },
    {
      id: 4,
      name: 'Aysel Quliyeva',
      email: 'aysel@example.com',
      phone: '+994 70 456 78 90',
      class: '10-A',
      studentId: 'STU2024004',
      status: 'active',
      joinDate: '2023-10-01',
      totalTests: 35,
      completedTests: 35,
      avgScore: 88,
      lastActive: '1 saat əvvəl',
      performance: 'stable',
      profileImage: null
    },
    {
      id: 5,
      name: 'Rəşad İbrahimov',
      email: 'rashad@example.com',
      phone: '+994 77 567 89 01',
      class: '11-B',
      studentId: 'STU2024005',
      status: 'active',
      joinDate: '2023-09-01',
      totalTests: 40,
      completedTests: 38,
      avgScore: 73,
      lastActive: '30 dəq əvvəl',
      performance: 'improving',
      profileImage: null
    },
    {
      id: 6,
      name: 'Günel Həsənova',
      email: 'gunel@example.com',
      phone: '+994 55 678 90 12',
      class: '10-B',
      studentId: 'STU2024006',
      status: 'suspended',
      joinDate: '2023-09-10',
      totalTests: 38,
      completedTests: 25,
      avgScore: 55,
      lastActive: '1 həftə əvvəl',
      performance: 'declining',
      profileImage: null
    }
  ];

  // Statistics
  const stats = {
    total: allStudents.length,
    active: allStudents.filter(s => s.status === 'active').length,
    inactive: allStudents.filter(s => s.status === 'inactive').length,
    suspended: allStudents.filter(s => s.status === 'suspended').length,
    avgScore: Math.round(allStudents.reduce((acc, s) => acc + s.avgScore, 0) / allStudents.length),
    totalTests: allStudents.reduce((acc, s) => acc + s.completedTests, 0)
  };

  // Get unique classes for filter
  const uniqueClasses = [...new Set(allStudents.map(s => s.class))].sort();


  // Filter students
  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClass = filterClass === 'all' || student.class === filterClass;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'score':
        return b.avgScore - a.avgScore;
      case 'class':
        return a.class.localeCompare(b.class);
      case 'activity':
        return new Date(b.lastActive) - new Date(a.lastActive);
      default:
        return 0;
    }
  });

  // Pagination
  const studentsPerPage = 10;
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);
  const paginatedStudents = sortedStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(paginatedStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleGoBack = () => {
    console.log('Navigate to /dashboard');
    navigate('/dashboard');
    // window.location.href = '/dashboard';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'active': { icon: UserCheck, color: 'text-green-600 bg-green-100', text: 'Aktiv' },
      'inactive': { icon: Clock, color: 'text-yellow-600 bg-yellow-100', text: 'Qeyri-aktiv' },
      'suspended': { icon: UserX, color: 'text-red-600 bg-red-100', text: 'Dayandırılıb' }
    };
    
    const badge = badges[status];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {badge.text}
      </span>
    );
  };

  const getPerformanceBadge = (performance) => {
    const badges = {
      'excellent': { icon: Star, color: 'text-green-700 bg-green-50 border-green-200', text: 'Əla' },
      'improving': { icon: TrendingUp, color: 'text-blue-700 bg-blue-50 border-blue-200', text: 'Yaxşılaşır' },
      'stable': { icon: Activity, color: 'text-gray-700 bg-gray-50 border-gray-200', text: 'Stabil' },
      'declining': { icon: TrendingDown, color: 'text-red-700 bg-red-50 border-red-200', text: 'Zəifləyir' }
    };
    
    const badge = badges[performance];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${badge.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {badge.text}
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      {/* Page Header with Back Button */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bütün Tələbələr</h1>
            <p className="text-gray-600 dark:text-gray-400">Tələbələrinizi idarə edin və performanslarını izləyin</p>
          </div>
          
          {/* Back Button - Top Right */}
          <div className="flex-shrink-0">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 hover:shadow-lg transition-all transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ümumi</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Aktiv</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Qeyri-aktiv</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactive}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dayandırılıb</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.suspended}</p>
            </div>
            <UserX className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Orta Bal</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgScore}%</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Test Sayı</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTests}</p>
            </div>
            <FileText className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Section */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ad, email, ID və ya sinif axtar..."
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>

            {/* Filters */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                {(filterClass !== 'all' || filterStatus !== 'all') && (
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs">
                    {[filterClass !== 'all', filterStatus !== 'all'].filter(Boolean).length}
                  </span>
                )}
              </button>

              {showFilterDropdown && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 p-4 z-10">
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Sinif</label>
                    <select
                      value={filterClass}
                      onChange={(e) => setFilterClass(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                    >
                      <option value="all">Bütün siniflər</option>
                      {uniqueClasses.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                    >
                      <option value="all">Hamısı</option>
                      <option value="active">Aktiv</option>
                      <option value="inactive">Qeyri-aktiv</option>
                      <option value="suspended">Dayandırılıb</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      setFilterClass('all');
                      setFilterStatus('all');
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Filterləri sıfırla
                  </button>
                </div>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
            >
              <option value="name">Ada görə</option>
              <option value="score">Bala görə</option>
              <option value="class">Sinifə görə</option>
              <option value="activity">Aktivliyə görə</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-l-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-r-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3">
            {selectedStudents.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedStudents.length} seçilib
                </span>
                <button className="p-2 text-gray-600 hover:text-blue-600" title="Email göndər">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600" title="Export">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600" title="Sil">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all">
              <UserPlus className="w-4 h-4" />
              <span className="text-sm font-medium">Yeni Tələbə</span>
            </button>
          </div>
        </div>
      </div>

      {/* Students Table/Grid */}
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-x-auto">
          <table className="w-full min-w-[768px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedStudents.length === paginatedStudents.length && paginatedStudents.length > 0}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Tələbə</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap hidden sm:table-cell">Sinif</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap hidden lg:table-cell">Əlaqə</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap hidden md:table-cell">Testlər</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Orta Bal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap hidden xl:table-cell">Performans</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap hidden sm:table-cell">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold mr-3 flex-shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{student.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">ID: {student.studentId}</div>
                        {/* Mobile-da sinif və status göstər */}
                        <div className="sm:hidden mt-1 flex items-center gap-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                            {student.class}
                          </span>
                          {getStatusBadge(student.status)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-800 dark:text-gray-200">
                      {student.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="text-sm text-gray-900 dark:text-white truncate max-w-[200px]">{student.email}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{student.phone}</div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {student.completedTests}/{student.totalTests}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${(student.completedTests / student.totalTests) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-lg font-bold ${getScoreColor(student.avgScore)}`}>
                      {student.avgScore}%
                    </div>
                    {/* Mobile-da test sayını göstər */}
                    <div className="md:hidden text-xs text-gray-500 mt-1">
                      {student.completedTests}/{student.totalTests} test
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    {getPerformanceBadge(student.performance)}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                      <button className="p-1 text-gray-600 hover:text-blue-600" title="Bax">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-green-600 hidden sm:inline-block" title="Mesaj">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-purple-600 hidden md:inline-block" title="Hesabat">
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowActionMenu(showActionMenu === student.id ? null : student.id)}
                          className="p-1 text-gray-600 hover:text-gray-900"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {showActionMenu === student.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 py-1 z-10">
                            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Edit3 className="w-4 h-4 mr-3" />
                              Redaktə et
                            </button>
                            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Mail className="w-4 h-4 mr-3" />
                              Email göndər
                            </button>
                            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 sm:hidden">
                              <MessageSquare className="w-4 h-4 mr-3" />
                              Mesaj göndər
                            </button>
                            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden">
                              <BarChart3 className="w-4 h-4 mr-3" />
                              Hesabat
                            </button>
                            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <UserX className="w-4 h-4 mr-3" />
                              Dayandır
                            </button>
                            <hr className="my-1 border-gray-200 dark:border-gray-700" />
                            <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                              <Trash2 className="w-4 h-4 mr-3" />
                              Sil
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedStudents.map((student) => (
            <div key={student.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold mr-3">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{student.class} • {student.studentId}</p>
                  </div>
                </div>
                {getStatusBadge(student.status)}
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Orta Bal</span>
                  <span className={`text-lg font-bold ${getScoreColor(student.avgScore)}`}>{student.avgScore}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Testlər</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{student.completedTests}/{student.totalTests}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Performans</span>
                  {getPerformanceBadge(student.performance)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Son aktivlik</span>
                  <span className="text-xs text-gray-500">{student.lastActive}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50">
                  <Eye className="w-4 h-4 mr-2" />
                  Bax
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Mesaj
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Göstərilir {(currentPage - 1) * studentsPerPage + 1} - {Math.min(currentPage * studentsPerPage, sortedStudents.length)} / {sortedStudents.length} tələbə
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNumber = i + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === pageNumber
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllStudentsPage;