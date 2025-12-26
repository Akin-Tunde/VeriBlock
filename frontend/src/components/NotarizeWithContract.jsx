import React, { useState } from 'react';
import { openContractCall } from '@stacks/connect';
import { bufferCV } from '@stacks/transactions';
import { CONFIG } from '../config';
import { computeFileHash } from '../utils/hashing';

export default function NotarizeWithContract() {
  const [fileData, setFileData] = useState({ name: '', hash: '' });
  const [status, setStatus] = useState('');
  const [txId, setTxId] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStatus('Computing hash...');
    const hash = await computeFileHash(file);
    setFileData({ name: file.name, hash });
    setStatus('Ready to notarize');
  };

  const notarize = async () => {
    if (!fileData.hash) return;
    setStatus('Requesting wallet...');

    await openContractCall({
      network: CONFIG.network,
      contractAddress: CONFIG.contractAddress,
      contractName: CONFIG.contractName,
      functionName: 'notarize',
      functionArgs: [bufferCV(Buffer.from(fileData.hash, 'hex'))],
      postConditionMode: 0x01, // Deny
      onFinish: (data) => {
        setTxId(data.txId);
        setStatus('Transaction Broadcasted!');
      },
      onCancel: () => setStatus('Transaction Cancelled'),
    });
  };

  return (
    <div className="card">
      <h3>1. Notarize Document</h3>
      <input type="file" onChange={handleFileChange} />
      {fileData.hash && (
        <div className="hash-box">
          <p><strong>SHA-256:</strong> {fileData.hash}</p>
          <button onClick={notarize}>Sign & Anchor to Bitcoin</button>
        </div>
      )}
      <p className="status">{status}</p>
      {txId && (
        <a href={`${CONFIG.explorerBase}/txid/${txId}?network=${CONFIG.networkType}`} target="_blank">
          View on Explorer
        </a>
      )}
    </div>
  );
}
