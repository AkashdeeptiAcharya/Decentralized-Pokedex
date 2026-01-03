# Decentralized Pokedex

A decentralized, open-source Pokedex application built with blockchain integration. This project allows users to explore, add, and interact with Pokemon data in a trustless and distributed manner, leveraging modern web and smart contract technologies.

---

## Configuration

Before running the Decentralized Pokedex, update key configuration files to match your environment:

- **Smart Contract Addresses**: Ensure contract addresses in the frontend match your deployed contracts.
- **Environment Variables**: Set up environment variables for Web3 providers, network details, and API keys if required.
- **Frontend Settings**: Update network configuration in your frontend app for correct blockchain connectivity.

You may find configuration files such as `.env`, `truffle-config.js`, or `hardhat.config.js` for backend and `src/config.js` or `.env` for frontend.

---

## Introduction

Decentralized Pokedex is a blockchain-powered application for managing and querying Pokemon data. Using smart contracts, it guarantees data immutability and transparency. The project supports both on-chain interactions and a modern decentralized frontend, aiming to showcase how DApps can blend fun, utility, and security.

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

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Compile and Deploy Smart Contracts**
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

4. **Configure Frontend**
   - Update contract addresses and ABI in the frontend config.
   - Set up `.env` with RPC URLs and other secrets as needed.

5. **Run the Frontend**
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