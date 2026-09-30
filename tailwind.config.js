export default {
 content:['./index.html','./src/**/*.{js,jsx}'],
 darkMode:'class',
 theme:{extend:{
  fontFamily:{sans:['"Plus Jakarta Sans"','Inter','system-ui','sans-serif'],serif:['"Fraunces"','Georgia','serif']},
  colors:{
   navy:{DEFAULT:'#14151C',50:'#EEEEF0',100:'#D6D7DC',600:'#2B2D38',700:'#1D1E27',800:'#14151C',900:'#0B0B10'},
   brand:{DEFAULT:'#7A2333',50:'#FBF0F1',100:'#F3DADD',500:'#8C2A3B',600:'#7A2333',700:'#5E1A27'},
   accent:{DEFAULT:'#B8912B',50:'#FBF6E8',400:'#C9A94E',500:'#B8912B',600:'#9C7A22'},
   surface:{DEFAULT:'#FAF7F2',card:'#FFFFFF',muted:'#F1ECE2'},
   success:{50:'#ECFDF5',500:'#10B981',600:'#059669',700:'#047857'},
   warning:{50:'#FFFBEB',500:'#F59E0B',600:'#D97706',700:'#B45309'},
   danger:{50:'#FEF2F2',500:'#EF4444',600:'#DC2626',700:'#B91C1C'},
   info:{50:'#EFF6FF',500:'#3B82F6',600:'#2563EB'}
  },
  boxShadow:{card:'0 1px 2px rgba(20,21,28,.05), 0 1px 12px -4px rgba(20,21,28,.1)',
   pop:'0 12px 32px -8px rgba(20,21,28,.22)',
   focus:'0 0 0 3px rgba(122,35,51,.25)'},
  borderRadius:{xl2:'1.25rem'},
  keyframes:{
   fadeIn:{from:{opacity:0},to:{opacity:1}},
   slideUp:{from:{opacity:0,transform:'translateY(8px)'},to:{opacity:1,transform:'translateY(0)'}},
   slideDown:{from:{opacity:0,transform:'translateY(-6px)'},to:{opacity:1,transform:'translateY(0)'}},
   scaleIn:{from:{opacity:0,transform:'scale(.96)'},to:{opacity:1,transform:'scale(1)'}},
   shimmer:{from:{backgroundPosition:'-400px 0'},to:{backgroundPosition:'400px 0'}},
   pulseSoft:{'0%,100%':{opacity:1},'50%':{opacity:.55}}
  },
  animation:{
   fadeIn:'fadeIn .25s ease-out both',
   slideUp:'slideUp .3s cubic-bezier(.16,1,.3,1) both',
   slideDown:'slideDown .2s ease-out both',
   scaleIn:'scaleIn .18s cubic-bezier(.16,1,.3,1) both',
   shimmer:'shimmer 1.6s linear infinite',
   pulseSoft:'pulseSoft 1.4s ease-in-out infinite'
  }
 }},
 plugins:[]}
