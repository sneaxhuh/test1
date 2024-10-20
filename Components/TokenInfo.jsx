import React from "react";
import PropTypes from "prop-types";

const TokenInfo = ({ detail = {}, currency = "" }) => {
  // Destructure props with default values
  const { supply = 0, symbol = "", soldTokens = 0, tokenPrice = 0 } = detail;

  // Ensure that values are numbers
  const supplyNumber = Number(supply);
  const soldTokensNumber = Number(soldTokens);
  const tokenPriceNumber = Number(tokenPrice);

  // Formatting currency with locale
  const formatCurrency = (value) => {
    const validCurrency =
      currency && /^[A-Z]{3}$/.test(currency) ? currency : "USD";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: validCurrency,
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <section className="token-info pos-rel pt-200 pb-150">
      <div className="background-image">
        <img src="/bg_img_1.png" alt="Background Image" />
      </div>
      <div className="container">
        <div className="row_info">
          <h2 className="sec-title__title">
            ICO Token Details and Sale
          </h2>
          <div className="token-details">
            <p>
              <strong>Supply:</strong> {supplyNumber} {symbol}
            </p>
            <p>
              <strong>Sold Tokens:</strong> {soldTokensNumber} {symbol}
            </p>
            <p>
              <strong>Token Price:</strong> {formatCurrency(tokenPriceNumber)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// PropTypes for better validation
TokenInfo.propTypes = {
  detail: PropTypes.shape({
    supply: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    symbol: PropTypes.string.isRequired,
    soldTokens: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    tokenPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }),
  currency: PropTypes.string,
};

export default TokenInfo;
