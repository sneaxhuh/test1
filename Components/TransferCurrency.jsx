import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TransferCurrency = ({
  setTransferCurrency,
  TRANSFER_ETHER,
  detail,
  currency,
  CHECK_ACCOUNT_BALANCE,
  setLoader,
}) => {
  const [transfer, setTransfer] = useState({
    _amount: "",
    _receiver: "",
  });
  const [receiver, setReceiver] = useState(""); // Store receiver balance
  const [address, setAddress] = useState("");  // Address to check balance
  const [error, setError] = useState("");      // Error messages

  // useEffect to load the token balance when address changes
  useEffect(() => {
    const loadTokenBalance = async () => {
      if (address) {
        setLoader(true);
        try {
          const balance = await CHECK_ACCOUNT_BALANCE(address);
          if (!balance) {
            setError("No balance found for this address.");
            setReceiver(""); // Reset receiver if no balance
          } else {
            setReceiver(balance);  // Update balance
            setError("");          // Clear error if successful
          }
        } catch (err) {
          console.error("Error loading token balance:", err);
          setError("Error loading token balance.");
        } finally {
          setLoader(false);
        }
      }
    };

    loadTokenBalance();
  }, [address, CHECK_ACCOUNT_BALANCE, setLoader]);

  // Handle the transfer process
  const handleTransfer = async () => {
    setError("");  // Clear any previous errors
    if (!transfer._amount || !transfer._receiver) {
      setError("Please enter both amount and recipient address.");
      return;
    }
    if (isNaN(transfer._amount) || Number(transfer._amount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    try {
      setLoader(true); // Start loader before the transaction
      await TRANSFER_ETHER(transfer);
      setTransfer({ _amount: "", _receiver: "" }); // Clear inputs after transfer
      setError("");  // Clear any errors after success
    } catch (error) {
      console.error("Transfer error:", error);
      setError("Error during transfer. Please try again.");
    } finally {
      setLoader(false); // Stop loader after transaction attempt
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content transfer-modal">
        <div className="modal-header">
          <h2 className="title">Transfer {currency}</h2>
          <a
            className="close"
            onClick={() => setTransferCurrency(false)}
          ></a>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="modal-body">
          <div className="row justify-content-center">
            <div className="tool_div">
              {receiver ? (
                <input
                  type="text"
                  value={`Account Balance: ${receiver.slice(0, 8)} ${currency}`}
                  readOnly
                  className="center-input"
                />
              ) : (
                <>
                  <label className="input-label">Recipient Address</label>
                  <input
                    type="text"
                    value={transfer._receiver}
                    onChange={(e) => {
                      const newAddress = e.target.value;
                      setTransfer({ ...transfer, _receiver: newAddress });
                      setAddress(newAddress);  // Trigger balance fetch
                    }}
                    className="center-input"
                    placeholder="Enter recipient address"
                  />
                </>
              )}
            </div>

            <div className="tool_div">
              <label className="input-label">Amount to Transfer</label>
              <input
                type="text"
                value={transfer._amount}
                onChange={(e) => {
                  setTransfer({ ...transfer, _amount: e.target.value });
                }}
                className="center-input"
                placeholder="Enter amount"
              />
            </div>
            <p>
              <strong>Balance:</strong> {detail?.maticBal} {currency}
            </p>

            <div className="text-center mt-10">
              <button onClick={handleTransfer} className="button_tool">
                Transfer Currency
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes for validation
TransferCurrency.propTypes = {
  setTransferCurrency: PropTypes.func.isRequired,
  TRANSFER_ETHER: PropTypes.func.isRequired,
  detail: PropTypes.shape({
    maticBal: PropTypes.number,
  }),
  currency: PropTypes.string.isRequired,
  CHECK_ACCOUNT_BALANCE: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
};

export default TransferCurrency;
