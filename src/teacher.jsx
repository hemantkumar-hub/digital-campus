import {useState} from 'react'
import {Link} from 'react-router-dom'
import {Users,CalendarCheck,ClipboardEdit,Megaphone,Plus,Save,BookOpen} from 'lucide-react'
import {PageHeader,StatusBadge,Btn,Modal,ProgressRing,CountUp} from './components'
import {useToast} from './toast'
import {teacher,classRoster as seedRoster,teacherAnnouncements,timetable,days,todayName} from './data'

export function TeacherDashboard(){
 const roster=seedRoster
 const low=roster.filter(s=>s.status==='Low').length
 const avgAtt=Math.round(roster.reduce((a,s)=>a+s.attendance,0)/roster.length)
 const today=todayName(),todays=timetable[today]||[]
 const stats=[['Students taught',roster.length,Users],['Avg. class attendance',avgAtt+'%',CalendarCheck],['Attendance concerns',low,ClipboardEdit],["Today's classes",todays.length,BookOpen]]
 return <>
 <div className="rounded-xl2 bg-gradient-to-br from-navy-800 via-navy-700 to-brand-700 text-white p-6 lg:p-8 mb-6 relative overflow-hidden">
  <div className="absolute -top-16 -right-10 h-52 w-52 rounded-full bg-accent-500/20 blur-3xl"/>
  <div className="relative"><p className="text-slate-300 text-sm">{new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}</p>
   <h1 className="font-serif text-2xl lg:text-3xl font-semibold mt-1">Welcome, {teacher.name}</h1>
   <p className="text-slate-300 text-sm mt-1">{teacher.designation} · {teacher.department}</p></div></div>
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">{stats.map(([l,v,I])=>
  <div key={l} className="bg-white border rounded-xl2 p-4 shadow-card"><I size={16} className="text-brand-600 mb-2"/><div className="text-xs text-slate-500">{l}</div>
   <div className="text-2xl font-bold text-navy-800 mt-0.5">{typeof v==='number'?<CountUp value={v}/>:v}</div></div>)}</div>
 <div className="grid lg:grid-cols-2 gap-6">
  <section><h2 className="font-semibold mb-2 text-navy-800">My subjects</h2>
   <div className="bg-white border rounded-xl2 divide-y shadow-card">{teacher.subjects.map(s=><Link key={s.code} to="/teacher/classes" className="p-4 flex justify-between items-center hover:bg-slate-50/70 transition-colors">
    <span><b className="font-medium text-navy-800">{s.name}</b><span className="block text-xs text-slate-500">{s.batch}</span></span><span className="text-xs text-slate-400">{s.code}</span></Link>)}</div></section>
  <section><h2 className="font-semibold mb-2 text-navy-800">Announcements</h2>
   <div className="bg-white border rounded-xl2 divide-y shadow-card text-sm">{teacherAnnouncements.map(a=><div key={a.t} className="p-3 flex justify-between gap-3"><span>{a.t}</span><span className="text-slate-400 text-xs shrink-0">{a.d}</span></div>)}</div></section></div></>}

