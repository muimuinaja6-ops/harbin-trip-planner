import React from 'react';
const TABS=[{id:'weather',label:'อากาศ'},{id:'plan',label:'แผนเที่ยว'},{id:'route',label:'เส้นทาง'},{id:'fx',label:'แลกเงิน'},{id:'pack',label:'เตรียมตัว'},{id:'cn',label:'ภาษาจีน'},{id:'tips',label:'เทคนิค'},{id:'photo',label:'ถ่ายรูป'},{id:'expense',label:'หารเงิน'},{id:'sos',label:'ฉุกเฉิน'}];
export default function NavTabs({active,onJump}){
  return(<>
    <div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:50,padding:'14px 12px',paddingBottom:'calc(14px + env(safe-area-inset-bottom, 20px))',display:'flex',gap:10,overflow:'auto',background:'rgba(255,255,255,.97)',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',borderTop:'2px solid var(--ice)',boxShadow:'0 -4px 20px rgba(60,120,180,.12)'}}>
      {TABS.map(t=>(<button key={t.id} onClick={()=>onJump(t.id)} style={{all:'unset',cursor:'pointer',flex:'none',fontSize:14,fontWeight:700,padding:'10px 18px',border:`2px solid ${active===t.id?'var(--orange)':'var(--ice)'}`,borderRadius:999,background:active===t.id?'var(--orange)':'var(--white)',color:active===t.id?'var(--white)':'var(--navy)'}}>{t.label}</button>))}
    </div>
    <div style={{height:80}}/>
  </>);
}
