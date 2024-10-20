import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import {
  CHECK_WALLET_CONNECTED,
  GET_BALANCE,
  ERC20,
  CONNECT_WALLET,
  CHECK_ACCOUNT_BALANCE,
  TOKEN_ICO_CONTRACT,
  ERC20_CONTRACT,
  TOKEN_ADDRESS,
  addTokenToMetamask,
} from "./constants";

export const TOKEN_ICO_Context = React.createContext();

export const TOKEN_ICO_Provider = ({ children }) => {
  const DAPP_NAME = "TOKEN ICO DAPP";
  const currency = "ETH";
  const network = "Holesky";

  const [loader, setLoader] = useState(false);
  const [account, setAccount] = useState();
  const [count, setCount] = useState(0);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  //--- CONTRACT FUNCTIONS --
  const TOKEN_ICO = async () => {
    try {
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        setLoader(true);
        setAccount(address);
        const contract = await TOKEN_ICO_CONTRACT();

        const tokenDetails = await contract.getTokenDetails();
        const contractOwner = await contract.owner();
        const soldTokens = await contract.soldTokens();

        const ethBal = await GET_BALANCE();

        const token = {
          tokenBal: ethers.utils.formatEther(tokenDetails.balance.toString()),
          name: tokenDetails.name,
          symbol: tokenDetails.symbol,
          supply: ethers.utils.formatEther(tokenDetails.supply.toString()),
          tokenPrice: ethers.utils.formatEther(tokenDetails.tokenPrice.toString()),
          tokenAddr: tokenDetails.tokenAddr,
          maticBal: ethBal,
          address: address.toLowerCase(),
          owner: contractOwner.toLowerCase(),
          soldTokens: soldTokens.toNumber(),
        };
        setLoader(false);
        return token;
      }
    } catch (error) {
      console.log(error);
      notifyError("Error: Try again later");
      setLoader(false);
    }
  };

  const BUY_TOKEN = async (amount) => {
    setLoader(true); // Start loading state

    try {
        // Check if wallet is connected
        const address = await CHECK_WALLET_CONNECTED();
        if (!address) {
            notifyError("Wallet not connected. Please connect your wallet.");
            return;
        }

        // Get the contract instance
        const contract = await TOKEN_ICO_CONTRACT();

        // Fetch token details
        const tokenDetails = await contract.getTokenDetails();
        const availableTokens = ethers.utils.formatEther(tokenDetails.balance.toString());
        
        // Check if there are enough tokens available
        if (Number(availableTokens) <= 1) {
            notifyError("Not enough tokens available for purchase.");
            return;
        }

        // Calculate price and prepare the transaction
        const price = ethers.utils.formatEther(tokenDetails.tokenPrice.toString());
        const payAmount = ethers.utils.parseUnits((amount * price).toString(), "ether"); // Calculate total amount to pay based on the number of tokens to buy

        // Prepare and send the transaction
        const transaction = await contract.buyToken(amount, { // Use `amount` directly for the number of tokens
            value: payAmount,
            gasLimit: ethers.utils.hexlify(8000000),
        });
        
        // Wait for the transaction to be mined
        await transaction.wait();
        notifySuccess("Transaction completed successfully!");
        window.location.reload(); // Reload the page to update balances or state
    } catch (error) {
        console.error("Transaction error:", error);
        
        // Handle specific error messages
        if (error.code === 4001) {
            notifyError("User denied the request. Please try again.");
        } else if (error.message.includes("insufficient funds")) {
            notifyError("Insufficient funds in your wallet.");
        } else {
            notifyError("Error: Try again later");
        }
    } finally {
        setLoader(false); // Stop loading state
    }
};


  const TOKEN_WITHDRAW = async () => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const tokenDetails = await contract.getTokenDetails();
        const availableTokens = ethers.utils.formatEther(tokenDetails.balance.toString());

        if (availableTokens > 1) {
          const transaction = await contract.withdrawAllTokens();
          await transaction.wait();
          setLoader(false);
          notifySuccess("Transaction completed successfully");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
      notifyError("Error: Try again later");
      setLoader(false);
    }
  };

  const UPDATE_TOKEN = async (_address) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const transaction = await contract.updateToken(_address);

        await transaction.wait();
        setLoader(false);
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      notifyError("Error: Try again later");
      setLoader(false);
    }
  };

  const UPDATE_TOKEN_PRICE = async (price) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        const transaction = await contract.updateToken(payAmount);
        await transaction.wait();
        setLoader(false);
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      notifyError("Error: Try again later");
      setLoader(false);
    }
  };

  const DONATE = async (AMOUNT) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const payAmount = ethers.utils.parseUnits(AMOUNT.toString(), "ether");

        const transaction = await contract.transferToOwner(payAmount, {
          value: payAmount.toString(),
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transaction.wait();
        setLoader(false);
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      notifyError("Error: Try again later");
      setLoader(false);
    }
  };

  const TRANSFER_ETHER = async (transfer) => {
    try {
      setLoader(true);
      const { _reciever, amount } = transfer;
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const payAmount = ethers.utils.parseUnits(amount.toString(), "ether");

        const transaction = await contract.updateTokenSalePrice(_reciever, payAmount, {
          value: payAmount.toString(),
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transaction.wait();
        setLoader(false);
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      notifyError("Error: Try again later");
      setLoader(false);
    }
  };

  const TRANSFER_TOKEN = async (transfer) => {
    try {
      setLoader(true);
      const { _tokenAddress, _sendTo, _amount } = transfer;
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await ERC20_CONTRACT(_tokenAddress);
        const payAmount = ethers.utils.parseUnits(amount.toString(), "ether");

        const transaction = await contract.transfer(_sendTo, payAmount, {
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transaction.wait();
        setLoader(false);
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      notifyError("Error: Try again later");
      setLoader(false);
    }
  };

  return (
    <TOKEN_ICO_Context.Provider
      value={{
        TOKEN_ICO,
        BUY_TOKEN,
        TRANSFER_ETHER,
        DONATE,
        UPDATE_TOKEN,
        UPDATE_TOKEN_PRICE,
        TOKEN_WITHDRAW,
        TRANSFER_TOKEN,
        CONNECT_WALLET,
        ERC20,
        CHECK_ACCOUNT_BALANCE,
        setAccount,
        setLoader,
        addTokenToMetamask,
        TOKEN_ADDRESS,
        loader,
        account,
        currency,
      }}
    >
      {children}
    </TOKEN_ICO_Context.Provider>
  );
};
