import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, ClipboardList, Settings, Users, 
  HardDrive, Bell, Globe, LogOut, ChevronRight, 
  FileCheck, Search, Plus, AlertCircle, CheckCircle2, Clock
} from 'lucide-react';

// --- 模擬數據與語系定義 ---
const translations = {
  '繁體中文': { dashboard: '儀表板', project: '專案管理', equipment: '設備管理', user: '使用者', language: '繁體中文', status: '狀態' },
  'English': { dashboard: 'Dashboard', project: 'Projects', equipment: 'Equipment', user: 'Users', language: 'English', status: 'Status' },
  'ภาษาไทย': { dashboard: 'แผงควบคุม', project: 'โครงการ', equipment: 'อุปกรณ์', user: 'ผู้ใช้', language: 'ภาษาไทย', status: 'สถานะ' }
};

const MOCK_PROJECTS = [
  { id: 'P001', name: 'iPhone 18 內部支架', customer: 'Foxconn', phase: 3, progress: 65, status: 'On Track' },
  { id: 'P002', name: 'Tesla Model Y 電池彈片', customer: 'Tesla', phase: 4, progress: 85, status: 'Warning' },
  { id: 'P003', name: '伺服器機殼端子', customer: 'Dell', phase: 1, progress: 15, status: 'On Track' },
];

// --- 主要組件 ---

export default function StampingSystem() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('Admin');
  const [lang, setLang] = useState('繁體中文');
  const [activeTab, setActiveTab] = useState('dashboard');

  const t = translations[lang];

  // 登入介面
  if (!isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 font-sans">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-xl text-white">
              <ClipboardList size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">APQP/PPAP System</h1>
          <p className="text-center text-slate-500 mb-8 italic">精密沖壓研發專用</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">測試權限切換</label>
              <select 
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="Admin">系統管理員 (Admin)</option>
                <option value="Manager">研發主管 (Manager)</option>
                <option value="Member">研發工程師 (Member)</option>
                <option value="Viewer">訪客 (Viewer)</option>
              </select>
            </div>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
            >
              進入系統
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* 側邊導航 */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">P</div>
          <span className="font-bold text-lg tracking-tight">PRECISION RD</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label={t.dashboard} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<ClipboardList size={20}/>} label={t.project} active={activeTab === 'apqp'} onClick={() => setActiveTab('apqp')} />
          <NavItem icon={<FileCheck size={20}/>} label="PPAP 清單" active={activeTab === 'ppap'} onClick={() => setActiveTab('ppap')} />
          <NavItem icon={<HardDrive size={20}/>} label={t.equipment} active={activeTab === 'equipment'} onClick={() => setActiveTab('equipment')} />
          {userRole === 'Admin' && (
            <NavItem icon={<Users size={20}/>} label={t.user} active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          )}
        </nav>

        <div className="p-4 bg-slate-800 m-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs">RD</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{userRole}</p>
              <p className="text-[10px] text-slate-400">研發工程部</p>
            </div>
            <LogOut size={16} className="text-slate-400 cursor-pointer hover:text-red-400" onClick={() => setIsLoggedIn(false)} />
          </div>
        </div>
      </aside>

      {/* 右側主區域 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <div className="flex items-center gap-4 text-slate-500">
            <span className="text-sm font-medium">專案進度即時監控中心</span>
          </div>
          
          <div className="flex items-center gap-6">
            {/* 語系切換 */}
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium cursor-pointer">
              <Globe size={14} />
              <select className="bg-transparent border-none outline-none cursor-pointer" value={lang} onChange={(e)=>setLang(e.target.value)}>
                <option>繁體中文</option>
                <option>English</option>
                <option>ภาษาไทย</option>
              </select>
            </div>
            <div className="relative">
              <Bell size={20} className="text-slate-400" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
          </div>
        </header>

        {/* 內容頁面切換 */}
        <div className="flex-1 p-8 overflow-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'apqp' && <ProjectListView />}
          {/* 其他頁面待實作 */}
        </div>
      </main>
    </div>
  );
}

// --- 子組件: 側邊欄按鈕 ---
function NavItem({ icon, label, active, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
        active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {active && <ChevronRight size={14} />}
    </div>
  );
}

// --- 子組件: 儀表板頁面 ---
function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="進行中專案" value="12" icon={<Clock className="text-blue-500"/>} color="bg-blue-50" />
        <StatsCard label="待簽核文件" value="05" icon={<AlertCircle className="text-amber-500"/>} color="bg-amber-50" />
        <StatsCard label="已完成 PPAP" value="128" icon={<CheckCircle2 className="text-emerald-500"/>} color="bg-emerald-50" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">精密沖壓專案進度 (APQP)</h2>
          <div className="flex gap-2">
             <div className="px-3 py-1 bg-slate-100 rounded text-xs">依客戶分</div>
             <div className="px-3 py-1 bg-slate-100 rounded text-xs">依研發分</div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-wider border-b">
                <th className="pb-4 font-semibold">專案名稱 / 客戶</th>
                <th className="pb-4 font-semibold">當前階段</th>
                <th className="pb-4 font-semibold">總進度</th>
                <th className="pb-4 font-semibold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_PROJECTS.map(p => (
                <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-4">
                    <p className="font-bold text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.customer} | {p.id}</p>
                  </td>
                  <td className="py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Phase {p.phase}</span>
                  </td>
                  <td className="py-4">
                    <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${p.progress}%` }}></div>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <Search size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 子組件: 統計卡片 ---
function StatsCard({ label, value, icon, color }) {
  return (
    <div className={`p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm bg-white`}>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-3xl font-bold mt-1 text-slate-800">{value}</p>
      </div>
      <div className={`p-4 rounded-xl ${color}`}>
        {icon}
      </div>
    </div>
  );
}

// --- 子組件: 專案列表 (APQP) ---
function ProjectListView() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm h-full">
       <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">APQP 專案管理清單</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium">
            <Plus size={18} /> 新增沖壓專案
          </button>
       </div>
       <div className="grid grid-cols-1 gap-4">
          {/* 這裡可以放更詳細的卡片式列表 */}
          <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400">
            <ClipboardList size={48} className="mb-4 opacity-20" />
            <p>點擊上方按鈕開始建立您的第一個 APQP 流程</p>
          </div>
       </div>
    </div>
  );
}
