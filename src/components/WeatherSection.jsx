import React, { useState, useEffect } from 'react';
import DAYS from '../data/days';

const HARBIN_LAT = 45.75;
const HARBIN_LON = 126.65;
const TRIP_START = '2026-12-25';
const TRIP_END = '2027-01-01';

const WMO_CODES = {
  0: 'ท้องฟ้าแจ่มใส', 1: 'ส่วนใหญ่แจ่มใส', 2: 'มีเมฆบ้าง', 3: 'มีเมฆมาก',
  45: 'หมอก', 48: 'หมอกเยือกแข็ง',
  51: 'ฝนปรอยเบา', 53: 'ฝนปรอย', 55: 'ฝนปรอยหนัก',
  61: 'ฝนเบา', 63: 'ฝนปานกลาง', 65: 'ฝนหนัก',
  71: 'หิมะเล็กน้อย', 73: 'หิมะปานกลาง', 75: 'หิมะหนัก',
  77: 'เกล็ดหิมะ', 80: 'ฝนซู่', 81: 'ฝนปานกลาง', 82: 'ฝนหนักมาก',
  85: 'หิมะตกเบา', 86: 'หิมะตกหนัก',
};

export default function WeatherSection({ onDaySelect }) {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null); // {dates[], hi[], lo[], codes[]}
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch current weather
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${HARBIN_LAT}&longitude=${HARBIN_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia/Shanghai`)
      .then(r => r.json())
      .then(d => { if (d.current) setCurrent(d.current); })
      .catch(() => {});

    // Fetch daily forecast for trip dates (Open-Meteo supports up to 16 days ahead)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${HARBIN_LAT}&longitude=${HARBIN_LON}&daily=temperature_2m_max,temperature_2m_min,weather_code&start_date=${TRIP_START}&end_date=${TRIP_END}&timezone=Asia/Shanghai`)
      .then(r => r.json())
      .then(d => {
        if (d.daily && d.daily.time && d.daily.time.length > 0) {
          setForecast({
            dates: d.daily.time,
            hi: d.daily.temperature_2m_max,
            lo: d.daily.temperature_2m_min,
            codes: d.daily.weather_code,
          });
        }
      })
      .catch(() => {});
  }, []);

  // Merge API forecast into DAYS data (fallback to static if API has no data for that date)
  const days = DAYS.map(d => {
    if (!forecast) return d; // no API data yet, use static
    const dateStr = d.n <= 9
      ? `2027-01-0${d.n}` // Jan 1
      : `2026-12-${d.n}`; // Dec 25-31
    const idx = forecast.dates.indexOf(dateStr);
    if (idx === -1) return d; // date not in API response
    return {
      ...d,
      hi: Math.round(forecast.hi[idx]),
      lo: Math.round(forecast.lo[idx]),
      weatherCode: forecast.codes[idx],
      fromApi: true,
    };
  });

  const hasForecast = days.some(d => d.fromApi);
  const now = new Date();
  const timeStr = now.toLocaleString('th-TH', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short', timeZone: 'Asia/Shanghai' });

  return (
    <div style={{ padding: '20px 0 0' }}>
      {/* Realtime current weather */}
      <div style={{ margin: '0 16px 14px', padding: 16, background: '#fff', border: '2px solid var(--ice)', borderRadius: 18, boxShadow: '0 8px 20px rgba(60,120,180,.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.04em', color: '#2C7BB8' }}>☀️ ตอนนี้ที่ฮาร์บิน</span>
          <span style={{ fontSize: 11, color: 'rgba(43,58,85,.5)' }}>{timeStr} (เวลาจีน)</span>
        </div>
        {current ? (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 8 }}>
              <span style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: 40, fontWeight: 700, lineHeight: 1, color: 'var(--navy)' }}>{Math.round(current.temperature_2m)}°</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--navy)' }}>{WMO_CODES[current.weather_code] || ''}</span>
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.5, marginTop: 8, color: 'rgba(43,58,85,.6)', display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
              <span>รู้สึกเหมือน {Math.round(current.apparent_temperature)}°</span>
              <span>ความชื้น {current.relative_humidity_2m}%</span>
              <span>ลม {current.wind_speed_10m} km/h</span>
            </div>
          </>
        ) : (
          <p style={{ margin: '8px 0 0', fontSize: 12, color: 'rgba(43,58,85,.5)' }}>กำลังโหลดข้อมูลอากาศ...</p>
        )}
      </div>

      {/* Trip days forecast */}
      <div style={{ margin: '0 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#2C7BB8' }}>
          {hasForecast ? '🌡️ พยากรณ์ช่วงทริป (จาก API)' : '🌡️ พยากรณ์ช่วงทริป (ค่าเฉลี่ยตามฤดูกาล)'}
        </span>
        {hasForecast && <span style={{ fontSize: 10, color: 'rgba(43,58,85,.45)' }}>Open-Meteo</span>}
      </div>
      <div style={{ display: 'flex', gap: 10, overflow: 'auto', padding: '4px 16px 8px' }}>
        {days.map((d, i) => {
          const coldest = d.lo <= -30;
          const tone = coldest ? 'var(--pink)' : 'var(--orange)';
          const barH = Math.round((Math.abs(d.lo) - 8) * 2.6);
          return (
            <button key={i} onClick={() => onDaySelect && onDaySelect(i)} style={{ all: 'unset', cursor: 'pointer', flex: 'none', width: 62, textAlign: 'center', padding: '12px 6px', borderRadius: 16, background: '#fff', border: `2px solid ${d.fromApi ? 'var(--orange)' : 'var(--ice)'}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(43,58,85,.6)' }}>{d.wd}</div>
              <div style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: 20, fontWeight: 700, lineHeight: 1.3, color: 'var(--navy)' }}>{d.n}</div>
              {d.weatherCode !== undefined && (
                <div style={{ fontSize: 9, color: 'rgba(43,58,85,.5)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 58 }}>{WMO_CODES[d.weatherCode] || ''}</div>
              )}
              <div style={{ width: 6, height: barH, borderRadius: 999, background: tone, margin: '6px auto' }} />
              <div style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: 13, fontWeight: 700, color: tone }}>{d.lo}°</div>
              <div style={{ fontSize: 11, color: 'rgba(43,58,85,.5)' }}>{d.hi}°</div>
            </button>
          );
        })}
      </div>
      <p style={{ margin: '10px 16px 0', fontSize: 12, lineHeight: 1.6, color: 'rgba(43,58,85,.55)' }}>
        {hasForecast
          ? 'ข้อมูลจาก Open-Meteo API · การ์ดขอบส้มคือข้อมูลจริงจากพยากรณ์'
          : 'ยังไม่ถึงช่วงที่ API มีพยากรณ์ (รองรับ 16 วันล่วงหน้า) · ใช้ค่าเฉลี่ยตามฤดูกาลไปก่อน'}
      </p>
    </div>
  );
}
