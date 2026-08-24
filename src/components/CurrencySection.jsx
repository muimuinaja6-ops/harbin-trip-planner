import React,{useState,useEffect} from 'react';
export default function CurrencySection(){
  const[thb,setThb]=useState(()=>localStorage.getItem('harbin-thb')||'1000');
  const[rate,setRate]=useState(()=>localStorage.getItem('harbin-rate')||'4.88');
  const[fxDir,setFxDir]=useState(()=>localStorage.getItem('harbin-fxdir')||'thb2cny');
  const[fxStatus,setFxStatus]=useState('loading');
  useEffect(()=>{
    // Try Google Finance first (unofficial but accurate)
    fetch('https://www.google.com/finance/quote/CNY-THB')
      .then(r=>r.text())
      .then(html=>{
        // Google Finance page contains the rate in a data attribute
        const match=html.match(/data-last-price="([\d.]+)"/);
        if(match){
          const v=parseFloat(match[1]).toFixed(2);
          localStorage.setItem('harbin-rate',v);setRate(v);setFxStatus('live');
        } else throw new Error('parse failed');
      })
      .catch(()=>{
        // Fallback to Open Exchange Rates (free, no key)
        fetch('https://open.er-api.com/v6/latest/CNY')
          .then(r=>r.json())
          .then(d=>{const t=d?.rates?.THB;if(!t)throw 0;const v=t.toFixed(2);localStorage.setItem('harbin-rate',v);setRate(v);setFxStatus('live');})
          .catch(()=>setFxStatus('offline'));
      });
  },[]);
  const toCny=fxDir==='thb2cny';const rateNum=parseFloat(rate)||4.88;const thbNum=parseFloat(String(thb).replace(/,/g,''))||0;
  const cnyTxt=(toCny?thbNum/rateNum:thbNum*rateNum).toLocaleString('en-US',{maximumFractionDigits:2});
  const handleThb=e=>{
    const v=e.target.value.replace(/[^0-9.]/g,'').replace(/(\..*)\.$/,'$1');
    if(v.length>10)return;
    setThb(v);
  };
  const handleRate=e=>{
    const v=e.target.value.replace(/[^0-9.]/g,'').replace(/(\..*)\.$/,'$1');
    const num=parseFloat(v);
    if(v&&num>100)return;
    if(v.length>6)return;
    localStorage.setItem('harbin-rate',v);setRate(v);
  };
  const thbError=thb&&(isNaN(parseFloat(thb))||parseFloat(thb)<0)?'ตัวเลขไม่ถูกต้อง':'';
  const rateError=rate&&(isNaN(parseFloat(rate))||parseFloat(rate)<=0)?'เรทต้องมากกว่า 0':'';
  const swap=()=>{const dir=toCny?'cny2thb':'thb2cny';localStorage.setItem('harbin-fxdir',dir);setFxDir(dir);setThb(cnyTxt.replace(/,/g,''));};
  const quicks=toCny?['500','1000','3000','5000','10000']:['50','100','300','500','1000'];
  return(<div style={{padding:'30px 16px 0'}}><h2 style={{fontSize:20,color:'var(--navy)',margin:'0 0 14px',fontWeight:700,display:'flex',alignItems:'center',gap:10}}><span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:32,height:32,borderRadius:11,background:'#D8F7EE',color:'#219C7D'}}><i className='ph-duotone ph-currency-cny' style={{fontSize:17}}/></span>แลกเงินหยวน</h2><div style={{padding:16,background:'#fff',border:'2px solid var(--ice)',borderRadius:18,boxShadow:'0 8px 20px rgba(60,120,180,.08)'}}><p style={{margin:'0 0 14px',fontSize:12,lineHeight:1.55,color:'rgba(43,58,85,.6)'}}>{fxStatus==='live'?'เรทกลางตลาดสด · ร้านแลกเงินจริงจะให้เรทต่างจากนี้เล็กน้อย':'ใช้เรทสำรอง 1 หยวน ≈ 4.88 บาท'}</p><div style={{display:'grid',gridTemplateColumns:'1fr 40px 1fr',gap:10,alignItems:'end'}}><div><div style={{fontSize:11,fontWeight:700,color:'var(--orange)',marginBottom:6}}>{toCny?'บาท':'หยวน'}</div><input value={thb} onChange={handleThb} inputMode='decimal' style={{width:'100%',boxSizing:'border-box',fontFamily:"'Baloo 2',sans-serif",fontSize:22,fontWeight:700,padding:'9px 12px',background:'#fff',border:`2px solid ${thbError?'#e74c3c':'var(--ice)'}`,borderRadius:14,color:'var(--navy)',transition:'border-color .2s'}}/>{thbError&&<p style={{margin:'4px 0 0',fontSize:11,color:'#e74c3c',fontWeight:600}}>{thbError}</p>}</div><button onClick={swap} style={{all:'unset',cursor:'pointer',justifySelf:'center',width:38,height:38,borderRadius:999,background:'var(--orange)',textAlign:'center',lineHeight:'36px',fontSize:16,color:'#fff'}}>⇄</button><div><div style={{fontSize:11,fontWeight:700,color:'var(--pink-dk)',marginBottom:6}}>{toCny?'หยวน':'บาท'}</div><div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:24,fontWeight:700,color:'var(--navy)'}}>{toCny?'¥':'฿'} {cnyTxt}</div></div></div><div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:14}}>{quicks.map(v=>(<button key={v} onClick={()=>setThb(v)} style={{all:'unset',cursor:'pointer',fontSize:13,fontWeight:700,padding:'6px 14px',border:`2px solid ${thb===v?'var(--orange)':'var(--ice)'}`,borderRadius:999,background:thb===v?'var(--orange)':'#fff',color:thb===v?'#fff':'var(--navy)'}}>{(toCny?'฿':'¥')+Number(v).toLocaleString()}</button>))}</div><div style={{display:'flex',alignItems:'center',gap:10,marginTop:14,paddingTop:12,borderTop:'2px dashed var(--ice)',flexWrap:'wrap'}}><span style={{fontSize:12,color:'rgba(43,58,85,.6)'}}>1 หยวน =</span><input value={rate} onChange={handleRate} inputMode='decimal' style={{width:70,fontFamily:"'Baloo 2',sans-serif",fontSize:14,fontWeight:700,padding:'6px 10px',background:'#fff',border:`2px solid ${rateError?'#e74c3c':'var(--ice)'}`,borderRadius:12,color:'var(--navy)',transition:'border-color .2s'}}/><span style={{fontSize:12,color:'rgba(43,58,85,.6)'}}>บาท</span><span style={{marginLeft:'auto',fontSize:12,fontWeight:700,color:fxStatus==='live'?'var(--orange)':'rgba(43,58,85,.45)'}}>{fxStatus==='live'?'● สด':'สำรอง'}</span>{rateError&&<p style={{width:'100%',margin:'4px 0 0',fontSize:11,color:'#e74c3c',fontWeight:600}}>{rateError}</p>}</div></div></div>);
}
