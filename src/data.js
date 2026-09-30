// Single source of truth: every page and the Campus Assistant read from here.
export const university={name:'Rajiv Gandhi Proudyogiki Vishwavidyalaya',short:'RGPV Bhopal',city:'Bhopal, Madhya Pradesh'}
export const student={name:'Hemant',id:'0101CS251042',program:'B.Tech, Computer Science & Engineering',semester:2,cgpa:8.2,cgpaTrend:[7.6,7.8,8.0,8.2],
 email:'hemant.0101cs251042@rgpv.ac.in',phone:'+91 98xxxxxx10',dob:'14 Mar 2007',address:'Kolar Road, Bhopal, Madhya Pradesh',
 emergency:{name:'R. Kumar (Father)',phone:'+91 98xxxxxx45'},bloodGroup:'B+',advisor:'Dr. R. Sharma'}
export const courses=[
{name:'Object Oriented Programming',code:'CS201',faculty:'Dr. R. Sharma',credits:4,present:28,total:32,internal:27,maxInternal:30,trend:[62,68,74,78]},
{name:'Data Structures',code:'CS202',faculty:'Prof. A. Verma',credits:4,present:24,total:30,internal:24,maxInternal:30,trend:[58,64,66,70]},
{name:'Discrete Mathematics',code:'MA201',faculty:'Dr. S. Iyer',credits:3,present:23,total:30,internal:21,maxInternal:30,trend:[55,60,58,64]},
{name:'Digital Electronics',code:'EC201',faculty:'Prof. M. Khan',credits:3,present:26,total:30,internal:26,maxInternal:30,trend:[70,72,75,80]},
{name:'Communication Skills',code:'HU201',faculty:'Ms. P. Nair',credits:2,present:18,total:20,internal:18,maxInternal:20,trend:[80,82,85,88]}]
export const pct=c=>Math.round(c.present/c.total*100)
export const attStatus=p=>p>=80?'Safe':p>=75?'Watch':'Low'
const P=courses.reduce((a,c)=>a+c.present,0),T=courses.reduce((a,c)=>a+c.total,0)
export const attendance={present:P,total:T,missed:T-P,percent:Math.round(P/T*100),trend:[81,83,80,Math.round(P/T*100)]}
export const totalCredits=courses.reduce((a,c)=>a+c.credits,0)
export const fees={total:56000,paid:37500,pending:18500,due:'15 Oct 2026',
history:[{date:'12 Aug 2026',txn:'TXN48210937',desc:'Tuition fee, instalment 1',amount:30000,status:'Paid'},
{date:'12 Aug 2026',txn:'TXN48210952',desc:'Examination fee',amount:7500,status:'Paid'}]}
export const inr=n=>'₹'+n.toLocaleString('en-IN')
const c=n=>courses[n]
const cl=(time,i,room)=>({time,start:time.slice(0,5),end:time.slice(-5),subject:c(i).name,code:c(i).code,faculty:c(i).faculty,room})
export const timetable={
Monday:[cl('09:00 – 10:00',1,'C-101'),cl('11:00 – 12:00',0,'C-204'),cl('14:00 – 15:00',3,'Lab 2')],
Tuesday:[cl('09:00 – 10:00',2,'C-103'),cl('10:00 – 11:00',1,'C-101'),cl('12:00 – 13:00',4,'C-105')],
Wednesday:[cl('09:00 – 10:00',0,'C-204'),cl('11:00 – 12:00',3,'C-102'),cl('14:00 – 16:00',0,'Lab 1')],
Thursday:[cl('10:00 – 11:00',2,'C-103'),cl('11:00 – 12:00',1,'C-101'),cl('13:00 – 14:00',4,'C-105')],
Friday:[cl('09:00 – 10:00',3,'C-102'),cl('11:00 – 12:00',0,'C-204'),cl('14:00 – 15:00',2,'C-103')],
Saturday:[cl('09:00 – 10:00',1,'C-101'),cl('10:00 – 11:00',4,'C-105')]}
export const days=Object.keys(timetable)
export const todayName=()=>['Sunday',...days][new Date().getDay()]
export const nowHHMM=()=>new Date().toTimeString().slice(0,5)
export const nextClass=()=>{const d=todayName(),now=nowHHMM()
 const list=timetable[d]||[];const n=list.find(x=>x.start>now)
 return n?{day:d,cls:n}:{day:d==='Sunday'?'Monday':d,cls:timetable[d==='Sunday'?'Monday':d]?.[0]}}
