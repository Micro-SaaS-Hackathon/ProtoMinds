import React, { useState } from 'react';
import { Users, FileText, MessageCircle, Settings, LogOut } from 'lucide-react';

const DEMO_STUDENT = {
  name: 'Tunar Novruzzade',
  profilePic: 'https://i.pravatar.cc/40',
};

const TESTS = [
  { id: 1, title: 'Riyaziyyat Testi', status: 'completed', mistakes: 2 },
  { id: 2, title: 'Fizika Testi', status: 'pending', mistakes: 0 },
  { id: 3, title: 'Kimya Testi', status: 'completed', mistakes: 1 },
  { id: 4, title: 'Tarix Testi', status: 'pending', mistakes: 0 },
];

export default function StudentDashboard() {
  const [filter, setFilter] = useState('all');
  const [expandedTest, setExpandedTest] = useState(null);

  const filteredTests = TESTS.filter(test => filter === 'all' || test.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-gray-800 text-white p-4 rounded-lg shadow">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          {/* Messages */}
          <button className="cursor-pointer p-2 hover:bg-gray-700 rounded-full"><MessageCircle /></button>
          {/* Settings */}
          <button className="cursor-pointer p-2 hover:bg-gray-700 rounded-full"><Settings /></button>
          {/* Profile */}
          <div className="flex items-center space-x-2">
            <img src={DEMO_STUDENT.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
            <span className="font-medium">{DEMO_STUDENT.name}</span>
          </div>
          {/* Logout */}
          <button className="cursor-pointer p-2 hover:bg-gray-700 rounded-full"><LogOut /></button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setFilter('completed')} className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">İşlənmiş Testlər</button>
        <button onClick={() => setFilter('pending')} className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer">Gələcək Testlər</button>
        <button onClick={() => setFilter('all')} className="px-4 py-2 bg-gray-500 text-white rounded cursor-pointer">Hamısı</button>
      </div>

      {/* Test List */}
      <div className="space-y-2">
        {filteredTests.map(test => (
          <div key={test.id} className={`${test.status === 'completed' ? 'bg-green-100' : test.status === 'pending' ? 'bg-yellow-100' : 'bg-white'} p-4 rounded-lg shadow`}> 
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedTest(expandedTest === test.id ? null : test.id)}>
              <h3 className="font-bold">{test.title}</h3>
              <span>{expandedTest === test.id ? '-' : '+'}</span>
            </div>
            {expandedTest === test.id && (
              <div className="mt-2">
                <p>Səhvlər: {test.mistakes}</p>
                <p>AI tərəfindən təklif olunan mənbələr:</p>
                <ul className="list-disc ml-5">
                  <li>Mənbə 1: {test.title}</li>
                  <li>Mənbə 2: {test.title}</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}