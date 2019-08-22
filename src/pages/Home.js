import React from "react";
import { Link } from "react-router-dom";
import "./style/Badges.css";

class Home extends React.Component {
  render() {
    return (
      <header className="masthead">
        <div className="container">
          <div className="intro-text">
            <div className="intro-lead-in">Bienvenido a tu tienda!</div>
            <div className="intro-heading text-uppercase">
              Videojuegos, Optimizacion y Tecnologias
            </div>
            <Link to="/Service">
              <button className="btn btn-primary btn-xl text-uppercase js-scroll-trigger mr-3">
                Conoce mas
              </button>
            </Link>
            <Link to="/Login">
              <button className="btn btn-success btn-xl text-uppercase js-scroll-trigger">
                Iniciar sesion
              </button>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Home;
