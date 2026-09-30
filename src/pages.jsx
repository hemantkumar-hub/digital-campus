import {useState} from 'react'
import {Link} from 'react-router-dom'
import {IndianRupee,FileText,Bus,Building2,LifeBuoy,Send,Mic,Square,Download,Eye,ShieldCheck,
 TrendingUp,TrendingDown,Plus,Search as SearchIcon,Filter,ChevronRight,MapPin,Wrench,Sparkles} from 'lucide-react'
import {PageHeader,StatusBadge,Btn,Modal,EmptyState,ProgressRing,CountUp} from './components'
import {useToast} from './toast'
import {student,courses,pct,attStatus,attendance,fees,inr,timetable,days,todayName,nextClass,classNowStatus,exams,
 announcements,lowAttendance,transport,certificates,hostel,helpdesk,totalCredits,university,parent} from './data'

/* ---------- Dashboard ---------- */
const hour=new Date().getHours(),greet=hour<12?'Good morning':hour<17?'Good afternoon':'Good evening'
export function Dashboard(){
 const day=todayName(),list=timetable[day]||[],nc=nextClass(),[recNote,setRecNote]=useState(null)
 const stats=[
  {l:'Attendance',v:attendance.percent,suf:'%',to:'/attendance',trend:attendance.percent-attendance.trend[attendance.trend.length-2],icon:StatIcon('Safe')},
  {l:'CGPA',v:student.cgpa,to:'/academics',trend:+(student.cgpa-student.cgpaTrend[student.cgpaTrend.length-2]).toFixed(1),isFloat:true},
  {l:'Fees pending',v:fees.pending,to:'/fees',money:true},
  {l:"Today's classes",v:list.length,to:'/timetable'}]
 const actions=[['Pay fees','/fees',IndianRupee],['Download certificate','/certificates',FileText],['Check transport','/transport',Bus],['Hostel','/hostel',Building2],['Raise helpdesk request','/helpdesk',LifeBuoy]]
 return <>
 <div className="rounded-xl2 bg-gradient-to-br from-navy-800 via-navy-700 to-brand-700 text-white p-6 lg:p-8 mb-6 relative overflow-hidden animate-slideUp">
  <div className="absolute -top-16 -right-10 h-52 w-52 rounded-full bg-accent-500/20 blur-3xl"/>
  <div className="relative flex flex-wrap items-end justify-between gap-4">
   <div><p className="text-slate-300 text-sm">{new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})} · Semester {student.semester}</p>
    <h1 className="text-2xl lg:text-3xl font-serif font-semibold mt-1">{greet}, {student.name} 👋</h1>
    <p className="text-slate-300 text-sm mt-1">Here's your campus overview for today.</p></div>
   <Link to="/timetable" className="bg-white/10 hover:bg-white/15 transition-colors rounded-xl px-4 py-3 text-sm shrink-0">
    <span className="text-slate-300 text-xs">Next class</span><br/><b>{nc.cls?.subject}</b> · {nc.cls?.time.split(' ')[0]}</Link></div></div>

 <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">{stats.map((s,i)=>
  <Link key={s.l} to={s.to} style={{animationDelay:`${i*60}ms`}} className="animate-slideUp bg-white border rounded-xl2 p-4 shadow-card hover:shadow-pop hover:-translate-y-0.5 transition-all duration-200">
   <div className="text-xs text-slate-500">{s.l}</div>
   <div className="text-2xl font-bold text-navy-800 mt-1">{s.money?inr(s.v):<><CountUp value={s.v}/>{s.suf||''}</>}</div>
   {typeof s.trend==='number'&&<div className={`flex items-center gap-1 text-xs mt-1 ${s.trend>=0?'text-success-600':'text-danger-600'}`}>
    {s.trend>=0?<TrendingUp size={13}/>:<TrendingDown size={13}/>}{Math.abs(s.trend)}{s.isFloat?'':'%'} from last month</div>}</Link>)}</div>

 <div className="grid lg:grid-cols-3 gap-6">
  <section className="lg:col-span-2 space-y-6">
   <div>
    <h2 className="font-semibold mb-2 text-navy-800">{list.length?"Today's schedule":`Next classes (${nc.day})`}</h2>
    <div className="bg-white border rounded-xl2 divide-y shadow-card">{(list.length?list:timetable[nc.day]).map(c=>{const st=list.length?classNowStatus(c):'upcoming'
     return <div key={c.time} className="p-3.5 flex gap-4 text-sm items-center hover:bg-slate-50/70 transition-colors">
      <span className="w-28 text-slate-500 shrink-0">{c.time}</span>
      <span className="flex-1"><b className="font-medium text-navy-800">{c.subject}</b><br/><span className="text-slate-500 text-xs">{c.faculty} · Room {c.room}</span></span>
      {st==='live'&&<StatusBadge s="Open"/>}{nc.cls===c&&st!=='live'&&<StatusBadge s="Pending"/>}</div>})}</div></div>
   <div><h2 className="font-semibold mb-2 text-navy-800">Academic performance</h2>
    <div className="bg-white border rounded-xl2 p-4 shadow-card"><div className="flex items-end gap-3 h-28">
     {student.cgpaTrend.map((v,i)=><div key={i} className="flex-1 flex flex-col items-center gap-1 justify-end">
      <div className="w-full max-w-[36px] bg-gradient-to-t from-brand-500 to-accent-500 rounded-t-md transition-all duration-700" style={{height:`${v/10*100}%`}}/>
      <span className="text-[11px] text-slate-400">S{i+1}</span></div>)}</div>
     <p className="text-xs text-slate-500 mt-2">CGPA trend across semesters · currently <b className="text-navy-800">{student.cgpa}</b></p></div></div>
   <div><h2 className="font-semibold mb-2 text-navy-800">Campus services</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{actions.map(([l,to,I])=><Link key={l} to={to} className="group flex items-center gap-2 border bg-white rounded-xl px-3 py-3 text-sm hover:border-brand-500 hover:shadow-card transition-all">
     <I size={16} className="text-brand-600 transition-transform group-hover:scale-110"/>{l}</Link>)}</div></div></section>
  <aside className="space-y-6">
   <section><h2 className="font-semibold mb-2 text-navy-800">Smart recommendations <span className="text-xs font-normal text-slate-400">(demo)</span></h2>
    <ul className="text-sm space-y-2">
     <li><button onClick={()=>setRecNote(`Revise Data Structures — assessment on ${exams[0].date}.`)} className="w-full text-left border-l-2 border-brand-500 bg-white rounded-r-lg px-3 py-2 hover:bg-brand-50/50 transition-colors shadow-card">Revise Data Structures before the {exams[0].date} assessment.</button></li>
     {lowAttendance.map(c=><li key={c.name}><button onClick={()=>setRecNote(`${c.name} attendance is ${pct(c)}%. Attend upcoming classes to stay above 75%.`)} className="w-full text-left border-l-2 border-warning-500 bg-white rounded-r-lg px-3 py-2 hover:bg-warning-50/50 transition-colors shadow-card">Attendance in {c.name} is {pct(c)}%, close to the 75% threshold.</button></li>)}
    </ul></section>
   <section><h2 className="font-semibold mb-2 text-navy-800">Announcements</h2>
    <ul className="text-sm divide-y bg-white border rounded-xl2 shadow-card">{announcements.map(a=><li key={a.t} className="p-3 flex justify-between gap-3 hover:bg-slate-50/70 transition-colors"><span>{a.t}</span><span className="text-slate-400 shrink-0 text-xs">{a.d}</span></li>)}</ul></section>
   <section><h2 className="font-semibold mb-2 text-navy-800">Student support</h2>
    <div className="bg-white border rounded-xl2 p-4 shadow-card flex items-center gap-3">
     <ProgressRing value={attendance.percent} size={56} stroke={6} tone={attendance.percent>=80?'success':'warning'}/>
     <p className="text-xs text-slate-500">Support indicator based on demo data. <Link to="/insights" className="text-brand-600 font-medium">View insights →</Link></p></div></section>
  </aside></div>
 {recNote&&<Modal title="Recommendation" onClose={()=>setRecNote(null)}><p className="text-sm text-slate-600">{recNote}</p><Btn className="mt-4" onClick={()=>setRecNote(null)}>Got it</Btn></Modal>}</>}

