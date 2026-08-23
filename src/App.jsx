import React,{useState,useRef,useEffect} from 'react';
import SnowEffect from './components/SnowEffect';
import NavTabs from './components/NavTabs';
import WeatherSection from './components/WeatherSection';
import ItinerarySection from './components/ItinerarySection';
import RouteSection from './components/RouteSection';
import CurrencySection from './components/CurrencySection';

function getDaysLeft(){
  const now=new Date();const start=new Date(2026,11,25);
  const diff=Math.ceil((start-now)/86400000);
  if(diff>0)return`เหลืออีก ${diff} วัน`;
  const end=new Date(2027,0,1);
  if(now<=end)return'อยู่ในทริปแล้ว!';
  return'ทริปผ่านไปแล้ว';
}

export default function App(){
  const[openDay,setOpenDay]=useState(2);
  const[active,setActive]=useState('weather');
  const refs={weather:useRef(null),plan:useRef(null),route:useRef(null),fx:useRef(null),pack:useRef(null),cn:useRef(null)};

  const jumpTo=id=>{refs[id]?.current?.scrollIntoView({behavior:'smooth',block:'start'});};

  useEffect(()=>{
    const h=()=>{
      const entries=Object.entries(refs).filter(([,r])=>r.current);
      let cur=entries[0]?.[0];
      entries.forEach(([id,r])=>{if(r.current.getBoundingClientRect().top<=140)cur=id;});
      setActive(cur);
    };
    window.addEventListener('scroll',h,{passive:true});
    return()=>window.removeEventListener('scroll',h);
  },[]);

  return(<div style={{minHeight:'100vh',background:'linear-gradient(180deg,#BFE6FF 0%,#E4F5FF 240px,#FFFFFF 560px)',position:'relative'}}>
    <SnowEffect/>
    <div style={{maxWidth:480,margin:'0 auto',paddingBottom:60}}>
      {/* Header */}
      <div style={{padding:'48px 16px 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:11,fontWeight:700,color:'var(--orange)'}}>
          <span>Harbin Ice and Snow</span><span style={{color:'var(--pink)'}}>2026 — 27</span>
        </div>
        <div style={{height:10,borderRadius:999,margin:'10px 0 14px',background:'linear-gradient(90deg,var(--orange),var(--pink))'}}/>
        <h1 style={{fontSize:34,lineHeight:1.2,margin:'0 0 8px',fontWeight:700,color:'var(--navy)'}}>Harbin ฮาใจ ❄️💗</h1>
        <p style={{margin:0,fontSize:14,color:'rgba(43,58,85,.7)'}}>25 ธ.ค. – 1 ม.ค. · 8 วัน · 8 คน</p>
        <div style={{display:'flex',gap:8,margin:'14px 0',flexWrap:'wrap'}}>
          <span style={{background:'var(--orange-200)',color:'#C65A16',fontWeight:700,fontSize:12,padding:'6px 14px',borderRadius:999}}>{getDaysLeft()}</span>
          <span style={{background:'#fff',border:'2px solid var(--orange-300)',color:'var(--orange-dk)',fontWeight:700,fontSize:12,padding:'5px 13px',borderRadius:999}}>หนาวสุด 28 ธ.ค.</span>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <a href='tel:110' style={{all:'unset',cursor:'pointer',fontSize:12,fontWeight:700,padding:'6px 14px',border:'2px solid var(--pink)',borderRadius:999,color:'var(--pink-dk)',background:'#fff'}}>☎ ตำรวจจีน 110</a>
          <a href='tel:+861065321749' style={{all:'unset',cursor:'pointer',fontSize:12,fontWeight:700,padding:'6px 14px',border:'2px solid var(--pink)',borderRadius:999,color:'var(--pink-dk)',background:'#fff'}}>☎ สถานทูตไทยปักกิ่ง</a>
        </div>
      </div>

      <NavTabs active={active} onJump={jumpTo}/>
      <div ref={refs.weather}><WeatherSection onDaySelect={i=>setOpenDay(i)}/></div>
      <div ref={refs.plan}><ItinerarySection openDay={openDay} setOpenDay={setOpenDay}/></div>
      <div ref={refs.route}><RouteSection/></div>
      <div ref={refs.fx}><CurrencySection/></div>
      <div ref={refs.pack} style={{padding:'30px 16px 0'}}>
        <h2 style={{fontSize:20,color:'var(--navy)',margin:'0 0 8px',fontWeight:700,display:'flex',alignItems:'center',gap:10}}>
          <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:32,height:32,borderRadius:11,background:'var(--orange-200)',color:'var(--orange-dk)'}}><i className='ph-duotone ph-suitcase-rolling' style={{fontSize:17}}/></span>ของที่ต้องเตรียม
        </h2>
        <p style={{fontSize:13,color:'rgba(43,58,85,.6)'}}>เปิดใช้บนเครื่องของแต่ละคน (เพิ่มได้ภายหลัง)</p>
      </div>
      <div ref={refs.cn} style={{padding:'30px 16px 0'}}>
        <h2 style={{fontSize:20,color:'var(--navy)',margin:'0 0 8px',fontWeight:700,display:'flex',alignItems:'center',gap:10}}>
          <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:32,height:32,borderRadius:11,background:'var(--ice)',color:'#2C7BB8'}}><i className='ph-duotone ph-chats-circle' style={{fontSize:17}}/></span>ประโยคจีนที่ใช้บ่อย
        </h2>
        <p style={{fontSize:13,color:'rgba(43,58,85,.6)'}}>เปิดใช้บนเครื่องของแต่ละคน (เพิ่มได้ภายหลัง)</p>
      </div>

      {/* Footer */}
      <div style={{padding:'40px 16px 0'}}>
        <div style={{display:'flex',justifyContent:'center',gap:10,fontSize:20,color:'#BFE6FF'}}>❄ ❄ ❄</div>
        <p style={{textAlign:'center',margin:'10px 0 0',fontSize:12,fontWeight:700,color:'rgba(43,58,85,.4)'}}>Harbin · 2026 — 27</p>
      </div>
    </div>
  </div>);
}
