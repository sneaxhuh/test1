import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Hero = ({
  setBuyModel,
  account,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  detail,
  addTokenToMetamask,
}) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const connectWallet = async () => {
    setLoader(true);
    try {
      const address = await CONNECT_WALLET();
      setAccount(address);
    } catch (error) {
      notifyError("Failed to connect wallet");
    } finally {
      setLoader(false);
    }
  };

  const [percentage, setPercentage] = useState(0); // Initialize with 0

  useEffect(() => {
    const calculatePercentage = () => {
      const tokenSold = detail?.soldTokens ?? 0;
      const tokenTotalSupply = detail?.soldTokens + Number(detail?.tokenBal) || 1; // Use || to default to 1 if NaN
      
      if (tokenTotalSupply === 0) {
        console.log("Token sale balance is zero, cannot calculate percentage");
      } else {
        const percentageNew = (tokenSold / tokenTotalSupply) * 100;
        setPercentage(percentageNew);
      }
    };

    const timer = setInterval(calculatePercentage, 1000); // Use setInterval instead of setTimeout

    return () => clearInterval(timer);
  }, [detail]);

  const addTokenToMetaMask = async () => {
    setLoader(true);
    try {
      const response = await addTokenToMetamask();
      notifySuccess(response);
    } catch (error) {
      notifyError("Failed to add token to MetaMask");
    } finally {
      setLoader(false);
    }
  };

  console.log(detail);

  return (
    <section className="hero hero_ico pos-rel ">
    <div className="hero_bg" style={{ marginTop: '-100px' }} />
    <div className="container">
      <div className="row hero-row"> {/* Add a class for Flexbox */}
        <div className="hero__content">
          <h1 className="heading">
            Participate <br /> in the Ongoing ICO <br /> Token Sale
          </h1>
          <div className="btns_head">
            {account ? (
              <button className="btn_head" onClick={() => setBuyModel(true)}>
                PURCHASE TOKEN
              </button>
            ) : (
              <button className="btn_head" onClick={connectWallet}>
                CONNECT WALLET
              </button>
            )}
            <button className="btn_head" onClick={addTokenToMetaMask}>
              ADD TOKEN TO METAMASK
            </button>
          </div>
        </div>
        <div className="home-image">
          <img src="/home_img.png" alt="" className="homeimg" />
        </div>
      </div>
    </div>
  </section>
  
  
  );
};

export default Hero;
