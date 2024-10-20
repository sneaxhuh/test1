import React, { useState } from "react";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const faqData = [
    {
      question: "Type your question about your projects of ICO?",
      answer: (
        <>
          <p>YOOOOOOOOOO</p>
          <ul>
            <li>kkkk</li>
            <li>kkkk</li>
            <li>kkkk</li>
            <li>kkkk</li>
          </ul>
          <p>
            idk bro <br />
            but you are icy
          </p>
        </>
      ),
    },
    {
      question: "Type your question about your projects of ICO?",
      answer: (
        <>
          <p>YOOOOOOOOOO</p>
          <ul>
            <li>kkkk</li>
            <li>kkkk</li>
            <li>kkkk</li>
            <li>kkkk</li>
          </ul>
          <p>
            idk bro <br />
            but you are icy
          </p>
        </>
      ),
    },
    {
      question: "Type your question about your projects of ICO?",
      answer: (
        <>
          <p>YOOOOOOOOOO</p>
          <ul>
            <li>kkkk</li>
            <li>kkkk</li>
            <li>kkkk</li>
            <li>kkkk</li>
          </ul>
          <p>
            idk bro <br />
            but you are icy
          </p>
        </>
      ),
    },
    {
      question: "Type your question about your projects of ICO?",
      answer: (
        <>
          <p>YOOOOOOOOOO</p>
          <ul>
            <li>kkkk</li>
            <li>kkkk</li>
            <li>kkkk</li>
            <li>kkkk</li>
          </ul>
          <p>
            idk bro <br />
            but you are icy
          </p>
        </>
      ),
    },
  ];

  return (
    <section id="faq" className="faq pos-rel pt-140 pb-105">
      <div className="container">
        <div className="sec-title text-center mb-35">
          <h5 className="sec-title__subtitle">FAQ</h5>
          <h2 className="sec-title__title">Frequently Asked Questions</h2>
        </div>
        <div className="faq__wrap">
          <ul className="accordion_box clearfix">
            {faqData.map((faq, index) => (
              <li
                key={index}
                className={`accordion block ${activeIndex === index ? "active-block" : ""}`}
              >
                <div className="acc-btn" onClick={() => toggleAccordion(index)}>
                  <span>QA: 0{index + 1}</span> {faq.question}
                </div>
                <div className={`acc_body ${activeIndex === index ? "current" : ""}`}>
                  <div className="content">{faq.answer}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="faq__sec-shape">
        <div className="shape shape-1">
          <img src="assets/img/shape/s_shape1.png" alt="shape" />
        </div>
        <div className="shape shape-2">
          <img src="assets/img/shape/s_shape2.png" alt="shape" />
        </div>
      </div>
    </section>
  );
};

export default Faq;
