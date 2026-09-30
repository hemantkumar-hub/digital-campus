import {useState} from 'react'
import {Users,GraduationCap,Landmark,LifeBuoy,IndianRupee,Plus,Search as SearchIcon,Trash2,Megaphone} from 'lucide-react'
import {PageHeader,StatusBadge,Btn,Modal,EmptyState,CountUp} from './components'
import {useToast} from './toast'
import {adminStats,departments,allStudents as seedStudents,allTeachers as seedTeachers,allHelpdesk,adminAnnouncements as seedAnn,university} from './data'

export function AdminDashboard(){
 const stats=[['Total students',adminStats.totalStudents,GraduationCap],['Total teachers',adminStats.totalTeachers,Users],
  ['Departments',adminStats.totalDepartments,Landmark],['Fee collection',adminStats.feeCollectionOverall+'%',IndianRupee]]
 return <>
 <div className="rounded-xl2 bg-gradient-to-br from-navy-800 via-navy-700 to-brand-700 text-white p-6 lg:p-8 mb-6 relative overflow-hidden">
  <div className="absolute -top-16 -right-10 h-52 w-52 rounded-full bg-accent-500/20 blur-3xl"/>
  <div className="relative"><p className="text-slate-300 text-sm">Administration overview</p>
   <h1 className="font-serif text-2xl lg:text-3xl font-semibold mt-1">{university.short} — full campus control</h1>
   <p className="text-slate-300 text-sm mt-1">{adminStats.openTickets} open helpdesk tickets across all departments</p></div></div>
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">{stats.map(([l,v,I])=>
  <div key={l} className="bg-white border rounded-xl2 p-4 shadow-card"><I size={16} className="text-brand-600 mb-2"/><div className="text-xs text-slate-500">{l}</div>
   <div className="text-2xl font-bold text-navy-800 mt-0.5">{typeof v==='number'?<CountUp value={v}/>:v}</div></div>)}</div>
 <div className="grid lg:grid-cols-2 gap-6">
  <section><h2 className="font-semibold mb-2 text-navy-800">Departments</h2>
   <div className="bg-white border rounded-xl2 divide-y shadow-card">{departments.map(d=><div key={d.name} className="p-4 flex justify-between items-center text-sm">
    <span><b className="font-medium text-navy-800">{d.name}</b><span className="block text-xs text-slate-500">{d.students} students · {d.teachers} faculty</span></span>
    <span className="text-xs text-slate-500">{d.feeCollected}% fees</span></div>)}</div></section>
  <section><h2 className="font-semibold mb-2 text-navy-800">Helpdesk snapshot</h2>
   <div className="bg-white border rounded-xl2 divide-y shadow-card text-sm">{allHelpdesk.slice(0,4).map(t=><div key={t.id} className="p-3 flex justify-between gap-3"><span>{t.subject}</span><StatusBadge s={t.status}/></div>)}</div></section></div></>}

export function AdminDepartments(){
 return <><PageHeader title="Departments" sub="University-wide breakdown"/>
 <div className="grid sm:grid-cols-2 gap-4">{departments.map(d=><div key={d.name} className="bg-white border rounded-xl2 p-5 shadow-card">
  <h3 className="font-semibold text-navy-800">{d.name}</h3>
  <div className="grid grid-cols-3 gap-2 mt-3 text-center text-sm">
   <div><div className="text-xl font-bold text-navy-800">{d.students}</div><div className="text-xs text-slate-500">Students</div></div>
   <div><div className="text-xl font-bold text-navy-800">{d.teachers}</div><div className="text-xs text-slate-500">Faculty</div></div>
   <div><div className="text-xl font-bold text-navy-800">{d.feeCollected}%</div><div className="text-xs text-slate-500">Fees collected</div></div></div>
  <div className="h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden"><div className="h-full bg-brand-600 rounded-full transition-all duration-700" style={{width:d.feeCollected+'%'}}/></div></div>)}</div></>}

