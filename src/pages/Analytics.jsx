import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Award,
  Clock,
  Calendar,
  Filter,
  Download,
  Home,
  BookOpen,
  Target,
  Activity,
  PieChart,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronRight,
  Eye,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap,
  GraduationCap
} from 'lucide-react';

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedClass, setSelectedClass] = useState('all');
  const [showDetailedView, setShowDetailedView] = useState(false);

  // Demo data
  const overallStats = {
    totalTests: 248,
    totalStudents: 124,
    avgScore: 76.5,
    passRate: 82,
    testGrowth: 12.5,
    scoreGrowth: 8.3,
    studentGrowth: 5,
    passRateGrowth: 3.2
  };

  // Class performance data
  const classPerformance = [
    {
      class: '10-A',
      students: 30,
      avgScore: 82,
      passRate: 90,
      totalTests: 45,
      completedTests: 42,
      trend: 'up',
      change: 5.2,
      topSubject: 'Riyaziyyat',
      weakSubject: 'Fizika',
      attendance: 95
    },
    {
      class: '10-B',
      students: 28,
      avgScore: 78,
      passRate: 85,
      totalTests: 45,
      completedTests: 40,
      trend: 'up',
      change: 3.1,
      topSubject: 'İngilis Dili',
      weakSubject: 'Kimya',
      attendance: 92
    },
    {
      class: '11-A',
      students: 32,
      avgScore: 75,
      passRate: 80,
      totalTests: 50,
      completedTests: 48,
      trend: 'stable',
      change: 0.5,
      topSubject: 'Tarix',
      weakSubject: 'Riyaziyyat',
      attendance: 88
    },
    {
      class: '11-B',
      students: 29,
      avgScore: 71,
      passRate: 75,
      totalTests: 50,
      completedTests: 45,
      trend: 'down',
      change: -2.3,
      topSubject: 'Ədəbiyyat',
      weakSubject: 'Fizika',
      attendance: 85
    },
    {
      class: '12-A',
      students: 26,
      avgScore: 88,
      passRate: 95,
      totalTests: 55,
      completedTests: 55,
      trend: 'up',
      change: 7.8,
      topSubject: 'Riyaziyyat',
      weakSubject: 'Coğrafiya',
      attendance: 98
    }
  ];

  // Subject performance data
  const subjectPerformance = [
    { subject: 'Riyaziyyat', avgScore: 78, tests: 45, passRate: 82 },
    { subject: 'Fizika', avgScore: 72, tests: 38, passRate: 75 },
    { subject: 'Kimya', avgScore: 75, tests: 35, passRate: 78 },
    { subject: 'İngilis Dili', avgScore: 85, tests: 42, passRate: 90 },
    { subject: 'Tarix', avgScore: 80, tests: 30, passRate: 85 },
    { subject: 'Ədəbiyyat', avgScore: 83, tests: 28, passRate: 88 },
    { subject: 'Coğrafiya', avgScore: 77, tests: 25, passRate: 80 },
    { subject: 'Biologiya', avgScore: 79, tests: 32, passRate: 83 }
  ];

  // Monthly trend data
  const monthlyTrend = [
    { month: 'Sentyabr', avgScore: 68, tests: 35, students: 110 },
    { month: 'Oktyabr', avgScore: 70, tests: 42, students: 115 },
    { month: 'Noyabr', avgScore: 72, tests: 48, students: 118 },
    { month: 'Dekabr', avgScore: 74, tests: 45, students: 120 },
    { month: 'Yanvar', avgScore: 76.5, tests: 52, students: 124 }
  ];

  // Top performing students
  const topStudents = [
    { name: 'Leyla Əliyeva', class: '10-B', avgScore: 96, tests: 15, rank: 1 },
    { name: 'Elvin Hüseynov', class: '11-A', avgScore: 94, tests: 18, rank: 2 },
    { name: 'Aysel Quliyeva', class: '10-A', avgScore: 92, tests: 16, rank: 3 },
    { name: 'Murad Məmmədov', class: '12-A', avgScore: 91, tests: 20, rank: 4 },
    { name: 'Günel Həsənova', class: '11-B', avgScore: 90, tests: 17, rank: 5 }
  ];

  const navigate = useNavigate();
  

  const handleGoBack = () => {
    console.log('Navigate to /dashboard');
    navigate("/dashboard");
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend, change) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  // Simple bar chart component
  const BarChart = ({ data, maxValue, height = 200 }) => {
    const barWidth = 100 / data.length;
    return (
      <div className="relative" style={{ height: `${height}px` }}>
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * 100;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end"
              >
                <span className="text-xs font-semibold mb-1">{item.value}%</span>
                <div
                  className={`w-full ${item.color} rounded-t-lg transition-all hover:opacity-80`}
                  style={{ height: `${barHeight}%` }}
                  title={`${item.label}: ${item.value}%`}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Simple pie chart component (using CSS)
  const PieChartSimple = ({ data }) => {
    let cumulativePercent = 0;
    
    const getCoordinatesForPercent = (percent) => {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    };

    return (
      <div className="relative">
        <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-48 h-48">
          {data.map((slice, index) => {
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += slice.percent / 100;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
            const largeArcFlag = slice.percent > 50 ? 1 : 0;

            const pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 0 0`,
            ].join(' ');

            return (
              <path
                key={index}
                d={pathData}
                fill={slice.color}
                className="hover:opacity-80 transition-opacity"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallStats.avgScore}%</p>
            <p className="text-xs text-gray-500">Orta Bal</p>
          </div>
        </div>
      </div>
    );
  };

  const pieData = [
    { label: 'Əla (90-100)', percent: 25, color: '#10b981' },
    { label: 'Yaxşı (70-89)', percent: 45, color: '#3b82f6' },
    { label: 'Orta (50-69)', percent: 20, color: '#f59e0b' },
    { label: 'Zəif (0-49)', percent: 10, color: '#ef4444' }
  ];

  const classBarData = classPerformance.map(c => ({
    label: c.class,
    value: c.avgScore,
    color: c.avgScore >= 80 ? 'bg-green-500' : c.avgScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
  }));

  return (
    <div className="p-6">
      {/* Page Header with Back Button */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analitika</h1>
            <p className="text-gray-600 dark:text-gray-400">Performans göstəriciləri və təhlillər</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Period Selector */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 text-w bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
            >
              <option value="week">Bu həftə</option>
              <option value="month">Bu ay</option>
              <option value="quarter">Bu rüb</option>
              <option value="year">Bu il</option>
            </select>
            
            {/* Export Button */}
            <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all">
              <Download className="w-4 h-4 " />
              <span className="text-sm font-medium text-white">Export</span>
            </button>
            
            {/* Back Button */}
            <button
              onClick={handleGoBack}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 hover:shadow-lg transition-all transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium text-white">Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overall Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center text-sm">
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">{overallStats.testGrowth}%</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallStats.totalTests}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ümumi Test</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex items-center text-sm">
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">{overallStats.studentGrowth}%</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallStats.totalStudents}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Aktiv Tələbə</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex items-center text-sm">
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">{overallStats.scoreGrowth}%</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallStats.avgScore}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Orta Bal</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
              <Target className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex items-center text-sm">
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">{overallStats.passRateGrowth}%</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallStats.passRate}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Keçid Faizi</p>
        </div>
      </div>

      {/* Class Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Sinif Performansları</h2>
            <button
              onClick={() => setShowDetailedView(!showDetailedView)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {showDetailedView ? 'Sadə Görünüş' : 'Detallı Görünüş'}
            </button>
          </div>
          
          <BarChart data={classBarData} maxValue={100} height={250} />
          
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Ən Yüksək</p>
              <p className="text-lg font-bold text-green-600">12-A (88%)</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Ortalama</p>
              <p className="text-lg font-bold text-blue-600">76.8%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Ən Aşağı</p>
              <p className="text-lg font-bold text-red-600">11-B (71%)</p>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Bal Paylanması</h2>
          
          <div className="flex justify-center mb-4">
            <PieChartSimple data={pieData} />
          </div>
          
          <div className="space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Class Performance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-x-auto mb-8">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Detallı Sinif Analizi</h2>
        </div>
        <table className="w-full min-w-[768px]">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Sinif</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tələbə</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Orta Bal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Keçid %</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Test Sayı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Davamiyyət</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Güclü Fənn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Zəif Fənn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {classPerformance.map((classData) => (
              <tr key={classData.class} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                      <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{classData.class}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900 dark:text-white">{classData.students}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className={`text-lg font-bold ${getScoreColor(classData.avgScore)}`}>
                      {classData.avgScore}%
                    </span>
                    <div className="ml-3 w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          classData.avgScore >= 80 ? 'bg-green-500' :
                          classData.avgScore >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${classData.avgScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    classData.passRate >= 85 ? 'bg-green-100 text-green-800' :
                    classData.passRate >= 75 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {classData.passRate}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {classData.completedTests}/{classData.totalTests}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900 dark:text-white">{classData.attendance}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/30 text-xs font-medium text-green-700 dark:text-green-300">
                    {classData.topSubject}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-red-50 dark:bg-red-900/30 text-xs font-medium text-red-700 dark:text-red-300">
                    {classData.weakSubject}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {getTrendIcon(classData.trend, classData.change)}
                    <span className={`ml-2 text-sm font-medium ${
                      classData.trend === 'up' ? 'text-green-600' :
                      classData.trend === 'down' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {classData.change > 0 ? '+' : ''}{classData.change}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subject Performance and Top Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Fənn Performansları</h2>
          <div className="space-y-3">
            {subjectPerformance.slice(0, 5).map((subject, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-32">
                    {subject.subject}
                  </span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          subject.avgScore >= 80 ? 'bg-green-500' :
                          subject.avgScore >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${subject.avgScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${getScoreColor(subject.avgScore)}`}>
                    {subject.avgScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
            Hamısını Gör
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Top Students */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Ən Yaxşı Tələbələr</h2>
          <div className="space-y-3">
            {topStudents.map((student) => (
              <div key={student.rank} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    student.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                    student.rank === 2 ? 'bg-gray-100 text-gray-600' :
                    student.rank === 3 ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {student.rank}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{student.class} • {student.tests} test</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{student.avgScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;