import React, { useState, useEffect } from 'react';
import TEAM from '../data/team';

const STORAGE_KEY = 'harbin-expenses';

export default function ExpenseSplitter() {
  const [expenses, setExpenses] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  });
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState(TEAM[0].name);
  const [splitAmong, setSplitAmong] = useState(TEAM.map(t => t.name));
  const [errors, setErrors] = useState({});

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)); }, [expenses]);

  const validate = () => {
    const errs = {};
    if (!desc.trim()) errs.desc = 'กรุณาระบุรายการ';
    else if (desc.trim().length > 50) errs.desc = 'ชื่อรายการยาวเกินไป (ไม่เกิน 50 ตัว)';
    const amt = parseFloat(amount);
    if (!amount.trim()) errs.amount = 'กรุณาใส่จำนวนเงิน';
    else if (isNaN(amt) || amt <= 0) errs.amount = 'จำนวนเงินต้องมากกว่า 0';
    else if (amt > 999999) errs.amount = 'จำนวนเงินมากเกินไป';
    if (splitAmong.length === 0) errs.split = 'เลือกอย่างน้อย 1 คนที่ร่วมหาร';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const addExpense = () => {
    if (!validate()) return;
    const amt = parseFloat(amount);
    setExpenses([...expenses, { id: Date.now(), desc: desc.trim(), amount: amt, payer, splitAmong: [...splitAmong], date: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) }]);
    setDesc(''); setAmount(''); setErrors({});
  };

  const removeExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));

  const toggleSplit = (name) => {
    setSplitAmong(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  // Calculate balances
  const balances = {};
  TEAM.forEach(t => { balances[t.name] = 0; });
  expenses.forEach(e => {
    const share = e.amount / e.splitAmong.length;
    balances[e.payer] += e.amount; // payer paid this much
    e.splitAmong.forEach(name => { balances[name] -= share; }); // each person owes their share
  });

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div style={{ padding: '30px 16px 0' }}>
      <h2 style={{ fontSize: 20, color: 'var(--navy)', margin: '0 0 14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 11, background: '#D8F7EE', color: '#219C7D' }}><i className='ph-duotone ph-receipt' style={{ fontSize: 17 }} /></span>หารค่าใช้จ่าย
      </h2>
      <div style={{ padding: 16, background: '#fff', border: '2px solid var(--ice)', borderRadius: 18, boxShadow: '0 8px 20px rgba(60,120,180,.08)' }}>

        {/* Add expense form */}
        <div style={{ marginBottom: 16 }}>
          <input value={desc} onChange={e => { setDesc(e.target.value); if (errors.desc) setErrors(prev => ({ ...prev, desc: undefined })); }} placeholder="จ่ายอะไร เช่น ค่าแท็กซี่" style={{ width: '100%', boxSizing: 'border-box', fontFamily: "'Mitr',sans-serif", fontSize: 15, padding: '9px 12px', background: '#fff', border: `2px solid ${errors.desc ? '#e74c3c' : 'var(--ice)'}`, borderRadius: 14, color: 'var(--navy)', marginBottom: errors.desc ? 4 : 8, transition: 'border-color .2s' }} />
          {errors.desc && <p style={{ margin: '0 0 8px', fontSize: 11, color: '#e74c3c', fontWeight: 600 }}>{errors.desc}</p>}
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <input value={amount} onChange={e => { setAmount(e.target.value.replace(/[^0-9.]/g, '')); if (errors.amount) setErrors(prev => ({ ...prev, amount: undefined })); }} inputMode='decimal' placeholder="จำนวนเงิน (หยวน)" style={{ width: '100%', boxSizing: 'border-box', fontFamily: "'Baloo 2',sans-serif", fontSize: 16, fontWeight: 700, padding: '9px 12px', background: '#fff', border: `2px solid ${errors.amount ? '#e74c3c' : 'var(--ice)'}`, borderRadius: 14, color: 'var(--navy)', transition: 'border-color .2s' }} />
              {errors.amount && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#e74c3c', fontWeight: 600 }}>{errors.amount}</p>}
            </div>
            <button onClick={addExpense} style={{ all: 'unset', cursor: 'pointer', padding: '9px 18px', borderRadius: 999, background: 'var(--orange)', color: '#fff', fontSize: 14, fontWeight: 700, alignSelf: 'flex-start' }}>เพิ่ม</button>
          </div>
        </div>

        {/* Payer selector */}
        <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(43,58,85,.6)', marginBottom: 6 }}>ใครจ่าย</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {TEAM.map(t => (
            <button key={t.name} onClick={() => setPayer(t.name)} style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 700, padding: '5px 12px', border: `2px solid ${payer === t.name ? 'var(--orange)' : 'var(--ice)'}`, borderRadius: 999, background: payer === t.name ? 'var(--orange)' : '#fff', color: payer === t.name ? '#fff' : 'var(--navy)' }}>{t.name}</button>
          ))}
        </div>

        {/* Split among */}
        <div style={{ fontSize: 12, fontWeight: 700, color: errors.split ? '#e74c3c' : 'rgba(43,58,85,.6)', marginBottom: 6 }}>หารกับใคร {errors.split && <span style={{ fontWeight: 600 }}>— {errors.split}</span>}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {TEAM.map(t => (
            <button key={t.name} onClick={() => { toggleSplit(t.name); if (errors.split) setErrors(prev => ({ ...prev, split: undefined })); }} style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 700, padding: '5px 12px', border: `2px solid ${splitAmong.includes(t.name) ? '#219C7D' : 'var(--ice)'}`, borderRadius: 999, background: splitAmong.includes(t.name) ? '#D8F7EE' : '#fff', color: splitAmong.includes(t.name) ? '#219C7D' : 'rgba(43,58,85,.4)' }}>{t.name}</button>
          ))}
        </div>

        {/* Summary */}
        {expenses.length > 0 && (
          <>
            <div style={{ borderTop: '2px dashed var(--ice)', paddingTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>รายการทั้งหมด ({expenses.length})</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)' }}>¥{totalSpent.toLocaleString()}</span>
              </div>
              <div style={{ maxHeight: 200, overflow: 'auto' }}>
                {expenses.slice().reverse().map(e => (
                  <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid #EAF2FA' }}>
                    <div>
                      <div style={{ fontSize: 14, color: 'var(--navy)' }}>{e.desc}</div>
                      <div style={{ fontSize: 11, color: 'rgba(43,58,85,.45)' }}>{e.payer} จ่าย · หาร {e.splitAmong.length} คน · {e.date}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>¥{e.amount}</span>
                      <button onClick={() => removeExpense(e.id)} style={{ all: 'unset', cursor: 'pointer', fontSize: 14, color: 'rgba(43,58,85,.3)' }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who owes who */}
            <div style={{ borderTop: '2px dashed var(--ice)', paddingTop: 12, marginTop: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>สรุปยอด (+ = ได้คืน, − = ต้องจ่าย)</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TEAM.map(t => {
                  const bal = Math.round(balances[t.name] * 100) / 100;
                  if (bal === 0) return null;
                  const positive = bal > 0;
                  return (
                    <span key={t.name} style={{ fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 999, background: positive ? '#D8F7EE' : 'var(--pink-100)', color: positive ? '#219C7D' : 'var(--pink-dk)' }}>
                      {t.name} {positive ? '+' : ''}{bal.toFixed(0)}¥
                    </span>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <p style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(43,58,85,.55)', margin: '14px 0 0' }}>บันทึกไว้ในเครื่อง ใช้หาร ค่าแท็กซี่ ค่าอาหาร ค่าตั๋ว</p>
      </div>
    </div>
  );
}
