Excellent choice. **VeriBlock** sounds professional, secure, and clearly communicates the purpose of the application.

Here is your updated **README.md**, fully tailored to the **VeriBlock** branding and incorporating the technical improvements we discussed (like the timestamped smart contract logic).

---

# 🛡️ VeriBlock: Decentralized Digital Notary
### *Secure, private, and immutable document notarization anchored on Bitcoin.*

**VeriBlock** is a high-integrity "Proof of Existence" dApp built on the **Stacks L2** blockchain. It allows users to create a permanent, verifiable record of any digital file by anchoring its SHA-256 fingerprint directly into the Bitcoin blockchain.

[![Stacks](https://img.shields.io/badge/Network-Stacks-blue.svg)](https://stacks.co)
[![Bitcoin](https://img.shields.io/badge/Security-Bitcoin-orange.svg)](https://bitcoin.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Key Features

*   **Bitcoin Security:** VeriBlock leverages the security of the Bitcoin network through Stacks' Proof-of-Transfer (PoX) consensus.
*   **Privacy-First Hashing:** All file hashing is done locally in your browser. Your actual documents are **never** uploaded to a server or the blockchain.
*   **Immutable Timestamps:** The smart contract captures the exact block height and network time, providing mathematical proof of when a document was first recorded.
*   **Tamper-Proof Verification:** If a single pixel or character in your file is changed, the verification will fail, ensuring document integrity.
*   **Ownership Protection:** The system records the wallet address of the notarizer, preventing others from claiming your original work.

---

## ⚙️ How It Works

1.  **Local Hashing:** The app generates a unique SHA-256 hash (fingerprint) of your file.
2.  **Blockchain Anchoring:** You sign a transaction via the Hiro Wallet. This hash is written into the `veriblock.clar` smart contract.
3.  **Bitcoin Settlement:** Once the Stacks block is confirmed, your notarization is anchored to the Bitcoin network.
4.  **Verification:** To prove existence later, upload the file again. VeriBlock re-hashes it and compares it against the blockchain record.

---

## 🛠️ Tech Stack

*   **Smart Contracts:** Clarity (The interpreted, secure language for Stacks)
*   **Frontend:** React.js + Vite
*   **Blockchain Layer:** Stacks (Bitcoin Layer 2)
*   **Tooling:** Clarinet (Testing & Deployment), Stacks.js
*   **Cryptography:** JS-SHA256

---

## 📂 Project Structure

```text
├── contracts/        # Clarity Smart Contract logic (veriblock.clar)
├── frontend/         # React application (Vite-based)
├── server/           # Optional Node.js proxy for Hiro API interaction
├── tests/            # Unit tests for contract logic
└── clarinet.toml     # Project configuration
```

---

## 🚀 Getting Started

### Prerequisites
*   [Clarinet](https://github.com/hirosystems/clarinet) (for contract testing)
*   [Node.js](https://nodejs.org/) (v18+)
*   [Hiro Wallet Browser Extension](https://wallet.hiro.so/)

### 1. Contract Testing
```bash
# Clone the repo
git clone https://github.com/your-username/veriblock.git

# Enter project directory
cd veriblock

# Run contract tests to ensure logic is sound
clarinet test
```

### 2. Frontend Development
```bash
cd frontend
npm install
npm run dev
```

---

## 📜 Smart Contract Logic
**VeriBlock** uses an advanced Clarity map to store not just the hash, but the metadata required for a legal "Proof of Existence":

```clarity
(define-map notarizations 
  { hash: (buff 32) } 
  { 
    owner: principal, 
    height: uint, 
    time: uint 
  }
)

(define-public (notarize (h (buff 32)))
  (begin
    ;; Ensure hash hasn't been notarized before
    (asserts! (is-none (map-get? notarizations {hash: h})) (err u100))
    (ok (map-insert notarizations {hash: h} 
      { 
        owner: tx-sender, 
        height: block-height, 
        time: stacks-block-time 
      }))
  )
)
```

---

## 🏷️ Keywords (SEO)
VeriBlock, Stacks, Clarity, Bitcoin L2, Proof of Existence, Blockchain Notary, Digital Notary, Web3, Smart Contract, Hiro Wallet, Stacks.js, Hash Verification, Immutable Records, Document Timestamping, Crypto Notary.

---

## 📄 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

**Developed with ❤️ on Stacks.** *VeriBlock: Your digital truth, anchored in Bitcoin.*
