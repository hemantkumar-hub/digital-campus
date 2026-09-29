import {NavLink,Link,Outlet} from 'react-router-dom'
import {LayoutDashboard,BookOpen,CalendarCheck,Clock,IndianRupee,FileText,Building2,Bus,LifeBuoy,MessageSquare,Bell,Search,X,LogOut} from 'lucide-react'
import {student} from './data'
export const nav=[['/dashboard','Dashboard',LayoutDashboard],['/academics','Academics',BookOpen],['/attendance','Attendance',CalendarCheck],['/timetable','Timetable',Clock],['/fees','Fees',IndianRupee],['/certificates','Certificates',FileText],['/hostel','Hostel',Building2],['/transport','Transport',Bus],['/helpdesk','Helpdesk',LifeBuoy],['/ai-assistant','Campus Assistant',MessageSquare]]
const mobile=['/dashboard','/attendance','/timetable','/fees','/ai-assistant']
export function Layout({onLogout}){
 return <div className="min-h-screen bg-slate-50 text-slate-800">
 <aside className="hidden lg:flex fixed inset-y-0 w-60 flex-col bg-navy text-slate-300">
  <div className="px-5 py-4 border-b border-white/10"><div className="font-semibold text-white">RGPV Bhopal</div><div className="text-xs text-slate-400">Student Digital Campus</div></div>
  <nav className="flex-1 py-3 px-2 space-y-0.5">{nav.map(([to,l,I])=><NavLink key={to} to={to} className={({isActive})=>`flex items-center gap-3 px-3 py-2 rounded text-sm ${isActive?'bg-white/10 text-white font-medium':'hover:bg-white/5'}`}><I size={17}/>{l}</NavLink>)}</nav>
  <Link to="/profile" className="p-4 border-t border-white/10 flex items-center gap-3 text-sm hover:bg-white/5"><span className="h-8 w-8 rounded-full bg-white/15 grid place-items-center text-white font-medium">{student.name[0]}</span><span><span className="block text-white">{student.name}</span><span className="text-xs text-slate-400">{student.id}</span></span></Link>
 </aside>
 <div className="lg:pl-60">
  <header className="sticky top-0 z-10 h-14 bg-white border-b flex items-center gap-4 px-4 lg:px-8">
   <span className="lg:hidden font-semibold text-navy">Digital Campus</span>
   <label className="hidden sm:flex flex-1 max-w-md items-center gap-2 border rounded px-3 py-1.5 text-sm text-slate-500"><Search size={15}/><input aria-label="Search" placeholder="Search services, subjects, certificates" className="flex-1 outline-none bg-transparent"/></label>
   <div className="ml-auto flex items-center gap-4"><button aria-label="Notifications" className="text-slate-500 hover:text-navy"><Bell size={18}/></button><button onClick={onLogout} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy"><LogOut size={16}/><span className="hidden sm:inline">Sign out</span></button></div>
  </header>
  <main className="px-4 lg:px-8 py-6 pb-24 lg:pb-10 max-w-6xl"><Outlet/></main>
 </div>
 <nav className="lg:hidden fixed bottom-0 inset-x-0 z-10 bg-white border-t grid grid-cols-5">{nav.filter(n=>mobile.includes(n[0])).map(([to,l,I])=><NavLink key={to} to={to} className={({isActive})=>`flex flex-col items-center gap-0.5 py-2 text-[11px] ${isActive?'text-brand font-medium':'text-slate-500'}`}><I size={19}/>{l.replace('Campus ','')}</NavLink>)}</nav>
 </div>}
const tones={green:'bg-green-50 text-green-700 border-green-200',amber:'bg-amber-50 text-amber-700 border-amber-200',red:'bg-red-50 text-red-700 border-red-200',slate:'bg-slate-100 text-slate-600 border-slate-200'}
const map={Safe:'green',Paid:'green',Issued:'green','On time':'green',Resolved:'green',Watch:'amber',Pending:'amber','In Progress':'amber',Low:'red'}
export const StatusBadge=({s})=><span className={`inline-block px-2 py-0.5 text-xs rounded border ${tones[map[s]||'slate']}`}>{s}</span>
export const PageHeader=({title,sub,children})=><div className="flex flex-wrap items-end justify-between gap-3 mb-6"><div><h1 className="text-xl font-semibold text-navy">{title}</h1>{sub&&<p className="text-sm text-slate-500 mt-0.5">{sub}</p>}</div>{children}</div>
export const Btn=({className='',...p})=><button {...p} className={`px-4 py-2 rounded text-sm font-medium bg-brand text-white hover:bg-blue-800 disabled:opacity-50 ${className}`}/>
export function Modal({title,onClose,children}){return <div className="fixed inset-0 z-30 bg-black/40 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={title}><div className="bg-white rounded w-full max-w-md"><div className="flex justify-between items-center px-5 py-3 border-b"><h2 className="font-semibold text-navy">{title}</h2><button onClick={onClose} aria-label="Close"><X size={18}/></button></div><div className="p-5">{children}</div></div></div>}
export const EmptyState=({title,text})=><div className="border border-dashed rounded p-10 text-center bg-white"><p className="font-medium text-navy">{title}</p><p className="text-sm text-slate-500 mt-1">{text}</p></div>
