import {useEffect,useMemo,useRef,useState} from 'react'
import {NavLink,Link,Outlet,useNavigate} from 'react-router-dom'
import {LayoutDashboard,GraduationCap,CalendarCheck,Clock,IndianRupee,FileText,Building2,Bus,LifeBuoy,MessageSquare,
 Sparkles,Bell,Search,X,LogOut,ChevronsLeft,ChevronsRight,CheckCheck,Users,ClipboardList,Megaphone,BookOpen,Landmark} from 'lucide-react'
import {student,teacher,university,notifications as seedNotifications,searchIndex} from './data'

export const studentNav=[
 ['/dashboard','Dashboard',LayoutDashboard],
 ['/academics','Academics',GraduationCap],
 ['/attendance','Attendance',CalendarCheck],
 ['/timetable','Timetable',Clock],
 ['/fees','Fees',IndianRupee],
 ['/certificates','Certificates',FileText],
 ['/hostel','Hostel',Building2],
 ['/transport','Transport',Bus],
 ['/helpdesk','Helpdesk',LifeBuoy],
 ['/insights','Student Insights',Sparkles],
 ['/ai-assistant','Campus Assistant',MessageSquare]]
export const studentMobile=['/dashboard','/attendance','/timetable','/fees','/ai-assistant']

export const teacherNav=[
 ['/teacher/dashboard','Dashboard',LayoutDashboard],
 ['/teacher/classes','My Classes',BookOpen],
 ['/teacher/students','Student Performance',ClipboardList],
 ['/teacher/announcements','Announcements',Megaphone],
 ['/teacher/profile','Profile',Users]]
export const teacherMobile=['/teacher/dashboard','/teacher/classes','/teacher/students','/teacher/announcements']

export const adminNav=[
 ['/admin/dashboard','Dashboard',LayoutDashboard],
 ['/admin/departments','Departments',Landmark],
 ['/admin/students','Students',GraduationCap],
 ['/admin/teachers','Teachers',Users],
 ['/admin/helpdesk','Helpdesk',LifeBuoy],
 ['/admin/announcements','Announcements',Megaphone]]
export const adminMobile=['/admin/dashboard','/admin/students','/admin/teachers','/admin/helpdesk']

