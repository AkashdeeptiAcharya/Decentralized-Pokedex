import React, { useState, useEffect } from 'react';
import { Wallet, Zap, Award, TrendingUp, ExternalLink, AlertCircle } from 'lucide-react';
import { POKEMON_DATA } from "./data/pokemonData";
import { getRandomEncounter } from "./utils/randomEncounter";
import { getPokemonSprite } from "./utils/getPokemonSprite";
import TypedText from "./components/TypedText";
const LEGENDARY_IDS = [144, 145, 146, 150, 151];



const CONTRACT_ADDRESS = "0x3603e26675B3F61EC3c8F1fd94da1B7ad862d490";
const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "uint256", "name": "_pokemonId", "type": "uint256" }],
    "name": "capturePokemon",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyPokedex",
    "outputs": [{ "components": [{ "internalType": "uint256", "name": "pokemonId", "type": "uint256" }, { "internalType": "uint256", "name": "captureTime", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }], "internalType": "struct Pokedex.Pokemon[]", "name": "", "type": "tuple[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyCaptureCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_trainer", "type": "address" }],
    "name": "getCompletionPercentage",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "captureFee",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function DecentralizedPokedex() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [myPokedex, setMyPokedex] = useState([]);
  const [captureCount, setCaptureCount] = useState(0);
  const [completion, setCompletion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [throwingBall, setThrowingBall] = useState(false);
  const [ethersLoaded, setEthersLoaded] = useState(false);
  const [encounter, setEncounter] = useState(null);
  const [encounterResult, setEncounterResult] = useState(null);
  const isUserRejection = (err) => {
    return (
      err?.code === 4001 ||
      err?.code === "ACTION_REJECTED" ||
      err?.message?.toLowerCase().includes("user rejected") ||
      err?.message?.toLowerCase().includes("denied transaction") ||
      err?.message?.toLowerCase().includes("rejected")
    );

  };

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

  const resetEncounterFlow = () => {
    setEncounter(null);
    setEncounterResult(null);
    setLoading(false);
    setTxHash("");
    setError("");
  };
  const startEncounter = () => {
    const e = getRandomEncounter();

    setEncounter({
      pokemonId: e.pokemonId,
      rarity: e.rarity,
      name: POKEMON_DATA[e.pokemonId].name,
      type: POKEMON_DATA[e.pokemonId].type,
      color: POKEMON_DATA[e.pokemonId].color,
      sprite: getPokemonSprite(e.pokemonId),
      isLegendary: e.rarity === "legendary",
    });

    setEncounterResult(null);
    setError("");
    setTxHash("");
  };

  // Capture Pokemon
  const capturePokemon = async () => {
    setEncounterResult(null);


    if (!contract || !encounter) return;

    // 🎯 Trigger Poké Ball animation
    setThrowingBall(true);
    setTimeout(() => setThrowingBall(false), 900);


    setLoading(true);
    setError("");
    setTxHash("");

    try {
      const fee = await contract.captureFee();
      const pokemonId = encounter.pokemonId;
      const tx = await contract.capturePokemon(pokemonId, {
        value: fee
      });



      setTxHash(tx.hash);
      await tx.wait();
      setEncounterResult("caught");

      // Reload data
      await loadPokedex();
      setLoading(false);
    } catch (err) {
      console.error("Capture error:", err);

      if (isUserRejection(err)) {
        setError("");
        setEncounterResult("escaped");
        setLoading(false);

        // ⏳ Let the "ran away" message show briefly
        setTimeout(() => {
          setEncounter(null);
          setEncounterResult(null);
        }, 2000);

        return;
      }

      // 🚨 Real failure
      if (err.message?.includes("insufficient funds")) {
        setError("❌ Not enough ETH to throw a Poké Ball.");
      } else {
        setError("❌ Capture failed. Something went wrong.");
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
  useEffect(() => {
    if (encounterResult === "caught") {
      const timer = setTimeout(() => {
        resetEncounterFlow();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [encounterResult]);


  // Format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-[#c4cfa1] text-black p-6 font-mono">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold mb-1 tracking-wide">

            Decentralized Pokédex
          </h1>
          <p className="text-sm">
            A blockchain-powered Pokédex
          </p>

        </div>

        {/* Connect Wallet */}
        {!account ? (
          <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md mx-auto">
            <Wallet className="w-16 h-16 mx-auto mb-4 text-yellow-400" />

            <h2 className="text-3xl font-extrabold mb-2">
              Welcome, Trainer!
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              Your journey begins on the blockchain.
            </p>

            <div className="text-sm text-gray-500 mb-6 space-y-1">
              <p>• Encounter wild Pokémon</p>
              <p>• Capture them on-chain</p>
              <p>• Build your Pokédex forever</p>
            </div>

            <button
              onClick={connectWallet}
              disabled={!ethersLoaded}
              className="bg-gradient-to-r from-yellow-400 to-orange-500
             text-gray-900 font-bold py-3 px-8 rounded-full
             hover:scale-105 transition-transform
             disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {ethersLoaded ? "Connect MetaMask" : "Loading..."}
            </button>

            <p className="text-xs text-gray-500 mt-4">
              We never access your funds — this only links your Pokédex.
            </p>
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
            <div className="border-4 border-black  bg-[#f5f5dc] p-4 mb-6 flex
  justify-between items-centertext-sm">
              <div>
                <strong>Trainer:</strong>{" "}
                {account.slice(0, 6)}…{account.slice(-4)}
              </div>

              <div>
                <strong>Pokémon:</strong> {captureCount}
              </div>

              <div>
                <strong>Completion:</strong> {completion}%
              </div>
            </div>


            {/* Capture Section */}


            <div className="bg-[#f5f5dc]border-4 border-black rounded-xl p-6 mb-12
                            max-w-2xl mx-auto text-black font-mono
                             ">

              <h2 className="text-3xl font-extrabold mb-2">
                Ready to Catch a Pokémon?
              </h2>
              {encounter && (
                <div className="border-4 border-black bg-white p-4 mb-6">


                  {/* Sprite */}
                  <div className="flex justify-center mb-4">
                    <div className="relative flex justify-center items-end h-40">
                      <img
                        src={encounter.sprite}
                        alt={encounter.name}
                        className={`
  w-32 h-32
  animate-idle
  animate-spawn
  ${encounter.isLegendary
                            ? "drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]"
                            : ""}
`}

                      />


                      <div
                        className={`
    absolute bottom-2
    w-24 h-4
    bg-black/30
    blur-sm
    rounded-full
    ${encounter.isLegendary ? "scale-125 bg-yellow-500/40" : ""}
  `}
                      ></div>

                    </div>

                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-bold leading-snug">
                    <TypedText
                      text={`A wild ${encounter.name.toUpperCase()} appeared!`}
                    />
                  </h3>


                  <p className="text-sm mt-1">
                    {encounter.type} • ⭐ {encounter.rarity}
                  </p>
                </div>
              )}

              {encounterResult === "escaped" && encounter && (
                <div className="mt-3 p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                  <p className="text-sm">
                    💨{" "}
                    <TypedText
                      text={`${encounter.name} ran away!`}
                      speed={35}
                    />
                  </p>

                  <p className="text-xs text-gray-300 mt-1">
                    You hesitated… better luck next time.
                  </p>
                </div>
              )}

              {encounterResult === "caught" && encounter && (
                <div className="mt-4 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-center">
                  <p className="text-lg font-semibold">
                    🎉{" "}
                    <TypedText
                      text={`${encounter.name} was caught!`}
                      speed={35}
                    />
                  </p>

                  <p className="text-sm text-gray-300 mt-1">
                    Added to your Pokédex.
                  </p>
                </div>
              )}


              <p className="text-gray-300 mb-8">
                Choose your Pokémon and throw a Poké Ball on-chain.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  onClick={encounter ? capturePokemon : startEncounter}
                  disabled={loading}
                  className="
    w-full
    bg-red-600
    border-4 border-black
    text-white
    font-bold
    py-3
    text-lg
    tracking-wide
    active:translate-y-1
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
                >
                  {encounter ? "Capture Pokémon" : "Find Pokémon"}
                </button>
                <button
                  onClick={resetEncounterFlow}
                  className="
    w-full
    bg-gray-300
    border-4 border-black
    text-black
    font-bold
    py-3
    text-lg
    tracking-wide
    active:translate-y-1
  "
                >
                  Run
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Costs 0.001 ETH • Pokémon is permanently yours
              </p>
            </div>

            <div>
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
            <div className="
  border-4 border-black
  bg-[#f5f5dc]
  p-6
  mt-8
">

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
                        className="
      border-2 border-black
      bg-white
      p-3
      hover:bg-[#e6e6c8]
      transition
    "
                      >


                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold">#{id}</span>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: data.color + "40", color: data.color }}
                          >
                            {data.type}
                          </span>
                          <span className="text-xs text-gray-500">#{id}</span>
                        </div>
                        <h3
                          className={`
  border-2 border-black
  bg-white
  p-3
  transition
  ${LEGENDARY_IDS.includes(id)
                              ? "bg-[#fff8dc]" : ""}
`}
                          style={{ color: data.color }}
                        >
                          {data.name}
                          {LEGENDARY_IDS.includes(id)
                            && (
                              <span className="text-yellow-600 text-sm">★</span>
                            )}
                        </h3>


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
            <ol className="space-y-2 text-sm text-gray-500">
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