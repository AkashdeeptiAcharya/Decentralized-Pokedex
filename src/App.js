import React, { useState, useEffect } from 'react';
import { Wallet, Zap, Award, TrendingUp, ExternalLink, AlertCircle } from 'lucide-react';

const CONTRACT_ADDRESS = "0x3603e26675B3F61EC3c8F1fd94da1B7ad862d490";
const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "_pokemonId", "type": "uint256"}],
    "name": "capturePokemon",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyPokedex",
    "outputs": [{"components": [{"internalType": "uint256", "name": "pokemonId", "type": "uint256"}, {"internalType": "uint256", "name": "captureTime", "type": "uint256"}, {"internalType": "address", "name": "owner", "type": "address"}], "internalType": "struct Pokedex.Pokemon[]", "name": "", "type": "tuple[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyCaptureCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_trainer", "type": "address"}],
    "name": "getCompletionPercentage",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "captureFee",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Pokemon data (Gen 1)
const POKEMON_DATA = {
  1: { name: "Bulbasaur", type: "Grass/Poison", color: "#78C850" },
  4: { name: "Charmander", type: "Fire", color: "#F08030" },
  7: { name: "Squirtle", type: "Water", color: "#6890F0" },
  25: { name: "Pikachu", type: "Electric", color: "#F8D030" },
  39: { name: "Jigglypuff", type: "Normal/Fairy", color: "#EE99AC" },
  94: { name: "Gengar", type: "Ghost/Poison", color: "#705898" },
  130: { name: "Gyarados", type: "Water/Flying", color: "#6890F0" },
  131: { name: "Lapras", type: "Water/Ice", color: "#98D8D8" },
  143: { name: "Snorlax", type: "Normal", color: "#A8A878" },
  150: { name: "Mewtwo", type: "Psychic", color: "#F85888" },
};

