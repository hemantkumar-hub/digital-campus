import {useState} from 'react'
import {useNavigate,useSearchParams,Link} from 'react-router-dom'
import {GraduationCap,Users,ShieldCheck,IndianRupee,Building2,Bus,ArrowRight,CalendarCheck,Check,Eye,EyeOff,UserRound,Lock,Clock,LifeBuoy} from 'lucide-react'
import {Btn} from './components'
import {university} from './data'

const roles=[
 {key:'student',label:'Student',icon:GraduationCap,desc:'Attendance, timetable, fees, certificates and campus services.',perks:['Track attendance and results','Pay fees and download receipts','Ask the campus chatbot anything']},
 {key:'teacher',label:'Teacher',icon:Users,desc:'Classes, student performance records and announcements.',perks:['Mark attendance in a few taps','Record and edit student performance','Post announcements to your classes']},
 {key:'admin',label:'Admin',icon:ShieldCheck,desc:'Department-wide control over students, faculty and services.',perks:['Manage students and faculty','Oversee fees, hostel and transport','Review department-wide reports']}]

const features=[
 [GraduationCap,'Academics','Courses, marks and results'],
 [CalendarCheck,'Attendance','Live, subject-wise tracking'],
 [IndianRupee,'Fees','Dues, payments and receipts'],
 [Building2,'Hostel','Rooms, mess and requests'],
 [Bus,'Transport','Routes, timings and passes'],
 [LifeBuoy,'Helpdesk','Raise and follow up tickets']]

const Dots=()=><div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage:'radial-gradient(circle,#14151C 1px,transparent 1px)',backgroundSize:'22px 22px'}}/>

const Logo=({as:T='div',...p})=><T {...p} className="flex items-center gap-2.5">
 <span className="h-9 w-9 rounded-full border-2 border-accent-500 bg-white grid place-items-center font-serif font-semibold text-navy-800 text-xs shadow-card">RU</span>
 <span className="font-medium text-navy-800">{university.short}</span></T>

function Preview(){
 const c=2*Math.PI*26,pct=82
 const classes=[['09:00','Data Structures','Room 204'],['11:00','Discrete Maths','Room 112'],['02:00','DBMS Lab','Lab 3']]
 return <div className="relative mx-auto w-full max-w-md">
  <div className="absolute -inset-3 rounded-[28px] border-2 border-accent-500/30 -rotate-2"/>
  <div className="relative bg-navy-800 text-white rounded-xl2 shadow-pop p-5 sm:p-6">
   <div className="flex items-center justify-between">
    <div><p className="text-xs text-white/50">Student dashboard</p><p className="font-serif text-lg font-semibold mt-0.5">Good morning</p></div>
    <span className="h-9 w-9 rounded-full bg-accent-500 text-navy-800 grid place-items-center"><GraduationCap size={18}/></span></div>

   <div className="mt-5 grid grid-cols-5 gap-3">
    <div className="col-span-3 bg-white/[0.07] rounded-lg p-4 flex items-center gap-4">
     <svg width="64" height="64" viewBox="0 0 64 64" className="shrink-0 -rotate-90">
      <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="6"/>
      <circle cx="32" cy="32" r="26" fill="none" className="stroke-accent-400" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c*(1-pct/100)}/></svg>
     <div><p className="font-serif text-2xl font-semibold leading-none">{pct}%</p><p className="text-xs text-white/50 mt-1.5">Attendance</p></div></div>
    <div className="col-span-2 bg-white/[0.07] rounded-lg p-4 flex flex-col justify-between">
     <IndianRupee size={16} className="text-accent-400"/>
     <div><p className="font-serif text-lg font-semibold leading-none">Paid</p><p className="text-xs text-white/50 mt-1.5">Semester fee</p></div></div></div>

   <div className="mt-3 bg-white/[0.07] rounded-lg p-4">
    <p className="flex items-center gap-1.5 text-xs text-white/50 mb-3"><Clock size={13}/>Today's timetable</p>
    <ul className="space-y-2.5">{classes.map(([t,n,r])=><li key={n} className="flex items-center gap-3 text-sm">
     <span className="w-12 text-xs text-accent-400 font-medium">{t}</span>
     <span className="h-6 w-0.5 rounded-full bg-accent-500/60"/>
     <span className="flex-1">{n}</span><span className="text-xs text-white/40">{r}</span></li>)}</ul></div></div></div>}