/* ---------- Sidebar ---------- */
function Tooltip({label,children}){
 return <div className="relative group/tip flex">{children}
  <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-navy-900 text-white text-xs px-2 py-1 opacity-0 scale-95 origin-left transition-all duration-150 group-hover/tip:opacity-100 group-hover/tip:scale-100 z-20">{label}</span></div>}
function Sidebar({collapsed,setCollapsed,navItems,profilePath,personName,personSub,roleLabel}){
 return <aside className={`hidden lg:flex fixed inset-y-0 flex-col bg-navy-800 text-slate-300 transition-[width] duration-300 ease-out z-20 ${collapsed?'w-[72px]':'w-64'}`}>
 <div className={`px-4 py-4 border-b border-white/10 flex items-center gap-2.5 ${collapsed?'justify-center px-2':''}`}>
  <div className="h-9 w-9 rounded-full border-2 border-accent-400 bg-navy-900 grid place-items-center text-accent-400 font-serif font-semibold text-sm shrink-0">RU</div>
  {!collapsed&&<div className="min-w-0"><div className="font-semibold text-white text-sm truncate">{university.short}</div><div className="text-[11px] text-slate-400 truncate">{roleLabel} Portal</div></div>}
 </div>
 <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto scrollbar-thin">
  {navItems.map(([to,l,I])=>{
   const item=<NavLink key={to} to={to} end className={({isActive})=>`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 ${isActive?'bg-white/10 text-white font-medium':'text-slate-300 hover:bg-white/5 hover:text-white'} ${collapsed?'justify-center px-0':''}`}>
    {({isActive})=><>
     {isActive&&<span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-accent-500"/>}
     <I size={18} className="shrink-0 transition-transform duration-150 group-hover:scale-110"/>
     {!collapsed&&<span className="truncate">{l}</span>}</>}
   </NavLink>
   return collapsed?<Tooltip key={to} label={l}>{item}</Tooltip>:item})}
 </nav>
 <button onClick={()=>setCollapsed(v=>!v)} aria-label={collapsed?'Expand sidebar':'Collapse sidebar'}
  className="mx-2 mb-2 flex items-center justify-center gap-2 rounded-lg py-2 text-xs text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
  {collapsed?<ChevronsRight size={16}/>:<><ChevronsLeft size={16}/><span>Collapse</span></>}</button>
 <Link to={profilePath} className={`p-3 border-t border-white/10 flex items-center gap-3 text-sm hover:bg-white/5 transition-colors ${collapsed?'justify-center':''}`}>
  <span className="h-9 w-9 rounded-full border-2 border-accent-400 bg-navy-900 grid place-items-center text-accent-400 font-serif font-semibold text-sm shrink-0">{personName[0]}</span>
  {!collapsed&&<span className="min-w-0"><span className="block text-white truncate">{personName}</span><span className="text-xs text-slate-400 truncate block">{personSub}</span></span>}</Link>
 </aside>}

/* ---------- Command palette (Ctrl+K) ---------- */
function CommandPalette({open,onClose}){
 const [q,setQ]=useState('');const nav2=useNavigate();const ref=useRef(null)
 useEffect(()=>{if(open){setQ('');setTimeout(()=>ref.current?.focus(),30)}},[open])
 const results=useMemo(()=>{if(!q.trim())return searchIndex.slice(0,7)
  const t=q.toLowerCase();return searchIndex.filter(r=>r.label.toLowerCase().includes(t)).slice(0,8)},[q])
 if(!open)return null
 const go=to=>{onClose();nav2(to)}
 return <div className="fixed inset-0 z-40 bg-navy-900/40 backdrop-blur-[2px] grid place-items-start justify-center pt-24 px-4 animate-fadeIn" onClick={onClose}>
  <div onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Search" className="w-full max-w-lg bg-white rounded-xl2 shadow-pop overflow-hidden animate-scaleIn">
   <div className="flex items-center gap-3 px-4 py-3 border-b"><Search size={17} className="text-slate-400"/>
    <input ref={ref} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search pages, subjects, certificates, tickets…" className="flex-1 outline-none text-sm py-1"/>
    <kbd className="text-[10px] text-slate-400 border rounded px-1.5 py-0.5">Esc</kbd></div>
   <div className="max-h-80 overflow-y-auto py-1 scrollbar-thin">
    {results.length===0&&<p className="px-4 py-6 text-sm text-slate-400 text-center">No results for "{q}"</p>}
    {results.map((r,i)=><button key={i} onClick={()=>go(r.to)} className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-slate-50 text-left">
     <span className="text-slate-700 truncate">{r.label}</span><span className="text-[11px] text-slate-400 shrink-0 ml-3">{r.type}</span></button>)}
   </div></div></div>}

/* ---------- Notification panel ---------- */
function NotificationPanel({open,onClose,items,setItems}){
 if(!open)return null
 const unread=items.filter(n=>!n.read).length
 return <><div className="fixed inset-0 z-30" onClick={onClose}/>
 <div role="dialog" aria-label="Notifications" className="absolute right-4 top-14 z-40 w-[340px] bg-white rounded-xl2 shadow-pop border overflow-hidden animate-slideDown">
  <div className="flex items-center justify-between px-4 py-3 border-b"><h2 className="font-semibold text-sm text-navy-800">Notifications {unread>0&&<span className="ml-1 text-xs text-brand-600">({unread} new)</span>}</h2>
   <button onClick={()=>setItems(items.map(n=>({...n,read:true})))} className="text-xs text-brand-600 hover:underline flex items-center gap-1"><CheckCheck size={13}/>Clear all</button></div>
  <div className="max-h-96 overflow-y-auto divide-y scrollbar-thin">
   {items.length===0&&<p className="px-4 py-8 text-sm text-slate-400 text-center">You're all caught up.</p>}
   {items.map(n=><button key={n.id} onClick={()=>setItems(items.map(x=>x.id===n.id?{...x,read:true}:x))} className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-slate-50 transition-colors ${!n.read?'bg-brand-50/40':''}`}>
    <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${!n.read?'bg-brand-500':'bg-transparent'}`}/>
    <span className="flex-1 min-w-0"><span className="text-[11px] font-medium text-accent-600 block">{n.cat}</span>
     <span className="text-sm text-slate-700 block">{n.t}</span><span className="text-[11px] text-slate-400">{n.time}</span></span></button>)}
  </div></div></>}

/* ---------- Layout ---------- */
export function Layout({onLogout,role='student'}){
 const [collapsed,setCollapsed]=useState(()=>sessionStorage.getItem('sb-collapsed')==='1')
 const [search,setSearch]=useState(false),[notifOpen,setNotifOpen]=useState(false)
 const [items,setItems]=useState(seedNotifications)
 useEffect(()=>{sessionStorage.setItem('sb-collapsed',collapsed?'1':'0')},[collapsed])
 useEffect(()=>{const h=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setSearch(true)}if(e.key==='Escape'){setSearch(false)}}
  window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[])
 const unread=items.filter(n=>!n.read).length
 const cfg={
  student:{navItems:studentNav,mobile:studentMobile,profilePath:'/profile',personName:student.name,personSub:student.id,roleLabel:'Student'},
  teacher:{navItems:teacherNav,mobile:teacherMobile,profilePath:'/teacher/profile',personName:teacher.name,personSub:teacher.designation,roleLabel:'Faculty'},
  admin:{navItems:adminNav,mobile:adminMobile,profilePath:'/admin/dashboard',personName:'Admin Office',personSub:'Department control',roleLabel:'Admin'}
 }[role]
 return <div className="min-h-screen bg-surface text-slate-800">
 <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} navItems={cfg.navItems} profilePath={cfg.profilePath} personName={cfg.personName} personSub={cfg.personSub} roleLabel={cfg.roleLabel}/>
 <div className={`transition-[padding] duration-300 ${collapsed?'lg:pl-[72px]':'lg:pl-64'}`}>
  <header className="sticky top-0 z-10 h-16 bg-white/90 backdrop-blur border-b flex items-center gap-4 px-4 lg:px-8">
   <span className="lg:hidden font-semibold text-navy-800">{university.short}</span>
   <button onClick={()=>setSearch(true)} className="hidden sm:flex flex-1 max-w-md items-center gap-2 border rounded-lg px-3 py-2 text-sm text-slate-400 hover:border-brand-500 transition-colors">
    <Search size={15}/><span className="flex-1 text-left">Search services, subjects, certificates…</span><kbd className="text-[10px] border rounded px-1.5 py-0.5">Ctrl K</kbd></button>
   <div className="ml-auto flex items-center gap-1 relative">
    <button aria-label="Notifications" onClick={()=>setNotifOpen(v=>!v)} className="relative text-slate-500 hover:text-navy-800 p-2 rounded-lg hover:bg-slate-100 transition-colors">
     <Bell size={19}/>{unread>0&&<span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger-500"/>}</button>
    <NotificationPanel open={notifOpen} onClose={()=>setNotifOpen(false)} items={items} setItems={setItems}/>
    <button onClick={onLogout} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy-800 px-2 py-2 rounded-lg hover:bg-slate-100 transition-colors">
     <LogOut size={16}/><span className="hidden sm:inline">Sign out</span></button>
   </div></header>
  <main className="px-4 lg:px-8 py-6 pb-24 lg:pb-10 max-w-6xl animate-fadeIn">
   <Outlet context={{pushNotification:n=>setItems(l=>[{id:Date.now(),read:false,time:'Just now',...n},...l])}}/>
  </main></div>
 <nav className="lg:hidden fixed bottom-0 inset-x-0 z-10 bg-white border-t grid grid-cols-4">
  {cfg.navItems.filter(n=>cfg.mobile.includes(n[0])).map(([to,l,I])=><NavLink key={to} to={to} end className={({isActive})=>`flex flex-col items-center gap-0.5 py-2 text-[11px] transition-colors ${isActive?'text-brand-600 font-medium':'text-slate-500'}`}><I size={19}/>{l.replace('Campus ','').replace('Student ','')}</NavLink>)}
 </nav>
 <CommandPalette open={search} onClose={()=>setSearch(false)}/>
 </div>}

/* ---------- Shared UI primitives ---------- */
const tones={green:'bg-success-50 text-success-700 border-success-500/30',amber:'bg-warning-50 text-warning-700 border-warning-500/30',red:'bg-danger-50 text-danger-700 border-danger-500/30',blue:'bg-info-50 text-info-600 border-info-500/30',slate:'bg-slate-100 text-slate-600 border-slate-200'}
const map={Safe:'green',Paid:'green',Issued:'green','On time':'green',Resolved:'green',Watch:'amber',Pending:'amber','In Progress':'amber',Open:'blue',Low:'red',High:'red',Medium:'amber'}
export const StatusBadge=({s})=><span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border ${tones[map[s]||'slate']}`}>{s}</span>

export const PageHeader=({title,sub,children})=><div className="flex flex-wrap items-end justify-between gap-3 mb-6 animate-slideUp">
 <div><h1 className="text-2xl font-serif font-semibold tracking-tight text-navy-800">{title}</h1>{sub&&<p className="text-sm text-slate-500 mt-1">{sub}</p>}</div>{children}</div>

export const Btn=({className='',variant='primary',...p})=>{
 const base='inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 active:scale-[.97] disabled:opacity-50 disabled:pointer-events-none focus-visible:shadow-focus'
 const styles={primary:'bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow',
  ghost:'bg-white border text-slate-600 hover:border-brand-500 hover:text-brand-600',
  subtle:'bg-brand-50 text-brand-700 hover:bg-brand-100'}
 return <button {...p} className={`${base} ${styles[variant]} ${className}`}/>}

export function Modal({title,onClose,children,size='max-w-md'}){
 useEffect(()=>{const h=e=>{if(e.key==='Escape')onClose()};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[onClose])
 return <div className="fixed inset-0 z-30 bg-navy-900/40 backdrop-blur-[1px] grid place-items-center p-4 animate-fadeIn" onMouseDown={onClose}>
  <div onMouseDown={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title} className={`bg-white rounded-xl2 w-full ${size} shadow-pop animate-scaleIn max-h-[85vh] flex flex-col`}>
   <div className="flex justify-between items-center px-5 py-4 border-b shrink-0"><h2 className="font-semibold text-navy-800">{title}</h2>
    <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100"><X size={18}/></button></div>
   <div className="p-5 overflow-y-auto scrollbar-thin">{children}</div></div></div>}

export const EmptyState=({title,text,action})=><div className="border border-dashed rounded-xl2 p-10 text-center bg-white animate-fadeIn">
 <p className="font-medium text-navy-800">{title}</p>{text&&<p className="text-sm text-slate-500 mt-1">{text}</p>}{action&&<div className="mt-4">{action}</div>}</div>

export const ErrorState=({onRetry})=><div className="border border-dashed border-danger-500/40 rounded-xl2 p-10 text-center bg-danger-50/40 animate-fadeIn">
 <p className="font-medium text-danger-700">Something went wrong.</p><p className="text-sm text-slate-500 mt-1">Please try again in a moment.</p>
 {onRetry&&<Btn className="mt-4" onClick={onRetry}>Try again</Btn>}</div>

export const Skeleton=({className=''})=><div className={`skeleton rounded ${className}`}/>
export function CardSkeleton(){return <div className="bg-white border rounded-xl2 p-4 space-y-3"><Skeleton className="h-3 w-1/3"/><Skeleton className="h-7 w-1/2"/></div>}

export function ProgressRing({value,size=88,stroke=9,tone='brand'}){
 const r=(size-stroke)/2,c=2*Math.PI*r,off=c-(value/100)*c
 const colors={brand:'#3949E0',success:'#10B981',warning:'#F59E0B',danger:'#EF4444'}
 return <svg width={size} height={size} className="-rotate-90">
  <circle cx={size/2} cy={size/2} r={r} stroke="#EEF1F7" strokeWidth={stroke} fill="none"/>
  <circle cx={size/2} cy={size/2} r={r} stroke={colors[tone]} strokeWidth={stroke} fill="none" strokeLinecap="round"
   strokeDasharray={c} strokeDashoffset={off} style={{transition:'stroke-dashoffset .8s cubic-bezier(.16,1,.3,1)'}}/></svg>}

export function CountUp({value,duration=800,suffix=''}){
 const [n,setN]=useState(0)
 useEffect(()=>{let raf,start
  const step=ts=>{if(!start)start=ts;const p=Math.min(1,(ts-start)/duration);setN(Math.round(value*(1-Math.pow(1-p,3))));if(p<1)raf=requestAnimationFrame(step)}
  raf=requestAnimationFrame(step);return()=>cancelAnimationFrame(raf)},[value,duration])
 return <>{n}{suffix}</>}