export function AdminStudents(){
 const [list,setList]=useState(seedStudents),[q,setQ]=useState(''),[del,setDel]=useState(null),toast=useToast()
 const filtered=list.filter(s=>s.name.toLowerCase().includes(q.toLowerCase())||s.id.toLowerCase().includes(q.toLowerCase()))
 return <><PageHeader title="Students" sub={`${list.length} enrolled across all departments`}/>
 <label className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white text-sm mb-4 max-w-sm"><SearchIcon size={15} className="text-slate-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search students" className="flex-1 outline-none"/></label>
 {filtered.length===0?<EmptyState title="No matching students" text="Try a different search term."/>:
 <div className="bg-white border rounded-xl2 overflow-x-auto shadow-card"><table className="w-full text-sm min-w-[600px]"><thead className="text-left text-slate-500 border-b"><tr>{['Name','ID','Department','Semester','Fee status',''].map(h=><th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
 <tbody className="divide-y">{filtered.map(s=><tr key={s.id} className="hover:bg-slate-50/70 transition-colors"><td className="p-3 font-medium text-navy-800">{s.name}</td><td className="p-3 text-xs text-slate-400">{s.id}</td><td className="p-3">{s.dept}</td><td className="p-3">{s.semester}</td><td className="p-3"><StatusBadge s={s.feeStatus}/></td>
  <td className="p-3"><button onClick={()=>setDel(s)} className="text-danger-600 text-xs flex items-center gap-1 hover:underline"><Trash2 size={13}/>Remove</button></td></tr>)}</tbody></table></div>}
 {del&&<Modal title="Remove student" onClose={()=>setDel(null)}><p className="text-sm text-slate-600">Remove <b>{del.name}</b> ({del.id}) from the active roster? This is a demo action.</p>
  <div className="flex gap-2 mt-4"><Btn variant="ghost" onClick={()=>setDel(null)}>Cancel</Btn><Btn onClick={()=>{setList(l=>l.filter(s=>s.id!==del.id));toast(`${del.name} removed.`,'success');setDel(null)}}>Confirm</Btn></div></Modal>}</>}

export function AdminTeachers(){
 const [list,setList]=useState(seedTeachers),[open,setOpen]=useState(false),[name,setName]=useState(''),[dept,setDept]=useState(departments[0].name),toast=useToast()
 const submit=e=>{e.preventDefault();if(!name.trim())return;setList(l=>[...l,{id:`FAC-0${170+l.length}`,name,dept,subjects:0,designation:'Assistant Professor'}]);setName('');setOpen(false);toast('Faculty member added.','success')}
 return <><PageHeader title="Teachers" sub={`${list.length} faculty members`}><Btn onClick={()=>setOpen(true)}><Plus size={15}/>Add faculty</Btn></PageHeader>
 <div className="bg-white border rounded-xl2 overflow-x-auto shadow-card"><table className="w-full text-sm min-w-[560px]"><thead className="text-left text-slate-500 border-b"><tr>{['Name','ID','Department','Designation','Subjects'].map(h=><th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
 <tbody className="divide-y">{list.map(t=><tr key={t.id} className="hover:bg-slate-50/70 transition-colors"><td className="p-3 font-medium text-navy-800">{t.name}</td><td className="p-3 text-xs text-slate-400">{t.id}</td><td className="p-3">{t.dept}</td><td className="p-3">{t.designation}</td><td className="p-3">{t.subjects}</td></tr>)}</tbody></table></div>
 {open&&<Modal title="Add faculty member" onClose={()=>setOpen(false)}><form onSubmit={submit} className="space-y-3 text-sm">
  <label className="block">Name<input required value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2"/></label>
  <label className="block">Department<select value={dept} onChange={e=>setDept(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2">{departments.map(d=><option key={d.name}>{d.name}</option>)}</select></label>
  <Btn type="submit" className="w-full">Add</Btn></form></Modal>}</>}

export function AdminHelpdesk(){
 const [status,setStatus]=useState('All')
 const filtered=allHelpdesk.filter(t=>status==='All'||t.status===status)
 const counts={Open:allHelpdesk.filter(t=>t.status==='Open').length,'In Progress':allHelpdesk.filter(t=>t.status==='In Progress').length,Resolved:allHelpdesk.filter(t=>t.status==='Resolved').length}
 return <><PageHeader title="Helpdesk" sub="All tickets across departments"/>
 <div className="grid grid-cols-3 gap-4 mb-6">{Object.entries(counts).map(([l,v])=><div key={l} className="bg-white border rounded-xl2 p-4 shadow-card text-center"><div className="text-2xl font-bold text-navy-800">{v}</div><div className="text-xs text-slate-500 mt-1">{l}</div></div>)}</div>
 <div className="flex gap-2 mb-4">{['All','Open','In Progress','Resolved'].map(s=><button key={s} onClick={()=>setStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${status===s?'bg-navy-800 text-white border-navy-800':'bg-white hover:border-brand-500'}`}>{s}</button>)}</div>
 <div className="bg-white border rounded-xl2 divide-y shadow-card">{filtered.map(t=><div key={t.id} className="p-4 flex justify-between items-center gap-3 text-sm"><span><b className="font-medium text-navy-800">{t.subject}</b><span className="block text-xs text-slate-400">{t.id} · {t.category} · {t.date}</span></span><StatusBadge s={t.status}/></div>)}</div></>}

export function AdminAnnouncements(){
 const [list,setList]=useState(seedAnn),[open,setOpen]=useState(false),[text,setText]=useState(''),toast=useToast()
 const submit=e=>{e.preventDefault();if(!text.trim())return;setList(l=>[{t:text,d:'Just now',dept:'All departments'},...l]);setText('');setOpen(false);toast('Announcement published university-wide.','success')}
 return <><PageHeader title="Announcements" sub="University-wide notices"><Btn onClick={()=>setOpen(true)}><Plus size={15}/>New announcement</Btn></PageHeader>
 <div className="bg-white border rounded-xl2 divide-y shadow-card text-sm">{list.map((a,i)=><div key={i} className="p-4 flex justify-between gap-3"><span><b className="font-medium text-navy-800">{a.t}</b><span className="block text-xs text-slate-400">{a.dept}</span></span><span className="text-slate-400 text-xs shrink-0">{a.d}</span></div>)}</div>
 {open&&<Modal title="New announcement" onClose={()=>setOpen(false)}><form onSubmit={submit} className="space-y-3 text-sm">
  <label className="block">Message<textarea required value={text} onChange={e=>setText(e.target.value)} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2"/></label>
  <Btn type="submit" className="w-full"><Megaphone size={14}/>Publish</Btn></form></Modal>}</>}
