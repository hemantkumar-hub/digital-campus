import {createContext,useCallback,useContext,useRef,useState} from 'react'
import {CheckCircle2,Info,AlertTriangle,XCircle,X} from 'lucide-react'
const ToastCtx=createContext(null)
const icons={success:CheckCircle2,info:Info,warning:AlertTriangle,error:XCircle}
const tones={success:'border-success-500/30 text-success-700',info:'border-info-500/30 text-info-600',warning:'border-warning-500/30 text-warning-700',error:'border-danger-500/30 text-danger-700'}
export function ToastProvider({children}){
 const [list,setList]=useState([]);const idRef=useRef(0)
 const dismiss=useCallback(id=>setList(l=>l.filter(t=>t.id!==id)),[])
 const push=useCallback((msg,type='success')=>{
  const id=++idRef.current;setList(l=>[...l,{id,msg,type}])
  setTimeout(()=>dismiss(id),3500)
 },[dismiss])
 return <ToastCtx.Provider value={push}>{children}
 <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
  {list.map(t=>{const I=icons[t.type]
   return <div key={t.id} role="status" className={`animate-slideUp flex items-start gap-2 bg-white border rounded-xl shadow-pop px-4 py-3 text-sm ${tones[t.type]}`}>
    <I size={18} className="shrink-0 mt-0.5"/><span className="flex-1 text-slate-700">{t.msg}</span>
    <button aria-label="Dismiss" onClick={()=>dismiss(t.id)} className="text-slate-400 hover:text-slate-600"><X size={15}/></button></div>})}
 </div></ToastCtx.Provider>}
export const useToast=()=>useContext(ToastCtx)
