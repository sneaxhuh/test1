import React, { useState, useEffect } from "react";

const Header = ({
  account,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  setOwnerModel,
  shortenAddress,
  detail,
  currency,
  ownerModel,
}) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [error, setError] = useState("");

  const scrollToTools = () => {
    const toolsSection = document.getElementById("tools");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      setIsMetaMaskInstalled(true);

      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setError("Please connect to MetaMask.");
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    } else {
      setError("MetaMask is not installed.");
    }
  }, [setAccount]);

  const connectMetamask = async () => {
    console.log("Attempting to connect MetaMask...");
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        console.log("Connected to chain ID:", chainId);

        if (accounts.length > 0) {
          console.log("Connected account:", accounts[0]);
          setAccount(accounts[0]);
          setError(""); // Clear any previous error
        } else {
          setError("No accounts found. Please connect to MetaMask.");
        }
      } catch (error) {
        console.error("MetaMask Connection Error:", error);
        setError("Error connecting to MetaMask. Please try again.");
      }
    } else {
      setError("MetaMask is not installed.");
    }
  };

  return (
    <header className="site-header header--transparent ico-header" id="home">
      <div className="header__main-wrap">
        <div className="container">
          <div className="header__main ul_li_between">
            <div className="header__left ul_li">
              <div className="header__logo">
                <a href="/">
                  <img src="assets/img/logo/logo.svg" alt="Logo" />
                </a>
              </div>
            </div>

            <div className="main-menu__wrap ul_li navbar navbar-expand-xl">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li>
                    <a className="scrollspy-btn" href="#home">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#about">
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      className="scrollspy-btn"
                      href="#tools"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOwnerModel(!ownerModel);
                        scrollToTools();
                      }}
                    >
                      Tools
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header__action ul_li">
              {account ? (
                <div className="header__account">
                  <a
                    onClick={() =>
                      navigator.clipboard.writeText(detail?.address)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {shortenAddress(detail?.address)}:{" "}
                    {detail?.maticBal.slice(0, 6)} {currency}
                  </a>
                </div>
              ) : (
                <div className="header__account">
                  <a
                    href="/"
                    className="bn5"
                    onClick={connectMetamask}
                    style={{ cursor: "pointer" }}
                  >
                    Connect Wallet
                  </a>
                </div>
              )}
            </div>
          </div>
          {error && <p className="error">{error}</p>} {/* Display error message */}
        </div>
      </div>
    </header>
  );
};

export default Header;
