import React, { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle, XCircle, Clock, Download, Users, FileText } from 'lucide-react';

// File upload + fake analysis page
export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const timerRef = useRef(null);

  const SUBJECTS = [
    'Riyaziyyat',
    'Fizika',
    'Kimya',
    'İngilis Dili',
    'Tarix',
    'Ədəbiyyat',
    'Coğrafiya',
    'Biologiya',
  ];

  const STUDENTS = [
    { name: 'Leyla Əliyeva', class: '10-B' },
    { name: 'Elvin Hüseynov', class: '11-A' },
    { name: 'Aysel Quliyeva', class: '10-A' },
    { name: 'Murad Məmmədov', class: '12-A' },
    { name: 'Günel Həsənova', class: '11-B' },
    { name: 'Tunar Novruzzade', class: '11-A' },
    { name: 'Aysu Məmmədova', class: '10-B' },
  ];

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleFile = (f) => {
    setFile(f);
    setProcessing(true);
    setResult(null);
    setSecondsLeft(5);

    // countdown for UI
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
        }
        return s - 1;
      });
    }, 1000);

    // simulate 5s processing then generate random result
    setTimeout(() => {
      clearInterval(timerRef.current);
      const chosen = STUDENTS[Math.floor(Math.random() * STUDENTS.length)];
      const totalQuestions = Math.floor(Math.random() * 16) + 10; // 10 - 25
      const scorePercent = Math.round(Math.random() * 35) + 65; // 65 - 100
      const correct = Math.round((scorePercent / 100) * totalQuestions);
      const wrong = totalQuestions - correct;

      // distribute wrong answers across 1-3 subjects
      const wrongSubjectsCount = Math.floor(Math.random() * 3) + 1; // 1..3
      const shuffledSubjects = SUBJECTS.sort(() => 0.5 - Math.random());
      const errorDistribution = [];
      let remainingWrong = wrong;
      for (let i = 0; i < wrongSubjectsCount; i++) {
        if (i === wrongSubjectsCount - 1) {
          errorDistribution.push({ section: shuffledSubjects[i], mistakes: remainingWrong });
        } else {
          const m = Math.floor(Math.random() * (remainingWrong + 1));
          errorDistribution.push({ section: shuffledSubjects[i], mistakes: m });
          remainingWrong -= m;
        }
      }

      // make sure at least one mistake if wrong>0
      if (wrong > 0 && errorDistribution.every((e) => e.mistakes === 0)) {
        errorDistribution[0].mistakes = 1;
        errorDistribution[0].section = shuffledSubjects[0];
        if (wrong - 1 > 0) {
          errorDistribution.push({ section: shuffledSubjects[1] || SUBJECTS[0], mistakes: wrong - 1 });
        }
      }

      const generated = {
        student: chosen.name,
        class: chosen.class,
        fileName: f.name,
        totalQuestions,
        correct,
        wrong,
        scorePercent,
        passed: scorePercent >= 50,
        errorsBySection: errorDistribution.filter((e) => e.mistakes > 0),
        processedAt: new Date().toISOString(),
      };

      setResult(generated);
      setProcessing(false);
      setSecondsLeft(0);
    }, 5000);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) handleFile(f);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setProcessing(false);
    setSecondsLeft(5);
  };

  const downloadJSON = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.student.replace(/\s+/g, '_')}_analysis.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fayl Yükləmə & Təhlil</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Faylı yükləyin, sistem 5 saniyə ərzində nümunəvi analiz təqdim edəcək.</p>
            </div>
            <div className="flex items-center space-x-3">
              <label className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg cursor-pointer hover:scale-105 transition-transform">
                <Upload className="w-4 h-4 mr-2" />
                <input type="file" onChange={onFileChange} className="hidden" />
                Fayl seç
              </label>
              <button onClick={reset} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">Təmizlə</button>
            </div>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className={`flex items-center justify-center border-dashed border-2 rounded-lg p-8 transition-all ${
              file ? 'border-green-300 bg-green-50/40' : 'border-gray-200 bg-gray-50 dark:bg-gray-900'
            }`}
          >
            <div className="text-center">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              {!file && (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Faylı bura sürükləyin və ya "Fayl seç" düyməsindən seçin</p>
                  <p className="text-xs text-gray-400 mt-2">(PDF, JPG, PNG və s.)</p>
                </>
              )}

              {file && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Seçilmiş: {file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Həcmi: {(file.size / 1024).toFixed(1)} KB</p>
                </div>
              )}

              {processing && (
                <div className="mt-4 flex items-center justify-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500 animate-spin" />
                  <p className="text-sm text-gray-500">Təhlil edilir... {secondsLeft > 0 ? `${secondsLeft}s` : '—'}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Result area */}
        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                  {result.student
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{result.student}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{result.class} • Fayl: {result.fileName}</p>
                </div>
              </div>

              <div className="text-right">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  result.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {result.passed ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" /> Keçib
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-2" /> Uğursuz
                    </>
                  )}
                </div>

                <div className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{result.scorePercent}%</div>
                <div className="text-xs text-gray-500 mt-1">Topladığı bal</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-gray-500">Nəticə xülasəsi</p>
                  <div className="text-sm text-gray-500">{result.totalQuestions} sual</div>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div className={`h-3 rounded-full ${result.scorePercent >= 80 ? 'bg-green-500' : result.scorePercent >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${result.scorePercent}%` }} />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Düz</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{result.correct}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Səhv</p>
                    <p className="text-lg font-bold text-red-600">{result.wrong}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Qlobal</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{result.scorePercent}%</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Səhvlər bölümlərə görə</h4>
                  {result.errorsBySection.length > 0 ? (
                    <ul className="space-y-2">
                      {result.errorsBySection.map((e, i) => (
                        <li key={i} className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-red-700">{e.section}</p>
                            <p className="text-xs text-gray-500">{e.mistakes} səhv</p>
                          </div>
                          <div className="text-sm text-red-600 font-bold">{Math.round((e.mistakes / result.totalQuestions) * 100)}%</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">Heç bir səhv qeyd olunmayıb.</p>
                  )}
                </div>
              </div>

              <div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-xs text-gray-500">Emal vaxtı</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{new Date(result.processedAt).toLocaleString()}</p>
                </div>

                <div className="mt-4 space-y-2">
                  <button onClick={downloadJSON} className="w-full inline-flex items-center justify-center px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg">
                    <Download className="w-4 h-4 mr-2" /> Nəticəni yüklə (JSON)
                  </button>

                  <button onClick={reset} className="w-full px-3 py-2 border rounded-lg">Başqa fayl</button>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-700">
                  <p>Qeyd: Bu demo təsadüfi yaradılmış nəticədir — real OCR/AI inteqrasiyası tələb edir.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder before action */}
        {!file && !result && (
          <div className="mt-6 text-center text-sm text-gray-500">Fayl yükləyin və 5 saniyə gözləyin — demo analiz göstəriləcək.</div>
        )}
      </div>
    </div>
  );
}
