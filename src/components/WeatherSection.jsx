import React, { useState, useEffect } from 'react';
import DAYS from '../data/days';

const HARBIN_LAT = 45.75;
const HARBIN_LON = 126.65;

const WMO_CODES = {
  0: 'ท้องฟ้าแจ่มใส', 1: 'ส่วนใหญ่แจ่มใส', 2: 'มีเมฆบ้าง', 3: 'มีเมฆมาก',
  45: 'หมอก', 48: 'หมอกเยือกแข็ง',
  51: 'ฝนปรอยเบา', 53: 'ฝนปรอย', 55: 'ฝนปรอยหนัก',
  61: 'ฝนเบา', 63: 'ฝนปานกลาง', 65: 'ฝนหนัก',
  71: 'หิมะเล็กน้อย', 73: 'หิมะปานกลาง', 75: 'หิมะหนัก',
  77: 'เกล็ดหิมะ', 80: 'ฝนลุกๆ', 81: 'ฝนปานกลาง', 82: 'ฝนหนักมาก',
  85: 'หิมะตกเบา', 86: 'หิมะตกหนัก',
};

export default function WeatherSection({ onDaySelect }) {
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${HARBIN_LAT}&longitude=${HARBIN_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia/Shanghai`)
      .then(r => r.json())
      .then(d => {
        if (d.current) setCurrent(d.current);
        else setError(true);
      })
      .catch(() => setError(true));
  }, []);

  const desc = current ? (WMO_CODES[current.weather_code] || 'ไม่ทราบ') : '';
  const now = new Date();
  const timeStr = now.toLocaleString('th-TH', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short', timeZone: 'Asia/Shanghai' });

  return (
    <div style={{ padding: '20px 0 0' }}>
      {/* Realtime weather card */}
      <div style={{ margin: '0 16px 14px', padding: 16, background: '#fff', border: '2px solid var(--ice)', borderRadius: 18, boxShadow: '0 8px 20px rgba(60,120,180,.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.04em', color: '#2C7BB8' }}>☀️ ตอนนี้ที่ฮาร์บิน</span>
          <span style={{ fontSize: 11, color: 'rgba(43,58,85,.5)' }}>{timeStr} (เวลาจีน)</span>
        </div>
        {current ? (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 8 }}>
              <span style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: 40, fontWeight: 700, lineHeight: 1, color: 'var(--navy)' }}>{Math.round(current.temperature_2m)}°</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--navy)' }}>{desc}</span>
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.5, marginTop: 8, color: 'rgba(43,58,85,.6)', display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
              <span>รู้สึกเหมือน {Math.round(current.apparent_temperature)}°</span>
              <span>ความชื้น {current.relative_humidity_2m}%</span>
              <span>ลม {current.wind_speed_10m} km/h</span>
            </div>
          </>
        ) : error ? (
          <p style={{ margin: '8px 0 0', fontSize: 12, color: 'rgba(43,58,85,.5)' }}>โหลดข้อมูลอากาศไม่สำเร็จ</p>
        ) : (
          <p style={{ margin: '8px 0 0', fontSize: 12, color: 'rgba(43,58,85,.5)' }}>กำลังโหลดข้อมูลอากาศ...</p>
        )}
      </div>

      {/* Forecast for trip days */}
      <div style={{ margin: '0 16px 10px', fontSize: 12, fontWeight: 700, color: '#2C7BB8' }}>พยากรณ์ช่วงทริป (ค่าเฉลี่ยตามฤดูกาล)</div>
      <div style={{ display: 'flex', gap: 10, overflow: 'auto', padding: '4px 16px 8px' }}>
        {DAYS.map((d, i) => {
          const coldest = d.lo <= -30;
          const tone = coldest ? 'var(--pink)' : 'var(--orange)';
          const barH = Math.round((Math.abs(d.lo) - 8) * 2.6);
          return (
            <button key={i} onClick={() => onDaySelect && onDaySelect(i)} style={{ all: 'unset', cursor: 'pointer', flex: 'none', width: 62, textAlign: 'center', padding: '12px 6px', borderRadius: 16, background: '#fff', border: '2px solid var(--ice)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(43,58,85,.6)' }}>{d.wd}</div>
              <div style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: 20, fontWeight: 700, lineHeight: 1.3, color: 'var(--navy)' }}>{d.n}</div>
              <div style={{ width: 6, height: barH, borderRadius: 999, background: tone, margin: '8px auto' }} />
              <div style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: 13, fontWeight: 700, color: tone }}>{d.lo}°</div>
              <div style={{ fontSize: 11, color: 'rgba(43,58,85,.5)' }}>{d.hi}°</div>
            </button>
          );
        })}
      </div>
      <p style={{ margin: '10px 16px 0', fontSize: 12, lineHeight: 1.6, color: 'rgba(43,58,85,.55)' }}>
        แท่งยิ่งยาวยิ่งหนาว · 28 ธ.ค. คือวันที่หนาวที่สุด · ข้อมูลปัจจุบันจาก Open-Meteo
      </p>
    </div>
  );
}
