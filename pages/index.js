import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function Home() {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [purpose, setPurpose] = useState('');
  const [fileLink, setFileLink] = useState('');
  const [material, setMaterial] = useState('');
  const [finish, setFinish] = useState('');
  const [targetEquipment, setTargetEquipment] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        productName,
        productType,
        purpose,
        fileLink,
        material,
        finish,
        targetEquipment,
        dimensions,
        notes,
        status,
        createdAt: Timestamp.now(),
      });
      setMessage('Submission successful!');
      setProductName('');
      setProductType('');
      setPurpose('');
      setFileLink('');
      setMaterial('');
      setFinish('');
      setTargetEquipment('');
      setDimensions('');
      setNotes('');
      setStatus('');
    } catch (err) {
      setMessage('Error submitting form: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>New Product Submission</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
        <div>
          <label>Product Name</label>
          <input value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div>
          <label>Product Type</label>
          <input value={productType} onChange={(e) => setProductType(e.target.value)} required />
        </div>
        <div>
          <label>Purpose / Problem it Solves</label>
          <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} />
        </div>
        <div>
          <label>File Link (e.g. CAD, Sketch)</label>
          <input value={fileLink} onChange={(e) => setFileLink(e.target.value)} />
        </div>
        <div>
          <label>Material</label>
          <input value={material} onChange={(e) => setMaterial(e.target.value)} />
        </div>
        <div>
          <label>Finish</label>
          <input value={finish} onChange={(e) => setFinish(e.target.value)} />
        </div>
        <div>
          <label>Target Equipment</label>
          <input value={targetEquipment} onChange={(e) => setTargetEquipment(e.target.value)} />
        </div>
        <div>
          <label>Dimensions</label>
          <input value={dimensions} onChange={(e) => setDimensions(e.target.value)} />
        </div>
        <div>
          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div>
          <label>Status</label>
          <input value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
