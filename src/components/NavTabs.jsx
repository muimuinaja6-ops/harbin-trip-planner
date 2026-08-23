import React from 'react';
const TABS=[{id:'weather',label:'อากาศ'},{id:'plan',label:'แผนเที่ยว'},{id:'route',label:'เส้นทาง'},{id:'fx',label:'แลกเงิน'},{id:'pack',label:'เตรียมตัว'},{id:'cn',label:'ภาษาจีน'},{id:'expense',label:'หารเงิน'},{id:'sos',label:'ฉุกเฉิน'}];
export default function NavTabs({active,onJump}){
  return(<>
    <div style={{position:'fixed',top:0,left:0,right:0,zIndex:50,padding:'12px 16px',display:'flex',gap:8,overflow:'auto',background:'rgba(255,255,255,.92)',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',borderBottom:'2px solid var(--ice)'}}>
      <div style={{display:'flex',gap:8,margin:'0 auto',maxWidth:480,width:'100%'}}>
        {TABS.map(t=>(<button key={t.id} onClick={()=>onJump(t.id)} style={{all:'unset',cursor:'pointer',flex:'none',fontSize:13,fontWeight:700,padding:'7px 16px',border:`2px solid ${active===t.id?'var(--orange)':'var(--ice)'}`,borderRadius:999,background:active===t.id?'var(--orange)':'var(--white)',color:active===t.id?'var(--white)':'var(--navy)'}}>{t.label}</button>))}
      </div>
    </div>
    <div style={{height:54}}/>
  </>);
}
