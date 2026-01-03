# 🧬 Decentralized Pokédex  
*A Pokémon-style adventure on the blockchain*

A Pokémon-style adventure on the blockchain — connect your wallet, encounter wild Pokémon, and capture them forever on-chain ⚡🎮

---

## 📌 Overview

**Decentralized Pokédex** is a Web3-based Pokémon-inspired application where users can **encounter, capture, and permanently own Pokémon on the Ethereum blockchain**.

Each capture is:
- Executed as an **on-chain transaction**
- Paid using **test ETH**
- Stored permanently in a **smart contract**
- Linked to the user's **wallet address**

The project combines **classic Pokémon nostalgia** with **decentralized ownership**, turning each Pokémon into an immutable on-chain record.

---

## ✨ Features

- 🔐 MetaMask wallet integration  
- 🎮 Random Pokémon encounters  
- ⭐ Rarity system (Common → Legendary)  
- ✨ Legendary visual effects  
- 🧾 On-chain Pokédex storage  
- 🖼️ Pixel-style Pokémon sprites  
- 🎨 Type-based UI color theming  
- 🚫 Graceful handling of cancelled transactions  

---

## 🧠 How It Works

1. User connects their MetaMask wallet  
2. User clicks **Find Pokémon**  
3. A random Pokémon encounter is generated  
4. Pokémon details (type, rarity, sprite) are shown  
5. User can:
   - **Capture Pokémon** (on-chain transaction)
   - **Run Away** (cancel encounter)
6. If captured:
   - Pokémon is stored in the smart contract
   - Added permanently to the user’s Pokédex
7. If the transaction is rejected:
   - Pokémon runs away
   - UI resets naturally

---


## Configuration

Before running the Decentralized Pokedex, update key configuration files to match your environment:

- **Smart Contract Addresses**: Ensure contract addresses in the frontend match your deployed contracts.
- **Environment Variables**: Set up environment variables for Web3 providers, network details, and API keys if required.
- **Frontend Settings**: Update network configuration in your frontend app for correct blockchain connectivity.

You may find configuration files such as `.env`, `truffle-config.js`, or `hardhat.config.js` for backend and `src/config.js` or `.env` for frontend.


---

## Features

- **Decentralized Data**: Store and retrieve Pokemon information on a blockchain.
- **Web3 Wallet Integration**: Connect with MetaMask or other wallets to interact with the DApp.
- **Add New Pokemon**: Register new Pokemon on-chain for everyone to view.
- **Browse & Search**: Query the Pokedex for Pokemon by name, number, or attributes.
- **Tamper-proof Entries**: All data additions are verified and stored immutably.

---

## Requirements

- **Node.js** (version 14+ recommended)
- **npm** or **yarn** (for package management)
- **Solidity Compiler** (for smart contract development)
- **Truffle** or **Hardhat** (for contract deployment)
- **MetaMask** or compatible Web3 wallet
- **Local Blockchain** (Ganache, Hardhat node) or testnet/mainnet access

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AkashdeeptiAcharya/Decentralized-Pokedex.git
   cd Decentralized-Pokedex
   ```

2. **Install MetaMask Extension**
https://metamask.io/download/

Supported browsers:
- Google Chrome
- Mozilla Firefox
- Brave
- Microsoft Edge

After installation:
1. Create a new wallet or import an existing one
2. Securely store your recovery phrase

3. **Enable Sepolia Test Network**

This project runs on the **Sepolia Ethereum testnet**.

### Steps:
1. Open MetaMask
2. Go to **Settings → Advanced**
3. Enable **Show test networks**
4. Open the network selector at the top of MetaMask
5. Select **Sepolia Test Network**

4. **Get Sepolia Test ETH**

You will need test ETH to perform capture transactions.

### Sepolia Faucet
https://sepoliafaucet.com/

Steps:
1. Copy your MetaMask wallet address
2. Paste it into the faucet
3. Request test ETH
4. Wait for the ETH to appear in your wallet

5. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

6. **Compile and Deploy Smart Contracts**
   - For Truffle:
     ```bash
     truffle compile
     truffle migrate --network development
     ```
   - For Hardhat:
     ```bash
     npx hardhat compile
     npx hardhat run scripts/deploy.js --network localhost
     ```

7. **Configure Frontend**
   - Update contract addresses and ABI in the frontend config.
   - Set up `.env` with RPC URLs and other secrets as needed.

8. **Run the Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

---

## Usage

1. **Open the DApp**  
   Launch the frontend in your browser (typically at `http://localhost:3000`).

2. **Connect Wallet**  
   Click "Connect Wallet" and authorize the DApp via MetaMask or your preferred wallet.
   MetaMask is required to interact with the Ethereum blockchain and to sign transactions.

3. **Explore the Pokedex**  
   Browse all existing Pokemon, search by name or number, and view details.

4. **Add a New Pokemon**  
   Use the "Add Pokemon" form to submit new data to the blockchain. Confirm the transaction in your wallet.

5. **Verify On-Chain Data**  
   All added Pokemon appear instantly after confirmation and are immutable.

---

## API Documentation

### Get All Pokemon (GET /pokemon)

#### Get All Pokemon

```api
{
    "title": "Get All Pokemon",
    "description": "Retrieve the full list of Pokemon from the decentralized Pokedex.",
    "method": "GET",
    "baseUrl": "http://localhost:3000",
    "endpoint": "/api/pokemon",
    "headers": [],
    "queryParams": [],
    "pathParams": [],
    "bodyType": "none",
    "requestBody": "",
    "responses": {
        "200": {
            "description": "Success",
            "body": "{\n  \"data\": [\n    {\n      \"id\": 1,\n      \"name\": \"Bulbasaur\",\n      \"type\": \"Grass/Poison\"\n    }\n  ]\n}"
        }
    }
}
```

#### Add a New Pokemon

```api
{
    "title": "Add New Pokemon",
    "description": "Add a new Pokemon entry to the decentralized Pokedex via smart contract.",
    "method": "POST",
    "baseUrl": "http://localhost:3000",
    "endpoint": "/api/pokemon",
    "headers": [
        {
            "key": "Authorization",
            "value": "Bearer <token>",
            "required": false
        }
    ],
    "queryParams": [],
    "pathParams": [],
    "bodyType": "json",
    "requestBody": "{\n  \"name\": \"Pikachu\",\n  \"type\": \"Electric\"\n}",
    "responses": {
        "201": {
            "description": "Created",
            "body": "{\n  \"message\": \"Pokemon added successfully.\",\n  \"data\": {\n    \"id\": 25,\n    \"name\": \"Pikachu\",\n    \"type\": \"Electric\"\n  }\n}"
        },
        "400": {
            "description": "Invalid Input",
            "body": "{\n  \"error\": \"Invalid Pokemon data.\" \n}"
        }
    }
}
```

---

## Contributing

We welcome contributions! To get started:

- Fork this repository.
- Create a new branch with a descriptive name.
- Make your changes and commit them with clear messages.
- Open a pull request describing your changes.

Please ensure your code follows the project's style and includes relevant tests if applicable. Review open issues to find areas needing help.

---



## License

This project is open-source and available under the MIT License. See the LICENSE file for details.

---

## Contact

For questions or support, open an issue on GitHub or contact the repository maintainer. We encourage feedback and collaboration!

---