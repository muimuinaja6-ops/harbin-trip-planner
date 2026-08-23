import React, { useState } from 'react';

const EMERGENCY = [
  { label: 'ตำรวจจีน', num: '110', note: 'เหตุอาชญากรรม ของหาย' },
  { label: 'รถพยาบาล', num: '120', note: 'เจ็บป่วย อุบัติเหตุ' },
  { label: 'ดับเพลิง', num: '119', note: 'ไฟไหม้' },
  { label: 'ตำรวจจราจร', num: '122', note: 'อุบัติเหตุบนถนน' },
  { label: 'สถานทูตไทย ปักกิ่ง', num: '+861065321749', note: 'เวลาทำการ จ-ศ 9:00-12:00, 14:00-17:00' },
  { label: 'สายด่วนกงสุลไทย 24 ชม.', num: '+6625728442', note: 'โทรได้ตลอด นอกเวลาทำการสถานทูต' },
];

const HOTEL_INFO = {
  name: '(ใส่ชื่อโรงแรม)',
  address_cn: '(ใส่ที่อยู่ภาษาจีน)',
  note: 'แก้ไขได้ด้านล่าง บันทึกไว้ยื่นให้คนขับแท็กซี่',
};

export default function SOSCard() {
  const [hotel, setHotel] = useState(() => {
    try { return JSON.parse(localStorage.getItem('harbin-hotel') || 'null') || HOTEL_INFO; } catch { return HOTEL_INFO; }
  });
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(hotel.name);
  const [addr, setAddr] = useState(hotel.address_cn);

  const saveHotel = () => {
    const h = { ...hotel, name: name.trim(), address_cn: addr.trim() };
    setHotel(h);
    localStorage.setItem('harbin-hotel', JSON.stringify(h));
    setEditing(false);
  };

  return (
    <div style={{ padding: '30px 16px 0' }}>
      <h2 style={{ fontSize: 20, color: 'var(--navy)', margin: '0 0 14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 11, background: 'var(--pink-100)', color: 'var(--pink-dk)' }}><i className='ph-duotone ph-first-aid' style={{ fontSize: 17 }} /></span>ฉุกเฉิน & ที่พัก
      </h2>
      <div style={{ padding: 16, background: '#fff', border: '2px solid var(--pink)', borderRadius: 18, boxShadow: '0 8px 20px rgba(60,120,180,.08)' }}>

        {/* Hotel card - show to taxi driver */}
        <div style={{ padding: 14, background: 'var(--pink-100)', borderRadius: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--pink-dk)', marginBottom: 6 }}>🏨 ที่พัก (ยื่นให้คนขับดู)</div>
          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="ชื่อโรงแรม" style={{ fontFamily: "'Mitr',sans-serif", fontSize: 14, padding: '8px 12px', border: '2px solid var(--ice)', borderRadius: 12, color: 'var(--navy)' }} />
              <input value={addr} onChange={e => setAddr(e.target.value)} placeholder="ที่อยู่ภาษาจีน (copy จาก booking)" style={{ fontFamily: "'Mitr',sans-serif", fontSize: 14, padding: '8px 12px', border: '2px solid var(--ice)', borderRadius: 12, color: 'var(--navy)' }} />
              <button onClick={saveHotel} style={{ all: 'unset', cursor: 'pointer', fontSize: 13, fontWeight: 700, padding: '8px 16px', borderRadius: 999, background: 'var(--pink)', color: '#fff', alignSelf: 'flex-start' }}>บันทึก</button>
            </div>
          ) : (
            <div onClick={() => setEditing(true)} style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>{hotel.name}</div>
              <div style={{ fontSize: 16, marginTop: 4, color: 'var(--navy)' }}>{hotel.address_cn}</div>
              <div style={{ fontSize: 11, marginTop: 6, color: 'rgba(43,58,85,.45)' }}>แตะเพื่อแก้ไข</div>
            </div>
          )}
        </div>

        {/* Emergency numbers */}
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--pink-dk)', marginBottom: 8 }}>เบอร์ฉุกเฉิน (แตะโทรได้เลย)</div>
        {EMERGENCY.map((e, i) => (
          <a key={i} href={`tel:${e.num}`} style={{ all: 'unset', cursor: 'pointer', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', padding: '10px 0', borderTop: i > 0 ? '1px solid #EAF2FA' : 'none' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{e.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(43,58,85,.45)' }}>{e.note}</div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--pink-dk)' }}>☎ {e.num.replace('+86', '+86 ')}</span>
          </a>
        ))}

        <p style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(43,58,85,.55)', margin: '14px 0 0' }}>ใส่ชื่อ+ที่อยู่โรงแรมภาษาจีนไว้ เวลาหลงทาง ยื่นมือถือให้คนขับแท็กซี่ดูได้เลย</p>
      </div>
    </div>
  );
}
