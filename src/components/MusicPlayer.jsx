import React, { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/trip-song.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); }
    else { audioRef.current.play().catch(() => {}); }
    setPlaying(!playing);
  };

  return (
    <button onClick={toggle} style={{
      all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 12, fontWeight: 700, padding: '6px 14px',
      border: `2px solid ${playing ? 'var(--orange)' : '#1DB954'}`,
      borderRadius: 999,
      color: playing ? 'var(--orange)' : '#1DB954',
      background: '#fff',
    }}>
      {playing ? '⏸ หยุดเพลง' : '♫ เปิดเพลง'}
    </button>
  );
}
