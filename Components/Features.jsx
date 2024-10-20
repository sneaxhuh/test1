import { React, useRef } from "react";

const Features = ({
  ownerModel,
  currency,
  detail,
  account,
  setTransferModel,
  setTransferCurrency,
  setOpenDonate,
  TOKEN_WITHDRAW,
  setOpenUpdatePrice,
  setOpenUpdateAddress,
}) => {
  return (
    <section className="features pos-rel pb-150 mb-0-pb">
      <div className="container_2">
        <div className="sec-title text-center mb-95" id="tools">
          <h2 className="sec-title___title mb-25">
            Blockchain Tools For Efficiency
          </h2>
          <div className="grid-container">
            <div
              className="grid-item"
              onClick={() => {
                setTransferModel(true);
              }}
            >
              <img className="tool_img" src="/transfer.png" alt="" />
              <h3>
                <strong>
                  Token <br />
                  transfer
                </strong>
              </h3>
              <h6>
                <span style={{ color: "grey" }}>
                  Transfer your tokens to <br /> someone for use.
                </span>
              </h6>
            </div>
            <div
              className="grid-item"
              onClick={() => {
                setTransferCurrency(true);
              }}
            >
              <img className="tool_img" src="/transfer.png" alt="" />
              <h3>
                <strong>
                  Donate <br />
                  Fund
                </strong>
              </h3>
              <h6>
                <span style={{ color: "grey" }}>
                  Donate your funds
                </span>
              </h6>
            </div>
            <div
              className="grid-item"
              onClick={() => {
                setOpenDonate(true);
              }}
            >
              <img className="tool_img" src="/transfer_fund.png" alt="" />
              <h3>
                <strong>
                  Transfer <br />
                  Funds
                </strong>
              </h3>
              <h6>
                <span style={{ color: "grey" }}>
                  Transfer your funds
                </span>
              </h6>
            </div>
            <div
              className="grid-item"
              onClick={() => {
                {
                  TOKEN_WITHDRAW;
                }
              }}
            >
              <img className="tool_img" src="/update.png" alt="" />
              <h3>
                <strong>
                  Update <br />
                  Fund
                </strong>
              </h3>
              <h6>
                <span style={{ color: "grey" }}>
                  Update your <br /> funds
                </span>
              </h6>
            </div>
            <div
              className="grid-item"
              onClick={() => {
                setOpenUpdateAddress(true);
              }}
            >
              <img className="tool_img" src="/donate_img.png" alt="" />
              <h3>
                <strong>
                  Donate <br />
                  Fund
                </strong>
              </h3>
              <h6>
                <span style={{ color: "grey" }}>
                  Transfer your tokens to <br /> someone for use.
                </span>
              </h6>
            </div>
            <div
              className="grid-item"
              onClick={() => {
                setOpenUpdatePrice(true);
              }}
            >
              <img className="tool_img" src="/donate_img.png" alt="" />
              <h3>
                <strong>
                  Donate <br />
                  Fund
                </strong>
              </h3>
              <h6>
                <span style={{ color: "grey" }}>
                  Transfer your tokens to <br /> someone for use.
                </span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
