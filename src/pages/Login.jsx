import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Camera,
  CheckCircle,
  ArrowRight,
  Sparkles,
  BarChart3,
  Users
} from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'E-poçt ünvanı tələb olunur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Düzgün e-poçt ünvanı daxil edin';
    }
    
    if (!formData.password) {
      newErrors.password = 'Şifrə tələb olunur';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifrə ən azı 6 simvol olmalıdır';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', formData);
      setLoading(false);
      // Backend will determine user role and redirect accordingly
      // window.location.href = '/dashboard';
    }, 2000);
  };

  const stats = [
    { icon: Users, value: '2,500+', label: 'İstifadəçi' },
    { icon: CheckCircle, value: '50,000+', label: 'Yoxlanılmış Test' },
    { icon: BarChart3, value: '99.9%', label: 'Dəqiqlik' }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sol tərəf - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo və Başlıq */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <Camera className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Xoş Gəldiniz!</h2>
            <p className="mt-2 text-gray-600">TestScanner AI sistemə daxil olun</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">E-poçt</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                  placeholder="email@nümunə.az"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Şifrə</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Məni xatırla</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                Şifrəni unutdum?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Daxil olunur...
                </div>
              ) : (
                <div className="flex items-center">
                  Daxil Ol
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500">və ya</span>
              </div>
            </div>

            <p className="text-center text-sm text-gray-600">
              Hesabınız yoxdur?{' '}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Qeydiyyatdan keçin
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Sağ tərəf - Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-12 items-center justify-center relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-white max-w-lg">
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Test Yoxlamalarını <span className="text-yellow-300">Saniyələr</span> İçində Tamamlayın
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              AI texnologiyası ilə kağız testləri avtomatik yoxlayın, detallı hesabatlar alın və tələbələrinizin inkişafını asanlıqla izləyin.
            </p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Camera className="w-6 h-6 text-yellow-300 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Şəkil Yüklə & Tanı</h3>
                <p className="text-sm text-blue-100">Test vərəqinin şəklini çəkin, AI avtomatik tanısın</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Sparkles className="w-6 h-6 text-yellow-300 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Anlıq Qiymətləndirmə</h3>
                <p className="text-sm text-blue-100">Nəticələr saniyələr içində hazır olur</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <BarChart3 className="w-6 h-6 text-yellow-300 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Detallı Analitika</h3>
                <p className="text-sm text-blue-100">Hansı mövzuda zəiflik var, dərhal görün</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <Icon className="w-6 h-6 text-yellow-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-blue-200">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;