import React, { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio('/trip-song.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Auto-play on first scroll (counts as user interaction)
    const onScroll = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onScroll);
    };
    window.addEventListener('scroll', onScroll, { once: false, passive: true });
    window.addEventListener('touchstart', onScroll, { once: true, passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onScroll);
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); }
    else { audioRef.current.play().catch(() => {}); startedRef.current = true; }
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
