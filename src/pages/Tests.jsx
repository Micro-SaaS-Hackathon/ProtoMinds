import React, { useState } from 'react';
import { 
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Edit3,
  Trash2,
  Copy,
  MoreVertical,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Upload,
  BarChart3,
  TrendingUp,
  Award,
  BookOpen,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Share2,
  Printer,
  Archive,
  ArrowLeft,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AllTestsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterClass, setFilterClass] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('list'); // list or grid
  const [selectedTests, setSelectedTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Demo test data
  const allTests = [
    {
      id: 1,
      name: 'Riyaziyyat - Final İmtahanı',
      class: '11-A',
      subject: 'Riyaziyyat',
      date: '2024-01-15',
      time: '10:30',
      duration: '90 dəq',
      totalStudents: 32,
      submitted: 32,
      graded: 30,
      avgScore: 78,
      status: 'graded',
      teacher: 'Aysel Məmmədova',
      difficulty: 'Orta',
      questions: 40
    },
    {
      id: 2,
      name: 'Fizika - Bölmə Testi',
      class: '10-B',
      subject: 'Fizika',
      date: '2024-01-14',
      time: '14:00',
      duration: '60 dəq',
      totalStudents: 28,
      submitted: 28,
      graded: 28,
      avgScore: 82,
      status: 'completed',
      teacher: 'Aysel Məmmədova',
      difficulty: 'Asan',
      questions: 30
    },
    {
      id: 3,
      name: 'İngilis Dili - Grammar Test',
      class: '11-A',
      subject: 'İngilis Dili',
      date: '2024-01-13',
      time: '09:00',
      duration: '45 dəq',
      totalStudents: 32,
      submitted: 30,
      graded: 0,
      avgScore: null,
      status: 'pending',
      teacher: 'Aysel Məmmədova',
      difficulty: 'Çətin',
      questions: 25
    },
    {
      id: 4,
      name: 'Kimya - Praktiki Test',
      class: '10-A',
      subject: 'Kimya',
      date: '2024-01-12',
      time: '11:00',
      duration: '75 dəq',
      totalStudents: 30,
      submitted: 29,
      graded: 29,
      avgScore: 71,
      status: 'graded',
      teacher: 'Aysel Məmmədova',
      difficulty: 'Orta',
      questions: 35
    },
    {
      id: 5,
      name: 'Tarix - Dünya Tarixi',
      class: '11-B',
      subject: 'Tarix',
      date: '2024-01-11',
      time: '13:30',
      duration: '60 dəq',
      totalStudents: 29,
      submitted: 27,
      graded: 2,
      avgScore: null,
      status: 'in-progress',
      teacher: 'Aysel Məmmədova',
      difficulty: 'Orta',
      questions: 30
    }
  ];

  // Statistics
  const stats = {
    total: allTests.length,
    completed: allTests.filter(t => t.status === 'completed' || t.status === 'graded').length,
    pending: allTests.filter(t => t.status === 'pending').length,
    inProgress: allTests.filter(t => t.status === 'in-progress').length,
    avgScore: Math.round(allTests.filter(t => t.avgScore).reduce((acc, t) => acc + t.avgScore, 0) / allTests.filter(t => t.avgScore).length)
  };

  // Filter tests
  const filteredTests = allTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus;
    const matchesClass = filterClass === 'all' || test.class === filterClass;
    
    return matchesSearch && matchesStatus && matchesClass;
  });

  // Sort tests
  const sortedTests = [...filteredTests].sort((a, b) => {
    let compareValue = 0;
    
    switch(sortBy) {
      case 'date':
        compareValue = new Date(a.date) - new Date(b.date);
        break;
      case 'name':
        compareValue = a.name.localeCompare(b.name);
        break;
      case 'score':
        compareValue = (a.avgScore || 0) - (b.avgScore || 0);
        break;
      case 'students':
        compareValue = a.totalStudents - b.totalStudents;
        break;
      default:
        compareValue = 0;
    }
    
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  // Pagination
  const testsPerPage = 10;
  const totalPages = Math.ceil(sortedTests.length / testsPerPage);
  const paginatedTests = sortedTests.slice(
    (currentPage - 1) * testsPerPage,
    currentPage * testsPerPage
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTests(paginatedTests.map(t => t.id));
    } else {
      setSelectedTests([]);
    }
  };

  const handleSelectTest = (testId) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const getStatusBadge = (status) => {
    const badges = {
      'completed': { icon: CheckCircle, color: 'text-green-600 bg-green-100', text: 'Tamamlandı' },
      'graded': { icon: Award, color: 'text-blue-600 bg-blue-100', text: 'Qiymətləndirildi' },
      'pending': { icon: Clock, color: 'text-yellow-600 bg-yellow-100', text: 'Gözləyir' },
      'in-progress': { icon: AlertCircle, color: 'text-orange-600 bg-orange-100', text: 'Davam edir' }
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

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      'Asan': 'text-green-700 bg-green-50 border-green-200',
      'Orta': 'text-yellow-700 bg-yellow-50 border-yellow-200',
      'Çətin': 'text-red-700 bg-red-50 border-red-200'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${colors[difficulty]}`}>
        {difficulty}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bütün Testlər</h1>
        <p className="text-gray-600 dark:text-gray-400">
            <Link to="/dashboard" className="hover:underline">Ana Səhifə</Link> <span className="mx-2">/</span> Bütün Testlər
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ümumi Test</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tamamlanmış</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gözləyən</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Davam edən</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Orta Bal</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgScore}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
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
                placeholder="Test, sinif və ya fənn axtar..."
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
                {(filterStatus !== 'all' || filterClass !== 'all') && (
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs">
                    {[filterStatus !== 'all', filterClass !== 'all'].filter(Boolean).length}
                  </span>
                )}
              </button>

              {showFilterDropdown && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 p-4 z-10">
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                    >
                      <option value="all">Hamısı</option>
                      <option value="completed">Tamamlanmış</option>
                      <option value="graded">Qiymətləndirilmiş</option>
                      <option value="pending">Gözləyən</option>
                      <option value="in-progress">Davam edən</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Sinif</label>
                    <select
                      value={filterClass}
                      onChange={(e) => setFilterClass(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                    >
                      <option value="all">Bütün siniflər</option>
                      <option value="10-A">10-A</option>
                      <option value="10-B">10-B</option>
                      <option value="11-A">11-A</option>
                      <option value="11-B">11-B</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      setFilterStatus('all');
                      setFilterClass('all');
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
              <option value="date">Tarixə görə</option>
              <option value="name">Ada görə</option>
              <option value="score">Bala görə</option>
              <option value="students">Tələbə sayına görə</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>

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
            {selectedTests.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedTests.length} seçilib
                </span>
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Yeni Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tests Table/Grid */}
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedTests.length === paginatedTests.length && paginatedTests.length > 0}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Test Adı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Sinif</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tarix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tələbələr</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Orta Bal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Çətinlik</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedTests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedTests.includes(test.id)}
                      onChange={() => handleSelectTest(test.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{test.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{test.subject} • {test.questions} sual</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-800 dark:text-gray-200">
                      {test.class}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{test.date}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{test.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {test.submitted}/{test.totalStudents}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {test.avgScore ? (
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{test.avgScore}%</div>
                        <div className="ml-2 w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              test.avgScore >= 80 ? 'bg-green-500' :
                              test.avgScore >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${test.avgScore}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(test.status)}
                  </td>
                  <td className="px-6 py-4">
                    {getDifficultyBadge(test.difficulty)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 text-gray-600 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-green-600">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-purple-600">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowActionMenu(showActionMenu === test.id ? null : test.id)}
                          className="p-1 text-gray-600 hover:text-gray-900"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {showActionMenu === test.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 py-1 z-10">
                            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Copy className="w-4 h-4 mr-3" />
                              Kopyala
                            </button>
                            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Printer className="w-4 h-4 mr-3" />
                              Çap et
                            </button>
                            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Archive className="w-4 h-4 mr-3" />
                              Arxivlə
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
          {paginatedTests.map((test) => (
            <div key={test.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{test.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{test.subject} • {test.class}</p>
                </div>
                {getStatusBadge(test.status)}
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tarix</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{test.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tələbələr</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{test.submitted}/{test.totalStudents}</span>
                </div>
                {test.avgScore && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Orta Bal</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{test.avgScore}%</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Çətinlik</span>
                  {getDifficultyBadge(test.difficulty)}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50">
                  <Eye className="w-4 h-4 mr-2" />
                  Bax
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Redaktə
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
            Göstərilir {(currentPage - 1) * testsPerPage + 1} - {Math.min(currentPage * testsPerPage, sortedTests.length)} / {sortedTests.length} test
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
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
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

export default AllTestsPage;