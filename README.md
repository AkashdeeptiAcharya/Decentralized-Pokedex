🧬 Decentralized Pokédex

A blockchain-powered Pokémon capture experience

📌 Overview

Decentralized Pokédex is a Web3-based Pokémon-inspired application where users can encounter, capture, and permanently own Pokémon on the Ethereum blockchain.

Each Pokémon capture is:

Executed as an on-chain transaction

Paid using ETH

Stored permanently in a smart contract

Linked to the user's wallet address

The application blends classic Pokémon nostalgia with modern decentralized ownership, introducing concepts like rarity, legendary encounters, and immutable records.

✨ Key Features

🔐 MetaMask Wallet Integration

🎮 Random Pokémon Encounters

⭐ Rarity System (Common → Legendary)

💎 Legendary Visual Effects

🧾 On-chain Pokédex Storage

⛓️ Ethereum Smart Contract Interaction

🖼️ Pixel-style Pokémon Sprites

🎨 Type-based UI Color Theming

🕹️ Classic Pokémon-style Encounter Flow

🚫 Graceful handling of cancelled transactions

🧠 How the App Works (High-Level)

User connects their MetaMask wallet

User clicks “Find Pokémon”

A random Pokémon encounter is generated locally

Pokémon details (type, rarity, sprite) are displayed

User can:

Capture Pokémon (on-chain transaction)

Run Away (cancel encounter)

If captured:

Pokémon is written to the smart contract

Added permanently to the user’s Pokédex

If transaction is rejected:

Pokémon runs away

UI resets naturally

🧩 Tech Stack
Frontend

React

Tailwind CSS

Ethers.js

Lucide Icons

Blockchain

Solidity

Ethereum (Sepolia Testnet)

MetaMask

📦 Prerequisites (VERY IMPORTANT)

Before running the project, all of the following must be installed.

1️⃣ Install Node.js (Required)

Node.js is required to run the React app.

Download:

👉 https://nodejs.org/

Install LTS version

Includes npm automatically

Verify installation:
node -v
npm -v

2️⃣ Install Git (Required)

Git is required to clone the repository.

Download:

👉 https://git-scm.com/downloads

Verify:
git --version

3️⃣ Install MetaMask (Required)

MetaMask is required for wallet interaction.

Install browser extension:

👉 https://metamask.io/download/

Supported browsers:

Chrome

Firefox

Brave

Edge

4️⃣ Set Up Sepolia Testnet (Required)

Open MetaMask

Go to Settings → Networks

Enable “Show test networks”

Select Sepolia Test Network

5️⃣ Get Free Test ETH

You’ll need test ETH to capture Pokémon.

Faucet:

👉 https://sepoliafaucet.com/

Paste your wallet address and request ETH.

🚀 Running the App Locally (Recommended)

⚠️ This is the most stable and supported way to run the project

Step 1: Clone the Repository
git clone <YOUR_REPO_URL>
cd decentralized-pokedex

Step 2: Install Dependencies
npm install


This installs:

React

Ethers.js

Tailwind CSS

All required utilities

Step 3: Start the Development Server
npm start


The app will run at:

http://localhost:3000

🔗 Smart Contract Setup

The app interacts with a deployed Solidity smart contract.

Required Contract Functions:

capturePokemon(uint256 pokemonId)

getMyPokedex()

getMyCaptureCount()

getCompletionPercentage(address)

captureFee()

The contract address is defined inside:

const CONTRACT_ADDRESS = "0x...";


⚠️ Make sure:

Contract is deployed on Sepolia

ABI matches the deployed contract

🎲 Random Encounter System

Encounters are generated locally using a weighted probability system:

Common → High chance

Rare → Medium chance

Legendary → Extremely low chance

Legendary Pokémon receive:

Golden glow

Pulse animation

Special visual emphasis

🎨 Visual Design Philosophy

Inspired by classic Pokémon GameBoy-era UI

Pixel-style sprites

High-contrast encounter cards

Subtle animations for immersion

Clear state transitions (spawn → action → outcome)

🛑 Deployment Note (Important)
❗ Why You May See Issues on Vercel / Static Hosts

This application depends on:

window.ethereum

Browser wallet injection

Runtime MetaMask availability

Some hosting platforms restrict or sandbox injected providers, causing:

White screens

Undefined wallet objects

✅ Recommended Solution

Run the app locally using:

npm install
npm start


This ensures:

Full MetaMask compatibility

Correct wallet injection

Stable Web3 behavior

A production deployment is under active testing.

📁 Project Structure
src/
 ├── data/
 │   └── pokemonData.js        # Pokémon metadata
 ├── utils/
 │   ├── randomEncounter.js    # Rarity logic
 │   └── getPokemonSprite.js   # Sprite resolver
 ├── App.js                    # Main application
 ├── index.js
 └── styles/

🧪 Known Limitations

Wallet must be browser-injected (MetaMask)

Requires Sepolia testnet

Not optimized for mobile devices yet