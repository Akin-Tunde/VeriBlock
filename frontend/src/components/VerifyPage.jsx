import React, { useState } from 'react';
import { CONFIG } from '../config';
import { computeFileHash } from '../utils/hashing';

export default function VerifyPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const hash = await computeFileHash(file);

    try {
      const url = `${CONFIG.apiBase}/extended/v1/map_entry/${CONFIG.contractAddress}/${CONFIG.contractName}/notarizations`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(`0x0100000010${hash}`) // Clarity Serialized Buffer
      });
      
      const data = await response.json();
      if (data.data === "0x09") { // Optional None
        setResult({ found: false });
      } else {
        setResult({ found: true, hash });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>2. Verify Document</h3>
      <input type="file" onChange={verifyFile} />
      {loading && <p>Searching blockchain...</p>}
      {result && (
        <div className={`result ${result.found ? 'success' : 'fail'}`}>
          {result.found ? (
            <p>✅ <strong>Authentic!</strong> This file was anchored on Stacks.</p>
          ) : (
            <p>❌ <strong>Not Found.</strong> No record exists for this file.</p>
          )}
        </div>
      )}
    </div>
  );
}
