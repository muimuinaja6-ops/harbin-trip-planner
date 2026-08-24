import React from 'react';

const IconWeather = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.73-12.73l1.41-1.41"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>
);

const IconPlan = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="3"/>
    <path d="M8 2v4m8-4v4M3 10h18"/>
    <circle cx="8" cy="15" r="1" fill={color}/>
    <circle cx="12" cy="15" r="1" fill={color}/>
    <circle cx="16" cy="15" r="1" fill={color}/>
  </svg>
);

const IconRoute = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="3"/>
    <circle cx="18" cy="5" r="3"/>
    <path d="M9 19h3c3 0 6-2 6-6V8"/>
  </svg>
);

const IconMoney = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="12" r="7"/>
    <path d="M15 5a7 7 0 0 1 0 14"/>
    <path d="M9 9v6m-2-4h4m-4 2h4"/>
  </svg>
);

const IconPack = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2l.5 2m11-.001L18 2"/>
    <rect x="4" y="4" width="16" height="18" rx="3"/>
    <path d="M9 4v3a3 3 0 0 0 6 0V4"/>
    <path d="M9 14h6m-4 3h2"/>
  </svg>
);

const IconChinese = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5h16M12 5v14"/>
    <path d="M7 9c0 3 2.5 6 5 8 2.5-2 5-5 5-8"/>
    <path d="M7 19h10"/>
  </svg>
);

const IconTips = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6m-5 3h4"/>
    <path d="M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z"/>
  </svg>
);

const IconPhoto = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="15" rx="3"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="12" cy="12" r="1.5" fill={color}/>
    <path d="M5 5l2-3h10l2 3"/>
  </svg>
);

const IconExpense = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="3"/>
    <path d="M2 9h20M2 15h20M8 3v18M16 3v18"/>
  </svg>
);

const IconSOS = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8v4m0 4h.01"/>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
  </svg>
);

const IconAmap = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
    <path d="M2 20h20"/>
  </svg>
);

const TABS = [
  { id: 'weather', label: 'อากาศ', Icon: IconWeather },
  { id: 'plan', label: 'แผน', Icon: IconPlan },
  { id: 'route', label: 'เส้นทาง', Icon: IconRoute },
  { id: 'amap', label: 'Amap', Icon: IconAmap },
  { id: 'fx', label: 'เงิน', Icon: IconMoney },
  { id: 'pack', label: 'เตรียม', Icon: IconPack },
  { id: 'cn', label: 'จีน', Icon: IconChinese },
  { id: 'tips', label: 'เทคนิค', Icon: IconTips },
  { id: 'photo', label: 'รูป', Icon: IconPhoto },
  { id: 'expense', label: 'หาร', Icon: IconExpense },
  { id: 'sos', label: 'SOS', Icon: IconSOS },
];

export default function NavTabs({ active, onJump }) {
  return (
    <>
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '10px 12px',
        paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 16px))',
      }}>
        <div style={{
          maxWidth: 480,
          margin: '0 auto',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 28,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
          display: 'flex',
          alignItems: 'center',
          padding: '6px 4px',
          gap: 2,
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {TABS.map(t => {
            const isActive = active === t.id;
            const iconColor = isActive ? '#2b3a55' : 'rgba(43,58,85,0.45)';
            return (
              <button
                key={t.id}
                onClick={() => onJump(t.id)}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  flex: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  padding: '8px 10px',
                  borderRadius: 20,
                  background: isActive ? 'rgba(0,0,0,0.06)' : 'transparent',
                  transition: 'background 0.2s ease',
                  minWidth: 48,
                }}
              >
                <t.Icon color={iconColor} />
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: isActive ? 'var(--navy)' : 'rgba(43,58,85,0.5)',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      <div style={{ height: 88 }} />
    </>
  );
}
