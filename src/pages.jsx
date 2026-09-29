import {useState} from 'react'
import {Link} from 'react-router-dom'
import {IndianRupee,FileText,Bus,Building2,LifeBuoy,Send} from 'lucide-react'
import {PageHeader,StatusBadge,Btn,Modal,EmptyState} from './components'
import {student,courses,pct,attStatus,attendance,fees,inr,timetable,days,todayName,nextClass,exams,announcements,lowAttendance,transport,certificates} from './data'

export function Login({onLogin}){
 const [id,setId]=useState('0101CS251042'),[pw,setPw]=useState('demo1234'),[err,setErr]=useState('')
 const submit=e=>{e.preventDefault();if(!id.trim())return setErr('Enter your enrollment number or email.');if(pw.length<6)return setErr('Password must be at least 6 characters.');onLogin()}
 return <div className="min-h-screen grid lg:grid-cols-2">
 <div className="hidden lg:flex bg-navy text-white p-12 flex-col justify-end"><h1 className="text-3xl font-semibold max-w-sm">One portal for the entire university.</h1><p className="mt-3 text-slate-300 max-w-sm text-sm">Attendance, timetable, fees, certificates, hostel, transport and helpdesk in one place.</p></div>
 <div className="grid place-items-center p-6"><form onSubmit={submit} className="w-full max-w-sm space-y-4" noValidate>
  <div><div className="font-semibold text-navy">RGPV Bhopal</div><h2 className="text-xl font-semibold mt-4">Student sign in</h2><p className="text-sm text-slate-500">Demo mode: any password of 6+ characters works.</p></div>
  <label className="block text-sm">Enrollment number or email<input value={id} onChange={e=>setId(e.target.value)} className="mt-1 w-full border rounded px-3 py-2"/></label>
  <label className="block text-sm">Password<input type="password" value={pw} onChange={e=>setPw(e.target.value)} className="mt-1 w-full border rounded px-3 py-2"/></label>
  <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" defaultChecked/>Remember me on this device</label>
  {err&&<p role="alert" className="text-sm text-red-700">{err}</p>}
  <Btn type="submit" className="w-full">Sign in</Btn></form></div></div>}

const hour=new Date().getHours(),greet=hour<12?'Good morning':hour<17?'Good afternoon':'Good evening'
export function Dashboard(){
 const day=todayName(),list=timetable[day]||[],nc=nextClass()
 const stats=[['Attendance',attendance.percent+'%','/attendance'],['CGPA',student.cgpa.toFixed(1),'/academics'],['Fees pending',inr(fees.pending),'/fees'],["Today's classes",String(list.length),'/timetable']]
 const actions=[['Pay fees','/fees',IndianRupee],['Download certificate','/certificates',FileText],['Check transport','/transport',Bus],['Hostel','/hostel',Building2],['Raise helpdesk request','/helpdesk',LifeBuoy]]
 return <>
 <PageHeader title={`${greet}, ${student.name}`} sub="Here's what's happening with your campus life today."/>
 <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border rounded divide-x divide-y lg:divide-y-0">{stats.map(([l,v,to])=><Link key={l} to={to} className="p-4 hover:bg-slate-50"><div className="text-xs text-slate-500">{l}</div><div className="text-2xl font-semibold text-navy mt-1">{v}</div></Link>)}</div>
 <div className="grid lg:grid-cols-3 gap-6 mt-6">
  <section className="lg:col-span-2"><h2 className="font-semibold mb-2">{list.length?"Today's schedule":`Next classes (${nc.day})`}</h2>
   <div className="bg-white border rounded divide-y">{(list.length?list:timetable[nc.day]).map(c=><div key={c.time} className="p-3 flex gap-4 text-sm"><span className="w-28 text-slate-500 shrink-0">{c.time}</span><span className="flex-1"><b className="font-medium">{c.subject}</b><br/><span className="text-slate-500">{c.faculty} · Room {c.room}</span></span>{nc.cls===c&&<StatusBadge s="Pending"/>}</div>)}</div>
   <h2 className="font-semibold mt-6 mb-2">Campus services</h2>
   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{actions.map(([l,to,I])=><Link key={l} to={to} className="flex items-center gap-2 border bg-white rounded px-3 py-3 text-sm hover:border-brand"><I size={16} className="text-brand"/>{l}</Link>)}</div></section>
  <aside className="space-y-6">
   <section><h2 className="font-semibold mb-2">Smart recommendations <span className="text-xs font-normal text-slate-500">(demo)</span></h2>
    <ul className="text-sm space-y-2 border-l-2 border-brand pl-3"><li>Revise Data Structures before the {exams[0].date} assessment.</li>{lowAttendance.map(c=><li key={c.name}>Attendance in {c.name} is {pct(c)}%, close to the 75% threshold.</li>)}</ul></section>
   <section><h2 className="font-semibold mb-2">Announcements</h2><ul className="text-sm divide-y bg-white border rounded">{announcements.map(a=><li key={a.t} className="p-3 flex justify-between gap-3"><span>{a.t}</span><span className="text-slate-400 shrink-0">{a.d}</span></li>)}</ul></section>
  </aside></div></>}

