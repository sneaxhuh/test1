import { ethers } from "ethers";
import Web3Modal from "web3modal";

import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";

export const TOKEN_ADDRESS = "0x1758FcE5AC5a46fdc90B966b679271025C2F0F5D";
export const ERC20_ABI = erc20.abi;

export const OWNER_ADDRESS = "0x3d3019f85B5BA12b7838FAadf25F8B2036CCBA7c";

export const CONTRACT_ADDRESS = "0x761504827A5812A9C9fe4ad1f18f06Ec6DcF377E";
export const CONTRACT_ABI = tokenICO.abi;



const changeNetworks = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (error) {
    console.log(error.message); // Corrected
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "holesky";
  await changeNetworks({ networkName });
};

export const CHECK_WALLET_CONNECTED = async () => {
  if (!window.ethereum) return console.log("Install Metamask");
  await handleNetworkSwitch();

  const account = await window.ethereum.request({
    method: "eth_accounts",
  });

  if (account.length) {
    return account[0];
  } else {
    console.log("Please Install Metamask & Connect, Reload");
  }
};

export const CONNECT_WALLET = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");
    await handleNetworkSwitch();

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (address, abi, signer) =>
  new ethers.Contract(address, abi, signer);
export const TOKEN_ICO_CONTRACT = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    console.log("Connected with address:", await signer.getAddress());

    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return contract;
  } catch (error) {
    console.error("Error connecting to Web3 or fetching contract:", error);
    throw error;
  }
};

export const ERC20 = async (contractAddress = TOKEN_ADDRESS) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const network = await provider.getNetwork();
    const signer = provider.getSigner();

    // Fetch the correct ERC20 contract using the provided contract address
    const contract = fetchContract(contractAddress, ERC20_ABI, signer); // Use ERC20_ABI here

    const userAddress = await signer.getAddress(); // Moved await here for clarity

    // Fetch token data
    const balance = await contract.balanceOf(userAddress);
    const name = await contract.name();
    const symbol = await contract.symbol();
    const supply = await contract.totalSupply();
    const decimals = await contract.decimals();

    const token = {
      address: contractAddress,
      name,
      symbol,
      decimals,
      supply: ethers.utils.formatEther(supply.toString()),
      balance: ethers.utils.formatEther(balance.toString()),
      chainId: network.chainId,
    };

    console.log(token);
    return token;
  } catch (error) {
    console.error("Error fetching ERC20 token data:", error);
  }
};

export const ERC20_CONTRACT = async (contractAddress = TOKEN_ADDRESS) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // Fetch the contract
    const contract = fetchContract(contractAddress, ERC20_ABI, signer);

    const balance = await contract.balanceOf(await signer.getAddress());
    const name = await contract.name();
    const symbol = await contract.symbol();
    const supply = await contract.totalSupply();
    const decimals = await contract.decimals();

    const token = {
      address: contractAddress,
      name,
      symbol,
      decimals,
      supply: ethers.utils.formatEther(supply.toString()),
      balance: ethers.utils.formatEther(balance.toString()),
    };
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const GET_BALANCE = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const maticBal = await signer.getBalance();

    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
  }
};

export const CHECK_ACCOUNT_BALANCE = async (ADDRESS) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const maticBal = await provider.getBalance(ADDRESS);

    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
  }
};

export const addTokenToMetamask = async () => {
  if (window.ethereum) {
    try {
      const tokenDetails = await ERC20(TOKEN_ADDRESS);

      // Ensure tokenDetails is valid before proceeding
      if (!tokenDetails) {
        console.error("Failed to fetch token details");
        return;
      }

      const { decimals, symbol } = tokenDetails;
      const tokenAddress = TOKEN_ADDRESS;
      const tokenImage =
        "https://www.daulathussain.com/wp-content/uploads/2024/05/theblockchaincoders.jpg";

      // Request to add the token to MetaMask
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: symbol,
            decimals: decimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        return "Token added!";
      } else {
        return "Token not added";
      }
    } catch (error) {
      console.error("Error adding token:", error);
      return "An error occurred while adding the token";
    }
  } else {
    return "MetaMask is not installed";
  }
};

const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};