export const classNowStatus=cls=>{const n=nowHHMM();if(n<cls.start)return'upcoming';if(n>cls.end)return'done';return'live'}
export const exams=[{subject:'Data Structures',date:'20 Oct 2026',type:'Mid-semester'},{subject:'Object Oriented Programming',date:'23 Oct 2026',type:'Mid-semester'}]
export const announcements=[
{t:'Mid-semester examination schedule published',d:'24 Sep',cat:'Academic'},
{t:'Fee instalment 2 due by 15 October',d:'22 Sep',cat:'Fees'},
{t:'Library hours extended during examinations',d:'19 Sep',cat:'University'}]
export const certificates=[
{name:'Bonafide Certificate',status:'Issued',date:'14 Aug 2026',verified:true},
{name:'Student ID Card',status:'Issued',date:'10 Aug 2026',verified:true},
{name:'Fee Receipt',status:'Issued',date:'12 Aug 2026',verified:true},
{name:'Academic Transcript',status:'Issued',date:'02 Aug 2026',verified:true},
{name:'Internship / Training Certificate',status:'Pending',date:'—',verified:false}]
export const transport={route:'Route 7 – Kolar to Campus',bus:'MP04 P 2231',driver:'S. Yadav',pickup:'Kolar Road Square',time:'07:45 AM',status:'On time',
 stops:[{name:'Kolar Road Square',eta:'07:45 AM',done:true},{name:'Chuna Bhatti',eta:'07:55 AM',done:true},{name:'Hoshangabad Road',eta:'08:05 AM',done:false},{name:'RGPV Campus Gate 2',eta:'08:20 AM',done:false}]}
export const hostel={block:'Block C',room:'C-214',floor:'2nd Floor',mess:'Mess 2 (Vegetarian)',roommates:['Aakash P.','Ravi T.'],
 maintenance:[{id:'MT-1042',category:'Electrical',desc:'Tube light not working',priority:'Medium',status:'In Progress',date:'25 Sep'}]}
export const helpdesk=[
{id:'HD-3311',category:'Academic',subject:'Correction in attendance record',status:'Resolved',priority:'Medium',date:'18 Sep',
 timeline:[{t:'Ticket created',d:'18 Sep'},{t:'Assigned to Academic Office',d:'19 Sep'},{t:'Resolved — record corrected',d:'21 Sep'}]},
{id:'HD-3325',category:'Fees',subject:'Duplicate fee receipt request',status:'In Progress',priority:'Low',date:'26 Sep',
 timeline:[{t:'Ticket created',d:'26 Sep'},{t:'Assigned to Accounts Office',d:'27 Sep'}]},
{id:'HD-3338',category:'Hostel',subject:'Room maintenance — tube light',status:'Open',priority:'Medium',date:'25 Sep',
 timeline:[{t:'Ticket created',d:'25 Sep'}]}]
export const notifications=[
{id:1,cat:'Academic',t:'Your OOP attendance has fallen below the safe threshold.',time:'2h ago',read:false},
{id:2,cat:'Fees',t:'Semester fee instalment 2 is due on 15 October.',time:'1d ago',read:false},
{id:3,cat:'University',t:'New mid-semester examination timetable published.',time:'2d ago',read:false},
{id:4,cat:'Transport',t:'Route 7 pickup time updated to 07:45 AM.',time:'3d ago',read:true},
{id:5,cat:'Hostel',t:'Maintenance request MT-1042 is in progress.',time:'4d ago',read:true},
{id:6,cat:'Helpdesk',t:'Ticket HD-3311 was resolved.',time:'6d ago',read:true}]
export const lowAttendance=courses.filter(x=>attStatus(pct(x))!=='Safe')
export const parent={name:'R. Kumar',relation:'Father'}

// Global search index used by the command palette
export const searchIndex=[
 {label:'Dashboard',type:'Page',to:'/dashboard'},
 {label:'Academics',type:'Page',to:'/academics'},
 {label:'Attendance',type:'Page',to:'/attendance'},
 {label:'Timetable',type:'Page',to:'/timetable'},
 {label:'Fees',type:'Page',to:'/fees'},
 {label:'Certificates',type:'Page',to:'/certificates'},
 {label:'Hostel',type:'Page',to:'/hostel'},
 {label:'Transport',type:'Page',to:'/transport'},
 {label:'Helpdesk',type:'Page',to:'/helpdesk'},
 {label:'Campus Assistant',type:'Page',to:'/ai-assistant'},
 {label:'Student Insights',type:'Page',to:'/insights'},
 {label:'Profile',type:'Page',to:'/profile'},
 ...courses.map(c=>({label:c.name,type:'Subject',to:'/academics'})),
 ...certificates.map(c=>({label:c.name,type:'Certificate',to:'/certificates'})),
 ...helpdesk.map(h=>({label:`${h.id} — ${h.subject}`,type:'Helpdesk ticket',to:'/helpdesk'})),
 ...announcements.map(a=>({label:a.t,type:'Announcement',to:'/dashboard'}))]