export default function DecentralizedPokedex() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [myPokedex, setMyPokedex] = useState([]);
  const [captureCount, setCaptureCount] = useState(0);
  const [completion, setCompletion] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(25);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [ethersLoaded, setEthersLoaded] = useState(false);

  // Load Ethers.js library
  useEffect(() => {
    const loadEthers = () => {
      if (window.ethers) {
        setEthersLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js';
      script.async = true;
      script.onload = () => {
        setEthersLoaded(true);
      };
      script.onerror = () => {
        setError("Failed to load Ethers.js library");
      };
      document.head.appendChild(script);
    };

    loadEthers();
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    if (!ethersLoaded) {
      setError("Ethers.js is still loading... please wait a moment and try again");
      return;
    }

    if (typeof window.ethereum === 'undefined') {
      setError("❌ MetaMask is not installed! Please install MetaMask extension from metamask.io");
      return;
    }

    try {
      setError("Connecting...");
      
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (!accounts || accounts.length === 0) {
        setError("No accounts found. Please unlock MetaMask.");
        return;
      }

      setAccount(accounts[0]);
      
      // Create provider and contract instance (disable ENS)
      const provider = new window.ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();
      
      // Check if we're on the right network
      const network = await provider.getNetwork();
      console.log("Connected to network:", network.name, "Chain ID:", network.chainId);
      
      const contractInstance = new window.ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      
      setContract(contractInstance);
      setError("");
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setAccount(null);
          setContract(null);
        } else {
          setAccount(accounts[0]);
        }
      });

    } catch (err) {
      console.error("Connection error:", err);
      if (err.code === 4001) {
        setError("❌ Connection rejected. Please approve the connection in MetaMask.");
      } else if (err.code === -32002) {
        setError("⏳ A connection request is already pending. Please check MetaMask.");
      } else {
        setError("❌ Failed to connect: " + (err.message || "Unknown error"));
      }
    }
  };

  // Load user's Pokedex
  const loadPokedex = async () => {
    if (!contract) return;
    
    try {
      const pokedex = await contract.getMyPokedex();
      const count = await contract.getMyCaptureCount();
      const percent = await contract.getCompletionPercentage(account);
      
      setMyPokedex(pokedex);
      setCaptureCount(count.toNumber());
      setCompletion(percent.toNumber());
    } catch (err) {
      console.error("Error loading Pokedex:", err);
      if (err.message.includes("call revert exception")) {
        setError("⚠️ Contract not found. Make sure CONTRACT_ADDRESS is set correctly and contract is deployed.");
      }
    }
  };

  // Capture Pokemon
  const capturePokemon = async () => {
    if (!contract) return;
    
    setLoading(true);
    setError("");
    setTxHash("");
    
    try {
      const fee = await contract.captureFee();
      const tx = await contract.capturePokemon(selectedPokemon, {
        value: fee
      });
      
      setTxHash(tx.hash);
      await tx.wait();
      
      // Reload data
      await loadPokedex();
      setLoading(false);
    } catch (err) {
      console.error("Capture error:", err);
      if (err.code === 4001) {
        setError("Transaction rejected by user");
      } else if (err.message.includes("insufficient funds")) {
        setError("❌ Insufficient funds. You need at least 0.001 ETH + gas fees.");
      } else {
        setError("❌ Capture failed: " + (err.reason || err.message));
      }
      setLoading(false);
    }
  };

  // Load data when contract is ready
  useEffect(() => {
    if (contract && account) {
      loadPokedex();
    }
  }, [contract, account]);

  // Format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
            Decentralized Pokédex
          </h1>
          <p className="text-gray-300 text-lg">Capture and own Pokémon on the blockchain</p>
        </div>

        {/* Connect Wallet */}
        {!account ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md mx-auto">
            <Wallet className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-6">
              Connect MetaMask to start capturing Pokémon
            </p>
            <button
              onClick={connectWallet}
              disabled={!ethersLoaded}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {ethersLoaded ? "Connect MetaMask" : "Loading..."}
            </button>
            
            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-sm text-left">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>{error}</div>
                </div>
              </div>
            )}

            {/* MetaMask Check */}
            {ethersLoaded && typeof window.ethereum === 'undefined' && (
              <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg">
                <p className="text-sm font-semibold mb-2">MetaMask Not Detected</p>
                <a 
                  href="https://metamask.io/download/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline text-sm flex items-center justify-center gap-1"
                >
                  Install MetaMask <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Captures</p>
                    <p className="text-3xl font-bold">{captureCount}</p>
                  </div>
                  <Zap className="w-10 h-10 text-yellow-400" />
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Completion</p>
                    <p className="text-3xl font-bold">{completion}%</p>
                  </div>
                  <Award className="w-10 h-10 text-purple-400" />
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Wallet</p>
                    <p className="text-sm font-mono">
                      {account.slice(0, 6)}...{account.slice(-4)}
                    </p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-400" />
                </div>
              </div>
            </div>

            {/* Capture Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Capture Pokémon</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Pokémon ID (1-151)
                  </label>
                  <select
                    value={selectedPokemon}
                    onChange={(e) => setSelectedPokemon(Number(e.target.value))}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    {Object.entries(POKEMON_DATA).map(([id, data]) => (
                      <option key={id} value={id} className="bg-gray-800">
                        #{id} - {data.name} ({data.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    onClick={capturePokemon}
                    disabled={loading}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Capturing..." : "Capture Pokémon (0.001 ETH)"}
                  </button>
                </div>
              </div>

              {txHash && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg">
                  <p className="text-sm flex items-center gap-2">
                    <span className="font-semibold">✅ Success!</span>
                    <a
                      href={`https://sepolia.etherscan.io/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:underline flex items-center gap-1"
                    >
                      View on Etherscan <ExternalLink className="w-4 h-4" />
                    </a>
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* My Pokedex */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">My Pokédex</h2>
              
              {myPokedex.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-lg">No Pokémon captured yet!</p>
                  <p className="text-sm mt-2">Start capturing to build your collection</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myPokedex.map((pokemon, index) => {
                    const id = pokemon.pokemonId.toNumber();
                    const data = POKEMON_DATA[id] || { 
                      name: `Pokemon #${id}`, 
                      type: "Unknown",
                      color: "#A8A8A8"
                    };
                    
                    return (
                      <div
                        key={index}
                        className="bg-white/20 rounded-xl p-4 border-2 hover:scale-105 transition-transform"
                        style={{ borderColor: data.color }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold">#{id}</span>
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: data.color + "40", color: data.color }}
                          >
                            {data.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{data.name}</h3>
                        <p className="text-xs text-gray-300">
                          Captured: {formatDate(pokemon.captureTime.toNumber())}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* Setup Instructions */}
        {!account && (
          <div className="mt-8 bg-yellow-500/10 border border-yellow-500 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-3">⚙️ Setup Checklist</h3>
            <ol className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                <span>Install MetaMask extension from <a href="https://metamask.io" target="_blank" className="text-yellow-400 hover:underline">metamask.io</a></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                <span>Deploy Pokedex.sol contract in Remix IDE</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                <span>Copy deployed contract address and update CONTRACT_ADDRESS in code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">4.</span>
                <span>Switch MetaMask to Sepolia testnet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">5.</span>
                <span>Get test ETH from <a href="https://sepoliafaucet.com" target="_blank" className="text-yellow-400 hover:underline">sepoliafaucet.com</a></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">6.</span>
                <span>Click "Connect MetaMask" above!</span>
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}