import {useState} from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import {Layout} from './components'
import {Login,Dashboard,Attendance,Timetable,Fees,Assistant,Soon} from './pages'
export default function App(){
 const [auth,setAuth]=useState(()=>sessionStorage.getItem('auth')==='1')
 const set=v=>{v?sessionStorage.setItem('auth','1'):sessionStorage.removeItem('auth');setAuth(v)}
 const soon=[['academics','Academics'],['certificates','Certificates'],['hostel','Hostel'],['transport','Transport'],['helpdesk','Helpdesk'],['profile','Profile & Parent Portal']]
 return <Routes>
 <Route path="/login" element={auth?<Navigate to="/dashboard"/>:<Login onLogin={()=>set(true)}/>}/>
 <Route element={auth?<Layout onLogout={()=>set(false)}/>:<Navigate to="/login"/>}>
  <Route path="/dashboard" element={<Dashboard/>}/><Route path="/attendance" element={<Attendance/>}/><Route path="/timetable" element={<Timetable/>}/><Route path="/fees" element={<Fees/>}/><Route path="/ai-assistant" element={<Assistant/>}/>
  {soon.map(([p,t])=><Route key={p} path={'/'+p} element={<Soon title={t}/>}/>)}
 </Route><Route path="*" element={<Navigate to="/dashboard"/>}/></Routes>}
