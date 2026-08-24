import React,{useState,useRef,useEffect} from 'react';
import SnowEffect from './components/SnowEffect';
import NavTabs from './components/NavTabs';
import WeatherSection from './components/WeatherSection';
import ItinerarySection from './components/ItinerarySection';
import RouteSection from './components/RouteSection';
import AmapSection from './components/AmapSection';
import CurrencySection from './components/CurrencySection';
import MusicPlayer from './components/MusicPlayer';
import PackingSection from './components/PackingSection';
import PhrasesSection from './components/PhrasesSection';
import ExpenseSplitter from './components/ExpenseSplitter';
import SOSCard from './components/SOSCard';
import TipsSection from './components/TipsSection';
import PhotoSpots from './components/PhotoSpots';

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
  const[posterOpen,setPosterOpen]=useState(false);
  const refs={weather:useRef(null),plan:useRef(null),route:useRef(null),amap:useRef(null),fx:useRef(null),pack:useRef(null),cn:useRef(null),tips:useRef(null),photo:useRef(null),expense:useRef(null),sos:useRef(null)};

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

  return(<div style={{minHeight:'100vh',background:'linear-gradient(180deg,#BFE6FF 0%,#E4F5FF 300px,#FFFFFF 700px)',position:'relative',overflowX:'hidden'}}>
    <SnowEffect/>
    <div style={{maxWidth:480,margin:'0 auto',paddingBottom:60,width:'100%'}}>

      {/* Hero Header */}
      <div style={{padding:'40px 16px 0',textAlign:'center'}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'.06em',color:'var(--orange)'}}>
          Harbin Ice and Snow Festival
        </div>
        <h1 style={{fontSize:32,lineHeight:1.15,margin:'8px 0 6px',fontWeight:700,color:'var(--navy)'}}>
          Harbin ฮาใจ ❄️🌨️⛄️💗
        </h1>
        <p style={{margin:0,fontSize:14,color:'rgba(43,58,85,.7)'}}>25 ธันวาคม 2026 – 1 มกราคม 2027</p>
        <p style={{margin:'4px 0 0',fontSize:13,color:'rgba(43,58,85,.5)'}}>8 วัน · 8 คน · มหกรรมหิมะและน้ำแข็ง</p>

        <div style={{display:'flex',gap:8,margin:'16px 0',flexWrap:'wrap',justifyContent:'center'}}>
          <span style={{background:'var(--orange-200)',color:'#C65A16',fontWeight:700,fontSize:12,padding:'6px 14px',borderRadius:999}}>{getDaysLeft()}</span>
          <span style={{background:'#fff',border:'2px solid var(--orange-300)',color:'var(--orange-dk)',fontWeight:700,fontSize:12,padding:'5px 13px',borderRadius:999}}>หนาวสุด 28 ธ.ค. (−31°)</span>
        </div>
      </div>

      {/* Trip Poster */}
      <div style={{padding:'12px 16px 0'}}>
        <div onClick={()=>setPosterOpen(true)} style={{cursor:'zoom-in',width:'100%',background:'#fff',border:'3px solid var(--ice)',borderRadius:20,padding:8,boxShadow:'0 10px 26px rgba(60,120,180,.14)',overflow:'hidden'}}>
          <img src="/trip-poster.jpg" alt="แผนเที่ยวฮาร์บิน 8 วัน" loading="lazy" style={{display:'block',width:'100%',height:'auto',borderRadius:14}}/>
        </div>
        <p style={{margin:'8px 0 0',fontSize:12,textAlign:'center',color:'rgba(43,58,85,.5)'}}>แตะเพื่อดูภาพรวมเต็มจอ</p>
      </div>

      {/* Poster Fullscreen Modal */}
      {posterOpen&&(
        <div style={{position:'fixed',inset:0,zIndex:100,background:'rgba(10,30,60,.95)',display:'flex',flexDirection:'column'}} onClick={()=>setPosterOpen(false)}>
          <div style={{flex:'none',display:'flex',justifyContent:'flex-end',padding:'50px 16px 10px'}}>
            <button onClick={()=>setPosterOpen(false)} style={{all:'unset',cursor:'pointer',fontSize:14,fontWeight:700,color:'#fff',padding:'8px 16px',border:'2px solid rgba(255,255,255,.4)',borderRadius:999}}>ปิด ✕</button>
          </div>
          <div style={{flex:1,overflow:'auto',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'8px 12px 40px'}}>
            <img src="/trip-poster.jpg" alt="แผนเที่ยวฮาร์บิน" style={{width:'200%',maxWidth:900,height:'auto',borderRadius:12}} onClick={e=>e.stopPropagation()}/>
          </div>
        </div>
      )}

      {/* Emergency Contacts */}
      <div style={{padding:'16px 16px 0'}}>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
          <a href='tel:110' style={{all:'unset',cursor:'pointer',fontSize:12,fontWeight:700,padding:'6px 14px',border:'2px solid var(--pink)',borderRadius:999,color:'var(--pink-dk)',background:'#fff'}}>☎ ตำรวจจีน 110</a>
          <a href='tel:+861065321749' style={{all:'unset',cursor:'pointer',fontSize:12,fontWeight:700,padding:'6px 14px',border:'2px solid var(--pink)',borderRadius:999,color:'var(--pink-dk)',background:'#fff'}}>☎ สถานทูตไทยปักกิ่ง</a>
          <MusicPlayer/>
        </div>
      </div>

      <div ref={refs.weather}><WeatherSection onDaySelect={i=>setOpenDay(i)}/></div>
      <div ref={refs.plan}><ItinerarySection openDay={openDay} setOpenDay={setOpenDay}/></div>
      <div ref={refs.route}><RouteSection/></div>
      <div ref={refs.amap}><AmapSection/></div>
      <div ref={refs.fx}><CurrencySection/></div>

      <div ref={refs.pack}><PackingSection/></div>
      <div ref={refs.cn}><PhrasesSection/></div>
      <div ref={refs.tips}><TipsSection/></div>
      <div ref={refs.photo}><PhotoSpots/></div>
      <div ref={refs.expense}><ExpenseSplitter/></div>
      <div ref={refs.sos}><SOSCard/></div>

      {/* Footer */}
      <div style={{padding:'40px 16px 0',textAlign:'center'}}>
        <div style={{fontSize:20,color:'#BFE6FF'}}>❄ ❄ ❄</div>
        <p style={{margin:'10px 0 4px',fontSize:13,fontWeight:700,color:'rgba(43,58,85,.5)'}}>ขอให้ทริปนี้เต็มไปด้วยความสุข</p>
        <p style={{margin:0,fontSize:11,fontWeight:700,letterSpacing:'.04em',color:'rgba(43,58,85,.35)'}}>Harbin · 25 ธ.ค. 2026 – 1 ม.ค. 2027</p>
      </div>
      <NavTabs active={active} onJump={jumpTo}/>
    </div>
  </div>);
}
