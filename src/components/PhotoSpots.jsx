import React, { useState } from 'react';

const SPOTS = [
  { place: 'โบสถ์เซนต์โซเฟีย', day: '27 ธ.ค.', q: '圣索菲亚教堂 哈尔滨', tips: [
    { angle: 'ด้านหน้า ถ่ายจากไกล 20 เมตร ให้เห็นโดมเขียวเต็ม', time: 'เช้า 9-10 โมง แสงสีทองสวย' },
    { angle: 'มุมเฉียงซ้าย 45° ได้พื้นหิมะ+โบสถ์+ท้องฟ้า', time: 'ตอนไหนก็ได้' },
    { angle: 'กลางคืนมีไฟ LED ส่องโบสถ์ สวยมาก', time: 'หลัง 17:00' },
  ]},
  { place: 'ถนนจงหยาง', day: '27/31 ธ.ค.', q: '中央大街 哈尔滨', tips: [
    { angle: 'ถ่ายมุมตรงถนน ให้เห็นอาคารยุโรปสองฝั่ง', time: 'ช่วงพลบค่ำ ไฟเริ่มเปิด' },
    { angle: 'ร้านไอติม 马迭尔 ถ่ายกับป้ายร้าน iconic', time: 'ตอนไหนก็ได้' },
  ]},
  { place: 'สโนว์ทาวน์ (หมู่บ้านหิมะ)', day: '27-28 ธ.ค.', q: '中国雪乡', tips: [
    { angle: 'หลังคาบ้านที่มีหิมะหนา ถ่ายมุมต่ำ ให้หิมะดูใหญ่', time: 'เช้ามืด/พลบค่ำ' },
    { angle: 'โคมไฟแดงกับหิมะ contrast สวยมาก', time: 'หลัง 16:30 เมื่อเปิดโคม' },
    { angle: 'มุมมองจากเนินสูง เห็นทั้งหมู่บ้าน', time: 'เช้า แสงเฉียง' },
  ]},
  { place: 'สโนว์วัลเล่', day: '28-29 ธ.ค.', q: '雪谷 哈尔滨', tips: [
    { angle: 'ทุ่งหิมะกว้าง ถ่าย silhouette ตอนพระอาทิตย์ตก', time: '15:30-16:30' },
    { angle: 'กิจกรรมเลื่อนหิมะ ถ่าย action shot burst mode', time: 'ตอนไหนก็ได้' },
    { angle: 'ต้นไม้แข็งตัวเป็นน้ำแข็ง (树挂) ถ่ายใกล้ macro สวย', time: 'เช้ามืด ก่อนละลาย' },
  ]},
  { place: 'Ice and Snow World', day: '31 ธ.ค.', q: '哈尔滨冰雪大世界', tips: [
    { angle: 'ปราสาทน้ำแข็งใหญ่ ถ่ายจากด้านหน้าตรง ให้เห็นไฟ LED ทั้งหลัง', time: 'หลัง 17:00 (เปิดไฟ)' },
    { angle: 'อุโมงค์น้ำแข็ง ถ่ายจากปลายอุโมงค์ เห็นแสงไฟผ่าน', time: 'ตลอดค่ำ' },
    { angle: 'สไลเดอร์น้ำแข็ง ถ่ายคนไถลมาจากด้านล่าง', time: 'ตลอดค่ำ' },
    { angle: 'พลุ countdown ถ่ายโดยตั้ง timer กล้อง + ขาตั้ง', time: 'เที่ยงคืน 31 ธ.ค.' },
  ]},
  { place: 'Sun Island (ตุ๊กตาหิมะยักษ์)', day: '31 ธ.ค.', q: '太阳岛雪博会 哈尔滨', tips: [
    { angle: 'ถ่ายห่างไกลให้เห็นขนาดเทียบกับคน', time: 'เช้า-บ่าย (ยังมีแสงธรรมชาติ)' },
    { angle: 'ถ่ายมุมล่างขึ้น ให้ตุ๊กตาดูยิ่งใหญ่', time: 'ตอนไหนก็ได้' },
  ]},
  { place: 'หมู่บ้านรัสเซีย', day: '1 ม.ค.', q: '伏尔加庄园 哈尔滨', tips: [
    { angle: 'อาคารสีสันกับหิมะ ถ่ายทั้ง wide และ detail', time: 'เช้า-บ่าย' },
    { angle: 'ประตูทางเข้าสไตล์รัสเซีย ถ่ายตรงกลาง symmetry', time: 'ตอนไหนก็ได้' },
  ]},
];

export default function PhotoSpots() {
  const [openSpot, setOpenSpot] = useState(null);

  return (
    <div style={{ padding: '30px 16px 0' }}>
      <h2 style={{ fontSize: 20, color: 'var(--navy)', margin: '0 0 14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 11, background: 'var(--pink-100)', color: 'var(--pink-dk)' }}>
          <i className='ph-duotone ph-camera' style={{ fontSize: 17 }} />
        </span>
        จุดถ่ายรูป
      </h2>
      <div style={{ padding: 16, background: '#fff', border: '2px solid var(--ice)', borderRadius: 18, boxShadow: '0 8px 20px rgba(60,120,180,.08)' }}>
        <p style={{ margin: '0 0 12px', fontSize: 12, color: 'rgba(43,58,85,.55)' }}>แตะสถานที่เพื่อดูมุม+เวลาที่แนะนำ</p>
        {SPOTS.map((spot, i) => {
          const isOpen = openSpot === i;
          return (
            <div key={i} style={{ borderTop: '2px dashed #EAF2FA' }}>
              <div onClick={() => setOpenSpot(isOpen ? null : i)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{spot.place}</div>
                  <div style={{ fontSize: 11, color: 'rgba(43,58,85,.45)' }}>{spot.day} · {spot.tips.length} มุมแนะนำ</div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <a href={`https://map.baidu.com/search/${encodeURIComponent(spot.q)}`} target='_blank' rel='noopener' onClick={e=>e.stopPropagation()} style={{ all: 'unset', cursor: 'pointer', fontSize: 11, fontWeight: 700, padding: '5px 10px', border: '2px solid #3385FF', borderRadius: 999, color: '#3385FF', background: '#fff' }}>百度</a>
                  <a href={`https://uri.amap.com/search?keyword=${encodeURIComponent(spot.q)}`} target='_blank' rel='noopener' onClick={e=>e.stopPropagation()} style={{ all: 'unset', cursor: 'pointer', fontSize: 11, fontWeight: 700, padding: '5px 10px', border: '2px solid #219C7D', borderRadius: 999, color: '#219C7D', background: '#fff' }}>高德</a>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.q)}`} target='_blank' rel='noopener' onClick={e=>e.stopPropagation()} style={{ all: 'unset', cursor: 'pointer', fontSize: 11, fontWeight: 700, padding: '5px 10px', border: '2px solid var(--ice)', borderRadius: 999, color: 'var(--navy)', background: '#fff' }}>Google</a>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--pink-dk)' }}>{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>
              {isOpen && (
                <div style={{ padding: '0 0 14px' }}>
                  {spot.tips.map((tip, j) => (
                    <div key={j} style={{ padding: '8px 0 8px 12px', borderLeft: '3px solid var(--pink-100)', marginBottom: 6 }}>
                      <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--navy)' }}>📸 {tip.angle}</div>
                      <div style={{ fontSize: 11, color: 'var(--orange)', fontWeight: 600, marginTop: 2 }}>⏰ {tip.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
