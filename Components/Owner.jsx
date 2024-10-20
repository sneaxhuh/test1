import React from "react";
import { FaPlus } from "react-icons/fa6";


const Owner = ({
  setOwnerModel,
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
    <section className="team pos-rel">
      <div className="container">
        <div className="new-owner team_wrap ul_li">
          {/* Token Transfer */}
          <div className="team__item">
            <div className="avatar">
              <img src="assets/img/shape/c_shape1.png" alt="" />
            </div>
            <div className="team__info text-center mb-20">
              <h3>TOKEN TRANSFER</h3>
              <span>Any ERC 20</span>
            </div>
            <div className="team__social ul_li_center">
              <span
                onClick={() => {
                  setOwnerModel(false);
                  setTransferModel(true);
                }}
                className="h-icon"
                style={{ cursor: "pointer" }}
                aria-label="Transfer Token"
              >
                <FaPlus />
              </span>
            </div>
          </div>

          {/* Token Transfer Fund */}
          <div className="team__item">
            <div className="avatar">
              <img src="assets/img/token/t_info_img.png" alt="" />
            </div>
            <div className="team__info text-center mb-20">
              <h3>TOKEN TRANSFER FUND</h3>
              <span>
                {detail?.maticBal.slice(0, 6)} {currency}
              </span>
            </div>
            <div className="team__social ul_li_center">
              <span
                onClick={() => {
                  setOwnerModel(false);
                  setTransferCurrency(true);
                }}
                className="h-icon"
                style={{ cursor: "pointer" }}
                aria-label="Transfer Currency"
              >
                <FaPlus />
              </span>
            </div>
          </div>

          {/* Donate Fund */}
          <div className="team__item">
            <div className="avatar">
              <img src="assets/img/shape/c_shape2.png" alt="" />
            </div>
            <div className="team__info text-center mb-20">
              <h3>DONATE FUND</h3>
              <span>If you can</span>
            </div>
            <div className="team__social ul_li_center">
              <span
                onClick={() => {
                  setOwnerModel(false);
                  setOpenDonate(true);
                }}
                className="h-icon"
                style={{ cursor: "pointer" }}
                aria-label="Donate Fund"
              >
                <FaPlus />
              </span>
            </div>
          </div>

          {/* Owner Actions */}
          {account === detail?.owner && (
            <>
              {/* Withdraw */}
              <div className="team__item">
                <div className="avatar">
                  <img src="assets/img/token/t_info_img.png" alt="" />
                </div>
                <div className="team__info text-center mb-20">
                  <h3>WITHDRAW</h3>
                  <span>ICO TOKEN, Only Owner</span>
                </div>
                <div className="team__social ul_li_center">
                  <span
                    onClick={TOKEN_WITHDRAW}
                    className="h-icon"
                    style={{ cursor: "pointer" }}
                    aria-label="Withdraw Tokens"
                  >
                    <FaPlus />
                  </span>
                </div>
              </div>

              {/* Update Token */}
              <div className="team__item">
                <div className="avatar">
                  <img src="assets/img/token/t_info_img.png" alt="" />
                </div>
                <div className="team__info text-center mb-20">
                  <h3>UPDATE TOKEN</h3>
                  <span>ICO TOKEN, Only Owner</span>
                </div>
                <div className="team__social ul_li_center">
                  <span
                    onClick={() => {
                      setOwnerModel(false);
                      setOpenUpdateAddress(true);
                    }}
                    className="h-icon"
                    style={{ cursor: "pointer" }}
                    aria-label="Update Token Address"
                  >
                    <FaPlus />
                  </span>
                </div>
              </div>

              {/* Update Token Price */}
              <div className="team__item">
                <div className="avatar">
                  <img src="assets/img/token/t_info_img.png" alt="" />
                </div>
                <div className="team__info text-center mb-20">
                  <h3>UPDATE TOKEN PRICE</h3>
                  <span>ICO TOKEN, Only Owner</span>
                </div>
                <div className="team__social ul_li_center">
                  <span
                    onClick={() => {
                      setOwnerModel(false);
                      setOpenUpdatePrice(true);
                    }}
                    className="h-icon"
                    style={{ cursor: "pointer" }}
                    aria-label="Update Token Price"
                  >
                    <FaPlus />
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="team__shape">
        <div className="shape shape--1">
          <img src="assets/img/shape/t_shape1.png" alt="" />
        </div>
        <div className="shape shape--2">
          <img src="assets/img/shape/t_shape1.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Owner;
