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

  // Pinyin to Thai approximation map
  const pinyinToThai=(p)=>{
    if(!p)return '';
    const map={a:'อา',ai:'ไอ',an:'อัน',ang:'อัง',ao:'เอา',ba:'ปา',bai:'ไป๋',ban:'ปัน',bang:'ปัง',bao:'เปา',bei:'เป่ย',ben:'เปิน',beng:'เปิง',bi:'ปี้',bian:'เปี่ยน',biao:'เปี่ยว',bie:'เปี๋ย',bin:'ปิน',bing:'ปิง',bo:'ปั๋ว',bu:'ปู้',ca:'ชา',cai:'ไช่',can:'ชัน',cang:'ชาง',cao:'เฉา',ce:'เช่อ',cen:'เชิน',ceng:'เชิง',cha:'ฉา',chai:'ไฉ',chan:'ฉัน',chang:'ฉาง',chao:'เฉา',che:'เชอ',chen:'เฉิน',cheng:'เฉิง',chi:'ชือ',chong:'ฉง',chou:'โฉว',chu:'ชู',chua:'ชวา',chuai:'ชวาย',chuan:'ฉวน',chuang:'ฉวง',chui:'ชุย',chun:'ชุน',chuo:'ชัว',ci:'ชือ',cong:'ฉง',cou:'โฉว',cu:'ชู',cuan:'ชวน',cui:'ชุย',cun:'ชุน',cuo:'ชั่ว',da:'ต้า',dai:'ไต้',dan:'ตัน',dang:'ตัง',dao:'เต้า',de:'เตอะ',dei:'เต่ย',den:'เติน',deng:'เติง',di:'ตี้',dia:'เตีย',dian:'เตี่ยน',diao:'เตี่ยว',die:'เตี๋ย',ding:'ติง',diu:'ติว',dong:'ตง',dou:'โต้ว',du:'ตู้',duan:'ต้วน',dui:'ตุย',dun:'ตุน',duo:'ตั่ว',e:'เอ้อ',ei:'เอ้ย',en:'เอิน',er:'เอ่อร์',fa:'ฟา',fan:'ฟัน',fang:'ฟัง',fei:'เฟย',fen:'เฟิน',feng:'เฟิง',fo:'ฝัว',fou:'โฝว',fu:'ฝู',ga:'กา',gai:'ไก',gan:'กัน',gang:'กัง',gao:'เกา',ge:'เก้อ',gei:'เก่ย',gen:'เกิน',geng:'เกิง',gong:'กง',gou:'โกว',gu:'กู',gua:'กวา',guai:'ไกว',guan:'กวน',guang:'กวง',gui:'กุย',gun:'กุน',guo:'กั้ว',ha:'ฮา',hai:'ไห',han:'ฮั่น',hang:'หาง',hao:'ห่าว',he:'เห่อ',hei:'เฮย',hen:'เหิน',heng:'เฮิง',hong:'หง',hou:'โฮ่ว',hu:'หู',hua:'หัว',huai:'ไหว',huan:'หวน',huang:'หวง',hui:'หุย',hun:'หุน',huo:'หั่ว',ji:'จี',jia:'เจีย',jian:'เจี่ยน',jiang:'เจี่ยง',jiao:'เจี่ยว',jie:'เจี๋ย',jin:'จิน',jing:'จิง',jiong:'จ๋ง',jiu:'จิ่ว',ju:'จวี',juan:'จวน',jue:'เจว๋',jun:'จวิน',ka:'คา',kai:'ไค',kan:'คัน',kang:'คัง',kao:'เคา',ke:'เค่อ',ken:'เขิน',keng:'เขิง',kong:'คง',kou:'โค่ว',ku:'คู',kua:'ควา',kuai:'ไคว',kuan:'ควน',kuang:'ควง',kui:'คุย',kun:'คุน',kuo:'คั่ว',la:'ลา',lai:'ไหล',lan:'หลัน',lang:'หลาง',lao:'เหลา',le:'เล่อ',lei:'เหลย',leng:'เหลิง',li:'หลี่',lia:'เลีย',lian:'เหลียน',liang:'เหลียง',liao:'เหลียว',lie:'เลี่ย',lin:'หลิน',ling:'หลิง',liu:'หลิว',long:'หลง',lou:'โหลว',lu:'ลู่',luan:'หลวน',lun:'หลุน',luo:'หลั่ว',lv:'หลวี่',ma:'หม่า',mai:'ไหม',man:'หมัน',mang:'หมาง',mao:'เหมา',me:'เมอะ',mei:'เหมย',men:'เหมิน',meng:'เหมิง',mi:'หมี่',mian:'เหมี่ยน',miao:'เหมี่ยว',mie:'เมี่ย',min:'หมิน',ming:'หมิง',miu:'หมิว',mo:'มั่ว',mou:'โหมว',mu:'มู่',na:'น่า',nai:'ไหน',nan:'หนัน',nang:'หนาง',nao:'เหนา',ne:'เน่อ',nei:'เน่ย',nen:'เหนิน',neng:'เหนิง',ni:'หนี่',nian:'เหนียน',niang:'เหนียง',niao:'เหนียว',nie:'เนี่ย',nin:'หนิน',ning:'หนิง',niu:'หนิว',nong:'หนง',nou:'โหนว',nu:'หนู่',nuan:'หนวน',nun:'หนุน',nuo:'หนั่ว',nv:'หนวี่',o:'โอ',ou:'โอว',pa:'พา',pai:'ไพ',pan:'พัน',pang:'พัง',pao:'เพา',pei:'เพ่ย',pen:'เพิน',peng:'เพิง',pi:'พี',pian:'เพี่ยน',piao:'เพี่ยว',pie:'เพี่ย',pin:'พิน',ping:'พิง',po:'พั่ว',pou:'โพว',pu:'พู่',qi:'ชี',qia:'เชีย',qian:'เชียน',qiang:'เชียง',qiao:'เชียว',qie:'เชี่ย',qin:'ชิน',qing:'ชิง',qiong:'ชย่ง',qiu:'ชิ่ว',qu:'ชวี่',quan:'เชวียน',que:'เชว่',qun:'ชวิน',ran:'หรัน',rang:'หร่าง',rao:'เหรา',re:'เร่อ',ren:'เหริน',reng:'เหริง',ri:'รื่อ',rong:'หรง',rou:'โหรว',ru:'หรู',ruan:'หรวน',rui:'รุ่ย',run:'หรุน',ruo:'หรั่ว',sa:'ซา',sai:'ไซ',san:'ซัน',sang:'ซัง',sao:'เซา',se:'เซ่อ',sen:'เซิน',seng:'เซิง',sha:'ซา',shai:'ไซ',shan:'ซัน',shang:'ซ่าง',shao:'เส้า',she:'เช่อ',shei:'เช่ย',shen:'เชิน',sheng:'เชิง',shi:'ซือ',shou:'โช่ว',shu:'ซู',shua:'ซวา',shuai:'ไซว',shuan:'ซวน',shuang:'ซวง',shui:'ซุย',shun:'ซุน',shuo:'ซั่ว',si:'ซือ',song:'ซง',sou:'โซว',su:'ซู',suan:'ซวน',sui:'ซุย',sun:'ซุน',suo:'ซั่ว',ta:'ทา',tai:'ไท',tan:'ทัน',tang:'ทัง',tao:'เทา',te:'เท่อ',teng:'เทิง',ti:'ที',tian:'เทียน',tiao:'เทียว',tie:'เที่ย',ting:'ทิง',tong:'ทง',tou:'โท่ว',tu:'ทู',tuan:'ทวน',tui:'ทุย',tun:'ทุน',tuo:'ทั่ว',wa:'วา',wai:'ไหว',wan:'หวัน',wang:'วัง',wei:'เว่ย',wen:'เวิน',weng:'เวิง',wo:'วั่ว',wu:'อู๋',xi:'ซี',xia:'เซีย',xian:'เซียน',xiang:'เซียง',xiao:'เซียว',xie:'เซี่ย',xin:'ซิน',xing:'ซิง',xiong:'ซย่ง',xiu:'ซิ่ว',xu:'ซวี่',xuan:'เซวียน',xue:'เซว่',xun:'ซวิน',ya:'ย่า',yan:'เยี่ยน',yang:'หยาง',yao:'เย่า',ye:'เย่',yi:'อี้',yin:'อิน',ying:'อิง',yong:'ยง',you:'โหย่ว',yu:'อวี่',yuan:'หยวน',yue:'เยว่',yun:'อวิน',za:'จ๊า',zai:'ไจ้',zan:'จั่น',zang:'จ้าง',zao:'เจ่า',ze:'เจ๋อ',zei:'เจ้ย',zen:'เจิน',zeng:'เจิง',zha:'จ้า',zhai:'ไจ',zhan:'จั่น',zhang:'จัง',zhao:'เจ้า',zhe:'เจ้อ',zhei:'เจ้ย',zhen:'เจิน',zheng:'เจิ้ง',zhi:'จือ',zhong:'จง',zhou:'โจว',zhu:'จู',zhua:'จัว',zhuai:'จ้วย',zhuan:'จ้วน',zhuang:'จ้วง',zhui:'จุย',zhun:'จุน',zhuo:'จั่ว',zi:'จือ',zong:'จง',zou:'โจ้ว',zu:'จู',zuan:'จ้วน',zui:'จุ่ย',zun:'จุน',zuo:'จั่ว'};
    // Simple conversion: split by spaces and tone marks, lookup each syllable
    const clean=p.toLowerCase().replace(/[āáǎà]/g,'a').replace(/[ēéěè]/g,'e').replace(/[īíǐì]/g,'i').replace(/[ōóǒò]/g,'o').replace(/[ūúǔù]/g,'u').replace(/[ǖǘǚǜü]/g,'v').replace(/[^a-z\s]/g,'');
    const syllables=clean.split(/\s+/).filter(Boolean);
    return syllables.map(s=>{
      if(map[s])return map[s];
      // Try removing last char progressively
      for(let i=s.length-1;i>=1;i--){const sub=s.slice(0,i);if(map[sub])return map[sub]+'-'+s.slice(i);}
      return s;
    }).join('-');
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
      // Get pinyin via Google Translate then convert to Thai
      let thaiRead='(กดฟังเสียงอ่าน)';
      try{
        const res2=await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=rm&q=${encodeURIComponent(cn)}`);
        const data2=await res2.json();
        const pinyin=data2?.[0]?.[0]?.[3]||'';
        if(pinyin)thaiRead=pinyinToThai(pinyin);
      }catch(e){}
      const entry={c:'ของฉัน',th,cn,read:thaiRead||'(กดฟังเสียงอ่าน)'};
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
        const entry={c:'ของฉัน',th,cn,read:pinyinToThai(pinyin)||pinyin};
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