/* ---------- Multi-role additions: Teacher & Admin ---------- */
export const teacher={name:'Dr. R. Sharma',id:'FAC-0142',department:'Computer Science & Engineering',
 designation:'Assistant Professor',email:'r.sharma@rgpv.ac.in',phone:'+91 98xxxxxx77',
 subjects:[{code:'CS201',name:'Object Oriented Programming',batch:'CSE 2nd Sem — A'},
  {code:'CS305',name:'Operating Systems',batch:'CSE 4th Sem — B'}]}

const names=['Aarav Mehta','Diya Sharma','Kabir Singh','Ishita Rao','Vivaan Patel','Ananya Gupta','Reyansh Verma','Myra Joshi','Aditya Nair','Sara Khan','Arjun Reddy','Kavya Iyer']
export const classRoster=names.map((n,i)=>({
 id:`0101CS25${1000+i}`,name:n,attendance:60+((i*13)%40),internal:14+((i*7)%16),maxInternal:30,
 status:60+((i*13)%40)>=75?'Safe':'Low'}))

export const teacherAnnouncements=[
 {t:'Internal assessment 2 sheets to be uploaded by 5 Oct',d:'27 Sep'},
 {t:'Lab attendance sheet pending for OOP batch A',d:'25 Sep'}]

export const departments=[
 {name:'Computer Science & Engineering',students:412,teachers:18,feeCollected:87},
 {name:'Electronics & Communication',students:298,teachers:14,feeCollected:81},
 {name:'Mechanical Engineering',students:356,teachers:16,feeCollected:79},
 {name:'Civil Engineering',students:210,teachers:11,feeCollected:84}]

export const adminStats={
 totalStudents:departments.reduce((a,d)=>a+d.students,0),
 totalTeachers:departments.reduce((a,d)=>a+d.teachers,0),
 totalDepartments:departments.length,
 feeCollectionOverall:82,
 openTickets:14,resolvedTickets:96}

const studentFirst=['Aarav','Diya','Kabir','Ishita','Vivaan','Ananya','Reyansh','Myra']
export const allStudents=studentFirst.map((n,i)=>({
 id:`0101CS25${1000+i}`,name:`${n} ${['Mehta','Sharma','Singh','Rao','Patel','Gupta','Verma','Joshi'][i]}`,
 dept:departments[i%departments.length].name,semester:(i%8)+1,feeStatus:i%3===0?'Pending':'Paid'}))

export const allTeachers=[
 {id:'FAC-0142',name:'Dr. R. Sharma',dept:'Computer Science & Engineering',subjects:2,designation:'Assistant Professor'},
 {id:'FAC-0155',name:'Prof. A. Verma',dept:'Computer Science & Engineering',subjects:3,designation:'Associate Professor'},
 {id:'FAC-0138',name:'Dr. S. Iyer',dept:'Electronics & Communication',subjects:2,designation:'Professor'},
 {id:'FAC-0161',name:'Prof. M. Khan',dept:'Mechanical Engineering',subjects:2,designation:'Assistant Professor'},
 {id:'FAC-0149',name:'Ms. P. Nair',dept:'Civil Engineering',subjects:1,designation:'Lecturer'}]

export const adminAnnouncements=[
 {t:'Mid-semester examination schedule published',d:'24 Sep',dept:'All departments'},
 {t:'Fee instalment 2 due by 15 October',d:'22 Sep',dept:'All departments'},
 {t:'Faculty appraisal window opens 1 October',d:'20 Sep',dept:'All departments'}]

export const allHelpdesk=[...helpdesk,
 {id:'HD-3350',category:'Academic',subject:'Grade discrepancy — ECE batch',status:'Open',priority:'High',date:'28 Sep',
  timeline:[{t:'Ticket created',d:'28 Sep'}]},
 {id:'HD-3361',category:'Fees',subject:'Scholarship fee adjustment',status:'In Progress',priority:'Medium',date:'27 Sep',
  timeline:[{t:'Ticket created',d:'27 Sep'},{t:'Assigned to Accounts Office',d:'28 Sep'}]}]
