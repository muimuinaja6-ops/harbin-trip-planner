import React from 'react';
import DAYS from '../data/days';

function getTodayIdx() {
  const now = new Date();
  const m = now.getMonth(), d = now.getDate();
  // Trip: Dec 25 - Jan 1
  if (m === 11 && d >= 25) return d - 25; // Dec 25=0, Dec 31=6
  if (m === 0 && d === 1) return 7; // Jan 1=7
  return -1; // not in trip
}

export default function ItinerarySection({ openDay, setOpenDay }) {
  const todayIdx = getTodayIdx();
  return (
    <div style={{ padding: '28px 0 0' }}>
      <div style={{ padding: '0 16px 12px' }}>
        <h2 style={{ fontSize: 20, color: 'var(--navy)', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 11, background: 'var(--orange-200)', color: 'var(--orange-dk)' }}>
            <i className='ph-duotone ph-map-trifold' style={{ fontSize: 17 }} />
          </span>
          แผนเที่ยว
        </h2>
      </div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DAYS.map((d, i) => {
          const open = openDay === i;
          const coldest = d.lo <= -30;
          const tone = coldest ? 'var(--pink)' : 'var(--orange)';
          const isToday = i === todayIdx;
          return (
            <div key={i} style={{ background: '#fff', border: `2px solid ${isToday ? 'var(--pink)' : open ? 'var(--orange)' : 'var(--ice)'}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 6px 16px rgba(60,120,180,.06)' }}>
              <div
                onClick={() => setOpenDay(open ? null : i)}
                style={{ cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center', padding: 14 }}
              >
                <div style={{ flex: 'none', width: 46, textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: 26, fontWeight: 800, lineHeight: 1, color: tone }}>{d.n}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, marginTop: 4, color: 'rgba(43,58,85,.55)' }}>{d.mon} · {d.wd}</div>
                  {isToday && <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--pink-dk)', marginTop: 4, background: 'var(--pink-100)', borderRadius: 999, padding: '2px 6px' }}>วันนี้</div>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, lineHeight: 1.3, fontWeight: 700, color: 'var(--navy)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.title}</div>
                  <div style={{ fontSize: 12, marginTop: 3, color: 'rgba(43,58,85,.55)' }}>{d.summary}</div>
                </div>
                <div style={{ flex: 'none', color: 'var(--orange)', transform: `rotate(${open ? '180deg' : '0deg'})`, transition: 'transform .18s' }}>
                  <i className='ph-bold ph-caret-down' />
                </div>
              </div>
              {open && (
                <div style={{ padding: '0 14px 16px 60px' }}>
                  {d.items.map((it, j) => (
                    <div key={j} style={{ position: 'relative', borderLeft: '3px solid var(--orange-200)', padding: '0 0 14px 14px' }}>
                      <span style={{ position: 'absolute', left: -7, top: 5, width: 11, height: 11, borderRadius: '50%', background: 'var(--orange)', border: '2px solid #fff' }} />
                      {it.t && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--pink)' }}>{it.t}</div>}
                      <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--navy)' }}>{it.x}</div>
                      {it.note && <div style={{ fontSize: 12, color: 'rgba(43,58,85,.5)' }}>{it.note}</div>}
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ background: '#fff', border: '2px solid var(--orange-300)', color: 'var(--orange-dk)', fontWeight: 700, fontSize: 11, padding: '5px 12px', borderRadius: 999 }}>{d.lo}° ถึง {d.hi}°</span>
                    <span style={{ background: 'var(--orange-200)', color: '#C65A16', fontWeight: 700, fontSize: 11, padding: '6px 13px', borderRadius: 999 }}>{d.place}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
