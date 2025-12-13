# Decentralized-Pokedex
A full-stack Web3 application where users can capture Pokémon, store their ownership permanently on the Ethereum blockchain, and view their personal collection.


# ⚡ Decentralized Pokédex

A full-stack Web3 application where users can capture Pokémon, store their ownership permanently on the Ethereum blockchain, and view their personal collection.


## 🚀 Features

* **Catch 'em On-Chain:** Capture Pokémon by sending a transaction to the Sepolia Testnet.
* **Permanent Ownership:** Every capture is stored in a Smart Contract, immutable and decentralized.
* **Dynamic Fee System:** Capturing requires a small fee (0.001 ETH) to simulate economy.
* **Wallet Integration:** Seamless connection with MetaMask via RainbowKit.
* **Real-time Updates:** Instant UI updates upon transaction confirmation.

## 🛠 Tech Stack

* **Frontend:** Next.js (React), TypeScript, Tailwind CSS
* **Blockchain Integration:** Wagmi, Viem, RainbowKit
* **Smart Contract:** Solidity (v0.8.20)
* **Deployment:** Remix IDE / Hardhat
* **Network:** Sepolia Testnet

## 📂 Project Structure

```bash
pokedex-ui/
├── app/
│   ├── constants/
│   │   └── abi.ts       # Smart Contract ABI & Address
│   ├── layout.tsx       # App Wrapper (Providers)
│   ├── page.tsx         # Main UI (Capture & List)
│   └── providers.tsx    # Wagmi & RainbowKit Configuration
├── config.ts            # Blockchain Network Config
└── public/              # Static assets
