import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
 // Add this to include custom styles

const TransferToken = ({ setTransferModel, TRANSFER_TOKEN, ERC20, setLoader }) => {
  const [token, setToken] = useState({
    _sendTo: "",
    _amount: "",
    _tokenAddress: "",
  });
 
  const [tokenDetails, setTokenDetails] = useState(null);
  const [transferToken, setTransferToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (transferToken) {
      const loadToken = async () => {
        setLoader(true);
        try {
          const tokenData = await ERC20(transferToken);
          if (!tokenData) {
            setError("Kindly paste a valid token address.");
            setTokenDetails(null);
          } else {
            setTokenDetails(tokenData);
            setError("");
          }
        } catch (error) {
          console.error("Error loading token:", error);
          setError("Error loading token data.");
        }
        setLoader(false);
      };
      loadToken();
    }
  }, [transferToken, ERC20, setLoader]);

  const handleTransfer = async () => {
    const { _sendTo, _amount, _tokenAddress } = token;
    
    if (!_sendTo || !_amount || !_tokenAddress) {
      setError("Please fill in all fields.");
      return;
    }
    if (isNaN(_amount) || Number(_amount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    try {
      await TRANSFER_TOKEN(token);
      setToken({ _sendTo: "", _amount: "", _tokenAddress: "" }); // Clear inputs after transfer
      setError("");
    } catch (error) {
      console.error("Transfer error:", error);
      setError("Error during token transfer. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
  <div className="modal-content">
    <div className="modal-header">
      <h2 className="title">
        Transfer Token
      </h2>
      <a className="close" onClick={() => setTransferModel(false)}></a>
    </div>

    {error && <p className="error">{error}</p>}
    
    <div className="modal-body">
      <div className="row justify-content-center">
      <div className="tool_div">
  {tokenDetails?.name ? (
    <input
      type="text"
      value={`Name: ${tokenDetails.name} Balance: ${tokenDetails.Balance} ${tokenDetails.symbol}`}
      readOnly
      className="center-input"
    />
  ) : (
    <>
      <label className="input-label">Token Address</label>
      <input
        type="text"
        onChange={(e) => {
          const tokenAddress = e.target.value;
          setToken({ ...token, _tokenAddress: tokenAddress });
          setTransferToken(tokenAddress);
        }}
        className="center-input"
      />
    </>
  )}
</div>

<div className="tool_div">
  <label className="input-label">Recipient Address</label>
  <input
    type="text"
    onChange={(e) => {
      setToken({ ...token, _sendTo: e.target.value });
    }}
    className="center-input"
  />
</div>

<div className="tool_div">
  <label className="input-label">Amount</label>
  <input
    type="text"
    onChange={(e) => {
      setToken({ ...token, _amount: e.target.value });
    }}
    className="center-input"
  />
</div>


        <div className="text-center mt-10">
          <button onClick={handleTransfer} className="button_tool">
            Transfer Token
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

// PropTypes for validation
TransferToken.propTypes = {
  setTransferModel: PropTypes.func.isRequired,
  TRANSFER_TOKEN: PropTypes.func.isRequired,
  ERC20: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
};

export default TransferToken;
