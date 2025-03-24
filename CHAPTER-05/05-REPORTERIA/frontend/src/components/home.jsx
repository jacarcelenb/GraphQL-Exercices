import React from "react";
import Header from "./shared/header";
import image from "../assets/images/bg_1.png"

const MainPage = () => {
  return (
    <div className="main-container">
      <Header></Header>
      <div className="card mb-3 card-container">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title title-page">🍕 Bienvenidos🍕</h5>
            </div>
          </div>
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

export default MainPage;
