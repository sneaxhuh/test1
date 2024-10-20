import React, { useState } from "react";
import PropTypes from "prop-types";


const UpdatePrice = ({
  detail,
  currency,
  setOpenUpdatePrice,
  UPDATE_TOKEN_PRICE,
}) => {
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePrice = async () => {
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    setLoading(true);
    try {
      await UPDATE_TOKEN_PRICE(parseFloat(price));
      setPrice(""); // Clear input after update
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error updating token price:", error);
      setError("Error updating token price. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="title">Update Token Price</h2>
          <a className="close" onClick={() => setOpenUpdatePrice(false)}></a>
        </div>

        <div className="modal-body">
          {error && <p className="error">{error}</p>}
          <div className="row">
            <div className="col-lg-12">
              <input
                type="text"
                placeholder="New Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <p>
              <strong>Current Price:</strong> {detail?.tokenPrice} {currency} &nbsp; &nbsp;
              <strong>Token Balance:</strong> {detail?.tokenBal} {detail?.symbol}
            </p>

            <div className="ico-contract__btn text-center mt-10">
              <button onClick={handleUpdatePrice} className="button_tool" disabled={loading}>
                {loading ? "Updating..." : "Update Price"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdatePrice.propTypes = {
  detail: PropTypes.shape({
    tokenPrice: PropTypes.number,
    tokenBal: PropTypes.number,
    symbol: PropTypes.string,
  }).isRequired,
  currency: PropTypes.string.isRequired,
  setOpenUpdatePrice: PropTypes.func.isRequired,
  UPDATE_TOKEN_PRICE: PropTypes.func.isRequired,
};

export default UpdatePrice;