export function TeacherClasses(){
 const today=todayName(),[day,setDay]=useState(days.includes(today)?today:'Monday')
 return <><PageHeader title="My Classes" sub={`${teacher.name} · ${teacher.department}`}/>
 <div className="grid sm:grid-cols-2 gap-4 mb-6">{teacher.subjects.map(s=><div key={s.code} className="bg-white border rounded-xl2 p-4 shadow-card">
  <p className="font-semibold text-navy-800">{s.name}</p><p className="text-xs text-slate-500 mt-0.5">{s.batch} · {s.code}</p></div>)}</div>
 <h2 className="font-semibold mb-2 text-navy-800">Teaching timetable</h2>
 <div className="flex gap-1 overflow-x-auto mb-4 pb-1">{days.map(d=><button key={d} onClick={()=>setDay(d)} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors shrink-0 ${d===day?'bg-navy-800 text-white border-navy-800':'bg-white hover:border-brand-500'}`}>{d.slice(0,3)}</button>)}</div>
 <div className="bg-white border rounded-xl2 divide-y shadow-card">{(timetable[day]||[]).filter(c=>c.faculty===teacher.name).map(c=><div key={c.time} className="p-4 flex gap-4 text-sm"><span className="w-28 text-slate-500 shrink-0">{c.time}</span><span className="flex-1 font-medium text-navy-800">{c.subject}</span><span className="text-slate-500 text-xs">Room {c.room}</span></div>)}
  {!(timetable[day]||[]).some(c=>c.faculty===teacher.name)&&<p className="p-4 text-sm text-slate-400">No classes scheduled on {day}.</p>}</div></>}

export function TeacherStudents(){
 const [roster,setRoster]=useState(seedRoster),[sel,setSel]=useState(null),[att,setAtt]=useState(0),[marks,setMarks]=useState(0)
 const toast=useToast()
 const open=s=>{setSel(s);setAtt(s.attendance);setMarks(s.internal)}
 const save=()=>{setRoster(r=>r.map(s=>s.id===sel.id?{...s,attendance:att,internal:marks,status:att>=75?'Safe':'Low'}:s));toast(`${sel.name}'s record updated.`,'success');setSel(null)}
 return <><PageHeader title="Student Performance" sub={`${teacher.subjects[0].batch} · ${teacher.subjects[0].name}`}/>
 <div className="bg-white border rounded-xl2 overflow-x-auto shadow-card"><table className="w-full text-sm min-w-[560px]"><thead className="text-left text-slate-500 border-b"><tr>{['Student','ID','Attendance','Internal marks','Status',''].map(h=><th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
 <tbody className="divide-y">{roster.map(s=><tr key={s.id} className="hover:bg-slate-50/70 transition-colors"><td className="p-3 font-medium text-navy-800">{s.name}</td><td className="p-3 text-xs text-slate-400">{s.id}</td>
  <td className="p-3">{s.attendance}%</td><td className="p-3">{s.internal}/30</td><td className="p-3"><StatusBadge s={s.status}/></td>
  <td className="p-3"><button onClick={()=>open(s)} className="text-brand-600 text-xs font-medium flex items-center gap-1 hover:underline"><ClipboardEdit size={13}/>Edit</button></td></tr>)}</tbody></table></div>
 {sel&&<Modal title={`Edit — ${sel.name}`} onClose={()=>setSel(null)}>
  <label className="block text-sm mb-3">Attendance % <input type="number" min={0} max={100} value={att} onChange={e=>setAtt(+e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2"/></label>
  <label className="block text-sm mb-4">Internal marks (out of 30) <input type="number" min={0} max={30} value={marks} onChange={e=>setMarks(+e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2"/></label>
  <Btn className="w-full" onClick={save}><Save size={14}/>Save changes</Btn></Modal>}</>}

export function TeacherAnnouncements(){
 const [list,setList]=useState(teacherAnnouncements),[open,setOpen]=useState(false),[text,setText]=useState('')
 const toast=useToast()
 const submit=e=>{e.preventDefault();if(!text.trim())return;setList(l=>[{t:text,d:'Just now'},...l]);setText('');setOpen(false);toast('Announcement posted.','success')}
 return <><PageHeader title="Announcements" sub="Post updates for your students"><Btn onClick={()=>setOpen(true)}><Plus size={15}/>New announcement</Btn></PageHeader>
 <div className="bg-white border rounded-xl2 divide-y shadow-card text-sm">{list.map((a,i)=><div key={i} className="p-4 flex justify-between gap-3"><span>{a.t}</span><span className="text-slate-400 text-xs shrink-0">{a.d}</span></div>)}</div>
 {open&&<Modal title="New announcement" onClose={()=>setOpen(false)}><form onSubmit={submit} className="space-y-3 text-sm">
  <label className="block">Message<textarea required value={text} onChange={e=>setText(e.target.value)} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2"/></label>
  <Btn type="submit" className="w-full"><Megaphone size={14}/>Post</Btn></form></Modal>}</>}

export function TeacherProfile(){
 return <><PageHeader title="Profile"/>
 <div className="rounded-xl2 bg-gradient-to-br from-navy-800 to-brand-700 text-white p-6 flex items-center gap-4 mb-6">
  <span className="h-16 w-16 rounded-full bg-white/15 grid place-items-center text-2xl font-serif font-semibold shrink-0">{teacher.name[0]}</span>
  <div><h2 className="text-xl font-serif font-semibold">{teacher.name}</h2><p className="text-slate-300 text-sm">{teacher.designation} · {teacher.department}</p><p className="text-slate-300 text-xs">{teacher.id}</p></div></div>
 <div className="grid sm:grid-cols-2 gap-6">
  <section className="bg-white border rounded-xl2 p-5 shadow-card"><h3 className="font-semibold text-navy-800 mb-3">Contact</h3>
   <dl className="text-sm space-y-2">{[['Email',teacher.email],['Phone',teacher.phone]].map(([l,v])=><div key={l} className="flex justify-between gap-3"><dt className="text-slate-500">{l}</dt><dd className="font-medium text-right break-all">{v}</dd></div>)}</dl></section>
  <section className="bg-white border rounded-xl2 p-5 shadow-card"><h3 className="font-semibold text-navy-800 mb-3">Subjects taught</h3>
   <ul className="text-sm space-y-2">{teacher.subjects.map(s=><li key={s.code} className="flex justify-between"><span>{s.name}</span><span className="text-slate-400 text-xs">{s.batch}</span></li>)}</ul></section></div></>}
