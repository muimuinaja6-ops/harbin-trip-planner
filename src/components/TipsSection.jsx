import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'cold', label: '🧊 กันหนาว', color: '#2C7BB8' },
  { id: 'phone', label: '📱 มือถือ', color: 'var(--orange)' },
  { id: 'food', label: '🍜 กิน', color: '#219C7D' },
  { id: 'photo', label: '📸 ถ่ายรูป', color: 'var(--pink-dk)' },
  { id: 'travel', label: '🚗 เดินทาง', color: 'var(--navy)' },
  { id: 'money', label: '💰 เงิน', color: '#C65A16' },
];

const TIPS = [
  { cat: 'cold', title: 'แต่งตัว 3 ชั้น', body: 'ชั้นใน: ฮีทเทค (ดูดซับเหงื่อ) · ชั้นกลาง: ขนเป็ด/fleece (เก็บความร้อน) · ชั้นนอก: โค้ทกันลม+กันน้ำ (บล็อกลม) อย่าใส่หนาชั้นเดียว ไม่อุ่นเท่า' },
  { cat: 'cold', title: 'ปิดทุกช่องว่าง', body: 'ลมหนาวเข้าตามข้อมือ คอ ข้อเท้า สวม: ถุงมือกันน้ำ + หมวก+ที่ปิดหู + ผ้าพันคอ/balaclava + ถุงเท้า 2 ชั้น ไม่งั้นหูกับนิ้วจะชาภายใน 5 นาที' },
  { cat: 'cold', title: 'แผ่นแปะร้อน (คาโระ)', body: 'แปะหลัง 1 + ท้อง 1 + พื้นรองเท้า 2 ได้ความอุ่น 8-10 ชม. ซื้อที่ไทยถูกกว่า หรือซื้อเพิ่มที่ร้านสะดวกซื้อในฮาร์บิน (ถามว่า 暖宝宝 หนวน-เป่า-เป่า)' },
  { cat: 'cold', title: 'ห้ามเปิดผิวสัมผัสโลหะ', body: 'ที่ −30° โลหะเย็นจัด ถ้าผิวเปียกแตะราวเหล็กจะติดแข็งทันที ใส่ถุงมือก่อนจับทุกอย่างที่เป็นเหล็ก' },
  { cat: 'cold', title: 'เข้าข้างในทุก 30-40 นาที', body: 'ร่างกายสูญเสียความร้อนเร็วกว่าที่คิด เข้าร้านค้า/ร้านอาหารพักอุ่นตัวบ่อยๆ อย่าฝืนอยู่ข้างนอกนานเกิน' },
  { cat: 'phone', title: 'แบตหมดเร็วมากในอากาศหนาว', body: 'มือถือจะดับที่ 20-30% เพราะแบต Li-ion ทำงานไม่ดีในอากาศเย็น วิธีแก้: เก็บมือถือไว้ในกระเป๋าชั้นใน (ใกล้ตัว) หยิบออกมาถ่ายรูปแล้วเก็บเลย' },
  { cat: 'phone', title: 'พาวเวอร์แบงค์ต้องมี', body: 'พาวเวอร์แบงค์ก็โดนหนาวเหมือนกัน เก็บไว้ในกระเป๋าในเสื้อโค้ท ห้ามทิ้งไว้ในกระเป๋าเป้ข้างนอก' },
  { cat: 'phone', title: 'eSIM/SIM จีน + VPN', body: 'Google Maps, LINE, IG, Facebook ใช้ไม่ได้ในจีน ต้องเปิด VPN (ติดตั้งก่อนเข้าจีน) ใช้ Baidu Maps แทน Google Maps สำหรับนำทางในจีน หรือใช้ Amap (高德地图)' },
  { cat: 'food', title: 'อย่ากินข้างนอกนาน', body: 'อาหารเย็นตัวภายใน 2 นาทีที่ −20° ก๋วยเตี๋ยว/ติ่มซำกินข้างนอกจะกลายเป็นน้ำแข็ง สั่งกินในร้านเท่านั้น' },
  { cat: 'food', title: 'เมนูต้องลอง', body: '• 锅包肉 (กัว-เปา-โร่ว) หมูทอดซอสหวาน\n• 铁锅炖 (เที่ย-กัว-ตุ๋น) หม้อไฟเหล็กตุ๋น\n• 冰糖葫芦 (ปิง-ถัง-หู-ลู) ผลไม้เคลือบน้ำตาล\n• 马迭尔冰棍 (หม่า-เตี๋ย-เอ่อร์) ไอติมแท่งที่ถนนจงหยาง' },
  { cat: 'food', title: 'น้ำร้อนคือเพื่อนที่ดีที่สุด', body: 'พกกระติกน้ำร้อน (保温杯 เป่า-เวิน-เปย) ร้านอาหารทุกร้านเติมน้ำร้อนฟรี ดื่มบ่อยๆ ร่างกายต้องการน้ำมากแม้ไม่รู้สึกกระหาย' },
  { cat: 'photo', title: 'ถ่ายรูปตอนพลบค่ำสวยสุด', body: 'Ice and Snow World เปิดไฟตอน 16:00-17:00 ช่วง golden hour + ไฟ LED สวยมาก ไปถึงก่อนเปิดไฟ 30 นาที จะได้ทั้ง 2 mood' },
  { cat: 'photo', title: 'กล้องต้องปรับตัวก่อน', body: 'เข้าจากข้างนอก (−30°) มาข้างใน (+20°) เลนส์จะเป็นฝ้าทันที ห้ามเปิดใช้เลย ใส่ถุงซิปล็อคก่อนเข้าข้างใน รอ 15-20 นาทีให้ปรับอุณหภูมิ' },
  { cat: 'photo', title: 'หิมะสะท้อนแสงแรง', body: 'ใส่แว่นกันแดดทุกครั้งที่อยู่กลางแจ้งตอนกลางวัน หิมะสะท้อน UV ได้ 80-90% ตาจะเจ็บมากถ้าไม่ใส่ (snow blindness)' },
  { cat: 'travel', title: 'ไม่มี Grab/Bolt ใช้ DiDi', body: 'โหลดแอป 滴滴出行 (DiDi) ก่อนเดินทาง รองรับภาษาอังกฤษ จ่ายผ่าน Alipay/WeChat Pay ถ้าไม่มีให้บอกคนขับปลายทางเป็นภาษาจีน (ยื่นมือถือดู)' },
  { cat: 'travel', title: 'รถยาว 5 ชม. เตรียมตัว', body: 'เส้นทาง ฮาร์บิน → สโนว์ทาวน์ ราว 5 ชั่วโมง เตรียม: ขนม, น้ำ, หมอนรองคอ, ชาร์จมือถือเต็ม, ยาแก้เมารถ ห้องน้ำระหว่างทางมีน้อย' },
  { cat: 'travel', title: 'รองเท้ากันลื่นสำคัญมาก', body: 'พื้นหิมะอัดแข็งลื่นมาก ใส่รองเท้าพื้นยางหยักลึก หรือซื้อที่ครอบรองเท้ากันลื่น (冰爪 ปิง-จ่าว) ที่ร้านข้างทาง 10-20 หยวน' },
  { cat: 'money', title: 'จ่ายด้วย Alipay/WeChat Pay', body: 'จีนแทบไม่ใช้เงินสดแล้ว ผูก Alipay กับบัตรเครดิต/เดบิตไทยก่อนไป (Tour Pass) หรือแลกเงินสดติดตัวไว้สำรอง ร้านเล็กๆ บางร้านรับแต่ scan' },
  { cat: 'money', title: 'แลกเงินที่ไทยก่อนนิดหน่อย', body: 'แลก 2,000-3,000 หยวน/คน ที่ SuperRich หรือ Twelve Victory ได้เรทดีกว่าแลกที่จีน ที่เหลือใช้ Alipay/บัตร ร้านใหญ่รับ Visa/Master ด้วย' },
  { cat: 'money', title: 'ค่าตั๋วที่ต้องจ่าย', body: '• Ice and Snow World: ~328¥/คน\n• Snow Town: ~120¥/คน (ค่าเข้าหมู่บ้าน)\n• Sun Island: ~100¥/คน\nจองล่วงหน้าผ่าน Ctrip/携程 ถูกกว่าซื้อหน้างาน' },
];