export function Landing(){
 const nav=useNavigate()
 return <div className="min-h-screen bg-surface relative overflow-hidden">
 <Dots/>
 <div className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-accent-500/10 blur-3xl pointer-events-none"/>

 <header className="relative flex items-center justify-between px-6 lg:px-12 py-5 text-sm max-w-6xl mx-auto">
  <Logo/>
  <div className="flex items-center gap-5">
   <span className="text-slate-500 hidden sm:inline">{university.city}</span>
   <a href="#roles" className="rounded-full border border-navy-800 text-navy-800 px-4 py-1.5 text-xs font-medium hover:bg-navy-800 hover:text-white transition-colors">Sign in</a></div></header>

 {/* Introduction */}
 <section className="relative px-6 lg:px-12 pt-8 pb-16 lg:pt-14 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
  <div className="text-center lg:text-left">
   <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-navy-800 leading-[1.1]">A single digital campus for every student, teacher and administrator.</h1>
   <span className="h-1 w-16 bg-accent-500 rounded-full my-6 mx-auto lg:mx-0 block"/>
   <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">One platform that brings academics, attendance, fees, hostel, transport and helpdesk together, with a dedicated experience for everyone on campus.</p>
   <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
    <button onClick={()=>nav('/login?role=student')} className="group inline-flex items-center gap-2 rounded-full bg-navy-800 text-white px-6 py-3 text-sm font-medium shadow-card hover:shadow-pop hover:-translate-y-0.5 transition-all">Sign in as student<ArrowRight size={16} className="text-accent-400 group-hover:translate-x-0.5 transition-transform"/></button>
    <a href="#roles" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-navy-800 hover:border-brand-500 transition-colors">Choose another role</a></div></div>
  <Preview/></section>

 {/* About */}
 <section className="relative px-6 lg:px-12 pb-16 max-w-6xl mx-auto">
  <div className="bg-white border rounded-xl2 shadow-card overflow-hidden grid lg:grid-cols-5">
   <div className="lg:col-span-2 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r">
    <h2 className="font-serif text-xl font-semibold text-navy-800">About the platform</h2>
    <span className="h-1 w-10 bg-accent-500 rounded-full my-3 block"/>
    <p className="text-sm text-slate-600 leading-relaxed">{university.name} Digital Campus replaces scattered notices, spreadsheets and paperwork with one connected system. Students track their own academic life, teachers manage classes and performance records, and administrators oversee the entire department, all from dashboards built around what each person needs.</p></div>
   <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3">{features.map(([I,l,d],i)=><div key={l} className={`p-5 ${i%3!==2?'sm:border-r':''} ${i<3?'sm:border-b':''} ${i%2===0?'border-r sm:border-r-0':''} ${i<4?'border-b sm:border-b-0':''}`}>
    <span className="h-9 w-9 rounded-full bg-surface border grid place-items-center mb-3"><I size={16} className="text-brand-600"/></span>
    <p className="text-sm font-medium text-navy-800">{l}</p><p className="text-xs text-slate-500 mt-1">{d}</p></div>)}</div></div></section>

 {/* Role selection */}
 <section id="roles" className="relative px-6 lg:px-12 pb-20 max-w-6xl mx-auto scroll-mt-6">
  <h2 className="text-center font-serif text-2xl font-semibold text-navy-800 mb-1">Continue as</h2>
  <p className="text-center text-sm text-slate-500 mb-8">Choose your role to sign in to your dashboard.</p>
  <div className="grid sm:grid-cols-3 gap-5">{roles.map(r=><button key={r.key} onClick={()=>nav(`/login?role=${r.key}`)}
   className="group relative overflow-hidden text-left bg-white border rounded-xl2 p-6 shadow-card hover:shadow-pop hover:-translate-y-1 hover:border-brand-500 transition-all">
   <span className="absolute left-0 top-0 h-1 w-full bg-accent-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"/>
   <div className="h-12 w-12 rounded-full bg-navy-800 text-accent-400 grid place-items-center mb-5"><r.icon size={22}/></div>
   <h3 className="font-serif text-lg font-semibold text-navy-800">{r.label}</h3>
   <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{r.desc}</p>
   <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">Sign in<ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/></span></button>)}</div></section>

 <footer className="relative text-center text-xs text-slate-400 pb-6">{university.name} · {university.city}</footer></div>}

export function Login({onLogin}){
 const [params]=useSearchParams();const roleKey=params.get('role')||'student'
 const role=roles.find(r=>r.key===roleKey)||roles[0]
 const [id,setId]=useState(roleKey==='student'?'0101CS251042':roleKey==='teacher'?'FAC-0142':'admin@rgpv.ac.in')
 const [pw,setPw]=useState('demo1234'),[err,setErr]=useState(''),[show,setShow]=useState(false)
 const submit=e=>{e.preventDefault();if(!id.trim())return setErr('Enter your ID or email.');if(pw.length<6)return setErr('Password must be at least 6 characters.');onLogin(roleKey)}
 return <div className="min-h-screen bg-surface grid lg:grid-cols-2">

  {/* Left: role panel */}
  <aside className="relative hidden lg:flex flex-col justify-between bg-navy-800 text-white p-12 overflow-hidden">
   <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)',backgroundSize:'22px 22px'}}/>
   <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border-2 border-accent-500/30"/>
   <div className="absolute -bottom-20 -left-12 h-72 w-72 rounded-full border-2 border-accent-500/20"/>
   <Link to="/" className="relative flex items-center gap-2.5 text-sm">
    <span className="h-9 w-9 rounded-full border-2 border-accent-500 grid place-items-center font-serif font-semibold text-xs">RU</span>
    <span className="font-medium">{university.short}</span></Link>
   <div className="relative max-w-md">
    <span className="h-16 w-16 rounded-full bg-accent-500 text-navy-800 grid place-items-center mb-7"><role.icon size={28}/></span>
    <h1 className="font-serif text-4xl font-semibold leading-tight">{role.label} sign in</h1>
    <span className="h-1 w-14 bg-accent-500 rounded-full my-5 block"/>
    <p className="text-white/70 leading-relaxed">{role.desc}</p>
    <ul className="mt-7 space-y-3">{role.perks.map(p=><li key={p} className="flex items-center gap-3 text-sm text-white/85">
     <span className="h-5 w-5 rounded-full bg-accent-500/20 text-accent-400 grid place-items-center shrink-0"><Check size={12}/></span>{p}</li>)}</ul></div>
   <p className="relative text-xs text-white/40">{university.name} · {university.city}</p></aside>

  {/* Right: form */}
  <main className="relative flex flex-col px-6 py-5 overflow-hidden">
   <Dots/>
   <div className="relative flex items-center justify-between text-sm">
    <Link to="/" className="lg:invisible flex items-center gap-2.5"><span className="h-8 w-8 rounded-full border-2 border-accent-500 grid place-items-center font-serif font-semibold text-navy-800 text-xs">RU</span>
     <span className="font-medium text-navy-800">{university.short}</span></Link>
    <Link to="/" className="text-slate-500 hover:text-navy-800 text-xs">← Choose a different role</Link></div>

   <div className="relative flex-1 grid place-items-center py-8">
    <div className="w-full max-w-sm">
     <div className="lg:hidden text-center mb-6">
      <span className="h-14 w-14 rounded-full bg-navy-800 text-accent-400 grid place-items-center mx-auto mb-4"><role.icon size={24}/></span>
      <h1 className="font-serif text-2xl font-semibold text-navy-800">{role.label} sign in</h1>
      <span className="h-1 w-12 bg-accent-500 rounded-full my-3 mx-auto block"/>
      <p className="text-slate-500 text-sm">{role.desc}</p></div>

     <form onSubmit={submit} className="bg-white border rounded-xl2 shadow-pop p-6 sm:p-7 text-left animate-slideUp" noValidate>
      <h2 className="hidden lg:block font-serif text-xl font-semibold text-navy-800 mb-1">Welcome back</h2>
      <p className="hidden lg:block text-sm text-slate-500 mb-5">Sign in to open your {role.label.toLowerCase()} dashboard.</p>
      <div className="flex p-1 bg-surface border rounded-full mb-5 text-sm">{roles.map(r=><Link key={r.key} to={`/login?role=${r.key}`} className={`flex-1 py-1.5 text-center rounded-full transition-colors ${r.key===roleKey?'bg-navy-800 text-white shadow-card':'text-slate-500 hover:text-navy-800'}`}>{r.label}</Link>)}</div>
      <p className="text-xs text-slate-500 bg-accent-500/10 border border-accent-500/30 rounded-lg px-3 py-2 mb-5">Demo mode: any password of 6+ characters works.</p>

      <label className="block text-sm text-slate-600 mb-4">{roleKey==='admin'?'Admin email':roleKey==='teacher'?'Faculty ID or email':'Enrollment number or email'}
       <span className="relative block mt-1.5"><UserRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
        <input value={id} onChange={e=>setId(e.target.value)} className="w-full border rounded-lg pl-10 pr-3 py-2.5 transition-shadow focus-visible:shadow-focus"/></span></label>
      <label className="block text-sm text-slate-600 mb-4">Password
       <span className="relative block mt-1.5"><Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
        <input type={show?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} className="w-full border rounded-lg pl-10 pr-10 py-2.5 transition-shadow focus-visible:shadow-focus"/>
        <button type="button" onClick={()=>setShow(s=>!s)} aria-label={show?'Hide password':'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-800">{show?<EyeOff size={16}/>:<Eye size={16}/>}</button></span></label>
      <label className="flex items-center gap-2 text-sm text-slate-600 mb-5"><input type="checkbox" defaultChecked className="rounded"/>Remember me on this device</label>
      {err&&<p role="alert" className="text-sm text-danger-600 mb-3">{err}</p>}
      <Btn type="submit" className="w-full">Sign in</Btn></form>
     <p className="text-center text-xs text-slate-400 mt-6 lg:hidden">{university.name} · {university.city}</p></div></div></main></div>}