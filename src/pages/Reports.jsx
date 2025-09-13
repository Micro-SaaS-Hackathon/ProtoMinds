import React, { useEffect, useState } from 'react';
import {
  FileDown,
  Download,
  Search,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash,
  Home,
  FileText,
} from 'lucide-react';

// Reports page styled to match the dashboard look
// This variant uses dark text on a white background (user requested)
// and avoids react-router dependencies so it works in test/sandbox envs.

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    let mounted = true;

    const fetchReports = async () => {
      try {
        const res = await fetch('/dashboard/reports');
        if (!res.ok) throw new Error('no remote reports');
        const data = await res.json();
        if (!mounted) return;
        setReports(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        // fallback mock data
        const mock = Array.from({ length: 22 }).map((_, i) => ({
          id: i + 1,
          title: `Həftəlik Hesabat #${i + 1}`,
          type: i % 3 === 0 ? 'Exam' : i % 3 === 1 ? 'Attendance' : 'Export',
          class: ['10-A', '10-B', '11-A', '11-B', '12-A'][i % 5],
          createdAt: new Date(Date.now() - i * 86400000).toISOString(),
          author: ['Aysel Məmmədova', 'Murad Məmmədov', 'Leyla Əliyeva'][i % 3],
          sizeKb: 30 + i * 5,
        }));
        if (!mounted) return;
        setReports(mock);
        setLoading(false);
      }
    };

    fetchReports();
    return () => {
      mounted = false;
    };
  }, []);

  // safe filter pipeline
  const filtered = (Array.isArray(reports) ? reports : [])
    .filter((r) => (classFilter === 'all' ? true : (r && r.class) === classFilter))
    .filter((r) => (query ? ((r && r.title) || '').toLowerCase().includes(query.toLowerCase()) : true))
    .filter((r) => (dateFrom ? new Date((r && r.createdAt) || 0) >= new Date(dateFrom) : true))
    .filter((r) => (dateTo ? new Date((r && r.createdAt) || 0) <= new Date(dateTo) : true));

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), pages);
  const shown = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const downloadReport = (r) => {
    const safeTitle = (r && r.title) ? String(r.title).replace(/"/g, '""') : 'report';
    const csv = `title,type,class,author,createdAt,sizeKb\n"${safeTitle}",${r.type || ''},${r.class || ''},${r.author || ''},${r.createdAt || ''},${r.sizeKb || ''}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeTitle.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const deleteReport = (id) => {
    const confirmFn = (typeof window !== 'undefined' && typeof window.confirm === 'function')
      ? window.confirm
      : () => true;
    if (!confirmFn('Bu hesabatı silmək istədiyinizə əminsiniz?')) return;
    setReports((prev) => (Array.isArray(prev) ? prev.filter((r) => r.id !== id) : []));
  };

  return (
    <div className="p-6 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hesabatlar</h1>
            <p className="text-sm text-gray-600">Yüklənmiş hesabatlar, ixraclar və CSV/Excel faylları.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* plain anchor used to avoid Router dependency */}
            <a href="/dashboard" className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 rounded-md text-sm hover:bg-gray-100 transition-all">
              <Home className="w-4 h-4 mr-2 text-gray-700" />
              Dashboard
            </a>

            <button className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md text-sm shadow hover:shadow-lg">
              <FileDown className="w-4 h-4 mr-2 text-white" /> Yeni Hesabat
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="rounded-xl p-4 mb-6 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2 w-full md:w-2/3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  placeholder="Axtar..."
                  className="pl-10 pr-3 py-2 w-full rounded-lg bg-white border border-gray-200 text-gray-900 text-sm"
                />
              </div>

              <select value={classFilter} onChange={(e) => { setClassFilter(e.target.value); setPage(1); }} className="py-2 px-3 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm">
                <option value="all">Bütün Siniflər</option>
                <option value="10-A">10-A</option>
                <option value="10-B">10-B</option>
                <option value="11-A">11-A</option>
                <option value="11-B">11-B</option>
                <option value="12-A">12-A</option>
              </select>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="py-2 px-2 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm" />
                <span className="text-gray-400">—</span>
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="py-2 px-2 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => { setQuery(''); setClassFilter('all'); setDateFrom(''); setDateTo(''); setPage(1); }} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm">Təmizlə</button>
              <button className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm flex items-center"><Filter className="w-4 h-4 mr-2 text-gray-700" /> Filtrlə</button>
              <button className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm flex items-center"><Download className="w-4 h-4 mr-2 text-gray-700" /> Hamısını Yüklə</button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl shadow-sm overflow-x-auto bg-white border border-gray-100">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Başlıq</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Tip</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Sinif</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Hesabatçı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Tarix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Həcmi</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-sm text-gray-600">Yüklənir...</td>
                </tr>
              ) : shown.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-sm text-gray-600">Heç bir hesabat tapılmadı.</td>
                </tr>
              ) : (
                shown.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-gray-50">
                          <FileText className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{r.title}</div>
                          <div className="text-xs text-gray-500">ID: {r.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{r.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{r.class}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{r.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(r.createdAt || Date.now()).toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{r.sizeKb} KB</td>
                    <td className="px-6 py-4 text-sm text-right">
                      <div className="inline-flex items-center gap-2">
                        <button onClick={() => downloadReport(r)} className="inline-flex items-center px-3 py-1.5 rounded-md text-sm border border-gray-200 text-gray-700">
                          <Download className="w-4 h-4 mr-2 text-gray-700" /> Yüklə
                        </button>
                        <button onClick={() => alert(`Göstər: ${r.title}`)} className="inline-flex items-center px-3 py-1.5 rounded-md text-sm border border-gray-200 text-gray-700">
                          <Eye className="w-4 h-4 mr-2 text-gray-700" /> Bax
                        </button>
                        <button onClick={() => deleteReport(r.id)} className="inline-flex items-center px-3 py-1.5 rounded-md text-sm text-red-600 border border-red-100">
                          <Trash className="w-4 h-4 mr-2 text-red-600" /> Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">Ümumi: {filtered.length} hesabat</div>
          <div className="inline-flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="p-2 rounded-md border border-gray-200"><ChevronLeft className="w-4 h-4 text-gray-700" /></button>
            <div className="px-3 py-2 rounded-md border border-gray-100 text-gray-700">Səhifə {currentPage} / {pages}</div>
            <button onClick={() => setPage((p) => Math.min(pages, p + 1))} className="p-2 rounded-md border border-gray-200"><ChevronRight className="w-4 h-4 text-gray-700" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