export default function TipsSection() {
  const [activeCat, setActiveCat] = useState('cold');
  const [openTip, setOpenTip] = useState(null);

  const filtered = TIPS.filter(t => t.cat === activeCat);
  const catObj = CATEGORIES.find(c => c.id === activeCat);

  return (
    <div style={{ padding: '30px 16px 0' }}>
      <h2 style={{ fontSize: 20, color: 'var(--navy)', margin: '0 0 14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 11, background: 'var(--orange-100)', color: 'var(--orange-dk)' }}>
          <i className='ph-duotone ph-lightbulb' style={{ fontSize: 17 }} />
        </span>
        เทคนิค & ความรู้
      </h2>
      <div style={{ padding: 16, background: '#fff', border: '2px solid var(--ice)', borderRadius: 18, boxShadow: '0 8px 20px rgba(60,120,180,.08)' }}>
        {/* Category pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => { setActiveCat(c.id); setOpenTip(null); }} style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 700, padding: '6px 12px', border: `2px solid ${activeCat === c.id ? c.color : 'var(--ice)'}`, borderRadius: 999, background: activeCat === c.id ? c.color : '#fff', color: activeCat === c.id ? '#fff' : 'var(--navy)' }}>{c.label}</button>
          ))}
        </div>

        {/* Tips list */}
        <div style={{ maxHeight: 460, overflow: 'auto' }}>
          {filtered.map((tip, i) => {
            const isOpen = openTip === i;
            return (
              <div key={i} style={{ borderTop: '2px dashed #EAF2FA' }}>
                <div onClick={() => setOpenTip(isOpen ? null : i)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0' }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{tip.title}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: catObj.color }}>{isOpen ? 'ซ่อน' : 'อ่าน'}</span>
                </div>
                {isOpen && (
                  <div style={{ padding: '0 0 16px', fontSize: 14, lineHeight: 1.7, color: 'rgba(43,58,85,.75)', whiteSpace: 'pre-line' }}>
                    {tip.body}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(43,58,85,.5)', margin: '14px 0 0' }}>
          เลือกหมวด แล้วแตะหัวข้อเพื่ออ่านรายละเอียด
        </p>
      </div>
    </div>
  );
}
