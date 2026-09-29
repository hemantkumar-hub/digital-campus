// Single source of truth: every page and the Campus Assistant read from here.
export const student={name:'Hemant',id:'0101CS251042',program:'B.Tech, Computer Science & Engineering',semester:2,cgpa:8.2}
export const courses=[
{name:'Object Oriented Programming',faculty:'Dr. R. Sharma',present:28,total:32},
{name:'Data Structures',faculty:'Prof. A. Verma',present:24,total:30},
{name:'Discrete Mathematics',faculty:'Dr. S. Iyer',present:23,total:30},
{name:'Digital Electronics',faculty:'Prof. M. Khan',present:26,total:30},
{name:'Communication Skills',faculty:'Ms. P. Nair',present:18,total:20}]
export const pct=c=>Math.round(c.present/c.total*100)
export const attStatus=p=>p>=80?'Safe':p>=75?'Watch':'Low'
const P=courses.reduce((a,c)=>a+c.present,0),T=courses.reduce((a,c)=>a+c.total,0)
export const attendance={present:P,total:T,missed:T-P,percent:Math.round(P/T*100)}
export const fees={total:56000,paid:37500,pending:18500,due:'15 Oct 2026',
history:[{date:'12 Aug 2026',txn:'TXN48210937',desc:'Tuition fee, instalment 1',amount:30000,status:'Paid'},
{date:'12 Aug 2026',txn:'TXN48210952',desc:'Examination fee',amount:7500,status:'Paid'}]}
export const inr=n=>'₹'+n.toLocaleString('en-IN')
const c=n=>courses[n]
const cl=(time,i,room)=>({time,start:time.slice(0,5),subject:c(i).name,faculty:c(i).faculty,room})
export const timetable={
Monday:[cl('09:00 – 10:00',1,'C-101'),cl('11:00 – 12:00',0,'C-204'),cl('14:00 – 15:00',3,'Lab 2')],
Tuesday:[cl('09:00 – 10:00',2,'C-103'),cl('10:00 – 11:00',1,'C-101'),cl('12:00 – 13:00',4,'C-105')],
Wednesday:[cl('09:00 – 10:00',0,'C-204'),cl('11:00 – 12:00',3,'C-102'),cl('14:00 – 16:00',0,'Lab 1')],
Thursday:[cl('10:00 – 11:00',2,'C-103'),cl('11:00 – 12:00',1,'C-101'),cl('13:00 – 14:00',4,'C-105')],
Friday:[cl('09:00 – 10:00',3,'C-102'),cl('11:00 – 12:00',0,'C-204'),cl('14:00 – 15:00',2,'C-103')],
Saturday:[cl('09:00 – 10:00',1,'C-101'),cl('10:00 – 11:00',4,'C-105')]}
export const days=Object.keys(timetable)
export const todayName=()=>['Sunday',...days][new Date().getDay()]
export const nextClass=()=>{const d=todayName(),now=new Date().toTimeString().slice(0,5)
 const list=timetable[d]||[];const n=list.find(x=>x.start>now)
 return n?{day:d,cls:n}:{day:d==='Sunday'?'Monday':d,cls:timetable[d==='Sunday'?'Monday':d]?.[0]}}
export const exams=[{subject:'Data Structures',date:'20 Oct 2026',type:'Mid-semester'},{subject:'Object Oriented Programming',date:'23 Oct 2026',type:'Mid-semester'}]
export const announcements=[{t:'Mid-semester examination schedule published',d:'24 Sep'},{t:'Fee instalment 2 due by 15 October',d:'22 Sep'},{t:'Library hours extended during examinations',d:'19 Sep'}]
export const certificates=[{name:'Bonafide Certificate',status:'Issued',date:'14 Aug 2026'},{name:'Student ID Card',status:'Issued',date:'10 Aug 2026'},{name:'Fee Receipt',status:'Issued',date:'12 Aug 2026'},{name:'Academic Transcript',status:'Issued',date:'02 Aug 2026'},{name:'Internship / Training Certificate',status:'Pending',date:'—'}]
export const transport={route:'Route 7 – Kolar to Campus',bus:'MP04 P 2231',pickup:'Kolar Road Square',time:'07:45 AM',status:'On time'}
export const lowAttendance=courses.filter(x=>attStatus(pct(x))!=='Safe')
