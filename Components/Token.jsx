import React, { useState } from "react";

const Token = () => {
  const [activeTab, setActiveTab] = useState("home"); // State for active tab

  return (
    <section className="token pt-125">
      <div className="container">
        <div className="row align-items-center mt-none-30">
          <div className="col-lg-5 mt-30">
            <div className="token__content wow fadeIn">
              <div className="sec-title mb-20">
                <h5 className="sec-title__subtitle">Tokenomics</h5>
                <h2 className="sec-title__title">
                  Token allocation & funds distribution
                </h2>
              </div>

              <ul className="nav nav-tabs token_tab" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                    id="home-tab"
                    onClick={() => setActiveTab("home")}
                    role="tab"
                    aria-controls="home"
                    aria-selected={activeTab === "home"}
                  >
                    Funding Allocation
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                    id="profile-tab"
                    onClick={() => setActiveTab("profile")}
                    role="tab"
                    aria-controls="profile"
                    aria-selected={activeTab === "profile"}
                  >
                    Token Allocation
                  </button>
                </li>
              </ul>
              <div className="token__info mt-40">
                <h2 className="">1 CNL = 0.00013 BTC</h2>
                <p>heyy</p>
                <div className="token-btn mt-40">
                  <a href="#" className="thm-btn">
                    Buy now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 mt-30">
            <div
              className="tab-content wow fadeInRight"
              data-wow-delay="100ms"
              id="myTabContent"
            >
              <div
                className={`tab-pane fade ${activeTab === "home" ? "show active" : ""}`}
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="token__img">
                  <img src="assets/img/token/token_chart.png" alt="Funding allocation chart" />
                </div>
              </div>
              <div
                className={`tab-pane fade ${activeTab === "profile" ? "show active" : ""}`}
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="token__img">
                  <img src="assets/img/token/token_chart2.png" alt="Token allocation chart" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Token;
