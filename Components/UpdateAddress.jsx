import React, { useState, useEffect } from "react";
import { shortenAddress } from "../Utils/index";


const UpdateAddress = ({
  detail,
  currency,
  setOpenUpdateAddress,
  UPDATE_TOKEN,
  ERC20,
  setLoader,
}) => {
  const [address, setAddress] = useState("");
  const [tokenDetails, setTokenDetails] = useState(null);
  const [transferToken, setTransferToken] = useState("");

  useEffect(() => {
    if (transferToken) {
      const loadToken = async () => {
        setLoader(true);
        try {
          const token = await ERC20(transferToken);
          if (!token) {
            console.log("Kindly paste the token address");
          } else {
            setTokenDetails(token);
            console.log(token);
          }
        } catch (error) {
          console.error("Error loading token:", error);
        }
        setLoader(false);
      };
      loadToken();
    }
  }, [transferToken, ERC20, setLoader]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="title">Update Token</h2>
          <a className="close" onClick={() => setOpenUpdateAddress(false)}></a>
        </div>

        <div className="modal-body">
          <div className="row">
            <div className="col-lg-12">
              {tokenDetails?.name ? (
                <input
                  type="text"
                  value={`Name: ${tokenDetails.name} Balance: ${tokenDetails.Balance} ${tokenDetails.symbol}`}
                  readOnly
                />
              ) : (
                <input
                  type="text"
                  placeholder="Token Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setTransferToken(e.target.value);
                  }}
                />
              )}
            </div>

            <p>
              <strong>Current Price:</strong> {detail?.tokenPrice} {currency} &nbsp; &nbsp; 
              <strong>Token Balance:</strong> {detail?.tokenBal} {""} {detail?.symbol} &nbsp; &nbsp; 
              <strong onClick={() => navigator.clipboard.writeText(detail?.tokenAddr)}>
                Token Address
              </strong> {shortenAddress(detail?.tokenAddr)}
            </p>

            <div className="ico-contract__btn text-center mt-10">
              <button onClick={() => UPDATE_TOKEN(address)} className="button_tool">
                Update Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
