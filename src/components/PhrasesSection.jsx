import React,{useState} from 'react';
import PHRASES from '../data/phrases';

const CATS=['ทั้งหมด','กิน','ซื้อของ','เดินทาง','ฉุกเฉิน','ทั่วไป','ของฉัน'];

export default function PhrasesSection(){
  const[cat,setCat]=useState('ทั้งหมด');
  const[openPhrase,setOpenPhrase]=useState(null);
  const[myPhrases,setMyPhrases]=useState(()=>{try{return JSON.parse(localStorage.getItem('harbin-phrases')||'[]');}catch{return[];}});
  const[newPhrase,setNewPhrase]=useState('');
  const[addBusy,setAddBusy]=useState(false);
  const[addMsg,setAddMsg]=useState('');

  const allPhrases=[...PHRASES,...myPhrases];
  const filtered=allPhrases.filter(p=>cat==='ทั้งหมด'||p.c===cat);

  const speak=(text)=>{
    const s=window.speechSynthesis;if(!s)return;
    s.cancel();const u=new SpeechSynthesisUtterance(text);
    u.lang='zh-CN';u.rate=0.8;
    const zh=s.getVoices().filter(v=>/^zh/i.test(v.lang));
    if(zh.length)u.voice=zh[0];s.speak(u);
  };

  const removePhrase=(globalIdx)=>{
    const localIdx=globalIdx-PHRASES.length;if(localIdx<0)return;
    const next=myPhrases.filter((_,j)=>j!==localIdx);
    setMyPhrases(next);localStorage.setItem('harbin-phrases',JSON.stringify(next));setOpenPhrase(null);
  };

  const addPhrase=async()=>{
    const th=newPhrase.trim();if(!th||addBusy)return;
    setAddBusy(true);setAddMsg('กำลังแปล…');
    try {
      // MyMemory API: free, no key needed, works in China
      const res=await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(th)}&langpair=th|zh-CN`);
      const data=await res.json();
      const cn=data?.responseData?.translatedText||'';
      if(!cn||cn===th)throw new Error('no translation');
      // Get pinyin via MyMemory zh-CN -> en (romanization in match)
      let pinyin='';
      try{
        const res2=await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(cn)}&langpair=zh-CN|en`);
        const data2=await res2.json();
        // MyMemory doesn't give pinyin directly, so we skip and rely on TTS
        pinyin='(กดฟังเสียงอ่าน)';
      }catch(e){}
      const entry={c:'ของฉัน',th,cn,read:pinyin};
      const list=[...myPhrases,entry];
      setMyPhrases(list);localStorage.setItem('harbin-phrases',JSON.stringify(list));
      setNewPhrase('');setAddMsg('แปลสำเร็จ · เพิ่มในหมวด ของฉัน');
    } catch(e) {
      // Fallback: try Google Translate (needs VPN in China)
      try{
        const res=await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=th&tl=zh-CN&dt=t&q=${encodeURIComponent(th)}`);
        const data=await res.json();
        const cn=data?.[0]?.[0]?.[0]||'';
        if(!cn)throw 0;
        const res2=await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=rm&q=${encodeURIComponent(cn)}`);
        const data2=await res2.json();
        const pinyin=data2?.[0]?.[0]?.[3]||'(กดฟังเสียงอ่าน)';
        const entry={c:'ของฉัน',th,cn,read:pinyin};
        const list=[...myPhrases,entry];
        setMyPhrases(list);localStorage.setItem('harbin-phrases',JSON.stringify(list));
        setNewPhrase('');setAddMsg('แปลสำเร็จ (Google) · เพิ่มในหมวด ของฉัน');
      }catch(e2){
        setAddMsg('แปลไม่ได้ (ไม่มีเน็ต?) ลองใหม่ตอนมีสัญญาณ');
      }
    }
    setAddBusy(false);setTimeout(()=>setAddMsg(''),4000);
  };

  return(<div style={{padding:'30px 16px 0'}}>
    <h2 style={{fontSize:20,color:'var(--navy)',margin:'0 0 14px',fontWeight:700,display:'flex',alignItems:'center',gap:10}}>
      <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:32,height:32,borderRadius:11,background:'var(--ice)',color:'#2C7BB8'}}><i className='ph-duotone ph-chats-circle' style={{fontSize:17}}/></span>ประโยคจีนที่ใช้บ่อย
    </h2>
    <div style={{padding:16,background:'#fff',border:'2px solid var(--ice)',borderRadius:18,boxShadow:'0 8px 20px rgba(60,120,180,.08)'}}>
      <p style={{margin:'0 0 12px',fontSize:12,color:'rgba(43,58,85,.55)'}}>แตะเพื่อดูตัวจีนตัวใหญ่ ยื่นให้อีกฝ่ายอ่านได้เลย</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:10}}>
        {CATS.map(c=>(<button key={c} onClick={()=>{setCat(c);setOpenPhrase(null);}} style={{all:'unset',cursor:'pointer',fontSize:13,fontWeight:700,padding:'6px 14px',border:`2px solid ${c===cat?'var(--orange)':'var(--ice)'}`,borderRadius:999,background:c===cat?'var(--orange)':'#fff',color:c===cat?'#fff':'var(--navy)'}}>{c}</button>))}
      </div>
      <div style={{maxHeight:460,overflow:'auto'}}>
        {filtered.map((p,fi)=>{
          const globalIdx=allPhrases.indexOf(p);
          const isOpen=openPhrase===globalIdx;
          const isCustom=globalIdx>=PHRASES.length;
          return(<div key={fi} style={{borderTop:'2px dashed #EAF2FA'}}>
            <button onClick={()=>setOpenPhrase(isOpen?null:globalIdx)} style={{all:'unset',cursor:'pointer',display:'grid',gridTemplateColumns:'1fr auto',gap:12,alignItems:'baseline',width:'100%',padding:'13px 0'}}>
              <span><span style={{display:'block',fontSize:16,lineHeight:1.35,color:'var(--navy)'}}>{p.th}</span><span style={{display:'block',fontSize:11,marginTop:2,color:'rgba(43,58,85,.45)'}}>{p.c}</span></span>
              <span style={{fontSize:12,fontWeight:700,color:'var(--orange)'}}>{isOpen?'ซ่อน':'ดูตัวจีน'}</span>
            </button>
            {isOpen&&(<div style={{padding:'2px 0 18px'}}>
              <div style={{fontSize:30,lineHeight:1.35,fontWeight:700,color:'var(--navy)'}}>{p.cn}</div>
              {p.read&&<div style={{fontSize:14,color:'var(--pink-dk)',marginTop:4}}>อ่านว่า {p.read}</div>}
              <button onClick={()=>speak(p.cn)} style={{all:'unset',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:8,marginTop:12,padding:'8px 16px',borderRadius:999,background:'var(--orange)',fontSize:14,color:'#fff',fontWeight:700}}><span style={{fontSize:15}}>◗)</span>ฟังเสียงอ่าน</button>
              <div style={{fontSize:11,color:'rgba(43,58,85,.45)',marginTop:6}}>ใช้เสียงอ่านของเครื่อง</div>
              {isCustom&&<button onClick={()=>removePhrase(globalIdx)} style={{all:'unset',cursor:'pointer',display:'block',marginTop:10,fontSize:12,fontWeight:600,color:'var(--pink-dk)'}}>ลบประโยคนี้</button>}
            </div>)}
          </div>);
        })}
      </div>
      <div style={{marginTop:16,paddingTop:16,borderTop:'2px dashed var(--ice)'}}>
        <div style={{fontSize:13,color:'rgba(43,58,85,.65)',marginBottom:8}}>เพิ่มประโยคเอง</div>
        <div style={{display:'flex',gap:8}}>
          <input value={newPhrase} onChange={e=>setNewPhrase(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addPhrase()} placeholder="เช่น ขอผ้าห่มเพิ่ม" style={{flex:1,minWidth:0,fontFamily:"'Mitr',sans-serif",fontSize:14,padding:'9px 12px',background:'#fff',border:'2px solid var(--ice)',borderRadius:14,color:'var(--navy)'}}/>
          <button onClick={addPhrase} disabled={addBusy} style={{all:'unset',cursor:'pointer',padding:'9px 18px',borderRadius:999,background:'var(--orange)',color:'#fff',fontSize:14,fontWeight:700,opacity:addBusy?0.5:1}}>เพิ่ม</button>
        </div>
        {addMsg&&<div style={{fontSize:12,marginTop:8,color:'rgba(43,58,85,.5)'}}>{addMsg}</div>}
      </div>
    </div>
  </div>);
}
