import {useState} from 'react'
import {useNavigate,useSearchParams,Link} from 'react-router-dom'
import {GraduationCap,Users,ShieldCheck,IndianRupee,Building2,Bus,ArrowRight,CalendarCheck} from 'lucide-react'
import {Btn} from './components'
import {university} from './data'

const roles=[
 {key:'student',label:'Student',icon:GraduationCap,desc:'Attendance, timetable, fees, certificates and campus services.'},
 {key:'teacher',label:'Teacher',icon:Users,desc:'Classes, student performance records and announcements.'},
 {key:'admin',label:'Admin',icon:ShieldCheck,desc:'Department-wide control over students, faculty and services.'}]

export function Landing(){
 const nav=useNavigate()
 const features=[[GraduationCap,'Academics'],[CalendarCheck,'Attendance'],[IndianRupee,'Fees'],[Building2,'Hostel'],[Bus,'Transport']]
 return <div className="min-h-screen bg-surface relative overflow-hidden">
 <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage:'radial-gradient(circle,#14151C 1px,transparent 1px)',backgroundSize:'22px 22px'}}/>
 <header className="relative flex items-center justify-between px-6 lg:px-12 py-5 text-sm">
  <div className="flex items-center gap-2.5"><span className="h-8 w-8 rounded-full border-2 border-accent-500 grid place-items-center font-serif font-semibold text-navy-800 text-xs">RU</span>
   <span className="font-medium text-navy-800">{university.short}</span></div>
  <span className="text-slate-500 hidden sm:inline">{university.city}</span></header>

 {/* Introduction */}
 <section className="relative px-6 pt-8 pb-10 text-center max-w-2xl mx-auto">
  <span className="text-xs uppercase tracking-widest text-accent-600 font-medium">Introduction</span>
  <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-800 mt-3 leading-tight">A single digital campus for every student, teacher and administrator.</h1>
  <span className="h-1 w-14 bg-accent-500 rounded-full my-5 mx-auto block"/>
  <p className="text-slate-500 text-sm sm:text-base">One platform that brings academics, attendance, fees, hostel, transport and helpdesk together — with a dedicated experience for everyone on campus.</p></section>

 {/* About */}
 <section className="relative px-6 pb-12 max-w-4xl mx-auto">
  <div className="bg-white border rounded-xl2 shadow-card p-6 sm:p-8">
   <span className="text-xs uppercase tracking-widest text-accent-600 font-medium">About the platform</span>
   <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">{university.name} Digital Campus replaces scattered notices, spreadsheets and paperwork with one connected system.
    Students track their own academic life, teachers manage classes and performance records, and administrators oversee the entire department — all from role-specific dashboards built around what each person actually needs.</p>
   <div className="flex flex-wrap gap-2 mt-5">{features.map(([I,l])=><span key={l} className="flex items-center gap-2 bg-surface border rounded-full px-3.5 py-1.5 text-xs text-slate-600">
    <I size={13} className="text-brand-600"/>{l}</span>)}</div></div></section>

 {/* Role selection */}
 <section className="relative px-6 pb-16 max-w-4xl mx-auto">
  <h2 className="text-center font-serif text-xl font-semibold text-navy-800 mb-1">Continue as</h2>
  <p className="text-center text-sm text-slate-500 mb-6">Choose your role to sign in to your dashboard.</p>
  <div className="grid sm:grid-cols-3 gap-4">{roles.map(r=><button key={r.key} onClick={()=>nav(`/login?role=${r.key}`)}
   className="group text-left bg-white border rounded-xl2 p-5 shadow-card hover:shadow-pop hover:-translate-y-0.5 hover:border-brand-500 transition-all">
   <div className="h-11 w-11 rounded-full bg-navy-800 text-accent-400 grid place-items-center mb-4"><r.icon size={20}/></div>
   <h3 className="font-serif font-semibold text-navy-800 flex items-center gap-1.5">{r.label}<ArrowRight size={15} className="text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity"/></h3>
   <p className="text-xs text-slate-500 mt-1.5">{r.desc}</p></button>)}</div></section>

 <footer className="relative text-center text-xs text-slate-400 pb-6">{university.name} · {university.city}</footer></div>}

export function Login({onLogin}){
 const [params]=useSearchParams();const roleKey=params.get('role')||'student'
 const role=roles.find(r=>r.key===roleKey)||roles[0]
 const [id,setId]=useState(roleKey==='student'?'0101CS251042':roleKey==='teacher'?'FAC-0142':'admin@rgpv.ac.in')
 const [pw,setPw]=useState('demo1234'),[err,setErr]=useState('')
 const submit=e=>{e.preventDefault();if(!id.trim())return setErr('Enter your ID or email.');if(pw.length<6)return setErr('Password must be at least 6 characters.');onLogin(roleKey)}
 return <div className="min-h-screen bg-surface relative overflow-hidden">
  <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage:'radial-gradient(circle,#14151C 1px,transparent 1px)',backgroundSize:'22px 22px'}}/>
  <header className="relative flex items-center justify-between px-6 lg:px-12 py-5 text-sm">
   <Link to="/" className="flex items-center gap-2.5"><span className="h-8 w-8 rounded-full border-2 border-accent-500 grid place-items-center font-serif font-semibold text-navy-800 text-xs">RU</span>
    <span className="font-medium text-navy-800">{university.short}</span></Link>
   <Link to="/" className="text-slate-500 hover:text-navy-800 text-xs">← Choose a different role</Link></header>
  <main className="relative px-6 pb-16 pt-6 lg:pt-10 flex flex-col items-center text-center">
   <span className="h-16 w-16 rounded-full border-2 border-accent-500 grid place-items-center text-navy-800 mb-6"><role.icon size={26}/></span>
   <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-navy-800 max-w-lg leading-tight">{role.label} sign in</h1>
   <span className="h-1 w-14 bg-accent-500 rounded-full my-4"/>
   <p className="text-slate-500 max-w-md text-sm mb-8">{role.desc}</p>
   <form onSubmit={submit} className="w-full max-w-sm bg-white border rounded-xl2 shadow-pop p-6 text-left animate-slideUp" noValidate>
    <div className="flex border rounded-lg overflow-hidden mb-5 text-sm">{roles.map(r=><Link key={r.key} to={`/login?role=${r.key}`} className={`flex-1 py-2 text-center transition-colors ${r.key===roleKey?'bg-navy-800 text-white':'bg-white text-slate-500 hover:bg-slate-50'}`}>{r.label}</Link>)}</div>
    <p className="text-xs text-slate-500 mb-4">Demo mode: any password of 6+ characters works.</p>
    <label className="block text-sm text-slate-600 mb-3">{roleKey==='admin'?'Admin email':roleKey==='teacher'?'Faculty ID or email':'Enrollment number or email'}
     <input value={id} onChange={e=>setId(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2.5 transition-shadow focus-visible:shadow-focus"/></label>
    <label className="block text-sm text-slate-600 mb-3">Password<input type="password" value={pw} onChange={e=>setPw(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2.5 transition-shadow focus-visible:shadow-focus"/></label>
    <label className="flex items-center gap-2 text-sm text-slate-600 mb-4"><input type="checkbox" defaultChecked className="rounded"/>Remember me on this device</label>
    {err&&<p role="alert" className="text-sm text-danger-600 mb-3">{err}</p>}
    <Btn type="submit" className="w-full">Sign in</Btn></form>
  </main>
  <footer className="relative text-center text-xs text-slate-400 pb-6">{university.name} · {university.city}</footer></div>}
