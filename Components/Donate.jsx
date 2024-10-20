import React, { useState } from "react";
import PropTypes from "prop-types";

const Donate = ({ detail, currency, setOpenDonate, DONATE }) => {
  const [donateFund, setDonateFund] = useState("");
  const [error, setError] = useState("");

  const handleDonate = () => {
    const fundValue = parseFloat(donateFund);
    if (isNaN(fundValue) || fundValue <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }
    DONATE(fundValue);
    setDonateFund(""); // Clear input after donation
    setError(""); // Clear any previous errors
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="title">Donate {currency}</h2>
          <a className="close" onClick={() => setOpenDonate(false)}>
            
          </a>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="modal-body">
          <div className="row justify-content-center">
            <div className="col-lg-12 tool_div">
              <input
                type="number"
                placeholder="Enter donation amount"
                value={donateFund}
                onChange={(e) => setDonateFund(e.target.value)}
                required
                className="center-input"
              />
            </div>
            <p className="balance-info">
              <strong>Balance:</strong> {detail?.maticBal} {currency}
            </p>
            <div className="text-center mt-10">
              <button onClick={handleDonate} className="thm-btn">
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes for validation
Donate.propTypes = {
  detail: PropTypes.shape({
    maticBal: PropTypes.number,
  }).isRequired,
  currency: PropTypes.string.isRequired,
  setOpenDonate: PropTypes.func.isRequired,
  DONATE: PropTypes.func.isRequired,
};

export default Donate;
