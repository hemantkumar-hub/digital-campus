import {useState} from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import {Layout} from './components'
import {ToastProvider} from './toast'
import {Landing,Login} from './landing'
import {Dashboard,Academics,Attendance,Timetable,Fees,Certificates,Hostel,Transport,Helpdesk,Insights,Profile,ParentPortal,Assistant} from './pages'
import {TeacherDashboard,TeacherClasses,TeacherStudents,TeacherAnnouncements,TeacherProfile} from './teacher'
import {AdminDashboard,AdminDepartments,AdminStudents,AdminTeachers,AdminHelpdesk,AdminAnnouncements} from './admin'

const homeFor={student:'/dashboard',teacher:'/teacher/dashboard',admin:'/admin/dashboard'}

export default function App(){
 const [auth,setAuth]=useState(()=>{const r=sessionStorage.getItem('auth-role');return r?{role:r}:null})
 const login=role=>{sessionStorage.setItem('auth-role',role);setAuth({role})}
 const logout=()=>{sessionStorage.removeItem('auth-role');setAuth(null)}
 const guard=role=>auth&&auth.role===role?<Layout onLogout={logout} role={role}/>:<Navigate to="/login"/>

 return <ToastProvider><Routes>
 <Route path="/" element={auth?<Navigate to={homeFor[auth.role]}/>:<Landing/>}/>
 <Route path="/login" element={auth?<Navigate to={homeFor[auth.role]}/>:<Login onLogin={login}/>}/>

 <Route element={guard('student')}>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/academics" element={<Academics/>}/>
  <Route path="/attendance" element={<Attendance/>}/>
  <Route path="/timetable" element={<Timetable/>}/>
  <Route path="/fees" element={<Fees/>}/>
  <Route path="/certificates" element={<Certificates/>}/>
  <Route path="/hostel" element={<Hostel/>}/>
  <Route path="/transport" element={<Transport/>}/>
  <Route path="/helpdesk" element={<Helpdesk/>}/>
  <Route path="/insights" element={<Insights/>}/>
  <Route path="/ai-assistant" element={<Assistant/>}/>
  <Route path="/profile" element={<Profile/>}/>
  <Route path="/parent-portal" element={<ParentPortal/>}/>
 </Route>

 <Route element={guard('teacher')}>
  <Route path="/teacher/dashboard" element={<TeacherDashboard/>}/>
  <Route path="/teacher/classes" element={<TeacherClasses/>}/>
  <Route path="/teacher/students" element={<TeacherStudents/>}/>
  <Route path="/teacher/announcements" element={<TeacherAnnouncements/>}/>
  <Route path="/teacher/profile" element={<TeacherProfile/>}/>
 </Route>

 <Route element={guard('admin')}>
  <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
  <Route path="/admin/departments" element={<AdminDepartments/>}/>
  <Route path="/admin/students" element={<AdminStudents/>}/>
  <Route path="/admin/teachers" element={<AdminTeachers/>}/>
  <Route path="/admin/helpdesk" element={<AdminHelpdesk/>}/>
  <Route path="/admin/announcements" element={<AdminAnnouncements/>}/>
 </Route>

 <Route path="*" element={<Navigate to="/"/>}/></Routes></ToastProvider>}
