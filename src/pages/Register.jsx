import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Camera,
  ArrowRight,
  User,
  Phone,
  Building2,
  CheckCircle,
  Award,
  TrendingUp,
  Shield,
} from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = "Ad və soyad tələb olunur";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Ad və soyad ən azı 3 simvol olmalıdır";
    }

    if (!formData.companyName) {
      newErrors.companyName = "Şirkət/Müəssisə adı tələb olunur";
    }

    if (!formData.email) {
      newErrors.email = "E-poçt ünvanı tələb olunur";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Düzgün e-poçt ünvanı daxil edin";
    }

    if (!formData.phone) {
      newErrors.phone = "Telefon nömrəsi tələb olunur";
    } else if (!/^[0-9+()-\s]+$/.test(formData.phone)) {
      newErrors.phone = "Düzgün telefon nömrəsi daxil edin";
    }

    if (!formData.password) {
      newErrors.password = "Şifrə tələb olunur";
    } else if (formData.password.length < 8) {
      newErrors.password = "Şifrə ən azı 8 simvol olmalıdır";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Şifrəni təkrar daxil edin";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifrələr uyğun gəlmir";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "İstifadə şərtlərini qəbul etməlisiniz";
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
      console.log("Register attempt:", formData);
      setLoading(false);
      navigate('/subscription');
      // Redirect to subscription page after successful registration
      // window.location.href = '/subscription';
    }, 2000);
  };

  const benefits = [
    { icon: CheckCircle, text: "14 gün pulsuz sınaq" },
    { icon: Award, text: "Limitsiz test yoxlama" },
    { icon: TrendingUp, text: "Detallı analitika" },
    { icon: Shield, text: "24/7 texniki dəstək" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sol tərəf - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo və Başlıq */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <Camera className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Qeydiyyat</h2>
            <p className="mt-2 text-gray-600">TestScanner AI ilə başlayın</p>
          </div>

          {/* Register Form */}
          <div className="space-y-4">
            {/* Ad Soyad */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Ad və Soyad
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.fullName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Adınız və soyadınız"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Şirkət/Müəssisə Adı */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Şirkət/Müəssisə Adı
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.companyName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Məktəb, kurs və ya şirkət adı"
                />
              </div>
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                E-poçt
              </label>
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
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
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

            {/* Telefon */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Telefon Nömrəsi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.phone
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="+994 50 123 45 67"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Şifrə */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Şifrə
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Ən azı 8 simvol"
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

            {/* Şifrə Təkrar */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Şifrəni Təkrarla
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.confirmPassword
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Şifrəni təkrar daxil edin"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start cursor-pointer">
                <input
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <span className="ml-2 text-sm text-gray-700">
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    İstifadə şərtləri
                  </a>{" "}
                  və{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    məxfilik siyasəti
                  </a>
                  ni qəbul edirəm
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  {errors.agreeToTerms}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Qeydiyyat edilir...
                </div>
              ) : (
                <div className="flex items-center">
                  Qeydiyyatdan Keç və Davam Et
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              )}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Artıq hesabınız var?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Daxil olun
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
              Qeydiyyatdan Keçin və{" "}
              <span className="text-yellow-300">30 Gün Pulsuz</span> Sınayın
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed mb-8">
              Heç bir ödəniş məlumatı tələb olunmur. İstənilən vaxt abunəliyi
              ləğv edə bilərsiniz.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <Icon className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                  <span className="font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          {/* Trust Badge */}
        </div>
      </div>
    </div>
  );
};

export default Register;
