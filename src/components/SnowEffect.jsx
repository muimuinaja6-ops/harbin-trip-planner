import React from 'react';
export default function SnowEffect() {
  const f=[{l:'6%',d:'0s',u:'12s',s:'22px',c:'\u2744'},{l:'20%',d:'-3s',u:'16s',s:'13px',c:'\u2745'},{l:'34%',d:'-6s',u:'10s',s:'28px',c:'\u2746'},{l:'48%',d:'-1s',u:'14s',s:'17px',c:'\u2744'},{l:'60%',d:'-9s',u:'18s',s:'11px',c:'\u2745'},{l:'73%',d:'-4s',u:'11s',s:'25px',c:'\u2746'},{l:'86%',d:'-7s',u:'15s',s:'19px',c:'\u2744'},{l:'95%',d:'-11s',u:'13s',s:'14px',c:'\u2745'}];
  return(<div style={{position:'fixed',inset:0,zIndex:25,pointerEvents:'none',overflow:'hidden'}}>{f.map((x,i)=>(<span key={i} style={{position:'absolute',left:x.l,top:'-40px',animation:`snowfall ${x.u} linear ${x.d} infinite, snowdrift 4s ease-in-out infinite`}}><span style={{display:'block',fontSize:x.s,lineHeight:1,color:'#fff',textShadow:'0 0 6px rgba(58,140,220,.5)',animation:`snowspin ${10+i}s linear ${i%2?'reverse ':''}infinite`}}>{x.c}</span></span>))}</div>);
}