export function Attendance(){return <>
 <PageHeader title="Attendance" sub={`Semester ${student.semester}`}/>
 <div className="grid grid-cols-3 bg-white border rounded divide-x mb-6 text-center">{[['Overall',attendance.percent+'%'],['Classes attended',attendance.present],['Classes missed',attendance.missed]].map(([l,v])=><div key={l} className="p-4"><div className="text-xs text-slate-500">{l}</div><div className="text-2xl font-semibold text-navy">{v}</div></div>)}</div>
 <div className="bg-white border rounded overflow-x-auto"><table className="w-full text-sm min-w-[560px]"><thead className="text-left text-slate-500 border-b"><tr>{['Subject','Faculty','Present','Total','Attendance','Status'].map(h=><th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
 <tbody className="divide-y">{courses.map(c=>{const p=pct(c);return <tr key={c.name}><td className="p-3 font-medium">{c.name}</td><td className="p-3">{c.faculty}</td><td className="p-3">{c.present}</td><td className="p-3">{c.total}</td>
 <td className="p-3"><div className="flex items-center gap-2"><div className="w-20 h-1.5 bg-slate-100 rounded"><div className="h-full bg-brand rounded" style={{width:p+'%'}}/></div>{p}%</div></td><td className="p-3"><StatusBadge s={attStatus(p)}/></td></tr>})}</tbody></table></div>
 <p className="text-xs text-slate-500 mt-2">Safe: 80% and above · Watch: 75–79% · Low: below 75%</p></>}

export function Timetable(){
 const today=todayName(),[day,setDay]=useState(days.includes(today)?today:'Monday'),[sel,setSel]=useState(null)
 return <>
 <PageHeader title="Timetable" sub="Weekly view"/>
 <div className="flex gap-1 overflow-x-auto mb-4">{days.map(d=><button key={d} onClick={()=>setDay(d)} className={`px-3 py-1.5 rounded text-sm border ${d===day?'bg-navy text-white border-navy':'bg-white hover:border-brand'}`}>{d.slice(0,3)}{d===today&&' •'}</button>)}</div>
 <div className="bg-white border rounded divide-y">{timetable[day].map(c=><button key={c.time} onClick={()=>setSel(c)} className="w-full text-left p-4 flex gap-4 text-sm hover:bg-slate-50"><span className="w-28 text-slate-500 shrink-0">{c.time}</span><span className="flex-1 font-medium">{c.subject}</span><span className="text-slate-500">Room {c.room}</span></button>)}</div>
 <h2 className="font-semibold mt-8 mb-2">Upcoming examinations</h2>
 <div className="bg-white border rounded divide-y text-sm">{exams.map(e=><div key={e.subject} className="p-3 flex justify-between"><span>{e.subject} <span className="text-slate-500">· {e.type}</span></span><span>{e.date}</span></div>)}</div>
 {sel&&<Modal title={sel.subject} onClose={()=>setSel(null)}><dl className="text-sm space-y-2"><div>Day: {day}</div><div>Time: {sel.time}</div><div>Room: {sel.room}</div><div>Faculty: {sel.faculty}</div></dl></Modal>}</>}

export function Fees(){
 const [open,setOpen]=useState(false),[done,setDone]=useState(false)
 return <>
 <PageHeader title="Fees" sub={`Semester ${student.semester}`}><Btn onClick={()=>{setDone(false);setOpen(true)}}>Pay now</Btn></PageHeader>
 <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border rounded divide-x divide-y lg:divide-y-0 mb-6">{[['Total semester fee',inr(fees.total)],['Paid',inr(fees.paid)],['Pending',inr(fees.pending)],['Next due date',fees.due]].map(([l,v])=><div key={l} className="p-4"><div className="text-xs text-slate-500">{l}</div><div className="text-xl font-semibold text-navy mt-1">{v}</div></div>)}</div>
 <h2 className="font-semibold mb-2">Payment history</h2>
 <div className="bg-white border rounded overflow-x-auto"><table className="w-full text-sm min-w-[560px]"><thead className="text-left text-slate-500 border-b"><tr>{['Date','Transaction ID','Description','Amount','Status'].map(h=><th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead><tbody className="divide-y">{fees.history.map(h=><tr key={h.txn}><td className="p-3">{h.date}</td><td className="p-3">{h.txn}</td><td className="p-3">{h.desc}</td><td className="p-3">{inr(h.amount)}</td><td className="p-3"><StatusBadge s={h.status}/></td></tr>)}</tbody></table></div>
 {open&&<Modal title="Confirm payment" onClose={()=>setOpen(false)}>{done?<><p className="text-sm">Demo only: no payment was processed. In the live product this step opens the university payment gateway.</p><Btn className="mt-4" onClick={()=>setOpen(false)}>Close</Btn></>:<><p className="text-sm">Amount payable: <b>{inr(fees.pending)}</b><br/>Due {fees.due}</p><div className="flex gap-2 mt-4"><Btn onClick={()=>setDone(true)}>Confirm payment</Btn><button className="px-4 py-2 text-sm border rounded" onClick={()=>setOpen(false)}>Cancel</button></div></>}</Modal>}</>}

const answer=q=>{q=q.toLowerCase();const nc=nextClass()
 if(q.includes('attend'))return {t:`Your overall attendance is ${attendance.percent}%. ${lowAttendance.map(c=>`${c.name} is at ${pct(c)}%`).join('; ')} needs attention.`,to:'/attendance',l:'View attendance'}
 if(q.includes('class')||q.includes('timetable')||q.includes('today'))return {t:`Your next class is ${nc.cls.subject} at ${nc.cls.time.split(' ')[0]} in Room ${nc.cls.room} (${nc.day}).`,to:'/timetable',l:'View timetable'}
 if(q.includes('fee'))return {t:`${inr(fees.pending)} is pending, due ${fees.due}.`,to:'/fees',l:'Open fees'}
 if(q.includes('certificate'))return {t:'Open Certificates, choose a document and select Download. Your Internship Certificate is still pending.',to:'/certificates',l:'Open certificates'}
 if(q.includes('bus')||q.includes('transport'))return {t:`${transport.route}: pickup at ${transport.pickup}, ${transport.time}. Status: ${transport.status}.`,to:'/transport',l:'View transport'}
 return {t:'I can help with attendance, timetable, fees, certificates and transport. Try one of the suggestions below.'}}
export function Assistant(){
 const [msgs,setMsgs]=useState([{r:'bot',t:'Hello! Ask me about your attendance, timetable, fees, certificates or bus.'}]),[q,setQ]=useState('')
 const ask=t=>{if(!t.trim())return;setMsgs(m=>[...m,{r:'me',t},{r:'bot',...(a=>({t:a.t,to:a.to,l:a.l}))(answer(t))}]);setQ('')}
 return <>
 <PageHeader title="Campus Assistant" sub="Your university services, in one conversation."/>
 <div className="bg-white border rounded p-4 space-y-3 min-h-[320px]">{msgs.map((m,i)=><div key={i} className={m.r==='me'?'flex justify-end':''}><div className={`max-w-[85%] text-sm rounded px-3 py-2 ${m.r==='me'?'bg-navy text-white':'bg-slate-100'}`}>{m.t}{m.to&&<Link to={m.to} className="block mt-1 text-brand font-medium">{m.l} →</Link>}</div></div>)}</div>
 <div className="flex flex-wrap gap-2 mt-3">{['Check attendance','Today\'s timetable','Pending fees','Download certificate','Bus status'].map(c=><button key={c} onClick={()=>ask(c)} className="text-xs border rounded-full px-3 py-1 bg-white hover:border-brand">{c}</button>)}</div>
 <form onSubmit={e=>{e.preventDefault();ask(q)}} className="flex gap-2 mt-3"><input aria-label="Message" value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask about your campus services" className="flex-1 border rounded px-3 py-2 text-sm"/><Btn type="submit" aria-label="Send"><Send size={16}/></Btn></form></>}

export const Soon=({title})=><><PageHeader title={title}/><EmptyState title={`${title} is not built yet`} text="This route is reserved. It will use the same mock data as the rest of the portal."/></>
