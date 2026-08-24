import React, { useState, useEffect } from 'react';

const FEATURES = [
  { icon: '🌡️', title: 'อากาศ', desc: 'สภาพอากาศ realtime ที่ฮาร์บิน' },
  { icon: '📅', title: 'แผนเที่ยว', desc: 'รายละเอียดแต่ละวัน กดดูได้' },
  { icon: '🗺️', title: 'เส้นทาง+แผนที่', desc: 'เปิด Baidu/Amap/Google ได้เลย' },
  { icon: '💱', title: 'แลกเงิน', desc: 'คำนวณ บาท-หยวน เรทสด' },
  { icon: '🎒', title: 'เตรียมของ', desc: 'Checklist แต่ละคน ติ๊กเองได้' },
  { icon: '🇨🇳', title: 'ประโยคจีน', desc: '35+ ประโยค พร้อมเสียงอ่าน' },
  { icon: '💡', title: 'เทคนิค', desc: '20 ข้อ กันหนาว/มือถือ/กิน/รูป' },
  { icon: '📸', title: 'จุดถ่ายรูป', desc: 'มุมแนะนำ + เวลาที่สวย' },
  { icon: '💰', title: 'หารค่าใช้จ่าย', desc: 'บันทึกแล้วสรุปใครจ่ายใคร' },
  { icon: '🆘', title: 'ฉุกเฉิน', desc: 'เบอร์โทร + ที่อยู่โรงแรม' },
];

export default function WelcomeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('harbin-welcomed')) setShow(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem('harbin-welcomed', '1');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,30,60,.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={dismiss}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 24, padding: '28px 20px', maxWidth: 380, width: '100%', maxHeight: '85vh', overflow: 'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 28 }}>❄️</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', margin: '8px 0 4px' }}>Harbin ฮาใจ</h2>
          <p style={{ fontSize: 13, color: 'rgba(43,58,85,.6)', margin: 0 }}>แอปนี้ใช้ได้ offline ไม่ต้องมีเน็ต</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 10px', background: 'var(--ice-light)', borderRadius: 12 }}>
              <span style={{ fontSize: 18, flex: 'none' }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{f.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(43,58,85,.55)' }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <button onClick={dismiss} style={{ all: 'unset', cursor: 'pointer', fontSize: 15, fontWeight: 700, padding: '12px 32px', borderRadius: 999, background: 'var(--orange)', color: '#fff' }}>เข้าใจแล้ว เริ่มเลย</button>
        </div>
        <p style={{ textAlign: 'center', margin: '12px 0 0', fontSize: 11, color: 'rgba(43,58,85,.4)' }}>เลื่อน tab ด้านล่างเพื่อเข้าแต่ละส่วน</p>
      </div>
    </div>
  );
}