function StatIcon(){return null}

/* ---------- Academics ---------- */
export function Academics(){
 const [sel,setSel]=useState(null)
 return <>
 <PageHeader title="Academics" sub={`Semester ${student.semester} · ${totalCredits} credits`}/>
 <div className="grid sm:grid-cols-3 gap-4 mb-6">
  <div className="bg-white border rounded-xl2 p-4 shadow-card flex items-center gap-4">
   <ProgressRing value={student.cgpa/10*100} tone="brand"/><div><div className="text-xs text-slate-500">CGPA</div><div className="text-2xl font-bold text-navy-800">{student.cgpa}<span className="text-sm text-slate-400">/10</span></div></div></div>
  <div className="bg-white border rounded-xl2 p-4 shadow-card"><div className="text-xs text-slate-500">Credits this semester</div><div className="text-2xl font-bold text-navy-800 mt-1">{totalCredits}</div><p className="text-xs text-slate-500 mt-1">{courses.length} subjects</p></div>
  <div className="bg-white border rounded-xl2 p-4 shadow-card"><div className="text-xs text-slate-500">Academic advisor</div><div className="text-lg font-semibold text-navy-800 mt-1">{student.advisor}</div></div></div>
 <div className="bg-white border rounded-xl2 shadow-card overflow-x-auto">
  <table className="w-full text-sm min-w-[640px]"><thead className="text-left text-slate-500 border-b"><tr>{['Subject','Faculty','Credits','Internal','Attendance',''].map(h=><th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
  <tbody className="divide-y">{courses.map(c=>{const p=pct(c)
   return <tr key={c.name} onClick={()=>setSel(c)} className="cursor-pointer hover:bg-slate-50/70 transition-colors">
    <td className="p-3 font-medium text-navy-800">{c.name}<span className="block text-xs text-slate-400">{c.code}</span></td>
    <td className="p-3">{c.faculty}</td><td className="p-3">{c.credits}</td><td className="p-3">{c.internal}/{c.maxInternal}</td>
    <td className="p-3"><div className="flex items-center gap-2"><div className="w-16 h-1.5 bg-slate-100 rounded"><div className="h-full bg-brand-600 rounded transition-all duration-700" style={{width:p+'%'}}/></div>{p}%</div></td>
    <td className="p-3 text-slate-300"><ChevronRight size={16}/></td></tr>})}</tbody></table></div>
 {sel&&<Modal title={sel.name} onClose={()=>setSel(null)}>
  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
   {[['Faculty',sel.faculty],['Code',sel.code],['Credits',sel.credits],['Attendance',`${pct(sel)}%`],['Internal marks',`${sel.internal}/${sel.maxInternal}`],['Status',attStatus(pct(sel))]].map(([l,v])=>
    <div key={l}><div className="text-xs text-slate-400">{l}</div><div className="font-medium text-navy-800">{v}</div></div>)}</div>
  <div className="text-xs text-slate-400 mb-1">Recent internal performance</div>
  <div className="flex items-end gap-2 h-16">{sel.trend.map((v,i)=><div key={i} className="flex-1 bg-gradient-to-t from-brand-500 to-accent-500 rounded-t transition-all duration-700" style={{height:v+'%'}}/>)}</div>
  <p className="text-xs text-slate-500 mt-3">Upcoming assessment: {exams.find(e=>e.subject===sel.name)?.date||'Not yet scheduled'}</p></Modal>}</>}

/* ---------- Attendance ---------- */
export function Attendance(){
 const [sel,setSel]=useState(null)
 return <>
 <PageHeader title="Attendance" sub={`Semester ${student.semester}`}/>
 <div className="grid sm:grid-cols-3 gap-4 mb-6">
  <div className="bg-white border rounded-xl2 p-4 shadow-card flex items-center gap-4 sm:col-span-1">
   <ProgressRing value={attendance.percent} tone={attendance.percent>=80?'success':attendance.percent>=75?'warning':'danger'}/>
   <div><div className="text-xs text-slate-500">Overall</div><div className="text-2xl font-bold text-navy-800"><CountUp value={attendance.percent} suffix="%"/></div></div></div>
  <div className="bg-white border rounded-xl2 p-4 shadow-card"><div className="text-xs text-slate-500">Classes attended</div><div className="text-2xl font-bold text-success-600 mt-1">{attendance.present}</div></div>
  <div className="bg-white border rounded-xl2 p-4 shadow-card"><div className="text-xs text-slate-500">Classes missed</div><div className="text-2xl font-bold text-danger-600 mt-1">{attendance.missed}</div></div></div>
 <div className="bg-white border rounded-xl2 overflow-x-auto shadow-card"><table className="w-full text-sm min-w-[560px]"><thead className="text-left text-slate-500 border-b"><tr>{['Subject','Faculty','Present','Total','Attendance','Status'].map(h=><th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
 <tbody className="divide-y">{courses.map(c=>{const p=pct(c);return <tr key={c.name} onClick={()=>setSel(c)} className="cursor-pointer hover:bg-slate-50/70 transition-colors"><td className="p-3 font-medium text-navy-800">{c.name}</td><td className="p-3">{c.faculty}</td><td className="p-3">{c.present}</td><td className="p-3">{c.total}</td>
 <td className="p-3"><div className="flex items-center gap-2"><div className="w-20 h-1.5 bg-slate-100 rounded"><div className="h-full bg-brand-600 rounded transition-all duration-700" style={{width:p+'%'}}/></div>{p}%</div></td><td className="p-3"><StatusBadge s={attStatus(p)}/></td></tr>})}</tbody></table></div>
 <p className="text-xs text-slate-500 mt-2">Safe: 80% and above · Watch: 75–79% · Low: below 75%</p>
 {sel&&<Modal title={sel.name} onClose={()=>setSel(null)}><div className="grid grid-cols-3 gap-3 text-sm text-center">
  <div><div className="text-2xl font-bold text-success-600">{sel.present}</div><div className="text-xs text-slate-500">Present</div></div>
  <div><div className="text-2xl font-bold text-danger-600">{sel.total-sel.present}</div><div className="text-xs text-slate-500">Absent</div></div>
  <div><div className="text-2xl font-bold text-navy-800">{sel.total}</div><div className="text-xs text-slate-500">Total classes</div></div></div></Modal>}</>}

/* ---------- Timetable ---------- */
export function Timetable(){
 const today=todayName(),[day,setDay]=useState(days.includes(today)?today:'Monday'),[sel,setSel]=useState(null),[view,setView]=useState('week')
 const isToday=day===today
 return <>
 <PageHeader title="Timetable" sub="Weekly view">
  <div className="flex border rounded-lg overflow-hidden text-sm">{['week','day'].map(v=><button key={v} onClick={()=>setView(v)} className={`px-3 py-1.5 capitalize transition-colors ${view===v?'bg-navy-800 text-white':'bg-white hover:bg-slate-50'}`}>{v}</button>)}</div></PageHeader>
 <div className="flex gap-1 overflow-x-auto mb-4 pb-1">{days.map(d=><button key={d} onClick={()=>setDay(d)} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors shrink-0 ${d===day?'bg-navy-800 text-white border-navy-800':'bg-white hover:border-brand-500'}`}>{d.slice(0,3)}{d===today&&<span className="ml-1 text-accent-400">●</span>}</button>)}</div>
 <div key={day} className="bg-white border rounded-xl2 divide-y shadow-card animate-fadeIn">{timetable[day].map(c=>{const st=isToday?classNowStatus(c):'upcoming'
  return <button key={c.time} onClick={()=>setSel(c)} className="w-full text-left p-4 flex gap-4 text-sm hover:bg-slate-50/70 transition-colors items-center">
   <span className="w-28 text-slate-500 shrink-0">{c.time}</span><span className="flex-1 font-medium text-navy-800">{c.subject}<span className="block text-xs text-slate-400 font-normal">{c.faculty}</span></span>
   <span className="text-slate-500 text-xs">Room {c.room}</span>{st==='live'&&<StatusBadge s="Open"/>}</button>})}</div>
 <h2 className="font-semibold mt-8 mb-2 text-navy-800">Upcoming examinations</h2>
 <div className="bg-white border rounded-xl2 divide-y text-sm shadow-card">{exams.map(e=><div key={e.subject} className="p-3 flex justify-between"><span>{e.subject} <span className="text-slate-500">· {e.type}</span></span><span className="font-medium text-navy-800">{e.date}</span></div>)}</div>
 {sel&&<Modal title={sel.subject} onClose={()=>setSel(null)}><dl className="text-sm space-y-2">
  <div className="flex justify-between"><dt className="text-slate-500">Day</dt><dd className="font-medium">{day}</dd></div>
  <div className="flex justify-between"><dt className="text-slate-500">Time</dt><dd className="font-medium">{sel.time}</dd></div>
  <div className="flex justify-between"><dt className="text-slate-500">Room</dt><dd className="font-medium">{sel.room}</dd></div>
  <div className="flex justify-between"><dt className="text-slate-500">Faculty</dt><dd className="font-medium">{sel.faculty}</dd></div>
  <div className="flex justify-between"><dt className="text-slate-500">Course code</dt><dd className="font-medium">{sel.code}</dd></div></dl></Modal>}</>}

/* ---------- Fees ---------- */
export function Fees(){
 const [open,setOpen]=useState(false),[done,setDone]=useState(false),toast=useToast()
 const paidPct=Math.round(fees.paid/fees.total*100)
 return <>
 <PageHeader title="Fees" sub={`Semester ${student.semester}`}><Btn onClick={()=>{setDone(false);setOpen(true)}}><IndianRupee size={16}/>Pay now</Btn></PageHeader>
 <div className="rounded-xl2 bg-gradient-to-br from-navy-800 to-brand-700 text-white p-6 mb-6">
  <div className="flex flex-wrap justify-between gap-4">
   <div><p className="text-slate-300 text-xs">Total semester fee</p><p className="text-2xl font-bold">{inr(fees.total)}</p></div>
   <div><p className="text-slate-300 text-xs">Paid</p><p className="text-2xl font-bold text-success-400">{inr(fees.paid)}</p></div>
   <div><p className="text-slate-300 text-xs">Pending</p><p className="text-2xl font-bold text-warning-400">{inr(fees.pending)}</p></div>
   <div><p className="text-slate-300 text-xs">Next due date</p><p className="text-2xl font-bold">{fees.due}</p></div></div>
  <div className="h-2 bg-white/15 rounded-full mt-5 overflow-hidden"><div className="h-full bg-gradient-to-r from-success-500 to-accent-500 rounded-full transition-all duration-1000" style={{width:paidPct+'%'}}/></div>
  <p className="text-xs text-slate-300 mt-1.5">{paidPct}% paid</p></div>
 <h2 className="font-semibold mb-2 text-navy-800">Payment history</h2>
 <div className="bg-white border rounded-xl2 overflow-x-auto shadow-card"><table className="w-full text-sm min-w-[560px]"><thead className="text-left text-slate-500 border-b"><tr>{['Date','Transaction ID','Description','Amount','Status'].map(h=><th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead><tbody className="divide-y">{fees.history.map(h=><tr key={h.txn} className="hover:bg-slate-50/70 transition-colors"><td className="p-3">{h.date}</td><td className="p-3 font-mono text-xs">{h.txn}</td><td className="p-3">{h.desc}</td><td className="p-3">{inr(h.amount)}</td><td className="p-3"><StatusBadge s={h.status}/></td></tr>)}</tbody></table></div>
 {open&&<Modal title="Confirm payment" onClose={()=>setOpen(false)}>{done?<div className="text-center py-2">
   <div className="h-12 w-12 rounded-full bg-success-50 text-success-600 grid place-items-center mx-auto mb-3"><ShieldCheck size={24}/></div>
   <p className="font-medium text-navy-800">Payment demo completed</p><p className="text-sm text-slate-500 mt-1">No real payment was processed. In the live product this opens the university payment gateway.</p>
   <Btn className="mt-4" onClick={()=>{setOpen(false);toast('Payment demo completed.','success')}}>Close</Btn></div>:<><p className="text-sm">Amount payable: <b>{inr(fees.pending)}</b><br/>Due {fees.due}</p><div className="flex gap-2 mt-4"><Btn onClick={()=>setDone(true)}>Confirm payment</Btn><Btn variant="ghost" onClick={()=>setOpen(false)}>Cancel</Btn></div></>}</Modal>}</>}

/* ---------- Certificates ---------- */
export function Certificates(){
 const [preview,setPreview]=useState(null),toast=useToast()
 return <>
 <PageHeader title="Certificates" sub="Digital documents issued by the university"/>
 <div className="grid sm:grid-cols-2 gap-4">{certificates.map(c=><div key={c.name} className="bg-white border rounded-xl2 p-5 shadow-card hover:shadow-pop transition-shadow">
  <div className="flex justify-between items-start gap-3"><div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 grid place-items-center shrink-0"><FileText size={18}/></div><StatusBadge s={c.status}/></div>
  <h3 className="font-semibold text-navy-800 mt-3">{c.name}</h3>
  <p className="text-xs text-slate-500 mt-0.5">{c.status==='Issued'?`Issued ${c.date}`:'Awaiting processing'}</p>
  {c.verified&&<p className="text-xs text-success-600 flex items-center gap-1 mt-1"><ShieldCheck size={12}/>Verified (demo)</p>}
  <div className="flex gap-2 mt-4">
   <Btn variant="ghost" disabled={c.status!=='Issued'} onClick={()=>setPreview(c)}><Eye size={14}/>Preview</Btn>
   <Btn variant="subtle" disabled={c.status!=='Issued'} onClick={()=>toast(`${c.name} downloaded.`,'success')}><Download size={14}/>Download</Btn></div></div>)}</div>
 {preview&&<Modal title="Certificate preview" onClose={()=>setPreview(null)}>
  <div className="border-4 border-double border-navy-800/70 rounded-lg p-6 text-center bg-gradient-to-b from-white to-slate-50">
   <p className="text-xs tracking-widest text-slate-400 uppercase">{university.name}</p>
   <h3 className="text-lg font-bold text-navy-800 mt-3">{preview.name}</h3>
   <p className="text-sm text-slate-500 mt-3">This is to certify that</p>
   <p className="font-semibold text-navy-800">{student.name}</p>
   <p className="text-sm text-slate-500">{student.program}</p>
   <p className="text-xs text-slate-400 mt-4">Issued {preview.date} · {university.short}</p>
   <p className="text-xs text-success-600 flex items-center justify-center gap-1 mt-2"><ShieldCheck size={12}/>Verified (demo document)</p></div>
  <Btn className="mt-4 w-full" onClick={()=>{toast(`${preview.name} downloaded.`,'success');setPreview(null)}}><Download size={14}/>Download</Btn></Modal>}</>}

/* ---------- Hostel ---------- */
export function Hostel(){
 const [open,setOpen]=useState(false),[cat,setCat]=useState('Electrical'),[desc,setDesc]=useState(''),[pri,setPri]=useState('Medium'),toast=useToast()
 const submit=e=>{e.preventDefault();if(!desc.trim())return;setOpen(false);setDesc('');toast('Maintenance request submitted.','success')}
 return <>
 <PageHeader title="Hostel" sub="Room and mess details"><Btn onClick={()=>setOpen(true)}><Wrench size={15}/>Raise maintenance request</Btn></PageHeader>
 <div className="grid sm:grid-cols-3 gap-4 mb-6">
  {[['Room',`${hostel.room}, ${hostel.floor}`],['Block',hostel.block],['Mess',hostel.mess]].map(([l,v])=><div key={l} className="bg-white border rounded-xl2 p-4 shadow-card"><div className="text-xs text-slate-500">{l}</div><div className="font-semibold text-navy-800 mt-1">{v}</div></div>)}</div>
 <h2 className="font-semibold mb-2 text-navy-800">Roommates</h2>
 <div className="flex gap-2 mb-6">{hostel.roommates.map(r=><span key={r} className="bg-white border rounded-full px-3 py-1.5 text-sm shadow-card">{r}</span>)}</div>
 <h2 className="font-semibold mb-2 text-navy-800">Maintenance requests</h2>
 {hostel.maintenance.length===0?<EmptyState title="No maintenance requests" text="Raise a request if something in your room needs attention."/>:
 <div className="bg-white border rounded-xl2 divide-y shadow-card">{hostel.maintenance.map(m=><div key={m.id} className="p-4 text-sm"><div className="flex justify-between"><span className="font-medium text-navy-800">{m.category} — {m.desc}</span><StatusBadge s={m.status}/></div><p className="text-xs text-slate-400 mt-1">{m.id} · Raised {m.date} · Priority {m.priority}</p></div>)}</div>}
 {open&&<Modal title="Raise maintenance request" onClose={()=>setOpen(false)}><form onSubmit={submit} className="space-y-3 text-sm">
  <label className="block">Category<select value={cat} onChange={e=>setCat(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2">{['Electrical','Plumbing','Furniture','Internet','Other'].map(c=><option key={c}>{c}</option>)}</select></label>
  <label className="block">Priority<select value={pri} onChange={e=>setPri(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2">{['Low','Medium','High'].map(c=><option key={c}>{c}</option>)}</select></label>
  <label className="block">Description<textarea required value={desc} onChange={e=>setDesc(e.target.value)} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2"/></label>
  <Btn type="submit" className="w-full">Submit request</Btn></form></Modal>}</>}

/* ---------- Transport ---------- */
export function Transport(){
 const [open,setOpen]=useState(false),[msg,setMsg]=useState(''),toast=useToast()
 const submit=e=>{e.preventDefault();setOpen(false);setMsg('');toast('Transport issue reported.','success')}
 return <>
 <PageHeader title="Transport" sub={transport.route}><Btn variant="ghost" onClick={()=>setOpen(true)}>Report issue</Btn></PageHeader>
 <div className="grid sm:grid-cols-3 gap-4 mb-6">
  {[['Bus number',transport.bus],['Driver',transport.driver],['Status',null]].map(([l,v])=><div key={l} className="bg-white border rounded-xl2 p-4 shadow-card"><div className="text-xs text-slate-500">{l}</div>{v?<div className="font-semibold text-navy-800 mt-1">{v}</div>:<div className="mt-1"><StatusBadge s={transport.status}/></div>}</div>)}</div>
 <h2 className="font-semibold mb-3 text-navy-800">Route progress</h2>
 <div className="bg-white border rounded-xl2 p-5 shadow-card">
  <div className="relative pl-2">{transport.stops.map((s,i)=><div key={s.name} className="flex gap-3 pb-6 last:pb-0 relative">
   {i<transport.stops.length-1&&<span className={`absolute left-[7px] top-4 bottom-0 w-0.5 ${s.done?'bg-success-500':'bg-slate-200'}`}/>}
   <span className={`h-4 w-4 rounded-full shrink-0 mt-0.5 border-2 ${s.done?'bg-success-500 border-success-500':'bg-white border-slate-300'}`}/>
   <div><p className={`text-sm font-medium ${s.done?'text-navy-800':'text-slate-500'}`}>{s.name}</p><p className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={11}/>ETA {s.eta}</p></div></div>)}</div></div>
 {open&&<Modal title="Report transport issue" onClose={()=>setOpen(false)}><form onSubmit={submit} className="space-y-3 text-sm">
  <label className="block">What happened?<textarea required value={msg} onChange={e=>setMsg(e.target.value)} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="e.g. Bus arrived 15 minutes late"/></label>
  <Btn type="submit" className="w-full">Submit report</Btn></form></Modal>}</>}

/* ---------- Helpdesk ---------- */
export function Helpdesk(){
 const [open,setOpen]=useState(false),[sel,setSel]=useState(null),[q,setQ]=useState(''),[status,setStatus]=useState('All')
 const [cat,setCat]=useState('Academic'),[pri,setPri]=useState('Medium'),[desc,setDesc]=useState('')
 const toast=useToast()
 const counts={Open:helpdesk.filter(t=>t.status==='Open').length,'In Progress':helpdesk.filter(t=>t.status==='In Progress').length,Resolved:helpdesk.filter(t=>t.status==='Resolved').length}
 const filtered=helpdesk.filter(t=>(status==='All'||t.status===status)&&(t.subject.toLowerCase().includes(q.toLowerCase())||t.id.toLowerCase().includes(q.toLowerCase())))
 const submit=e=>{e.preventDefault();if(!desc.trim())return;setOpen(false);setDesc('');toast(`Helpdesk request created — ticket HD-${3300+Math.floor(Math.random()*90)}.`,'success')}
 return <>
 <PageHeader title="Helpdesk" sub="Track and raise university service requests"><Btn onClick={()=>setOpen(true)}><Plus size={16}/>Create ticket</Btn></PageHeader>
 <div className="grid grid-cols-3 gap-4 mb-6">{Object.entries(counts).map(([l,v])=><div key={l} className="bg-white border rounded-xl2 p-4 shadow-card text-center"><div className="text-2xl font-bold text-navy-800">{v}</div><div className="text-xs text-slate-500 mt-1">{l}</div></div>)}</div>
 <div className="flex flex-wrap gap-2 mb-4">
  <label className="flex-1 min-w-[200px] flex items-center gap-2 border rounded-lg px-3 py-2 bg-white text-sm"><SearchIcon size={15} className="text-slate-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search tickets" className="flex-1 outline-none"/></label>
  <label className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white text-sm"><Filter size={14} className="text-slate-400"/><select value={status} onChange={e=>setStatus(e.target.value)} className="outline-none bg-transparent">{['All','Open','In Progress','Resolved'].map(s=><option key={s}>{s}</option>)}</select></label></div>
 {filtered.length===0?<EmptyState title="No matching tickets" text="Try a different search or filter, or create a new request." action={<Btn onClick={()=>setOpen(true)}>Create request</Btn>}/>:
 <div className="bg-white border rounded-xl2 divide-y shadow-card">{filtered.map(t=><button key={t.id} onClick={()=>setSel(t)} className="w-full text-left p-4 flex justify-between items-center gap-3 hover:bg-slate-50/70 transition-colors">
  <div><p className="font-medium text-navy-800 text-sm">{t.subject}</p><p className="text-xs text-slate-400 mt-0.5">{t.id} · {t.category} · Raised {t.date}</p></div>
  <div className="flex items-center gap-2 shrink-0"><StatusBadge s={t.status}/><ChevronRight size={16} className="text-slate-300"/></div></button>)}</div>}
 {sel&&<Modal title={sel.id} onClose={()=>setSel(null)}>
  <p className="font-medium text-navy-800">{sel.subject}</p><p className="text-xs text-slate-400 mt-0.5">{sel.category} · Priority {sel.priority}</p>
  <div className="mt-4 space-y-3">{sel.timeline.map((s,i)=><div key={i} className="flex gap-3 text-sm"><span className="h-2 w-2 rounded-full bg-brand-600 mt-1.5 shrink-0"/><span><span className="block">{s.t}</span><span className="text-xs text-slate-400">{s.d}</span></span></div>)}</div></Modal>}
 {open&&<Modal title="Create helpdesk ticket" onClose={()=>setOpen(false)}><form onSubmit={submit} className="space-y-3 text-sm">
  <label className="block">Category<select value={cat} onChange={e=>setCat(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2">{['Academic','Fees','Hostel','Transport','Other'].map(c=><option key={c}>{c}</option>)}</select></label>
  <label className="block">Priority<select value={pri} onChange={e=>setPri(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2">{['Low','Medium','High'].map(c=><option key={c}>{c}</option>)}</select></label>
  <label className="block">Description<textarea required value={desc} onChange={e=>setDesc(e.target.value)} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2"/></label>
  <label className="block">Attachment<div className="mt-1 border border-dashed rounded-lg px-3 py-4 text-center text-slate-400 text-xs">Drag a file here or click to attach (demo only)</div></label>
  <Btn type="submit" className="w-full">Submit ticket</Btn></form></Modal>}</>}

/* ---------- Student Insights ---------- */
export function Insights(){
 return <><PageHeader title="Student Insights" sub="Based on demo data"/>
 <div className="grid lg:grid-cols-2 gap-6">
  <div className="bg-white border rounded-xl2 p-5 shadow-card">
   <h2 className="font-semibold text-navy-800 mb-3">Academic trend</h2>
   <div className="flex items-end gap-3 h-32">{student.cgpaTrend.map((v,i)=><div key={i} className="flex-1 flex flex-col items-center gap-1 justify-end"><div className="w-full max-w-[36px] bg-gradient-to-t from-brand-500 to-accent-500 rounded-t-md transition-all duration-700" style={{height:`${v/10*100}%`}}/><span className="text-[11px] text-slate-400">Sem {i+1}</span></div>)}</div></div>
  <div className="bg-white border rounded-xl2 p-5 shadow-card">
   <h2 className="font-semibold text-navy-800 mb-3">Attendance pattern</h2>
   <div className="flex items-end gap-3 h-32">{attendance.trend.map((v,i)=><div key={i} className="flex-1 flex flex-col items-center gap-1 justify-end"><div className="w-full max-w-[36px] bg-gradient-to-t from-accent-500 to-success-500 rounded-t-md transition-all duration-700" style={{height:v+'%'}}/><span className="text-[11px] text-slate-400">W{i+1}</span></div>)}</div></div>
  <div className="bg-white border rounded-xl2 p-5 shadow-card lg:col-span-2">
   <h2 className="font-semibold text-navy-800 mb-3 flex items-center gap-2"><Sparkles size={16} className="text-accent-500"/>Learning recommendations</h2>
   <ul className="text-sm space-y-2">{lowAttendance.map(c=><li key={c.name} className="border-l-2 border-warning-500 pl-3 py-1">Prioritise attendance in {c.name} — currently {pct(c)}%.</li>)}
    <li className="border-l-2 border-brand-500 pl-3 py-1">Revise Discrete Mathematics — internal marks trend is the flattest among your subjects.</li></ul></div>
  <div className="bg-white border rounded-xl2 p-5 shadow-card lg:col-span-2 flex items-center gap-4">
   <ProgressRing value={attendance.percent} tone={attendance.percent>=80?'success':'warning'}/>
   <div><h2 className="font-semibold text-navy-800">Support indicator</h2><p className="text-sm text-slate-500">Based on demo data — not a prediction. Overall engagement looks {attendance.percent>=80?'healthy':'worth a check-in with your advisor'}.</p></div></div>
 </div></>}

/* ---------- Profile ---------- */
export function Profile(){
 const [edit,setEdit]=useState(false),toast=useToast()
 return <><PageHeader title="Profile" sub="Personal and academic information"><Btn variant="ghost" onClick={()=>setEdit(true)}>Edit profile</Btn></PageHeader>
 <div className="rounded-xl2 bg-gradient-to-br from-navy-800 to-brand-700 text-white p-6 flex items-center gap-4 mb-6">
  <span className="h-16 w-16 rounded-full bg-white/15 grid place-items-center text-2xl font-bold shrink-0">{student.name[0]}</span>
  <div><h2 className="text-xl font-serif font-semibold">{student.name}</h2><p className="text-slate-300 text-sm">{student.id} · {student.program}</p><p className="text-slate-300 text-xs">Semester {student.semester} · {university.short}</p></div></div>
 <div className="grid sm:grid-cols-2 gap-6">
  <section className="bg-white border rounded-xl2 p-5 shadow-card"><h3 className="font-semibold text-navy-800 mb-3">Personal information</h3>
   <dl className="text-sm space-y-2">{[['Date of birth',student.dob],['Blood group',student.bloodGroup],['Address',student.address]].map(([l,v])=><div key={l} className="flex justify-between gap-3"><dt className="text-slate-500">{l}</dt><dd className="font-medium text-right">{v}</dd></div>)}</dl></section>
  <section className="bg-white border rounded-xl2 p-5 shadow-card"><h3 className="font-semibold text-navy-800 mb-3">Contact</h3>
   <dl className="text-sm space-y-2">{[['Email',student.email],['Phone',student.phone],['Emergency contact',`${student.emergency.name} · ${student.emergency.phone}`]].map(([l,v])=><div key={l} className="flex justify-between gap-3"><dt className="text-slate-500 shrink-0">{l}</dt><dd className="font-medium text-right break-all">{v}</dd></div>)}</dl></section>
  <section className="bg-white border rounded-xl2 p-5 shadow-card sm:col-span-2"><h3 className="font-semibold text-navy-800 mb-3">Documents</h3>
   <div className="flex flex-wrap gap-2">{certificates.map(c=><span key={c.name} className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm">{c.name}<StatusBadge s={c.status}/></span>)}</div></section></div>
 {edit&&<Modal title="Edit profile" onClose={()=>setEdit(false)}><form onSubmit={e=>{e.preventDefault();setEdit(false);toast('Profile updated successfully.','success')}} className="space-y-3 text-sm">
  <label className="block">Phone<input defaultValue={student.phone} className="mt-1 w-full border rounded-lg px-3 py-2"/></label>
  <label className="block">Address<input defaultValue={student.address} className="mt-1 w-full border rounded-lg px-3 py-2"/></label>
  <Btn type="submit" className="w-full">Save changes</Btn></form></Modal>}</>}

/* ---------- Parent portal ---------- */
export function ParentPortal(){
 return <><PageHeader title="Parent Portal" sub={`Viewing ${student.name}'s summary — welcome, ${parent.name}`}/>
 <div className="grid sm:grid-cols-3 gap-4 mb-6">
  {[['Attendance',attendance.percent+'%'],['CGPA',student.cgpa],['Fees pending',inr(fees.pending)]].map(([l,v])=><div key={l} className="bg-white border rounded-xl2 p-4 shadow-card text-center"><div className="text-xs text-slate-500">{l}</div><div className="text-2xl font-bold text-navy-800 mt-1">{v}</div></div>)}</div>
 <div className="grid lg:grid-cols-2 gap-6">
  <section><h2 className="font-semibold mb-2 text-navy-800">Upcoming examinations</h2><div className="bg-white border rounded-xl2 divide-y shadow-card text-sm">{exams.map(e=><div key={e.subject} className="p-3 flex justify-between"><span>{e.subject}</span><span className="text-slate-500">{e.date}</span></div>)}</div></section>
  <section><h2 className="font-semibold mb-2 text-navy-800">Announcements</h2><div className="bg-white border rounded-xl2 divide-y shadow-card text-sm">{announcements.map(a=><div key={a.t} className="p-3 flex justify-between gap-3"><span>{a.t}</span><span className="text-slate-400 text-xs shrink-0">{a.d}</span></div>)}</div></section></div></>}

/* ---------- Campus Assistant ---------- */
const answer=q=>{q=q.toLowerCase();const nc=nextClass()
 if(q.includes('attend'))return {t:`Your overall attendance is ${attendance.percent}%. ${lowAttendance.map(c=>`${c.name} is at ${pct(c)}%`).join('; ')||'All subjects are in a safe range'}.`,to:'/attendance',l:'View attendance'}
 if(q.includes('class')||q.includes('timetable')||q.includes('today'))return {t:`Your next class is ${nc.cls.subject} at ${nc.cls.time.split(' ')[0]} in Room ${nc.cls.room} (${nc.day}).`,to:'/timetable',l:'View timetable'}
 if(q.includes('fee'))return {t:`${inr(fees.pending)} is pending, due ${fees.due}.`,to:'/fees',l:'Open fees'}
 if(q.includes('certificate'))return {t:'Open Certificates, choose a document and select Download. Your Internship Certificate is still pending.',to:'/certificates',l:'Open certificates'}
 if(q.includes('bus')||q.includes('transport'))return {t:`${transport.route}: pickup at ${transport.pickup}, ${transport.time}. Status: ${transport.status}.`,to:'/transport',l:'View transport'}
 if(q.includes('helpdesk')||q.includes('ticket'))return {t:`You have ${helpdesk.filter(h=>h.status!=='Resolved').length} open helpdesk tickets.`,to:'/helpdesk',l:'Open helpdesk'}
 return {t:'I can help with attendance, timetable, fees, certificates, transport and helpdesk. Try one of the suggestions below.'}}
export function Assistant(){
 const [msgs,setMsgs]=useState([{r:'bot',t:'Hello! Ask me about your attendance, timetable, fees, certificates, transport or helpdesk.'}])
 const [q,setQ]=useState(''),[typing,setTyping]=useState(false),[voice,setVoice]=useState(false),[listening,setListening]=useState(false)
 const ask=t=>{if(!t.trim())return;setMsgs(m=>[...m,{r:'me',t}]);setQ('');setTyping(true)
  setTimeout(()=>{const a=answer(t);setMsgs(m=>[...m,{r:'bot',t:a.t,to:a.to,l:a.l}]);setTyping(false)},650)}
 const startVoice=()=>{setVoice(true);setListening(true);setTimeout(()=>{setListening(false);setTimeout(()=>{setVoice(false);ask("Today's timetable")},900)},1800)}
 return <>
 <div className="rounded-xl2 bg-gradient-to-br from-navy-800 via-brand-700 to-accent-600 text-white p-6 mb-4">
  <h1 className="text-xl font-serif font-semibold flex items-center gap-2">Campus Assistant</h1><p className="text-slate-200 text-sm mt-1">Your university services, in one conversation.</p></div>
 <div className="flex flex-wrap gap-2 mb-3">{['Check attendance',"Today's timetable",'Pending fees','Download certificate','Bus status','Helpdesk tickets'].map(c=><button key={c} onClick={()=>ask(c)} className="text-xs border rounded-full px-3 py-1.5 bg-white hover:border-brand-500 hover:text-brand-600 transition-colors shadow-card">{c}</button>)}</div>
 <div className="bg-white border rounded-xl2 p-4 space-y-3 min-h-[320px] shadow-card">
  {msgs.map((m,i)=><div key={i} className={`animate-slideUp ${m.r==='me'?'flex justify-end':''}`}><div className={`max-w-[85%] text-sm rounded-2xl px-4 py-2.5 ${m.r==='me'?'bg-navy-800 text-white rounded-br-sm':'bg-slate-100 text-slate-700 rounded-bl-sm'}`}>{m.t}{m.to&&<Link to={m.to} className="block mt-1.5 text-brand-600 font-medium">{m.l} →</Link>}</div></div>)}
  {typing&&<div className="flex gap-1 bg-slate-100 w-fit rounded-2xl rounded-bl-sm px-4 py-3"><span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-pulseSoft"/><span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-pulseSoft" style={{animationDelay:'.15s'}}/><span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-pulseSoft" style={{animationDelay:'.3s'}}/></div>}</div>
 <form onSubmit={e=>{e.preventDefault();ask(q)}} className="flex gap-2 mt-3">
  <input aria-label="Message" value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask about your campus services" className="flex-1 border rounded-lg px-3 py-2.5 text-sm transition-shadow focus-visible:shadow-focus"/>
  <Btn type="button" variant="ghost" aria-label="Voice assistant" onClick={startVoice}><Mic size={16}/></Btn>
  <Btn type="submit" aria-label="Send"><Send size={16}/></Btn></form>
 {voice&&<Modal title="Voice Assistant Demo" onClose={()=>setVoice(false)}><div className="text-center py-4">
  <div className={`h-16 w-16 rounded-full mx-auto grid place-items-center ${listening?'bg-danger-50 text-danger-600':'bg-brand-50 text-brand-600'}`}>{listening?<Square size={22}/>:<Mic size={22}/>}</div>
  <p className="mt-3 text-sm font-medium text-navy-800">{listening?'Listening…':'Processing your request…'}</p>
  {listening&&<div className="flex justify-center gap-1 mt-3 h-8 items-end">{[8,16,24,14,20,10].map((h,i)=><span key={i} className="w-1.5 bg-brand-500 rounded-full animate-pulseSoft" style={{height:h,animationDelay:`${i*80}ms`}}/>)}</div>}
  <p className="text-xs text-slate-400 mt-4">Frontend-only demo — no real voice recognition is used.</p></div></Modal>}</>}

export const Soon=({title})=><><PageHeader title={title}/><EmptyState title={`${title} is not built yet`} text="This route is reserved. It will use the same mock data as the rest of the portal."/></>
