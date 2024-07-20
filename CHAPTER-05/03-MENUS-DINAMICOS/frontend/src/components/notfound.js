import React from "react";
import Header from "./shared/header";
import image from "../assets/images/Error-404.png";

const NotFoundPage = () => {
  return (
    <div className="main-container">
      <Header></Header>
      <div className="card mb-3 card-container">
        <div style={{textAlign:'center'}}>
          <img src={image} className="img-notfound" alt="..." />
        </div>
      </div>
      <div>
        <br></br>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0  footer-title">© 2024 Pizza App 🍕</p>
          <a
            href="/"
            className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
          ></a>
        </footer>
      </div>
    </div>
  );
};

export default NotFoundPage;
