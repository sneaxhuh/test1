import React, { useState, useEffect } from "react";
import { shortenAddress } from "../Utils";

const Popup = ({
  setBuyModel,
  BUY_TOKEN,
  currency,
  detail,
  account,
  ERC20,
  TOKEN_ADDRESS,
  setLoader,
}) => {
  const [amount, setAmount] = useState("");
  const [transferToken, setTransferToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true); // Control modal visibility

  useEffect(() => {
    const fetchTokenData = async () => {
      setLoader(true);
      try {
        const items = await ERC20(TOKEN_ADDRESS);
        setTransferToken(items);
        console.log(items);
      } catch (error) {
        setErrorMessage("Failed to fetch token data.");
        console.error(error);
      } finally {
        setLoader(false);
      }
    };

    fetchTokenData();
  }, [ERC20, TOKEN_ADDRESS, setLoader]);

  const handleBuyToken = async () => {
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await BUY_TOKEN(amount);
      setAmount(""); // Clear input after purchase
    } catch (error) {
      setErrorMessage("Failed to buy token.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setIsOpen(false);
    setBuyModel(false); // Also close the parent modal if necessary
  };

  // Ensure tokenPrice is a valid number
  const tokenPrice = detail?.tokenPrice || 0;
  const outputValue = !isNaN(amount) && amount !== "" ? (amount * tokenPrice).toFixed(2) : "Output Value";

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : 'closed'}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="title">Buy Token</h2>
          <button className="close-btn" onClick={closePopup}>
            X
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="modal-body">
          <div className="row">
            <div className="col-lg-6">
              <input
                type="text"
                placeholder={`Token Balance: ${transferToken?.balance} ${transferToken?.symbol}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="col-lg-6">
              <input
                type="text"
                value={`${outputValue} ${currency}`}
                readOnly
              />
            </div>

            <div className="col-lg-12">
              <textarea
                disabled
                name="message"
                cols="30"
                rows="10"
                placeholder={`Current Price: ${detail?.tokenBal} ${detail?.symbol} Token Address: ${shortenAddress(detail?.tokenAddr)}`}
              ></textarea>
            </div>

            <div className="ico-contract__btn text-center mt-10">
              <button
                onClick={handleBuyToken}
                className="thm-btn"
                disabled={loading}
                aria-label="Buy Token"
              >
                {loading ? "Buying..." : "Buy Token"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
