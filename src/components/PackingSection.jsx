import React,{useState} from 'react';
import PACK from '../data/packing';
import TEAM from '../data/team';

export default function PackingSection(){
  const[who,setWho]=useState(()=>localStorage.getItem('harbin-who')||TEAM[0].name);
  const[checked,setChecked]=useState(()=>{try{return JSON.parse(localStorage.getItem('harbin-pack-v2')||'{}');}catch{return{};}});
  const[extras,setExtras]=useState(()=>{try{return JSON.parse(localStorage.getItem('harbin-extras')||'{}');}catch{return{};}});
  const[newItem,setNewItem]=useState('');

  const myExtras=extras[who]||[];
  const myList=[...PACK,...myExtras];
  const mine=checked[who]||{};
  const done=myList.filter(l=>mine[l]).length;

  const toggle=(label)=>{
    const next={...checked,[who]:{...mine,[label]:!mine[label]}};
    setChecked(next);localStorage.setItem('harbin-pack-v2',JSON.stringify(next));
  };
  const addItem=()=>{
    const label=newItem.trim();if(!label)return;
    const all={...extras,[who]:[...myExtras,label]};
    setExtras(all);localStorage.setItem('harbin-extras',JSON.stringify(all));setNewItem('');
  };
  const removeItem=(label)=>{
    const all={...extras,[who]:myExtras.filter(x=>x!==label)};
    setExtras(all);localStorage.setItem('harbin-extras',JSON.stringify(all));
  };
  const selectWho=(name)=>{localStorage.setItem('harbin-who',name);setWho(name);};

  return(<div style={{padding:'30px 16px 0'}}>
    <h2 style={{fontSize:20,color:'var(--navy)',margin:'0 0 14px',fontWeight:700,display:'flex',alignItems:'center',gap:10}}>
      <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:32,height:32,borderRadius:11,background:'var(--orange-200)',color:'var(--orange-dk)'}}><i className='ph-duotone ph-suitcase-rolling' style={{fontSize:17}}/></span>ของที่ต้องเตรียม
    </h2>
    <div style={{padding:16,background:'#fff',border:'2px solid var(--ice)',borderRadius:18,boxShadow:'0 8px 20px rgba(60,120,180,.08)'}}>
      <p style={{margin:'0 0 12px',fontSize:12,color:'rgba(43,58,85,.55)'}}>เลือกชื่อตัวเองก่อน แล้วติ๊กของของตัวเอง ใครมีของเพิ่มก็เติมเองได้</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:14}}>
        {TEAM.map(m=>(<button key={m.name} onClick={()=>selectWho(m.name)} style={{all:'unset',cursor:'pointer',fontSize:13,fontWeight:700,padding:'6px 14px',border:`2px solid ${m.name===who?'var(--orange)':'var(--ice)'}`,borderRadius:999,background:m.name===who?'var(--orange)':'#fff',color:m.name===who?'#fff':'var(--navy)'}}>{m.name}</button>))}
      </div>
      <div style={{fontSize:13,color:'rgba(43,58,85,.65)',marginBottom:8}}>ของ{who} · เก็บแล้ว {done} จาก {myList.length} อย่าง</div>
      <div style={{height:8,borderRadius:999,background:'#EAF2FA',marginBottom:12}}>
        <div style={{height:8,borderRadius:999,background:'var(--orange)',width:`${Math.round(done/Math.max(myList.length,1)*100)}%`,transition:'width .2s'}}/>
      </div>
      <div style={{maxHeight:400,overflow:'auto'}}>
        {myList.map((label,i)=>{
          const on=!!mine[label];const isCustom=myExtras.includes(label);
          return(<div key={label+i} style={{display:'grid',gridTemplateColumns:'1fr auto',alignItems:'center',borderTop:'2px dashed #EAF2FA'}}>
            <button onClick={()=>toggle(label)} style={{all:'unset',cursor:'pointer',display:'flex',gap:14,alignItems:'flex-start',padding:'12px 0'}}>
              <span style={{flex:'none',width:22,height:22,marginTop:1,borderRadius:8,border:`2px solid ${on?'var(--orange)':'var(--ice)'}`,background:on?'var(--orange)':'#fff',color:'#fff',fontSize:13,lineHeight:'18px',textAlign:'center',fontWeight:700}}>{on?'✓':''}</span>
              <span style={{fontSize:15,lineHeight:1.35,color:on?'rgba(43,58,85,.4)':'var(--navy)',textDecoration:on?'line-through':'none'}}>{label}</span>
            </button>
            {isCustom&&<button onClick={()=>removeItem(label)} style={{all:'unset',cursor:'pointer',padding:'6px 4px 6px 12px',fontSize:16,color:'rgba(43,58,85,.4)'}}>×</button>}
          </div>);
        })}
      </div>
      <div style={{display:'flex',gap:8,marginTop:16}}>
        <input value={newItem} onChange={e=>setNewItem(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addItem()} placeholder={`เพิ่มของของ${who}…`} style={{flex:1,fontFamily:"'Mitr',sans-serif",fontSize:15,padding:'9px 12px',background:'#fff',border:'2px solid var(--ice)',borderRadius:14,color:'var(--navy)'}}/>
        <button onClick={addItem} style={{all:'unset',cursor:'pointer',padding:'9px 18px',borderRadius:999,background:'var(--orange)',color:'#fff',fontSize:14,fontWeight:700}}>เพิ่ม</button>
      </div>
      <p style={{fontSize:12,lineHeight:1.6,color:'rgba(43,58,85,.55)',margin:'12px 0 0'}}>แต่ละคนมีรายการของตัวเอง เก็บไว้ในเครื่องของคนนั้น</p>
    </div>
  </div>);
}
