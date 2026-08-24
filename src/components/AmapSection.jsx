import React, { useState } from 'react';

const QUICK_PLACES = [
  { label: 'สนามบิน Harbin', query: '哈尔滨太平国际机场' },
  { label: 'Ice & Snow World', query: '哈尔滨冰雪大世界' },
  { label: 'Sun Island', query: '太阳岛风景区' },
  { label: 'Central Street', query: '中央大街' },
  { label: 'Saint Sophia', query: '圣索菲亚大教堂' },
  { label: 'Songhua River', query: '松花江' },
  { label: 'Harbin Station', query: '哈尔滨站' },
  { label: 'Polar Land', query: '哈尔滨极地公园' },
];

function openAmap(query) {
  const url = `https://uri.amap.com/search?keyword=${encodeURIComponent(query)}&city=哈尔滨`;
  window.open(url, '_blank', 'noopener');
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
}

const MAX_SEARCH_LENGTH = 100;

export default function AmapSection() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(null);
  const [error, setError] = useState('');

  const handleSearchChange = (e) => {
    const val = e.target.value;
    if (val.length > MAX_SEARCH_LENGTH) {
      setError(`พิมพ์ได้ไม่เกิน ${MAX_SEARCH_LENGTH} ตัวอักษร`);
      return;
    }
    setSearch(val);
    if (error) setError('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setError('กรุณาพิมพ์ชื่อสถานที่ที่ต้องการค้นหา');
      return;
    }
    setError('');
    openAmap(search.trim());
  };

  const handleCopy = (query, idx) => {
    copyToClipboard(query);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{ padding: '30px 16px 0' }}>
      {/* Section Header */}
      <h2 style={{
        fontSize: 20,
        color: 'var(--navy)',
        margin: '0 0 4px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: 11,
          background: '#E8F5E9',
          color: '#219C7D',
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
        </span>
        Amap ค้นหา
      </h2>
      <p style={{ margin: '8px 0 16px', fontSize: 12, color: 'rgba(43,58,85,.55)' }}>
        พิมพ์ภาษาไทย/อังกฤษ แล้วเปิดใน Amap (高德地图) ได้เลย
      </p>

      {/* Search Box */}
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        gap: 8,
        marginBottom: error ? 6 : 16,
      }}>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="ค้นหาสถานที่... เช่น Central Street, ร้านอาหาร"
          style={{
            flex: 1,
            padding: '12px 16px',
            fontSize: 14,
            borderRadius: 16,
            border: `2px solid ${error ? '#e74c3c' : 'var(--ice)'}`,
            background: '#fff',
            outline: 'none',
            color: 'var(--navy)',
            fontWeight: 500,
            transition: 'border-color .2s',
          }}
        />
        <button
          type="submit"
          style={{
            all: 'unset',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 18px',
            borderRadius: 16,
            background: '#219C7D',
            color: '#fff',
            fontWeight: 700,
            fontSize: 13,
            whiteSpace: 'nowrap',
          }}
        >
          เปิด Amap
        </button>
      </form>
      {error && (
        <p style={{ margin: '0 0 12px', fontSize: 12, color: '#e74c3c', fontWeight: 600 }}>
          {error}
        </p>
      )}

      {/* Tip */}
      <div style={{
        background: 'rgba(33,156,125,.06)',
        border: '2px solid rgba(33,156,125,.15)',
        borderRadius: 14,
        padding: '12px 14px',
        marginBottom: 18,
      }}>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--navy)', lineHeight: 1.6 }}>
          <strong>Tip:</strong> พิมพ์ชื่อสถานที่เป็นภาษาอังกฤษหรือไทยก็ได้ Amap จะค้นหาให้อัตโนมัติ
          หรือกดปุ่ม <strong>คัดลอก</strong> ชื่อจีนด้านล่างไปวางใน Didi หรือบอกคนขับได้เลย
        </p>
      </div>

      {/* Quick Places */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>
          สถานที่ยอดนิยม (แตะเปิด Amap)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {QUICK_PLACES.map((place, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              background: '#fff',
              border: '2px solid var(--ice)',
              borderRadius: 14,
            }}>
              {/* Place info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>
                  {place.label}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(43,58,85,.5)', marginTop: 2 }}>
                  {place.query}
                </div>
              </div>

              {/* Copy button */}
              <button
                onClick={() => handleCopy(place.query, i)}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '6px 10px',
                  borderRadius: 999,
                  border: '2px solid var(--ice)',
                  color: copied === i ? '#219C7D' : 'rgba(43,58,85,.6)',
                  background: copied === i ? 'rgba(33,156,125,.08)' : '#fff',
                  whiteSpace: 'nowrap',
                  transition: 'all .2s',
                }}
              >
                {copied === i ? 'คัดลอกแล้ว' : 'คัดลอก'}
              </button>

              {/* Open Amap button */}
              <button
                onClick={() => openAmap(place.query)}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '6px 10px',
                  borderRadius: 999,
                  border: '2px solid #219C7D',
                  color: '#219C7D',
                  background: '#fff',
                  whiteSpace: 'nowrap',
                }}
              >
                高德
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Didi Tip */}
      <div style={{
        marginTop: 18,
        padding: '14px',
        background: 'rgba(255,155,80,.06)',
        border: '2px solid rgba(255,155,80,.15)',
        borderRadius: 14,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange-dk)', marginBottom: 6 }}>
          ใช้กับ Didi (滴滴)
        </div>
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(43,58,85,.7)', lineHeight: 1.6 }}>
          1. กดคัดลอกชื่อจีนของสถานที่<br/>
          2. เปิด Didi แล้ววางในช่องปลายทาง<br/>
          3. หรือโชว์ชื่อจีนให้คนขับดูได้เลย
        </p>
      </div>
    </div>
  );
}
