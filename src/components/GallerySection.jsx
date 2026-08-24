import React, { useState, useEffect, useRef } from 'react';
import { db, ref, onValue, push, storage, storageRef, uploadBytes, getDownloadURL } from '../firebase';

export default function GallerySection() {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [viewPhoto, setViewPhoto] = useState(null);
  const [who] = useState('Harbin-Hajai');
  const fileRef = useRef(null);

  // Sync photos list from Firebase Realtime DB
  useEffect(() => {
    return onValue(ref(db, 'shared/gallery'), (snap) => {
      const data = snap.val();
      if (data) {
        const list = Object.entries(data).map(([key, val]) => ({ ...val, _key: key }));
        list.sort((a, b) => (b.ts || 0) - (a.ts || 0)); // newest first
        setPhotos(list);
      } else { setPhotos([]); }
    });
  }, []);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of files) {
      try {
        const name = `${Date.now()}_${file.name}`;
        const sRef = storageRef(storage, `gallery/${name}`);
        await uploadBytes(sRef, file);
        const url = await getDownloadURL(sRef);
        push(ref(db, 'shared/gallery'), {
          url,
          name: file.name,
          by: who,
          ts: Date.now(),
          date: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        });
      } catch (err) { console.error('Upload failed', err); }
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div style={{ padding: '30px 16px 0' }}>
      <h2 style={{ fontSize: 20, color: 'var(--navy)', margin: '0 0 14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 11, background: 'var(--pink-100)', color: 'var(--pink-dk)' }}>
          <i className='ph-duotone ph-images' style={{ fontSize: 17 }} />
        </span>
        แกลเลอรีทริป
      </h2>
      <div style={{ padding: 16, background: '#fff', border: '2px solid var(--ice)', borderRadius: 18, boxShadow: '0 8px 20px rgba(60,120,180,.08)' }}>
        {/* Upload button */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
          <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ all: 'unset', cursor: 'pointer', fontSize: 13, fontWeight: 700, padding: '10px 18px', borderRadius: 999, background: 'var(--orange)', color: '#fff', opacity: uploading ? 0.5 : 1 }}>
            {uploading ? 'กำลังอัป...' : '+ อัปรูป'}
          </button>
          <span style={{ fontSize: 12, color: 'rgba(43,58,85,.5)' }}>อัปในชื่อ: {who}</span>
          <input ref={fileRef} type="file" accept="image/*" multiple capture="environment" onChange={handleUpload} style={{ display: 'none' }} />
        </div>

        {/* Photo grid */}
        {photos.length === 0 ? (
          <p style={{ fontSize: 13, color: 'rgba(43,58,85,.5)', textAlign: 'center', padding: '20px 0' }}>ยังไม่มีรูป กดอัปรูปแรกของทริปเลย</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {photos.map((p, i) => (
              <div key={p._key || i} onClick={() => setViewPhoto(p)} style={{ cursor: 'pointer', position: 'relative', paddingBottom: '100%', borderRadius: 10, overflow: 'hidden', background: 'var(--ice)' }}>
                <img src={p.url} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 6px 4px', background: 'linear-gradient(transparent, rgba(0,0,0,.6))', fontSize: 9, color: '#fff', fontWeight: 600 }}>{p.by}</div>
              </div>
            ))}
          </div>
        )}
        <p style={{ fontSize: 11, color: 'rgba(43,58,85,.4)', margin: '12px 0 0' }}>รูปทุกคนเห็นร่วมกัน เก็บบน cloud</p>
      </div>

      {/* Fullscreen viewer */}
      {viewPhoto && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,.92)', display: 'flex', flexDirection: 'column', padding: 16 }}>
          <div style={{ flex: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 12px' }}>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{viewPhoto.by} · {viewPhoto.date} · {photos.indexOf(viewPhoto)+1}/{photos.length}</span>
            <button onClick={() => setViewPhoto(null)} style={{ all: 'unset', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#fff', padding: '6px 12px', border: '2px solid rgba(255,255,255,.4)', borderRadius: 999 }}>ปิด</button>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Prev button */}
            {photos.indexOf(viewPhoto) > 0 && (
              <button onClick={(e) => { e.stopPropagation(); setViewPhoto(photos[photos.indexOf(viewPhoto)-1]); }} style={{ all: 'unset', cursor: 'pointer', position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', fontSize: 28, color: '#fff', padding: '20px 12px', zIndex: 1 }}>‹</button>
            )}
            <img src={viewPhoto.url} alt="" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 12, objectFit: 'contain' }} onClick={(e) => { e.stopPropagation(); const idx=photos.indexOf(viewPhoto); if(idx<photos.length-1)setViewPhoto(photos[idx+1]); }} />
            {/* Next button */}
            {photos.indexOf(viewPhoto) < photos.length-1 && (
              <button onClick={(e) => { e.stopPropagation(); setViewPhoto(photos[photos.indexOf(viewPhoto)+1]); }} style={{ all: 'unset', cursor: 'pointer', position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', fontSize: 28, color: '#fff', padding: '20px 12px', zIndex: 1 }}>›</button>
            )}
          </div>
          <div style={{ flex: 'none', textAlign: 'center', paddingTop: 10, fontSize: 11, color: 'rgba(255,255,255,.5)' }}>แตะรูปเพื่อดูรูปถัดไป หรือกด ‹ › เปลี่ยนรูป</div>
        </div>
      )}
    </div>
  );
}
