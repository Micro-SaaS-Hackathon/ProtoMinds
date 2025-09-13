import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check,
  X,
  Camera,
  Gift,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle,
  Star,
  Crown,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    if (selectedPlan === 'free') {
      // 1 aylıq pulsuz sınaq
      console.log('Starting 1 month free trial...');
      navigate('/dashboard?trial=true');
      // window.location.href = '/dashboard?trial=true';
    } else {
      // Ödənişli planlar
      setLoading(true);
      setTimeout(() => {
        console.log('Subscribe to:', selectedPlan);
        setLoading(false);
        // window.location.href = '/payment';
      }, 2000);
    }
  };

  const plans = [
    {
      id: 'free',
      name: '1 Aylıq Pulsuz',
      price: '0',
      period: '1 ay',
      description: 'Sistemi sınayın',
      color: 'gray',
      features: [
        { text: '50 test yoxlama', included: true },
        { text: 'Əsas analitika', included: true },
        { text: 'PDF hesabat', included: true },
        { text: '1 istifadəçi', included: true },
        { text: 'E-poçt dəstəyi', included: true },
        { text: 'Excel hesabat', included: false },
        { text: 'API inteqrasiya', included: false },
        { text: 'Prioritet dəstək', included: false }
      ]
    },
    {
      id: 'halfyearly',
      name: '6 Aylıq Plan',
      price: '29.90',
      period: '6 ay',
      description: 'Kiçik komandalar üçün',
      color: 'blue',
      badge: null,
      features: [
        { text: 'Aylıq 500 test yoxlama', included: true },
        { text: 'Geniş analitika', included: true },
        { text: 'PDF hesabat', included: true },
        { text: '5 istifadəçi', included: true },
        { text: 'E-poçt dəstəyi', included: true },
        { text: 'Excel hesabat', included: false },
        { text: 'API inteqrasiya', included: false },
        { text: 'Prioritet dəstək', included: false }
      ]
    },
    {
      id: 'yearly',
      name: 'İllik Plan',
      price: '49.90',
      period: '12 ay + 1 ay pulsuz',
      description: 'Professional komandalar',
      color: 'gradient',
      badge: 'ƏN POPULYAR',
      bonus: true,
      features: [
        { text: 'Limitsiz test yoxlama', included: true },
        { text: 'Geniş analitika', included: true },
        { text: 'PDF və Excel hesabat', included: true },
        { text: 'Limitsiz istifadəçi', included: true },
        { text: '24/7 prioritet dəstək', included: true },
        { text: 'Excel hesabat', included: true },
        { text: 'API inteqrasiya', included: true },
        { text: 'Xüsusi təlim', included: true }
      ]
    }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Abunəlik Planları</h1>
                <p className="text-sm text-gray-500">Sizə uyğun planı seçin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Text */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sadə və Şəffaf Qiymətləndirmə
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TestScanner AI ilə test yoxlama prosesini avtomatlaşdırın. 
            İstər pulsuz sınayın, istər ödənişli planlardan birini seçin.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative rounded-2xl cursor-pointer transition-all transform hover:scale-105 ${
                selectedPlan === plan.id
                  ? 'shadow-2xl ring-4 ring-blue-500 ring-opacity-50'
                  : 'shadow-lg hover:shadow-xl'
              } ${
                plan.color === 'gradient' 
                  ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500' 
                  : 'bg-white'
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div className={`p-8 text-center border-b ${
                plan.color === 'gradient' ? 'border-white/20' : 'border-gray-100'
              }`}>
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.color === 'gradient' ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${
                  plan.color === 'gradient' ? 'text-indigo-100' : 'text-gray-500'
                }`}>
                  {plan.description}
                </p>
                
                {/* Price */}
                <div className="mb-4">
                  <span className={`text-5xl font-bold ${
                    plan.color === 'gradient' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.price === '0' ? 'Pulsuz' : `₼${plan.price}`}
                  </span>
                  <span className={`block text-sm mt-2 ${
                    plan.color === 'gradient' ? 'text-indigo-100' : 'text-gray-500'
                  }`}>
                    {plan.period}
                  </span>
                </div>

                {/* Bonus Badge for Yearly */}
                {plan.bonus && (
                  <div className="inline-flex items-center bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                    <Gift className="w-4 h-4 mr-2" />
                    1 AY PULSUZ BONUS
                  </div>
                )}

                {/* Free Trial Badge */}
                {plan.id === 'free' && (
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    <Clock className="w-4 h-4 mr-2" />
                    Kredit kartı tələb olunmur
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="p-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
                          plan.color === 'gradient' ? 'text-yellow-300' : 'text-green-500'
                        }`} />
                      ) : (
                        <X className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
                          plan.color === 'gradient' ? 'text-indigo-300' : 'text-gray-300'
                        }`} />
                      )}
                      <span className={`text-sm ${
                        plan.color === 'gradient' 
                          ? feature.included ? 'text-white' : 'text-indigo-200 line-through'
                          : feature.included ? 'text-gray-700' : 'text-gray-400 line-through'
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selection Indicator */}
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                plan.color === 'gradient'
                  ? 'border-white bg-white/20'
                  : 'border-gray-300'
              }`}>
                {selectedPlan === plan.id && (
                  <div className={`w-3 h-3 rounded-full ${
                    plan.color === 'gradient' ? 'bg-white' : 'bg-blue-500'
                  }`}></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Plan Summary & Action */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Seçilmiş Plan</h3>
            
            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{currentPlan?.name}</p>
                  <p className="text-sm text-gray-500">{currentPlan?.period}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {currentPlan?.price === '0' ? 'Pulsuz' : `₼${currentPlan?.price}`}
                  </p>
                  {currentPlan?.bonus && (
                    <p className="text-xs text-green-600 font-medium">+1 ay bonus</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${
                selectedPlan === 'free'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  İşlənir...
                </div>
              ) : (
                <div className="flex items-center">
                  {selectedPlan === 'free' ? (
                    <>
                      <Clock className="w-5 h-5 mr-2" />
                      Pulsuz Sınağı Başlat
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Ödənişə Keç
                    </>
                  )}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center space-x-4 mt-6 pt-6 border-t">
              <div className="flex items-center text-xs text-gray-500">
                <Shield className="w-4 h-4 mr-1 text-green-500" />
                SSL Təhlükəsiz
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Zap className="w-4 h-4 mr-1 text-blue-500" />
                Ani aktivasiya
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Lock className="w-4 h-4 mr-1 text-purple-500" />
                İstənilən vaxt ləğv
              </div>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Sualınız var? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Bizimlə əlaqə saxlayın</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;